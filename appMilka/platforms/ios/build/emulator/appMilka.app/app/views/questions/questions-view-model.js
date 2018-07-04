var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Questions = new ObservableArray([]);
    viewModel.studyID = "";
    viewModel.facility = "";
    viewModel.emr = "";
    viewModel.position = "";
    viewModel.edu = "";
    viewModel.gender = "";
    viewModel.age = "";


    // insert a new record for the questions
    viewModel.insertQ = function(args) {
      var moodVal = args.object.value;
      var object = args.object;
      var assess = args.object.context;
      var checkVal = args.object.text;

      var agree = 0;
      var pagree = 0;
      var neutral = 0;
      var pdisagree = 0;
      var disagree = 0;
      if(checkVal == "Agree"){
        var agree = 1;
      } if(checkVal == "Partially agree"){
        var pagree = 1;
      } if(checkVal == "Neutral"){
        var neutral = 1;
      } if(checkVal == "Partially disagree"){
        var pdisagree = 1;
      } if(checkVal == "Disagree"){
        var disagree = 1;
      }
      var btn = args.object;
      object.backgroundColor = "#3489db";
            database.execSQL("INSERT OR REPLACE INTO questions (studyID, question, A, PA, N, PD, D) VALUES (?,?,?,?,?,?,?)", [this.studyID, assess, agree, pagree, neutral, pdisagree, disagree]).then(id => {
                console.log("The new record id is: ", id);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectQ = function(){
    this.Questions = new ObservableArray ([]);
      database.all("SELECT studyID, question, A, PA, N, PD, D from questions").then(rows => {
        for(var row in rows) {
          console.log(rows[row]);
        this.Questions.push({studyID: rows[row][0], question: rows[row][1], agree: rows[row][2], pagree: rows[row][3], neutral: rows[row][4], pdisagree: rows[row][5], disagree: rows[row][6]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


    // insert a new record for the person
    viewModel.insertPerson = function(args) {
            database.execSQL("INSERT OR REPLACE INTO person (studyID, facility, emr, position, edu, gender, age) VALUES (?,?,?,?,?,?,?)", [this.studyID, this.facility, this.emr, this.position, this.edu, this.gender, this.age]).then(id => {
                console.log("The new record id is: ", id );
                  dialogs.alert({
                      title: "Success",
                      message: "Your data was saved!",
                      okButtonText: "Close"
                  }).then(function () {
                      console.log("Dialog closed!");
                  });

            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectPerson = function(){
      database.all("SELECT studyID, facility, emr, position, edu, gender, age from person").then(rows => {
        for(var row in rows) {
          console.log(rows[row]);
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

  viewModel.selectQ();
  return viewModel;
}
exports.createViewModel = createViewModel;

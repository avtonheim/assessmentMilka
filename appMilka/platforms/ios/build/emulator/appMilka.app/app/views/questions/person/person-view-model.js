var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.studyID = "";
    viewModel.facility = "";
    viewModel.emr = "";
    viewModel.position = "";
    viewModel.edu = "";
    viewModel.gender = "";
    viewModel.age = "";

    //viewModel.Questions = new ObservableArray([]);


    // insert a new record
    viewModel.insertPerson = function(args) {
      var valueObject = args.object.value;
      var object = args.object;

      var btn = args.object;
      object.backgroundColor = "#3489db";
            database.execSQL("INSERT OR REPLACE INTO person (studyID, facility, emr, position, edu, gender, age) VALUES (?,?,?,?,?,?,?)", [this.studyID, this.facility, this.emr, this.position, this.edu, this.gender, this.age]).then(id => {
                console.log("The new record id is: ", id );
                frameModule.topmost().navigate("views/questions/questions");
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectPerson = function(){
    //this.Questions = new ObservableArray ([]);
      database.all("SELECT studyID, facility, emr, position, edu, gender, age from person").then(rows => {
        for(var row in rows) {
          console.log(rows[row]);
        //this.Questions.push({question: rows[row][0], agree: rows[row][1], pagree: rows[row][2], neutral: rows[row][3], pdisagree: rows[row][4], disagree: rows[row][5]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


  return viewModel;
}
exports.createViewModel = createViewModel;

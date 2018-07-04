var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Questions = new ObservableArray([]);
    viewModel.QuestionsEMR = new ObservableArray([]);
    viewModel.QuestionsPaper = new ObservableArray([]);
    viewModel.Person = new ObservableArray([]);
    viewModel.studyID = "";
    viewModel.facility = "";
    viewModel.emr = "";
    viewModel.position = "";
    viewModel.edu = "";
    viewModel.gender = "";
    viewModel.age = "";


    // insert a new record for the questions
    viewModel.insertQ = function(args) {
      var assess = args.object.value;
      var answer = args.object.text;

      var btn = args.object;
      btn.backgroundColor = "#3489db";

            database.execSQL("INSERT OR REPLACE INTO questions (studyID, question, answer) VALUES (?,?,?)", [this.studyID, assess, answer]).then(id => {
                console.log("The new record id is: ", id);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.selectQ = function(){
    this.Questions = new ObservableArray ([]);
      database.all("SELECT studyID, question, answer from questions").then(rows => {
        for(var row in rows) {
        this.Questions.push({studyID: rows[row][0], question: rows[row][1], answer: rows[row][2]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectEMR = function(){
    this.QuestionsEMR = new ObservableArray ([]);
      database.all("SELECT studyID, question, answer from questions WHERE question <= 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsEMR.push({studyID: rows[row][0], question: rows[row][1], answer: rows[row][2]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

    /*Selects the questions about the EMR*/
    viewModel.selectPaper = function(){
    this.QuestionsPaper = new ObservableArray ([]);
      database.all("SELECT studyID, question, answer from questions WHERE question > 5 group by question").then(rows => {
        for(var row in rows) {
        this.QuestionsPaper.push({studyID: rows[row][0], question: rows[row][1], answer: rows[row][2]});
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
      this.Person = new ObservableArray([]);
      database.all("SELECT studyID, facility, emr, position, edu, gender, age from person").then(rows => {
        for(var row in rows) {
          this.Person.push({studyID: rows[row][0], facility: rows[row][1], emr: rows[row][2], position: rows[row][3], edu: rows[row][4], gender: rows[row][5], age: rows[row][6]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

  viewModel.selectPaper();
  viewModel.selectEMR();
  viewModel.selectQ();
  viewModel.selectPerson();
  return viewModel;
}
exports.createViewModel = createViewModel;

var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Questions = new ObservableArray([]);


    // insert a new record
    viewModel.insert = function(args) {
      var valueObject = args.object.value;
      var object = args.object;

      var btn = args.object;
      object.backgroundColor = "#3489db";
            database.execSQL("INSERT OR REPLACE INTO person (studyID, facility, emr, position, edu, gender, age) VALUES (?,?,?,?,?,?,?)", [studyID, facility, emr, position, edu, gender, age]).then(rows => {
                console.log("The new record id is: " );
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function(){
    this.Questions = new ObservableArray ([]);
      database.all("SELECT question, A, PA, N, PD, D from questions").then(rows => {
        for(var row in rows) {
        this.Questions.push({question: rows[row][0], agree: rows[row][1], pagree: rows[row][2], neutral: rows[row][3], pdisagree: rows[row][4], disagree: rows[row][5]});
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

  viewModel.select();
  return viewModel;
}
exports.createViewModel = createViewModel;

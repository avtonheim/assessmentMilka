var Observable = require("data/observable").Observable;
//var observableArray = require("data/observable-array").observableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function createViewModel(database) {
    var viewModel = new Observable();
    //viewModel.Questions = new observableArray([]);


    // insert a new record
    viewModel.insert = function(args) {
      var moodVal = args.object.value;
      var object = args.object;

      var assess = args.object.context;
      var checkVal = args.object.text;
      var agree = null;
      var pagree = null;
      var neutral = null;
      var pdisagree = null;
      var disagree = null;
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
            database.execSQL("INSERT OR REPLACE INTO questions (question, A, PA, N, PD, D) VALUES (?,?,?,?,?,?)", [assess, agree, pagree, neutral, pdisagree, disagree]).then(rows => {
                console.log("The new record id is: " + assess + agree + pagree + neutral + pdisagree + disagree);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function(){
    //  this.Questions = new observableArray ([]);
      database.all("SELECT * from questions").then(rows => {
        for(var row in rows) {
          //this.Questions.push({Question: rows[row][0], agree: rows[row][1], pagree: rows[row][2], neutral: rows[row][3], pdisagree: rows[row][4], disagree: rows[row][5]});
          console.log(rows[row]);
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }

//  viewModel.select();
  return viewModel;
}
exports.createViewModel = createViewModel;

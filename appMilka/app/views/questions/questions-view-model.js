var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function createViewModel(database) {
    var viewModel = new Observable();


    // insert a new record
    viewModel.insert = function(args) {
      var moodVal = args.object.value;
      var object = args.object;

      var assess = args.object.context;
      var checkVal = args.object.value;
      var agree = null;
      var pagree = null;
      var neutral = null;
      var pdisagree = null;
      var disagree = null;
      if(checkVal == 1){
        var agree = 1;
      } if(checkVal == 1){
        var pagree = 1;
      } if(checkVal == 1){
        var neutral = 1;
      } if(checkVal == 1){
        var pdisagree = 1;
      } if(checkVal == 1){
        var disagree = 1;
      }
      var btn = args.object;
      object.backgroundColor = "#3489db";
            database.execSQL("INSERT OR REPLACE INTO questions (moodState, timestamp) VALUES (?,?)", [assess, agree]).then(rows => {
                //frameModule.topmost().navigate('views/diary/symptoms/symptoms');
                console.log("The new record id is: " + rows);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function(){
      database.all("SELECT * from questions").then(rows => {
        for(var row in rows) {
          console.log(rows[row]);
        }
          }, error => {
          console.log("SELECT ERROR", error);
      });
    }


  return viewModel;
}
exports.createViewModel = createViewModel;

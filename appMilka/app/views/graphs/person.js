var frameModule = require("ui/frame");
var createViewModel = require("../questions/questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

function onPageLoaded(args){
  var page = args.object;
  (new Sqlite("database.db")).then(db => {
          db.execSQL("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY AUTOINCREMENT, studyID text, facility text, emr text, position text, edu text, gender text, age text)").then(id => {
              page.bindingContext = createViewModel(db);
              console.log("Success! Opened the person table!");
          }, error => {
              console.log("CREATE TABLE ERROR", error);
          });
      }, error => {
          console.log("OPEN DB ERROR", error);
      });
} exports.onPageLoaded = onPageLoaded;

var frameModule = require("ui/frame");
var createViewModel = require("../../views/questions/questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

function onPageLoaded(args){
  var page = args.object;

  (new Sqlite("database.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, question text, A text, PA text, N text, PD text, D text)").then(id => {
             page.bindingContext = createViewModel(db);
             console.log("success! Opened the database");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}

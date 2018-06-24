var createViewModel = require("./questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

function onNavigatingTo(args){
  var page = args.object;

//SQLite instantiation
  if (!Sqlite.exists("database.db")) {
        Sqlite.copyDatabase("database.db");
    }
(new Sqlite("database.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, question text, A text, PA text, N text, PD text, D text)").then(id => {
           page.bindingContext = createViewModel(db);
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });
}
exports.onNavigatingTo = onNavigatingTo;

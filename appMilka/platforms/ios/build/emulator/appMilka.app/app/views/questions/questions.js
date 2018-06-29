var createViewModel = require("./questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onNavigatingTo(args){
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
exports.onNavigatingTo = onNavigatingTo;

function pageHome(){
  frameModule.topmost().navigate("main-page");
}
exports.pageHome = pageHome;

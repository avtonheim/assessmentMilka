var createViewModel = require("./questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onNavigatingTo(args){
  var page = args.object;

  (new Sqlite("populated.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
             page.bindingContext = createViewModel(db);
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}
exports.onNavigatingTo = onNavigatingTo;

function nextPage(){
  frameModule.topmost().navigate("views/questions/questionsone");
}
exports.nextPage = nextPage;

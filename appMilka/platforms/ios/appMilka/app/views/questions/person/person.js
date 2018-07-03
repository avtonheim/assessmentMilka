var createViewModel = require("./person-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var Dialogs = require("ui/dialogs");

function onNavigatingTo(args){
  var page = args.object;

  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);

 (new Sqlite("database.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY AUTOINCREMENT, studyID text, facility text, emr text, position text, edu text, gender text, age text)").then(id => {
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

function startQ(){
  frameModule.topmost().navigate("views/questions/questions");
}
exports.startQ = startQ;

function tapHome(){
  Dialogs.confirm({
      title: "Do you want to cancel?",
      message: "All data will be lost",
      okButtonText: "Yes",
      cancelButtonText: "Cancel"
  }).then(function (result) {
      if (result === true) {
      frameModule.topmost().navigate('main-page');
    }
  });
} exports.tapHome = tapHome;

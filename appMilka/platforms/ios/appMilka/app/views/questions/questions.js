var createViewModel = require("./questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var Dialogs = require("ui/dialogs");

function onNavigatingTo(args){
  var page = args.object;

  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);

 (new Sqlite("database.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, studyID text, question text, A text, PA text, N text, PD text, D text)").then(id => {
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

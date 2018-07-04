var createViewModel = require("./questions-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var dialogs = require("ui/dialogs");


function onNavigatingTo(args){
  var page = args.object;
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);

//Instantiating the first table
 (new Sqlite("database.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, studyID text, question INTEGER, answer TEXT)").then(id => {
             page.bindingContext = createViewModel(db);
             console.log("Success! Opened the questions table!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });

//Instatiating the second table
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
} exports.onNavigatingTo = onNavigatingTo;

/*When the user clicks on the finish button, then the user is navigated back to the main page*/
function pageHome(){
  dialogs.alert({
      title: "Thank you",
      message: "You finsihed the questionnaire!",
      okButtonText: "Close"
  }).then(function () {
      console.log("Dialog closed!");
      frameModule.topmost().navigate("main-page");
  });

} exports.pageHome = pageHome;

/*The abort dialoge for the user if the user whishes to abort the registration*/
function tapHome(){
  dialogs.confirm({
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

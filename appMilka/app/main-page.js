var frameModule = require('ui/frame');

function onNavigatingTo(args) {
    var page = args.object;
    //Controlling the native back-button
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);
}
exports.onNavigatingTo = onNavigatingTo;


function navigateQuestions(){
  frameModule.topmost().navigate('views/questions/questions');
}
exports.navigateQuestions = navigateQuestions;

function navigateSummary(){
  frameModule.topmost().navigate('views/summary/summary');
}
exports.navigateSummary = navigateSummary;

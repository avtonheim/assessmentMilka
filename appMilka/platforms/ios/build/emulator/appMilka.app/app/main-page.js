var frameModule = require('ui/frame');

function onNavigatingTo(args) {
    var page = args.object;
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

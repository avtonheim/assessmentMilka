var builder = require('ui/builder');
var fs = require('file-system');

exports.onLoad = function(args) {
  var page = args.object;
  var stackQuestion = page.getViewById('barGraph');
  var stackQuestionPaper = page.getViewById('barGraphPaper');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentBarJS = require(path + '/views/graphs/bargraph.js');
  var componentBarPaperJS = require(path + '/views/graphs/bargraphpaper.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentBarXML = builder.load(path + '/views/graphs/bargraph.xml', componentBarJS);
  var componentBarPaperXML = builder.load(path + '/views/graphs/bargraphpaper.xml', componentBarPaperJS);

  // And add our component to the visual tree
  stackQuestion.addChild(componentBarXML);
  stackQuestionPaper.addChild(componentBarPaperXML);
};

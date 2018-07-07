var builder = require('ui/builder');
var fs = require('file-system');

exports.onLoad = function(args) {
  var page = args.object;
  var stackQuestion = page.getViewById('barGraph');
  var stackQuestionPaper = page.getViewById('barGraphPaper');
  var stackText = page.getViewById('text');
  var stackInformant = page.getViewById('informant');
  var stackKenya = page.getViewById('kenyaGraph');
  var stackIq = page.getViewById('iqGraph');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentBarJS = require(path + '/views/graphs/bargraph.js');
  var componentBarPaperJS = require(path + '/views/graphs/bargraphpaper.js');
  var componentTextJS = require(path + '/views/graphs/alldata.js');
  var componentInformantJS = require(path + '/views/graphs/person.js');
  var componentKenyaJS = require(path + '/views/graphs/emrKenya.js');
  var componentIqJS = require(path + '/views/graphs/emriq.js');

  // Actually have the builder build the Component using the XML & JS.
  var componentBarXML = builder.load(path + '/views/graphs/bargraph.xml', componentBarJS);
  var componentBarPaperXML = builder.load(path + '/views/graphs/bargraphpaper.xml', componentBarPaperJS);
  var componentTextXML = builder.load(path + '/views/graphs/alldata.xml', componentTextJS);
  var componentInformantXML = builder.load(path + '/views/graphs/person.xml', componentInformantJS);
  var componentKenyaXML = builder.load(path + '/views/graphs/emrKenya.xml', componentKenyaJS);
  var componentIqXML = builder.load(path + '/views/graphs/emriq.xml', componentIqJS);

  // And add our component to the visual tree
  stackQuestion.addChild(componentBarXML);
  stackQuestionPaper.addChild(componentBarPaperXML);
  stackText.addChild(componentTextXML);
  stackInformant.addChild(componentInformantXML);
  stackKenya.addChild(componentKenyaXML);
  stackIq.addChild(componentIqXML);
};

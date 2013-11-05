'use strict';

(function() {

  var id = 0,
      cache = [];

  Handlebars.registerHelper("bindData", function(data) {
    var dataKey = id++;
    cache[dataKey] = data;

    return "data-handlebar-id=" + dataKey;
  });

  Handlebars.getBoundData = function(handlebarId) {
    if (typeof(handlebarId) !== "string") {
      // If a string was not passed in, it is the html element, so grab it's id.
      handlebarId = handlebarId.getAttribute("data-handlebar-id");
    }

    return cache[handlebarId];
  };

})();

global.$ = $;

var AddressBar = require('./addressbar'),
    Folder = require('./folder');

$(document).ready(function () {
  var addressbar = new AddressBar($('#addressbar'), Handlebars),
      folder = new Folder($('#files'), Handlebars);

  addressbar.set('/Users/sirzach');
  folder.open('/Users/sirzach');

  folder.on('navigate', function(dirData) {
//    if (mime.type == 'folder') {
//      addressbar.enter(mime);
//    } else {
//      shell.openItem(mime.path);
//    }
    addressbar.set(dirData.fullPath);
    this.open(dirData.fullPath);
  });

  addressbar.on('navigate', function(dirData) {
    this.set(dirData.directory);
    folder.open(dirData.directory);
  });
});
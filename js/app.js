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
global.Handlebars = Handlebars;

var AddressBar = require('./addressbar'),
    Preferences = require('./preferences'),
    Folder = require('./folder'),
    shell = require('nw.gui').Shell;

$(document).ready(function () {
  var addressbar = new AddressBar($('#addressbar')),
      preferences = new Preferences($('#preferences')),
      folder = new Folder($('#files'));

  addressbar.set('/Users/sirzach');
  folder.open('/Users/sirzach');

  preferences.on('selectOption', function (option, selected) {
    console.log(option);
    console.log(selected);
  });

  folder.on('navigate', function(dirData) {
//    if (mime.type == 'folder') {
//      addressbar.enter(mime);
//    } else {
//      shell.openItem(mime.path);
//    }
    addressbar.set(dirData.fullPath);
    this.open(dirData.fullPath);
  });

  folder.on('open', function (file) {
    shell.openItem(file.fullPath);
  });

  addressbar.on('navigate', function(dirData) {
    this.set(dirData.directory);
    folder.open(dirData.directory);
  });
});
'use strict';

global.Handlebars = Handlebars;
require('./js/handlebars');

global.$ = $;
global.App = {};

var AddressBar = require('./js/addressbar'),
    Preferences = require('./js/preferences'),
    ContextMenu = require('./js/context_menu'),
    Preview = require('./js/preview'),
    Folder = require('./js/folder'),
    Shell = require('nw.gui').Shell;

$(document).ready(function () {
  var addressbar = new AddressBar($('#addressbar')),
      contextMenu = new ContextMenu($('#context-menu')),
      preferences = new Preferences($('#preferences')),
      preview = new Preview($('#preview')),
      folder = new Folder($('#files'));

  addressbar.set('/Users/sirzach');
  folder.open('/Users/sirzach');

  preferences.on('selectOption', function (option, selected) {
    folder.updateOptions(option, selected);
  });

  folder.on('navigate', function (dirData) {
    addressbar.set(dirData.fullPath);
    preview.clearTemplate();
    this.open(dirData.fullPath);
  });

  folder.on('previewFile', function (fileData) {
    preview.updateTemplate(fileData);
  });

  folder.on('showContextMenu', function (file) {
    contextMenu.open(file);
//    shell.openItem(file.fullPath);
  });

  addressbar.on('navigate', function(dirData) {
    this.set(dirData.directory);
    preview.clearTemplate();
    folder.open(dirData.directory);
  });

  App.addressbar = addressbar;
  App.contextMenu = contextMenu;
  App.preferences = preferences;
  App.preview = preview;
  App.folder = folder;
});
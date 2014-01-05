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
  var addressBar = new AddressBar($('#addressbar')),
      contextMenu = new ContextMenu($('#context-menu')),
      preferences = new Preferences($('#preferences')),
      preview = new Preview($('#preview')),
      folder = new Folder($('#files')),
      App = global.App;

  addressBar.set('/Users/sirzach');
  folder.open('/Users/sirzach');

  App.addressBar = addressBar;
  App.contextMenu = contextMenu;
  App.preferences = preferences;
  App.preview = preview;
  App.folder = folder;
});
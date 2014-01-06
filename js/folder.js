/**
 * User: sirzach
 * Date: 11/4/13
 * Time: 9:53 PM
 */
'use strict';

var fs = require('fs'),
    events = require('events'),
    path = require('path'),
    util = require('util'),
    App = global.App,
    mimeStats = require('./mime_stats');


var Folder = function (element) {
  /************************ CONSTRUCTOR **************/
  this.element = element;
  this.template = Handlebars.templates['file.hbs'];
  this.currentFiles = {};
  this.options = {
    canShowHidden: false
  };

  var self = this;

  // Click on file icon
  this.element.delegate('i', 'click', function() {
    var boundData = Handlebars.getBoundData(this);

    if (boundData.isDirectory) {
      self.emit('navigate', boundData);
    } else if (boundData.canPreview) {
      self.emit('previewFile', boundData);
    }
  });

  this.element.delegate('i', 'contextmenu', function (event) {
    var boundData = Handlebars.getBoundData(this);

    self.emit('showContextMenu', boundData, event.pageX, event.pageY);
  });

  /*********************** END CONSTRUCTOR **************/

  /**
   * A preference was selected from the Preferences pane, update the shown files accordingly
   * @param option
   * @param value
   */
  this.updateOptions = function (option, value) {
    this.options[option] = value;
    this.updateTemplate();
  };

  /**
   * Using the options and cached files, render the HTML for the files listing
   */
  this.updateTemplate = function () {

    if (this.options.canShowHidden) {
      this.element.html(this.template(this.currentFiles));
    } else {
      var retCopy = {
        files: []
      };

      this.currentFiles.files.forEach(function (file) {
        if (!file.isHidden) {
          retCopy.files.push(file);
        }
      });

      this.element.html(this.template(retCopy));
    }
  };

  /**
   * Given a directory, assemble the list of files and their metadata to be rendered
   * @param dir
   */
  this.open = function (dir) {
    var ret = {
          files: []
        },
        self = this;

    fs.readdir(dir, function(error, files) {
      if (error) {
        console.log(error);
        window.alert(error);
        return;
      }

      for (var i = 0; i < files.length; ++i) {
        var file = path.join(dir, files[i]),
            stats = fs.statSync(file),
            fileMetaData = mimeStats(stats, files[i]),
            canPreview = fileMetaData.isPicture || fileMetaData.isMovie ? true : false;

        ret.files.push({
          name: files[i],
          fullPath: file,
          faClass: fileMetaData.faClass,
          isHidden: fileMetaData.isHidden,
          isPicture: fileMetaData.isPicture,
          isMovie: fileMetaData.isMovie,
          canPreview: canPreview,
          isDirectory: fileMetaData.isDirectory
        });

      }

      self.currentFiles = ret;
      self.updateTemplate();
    });
  };
};

util.inherits(Folder, events.EventEmitter);

Folder.prototype.on('navigate', function (dirData) {
  App.addressBar.set(dirData.fullPath);
  App.preview.clearTemplate();
  this.open(dirData.fullPath);
});

Folder.prototype.on('previewFile', function (fileData) {
  App.preview.updateTemplate(fileData);
});

Folder.prototype.on('showContextMenu', function (file, x, y) {
  App.contextMenu.open(file, x, y);
//    shell.openItem(file.fullPath);
});

module.exports = Folder;
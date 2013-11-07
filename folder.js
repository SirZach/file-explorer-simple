/**
 * User: sirzach
 * Date: 11/4/13
 * Time: 9:53 PM
 */
'use strict';

var fs = require('fs'),
    events = require('events'),
    path = require('path'),
    util = require('util');

var fileStatistics = function (stats, file) {
  var ret = {
    isDirectory: false,
    isHidden: false,
    faClass: 'fa-file-text'
  };

  if (stats.isDirectory()) {
    ret.isDirectory = true;
    ret.faClass = 'fa-folder';
  }

  if (file[0] === '.') {
    ret.isHidden = true;
    ret.faClass = 'fa-file-o';
  }

  if (ret.isHidden && ret.isDirectory) {
    ret.faClass = 'fa-folder-o';
  }

  return ret;
};



function Folder (element) {
  this.element = element;
  this.template = Handlebars.templates['file.hbs'];
  this.currentFiles = {};
  this.canShowHidden = false;

  var self = this;

  // Click on file icon
  this.element.delegate('i', 'click', function() {
    var boundData = Handlebars.getBoundData(this);

    if (boundData.isDirectory) {
      self.emit('navigate', boundData);
    }
  });
}

util.inherits(Folder, events.EventEmitter);

Folder.prototype.open = function (dir) {
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
          fileMetaData = fileStatistics(stats, files[i]);

      ret.files.push({
        name: files[i],
        fullPath: file,
        faClass: fileMetaData.faClass,
        isHidden: fileMetaData.isHidden,
        isDirectory: fileMetaData.isDirectory
      });

    }

    self.currentFiles = ret;

    if (self.canShowHidden) {
      self.element.html(self.template(ret));
    } else {
      var retCopy = {
        files: []
      };

      ret.files.forEach(function (file) {
        if (!file.isHidden) {
          retCopy.files.push(file);
        }
      });

      self.element.html(self.template(retCopy));
    }

  });
};

module.exports = Folder;
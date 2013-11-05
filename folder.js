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

function Folder (element, Handlebars) {
  this.element = element;
  this.Handlebars = Handlebars;
  this.template = this.Handlebars.templates['file.hbs'];

  var self = this;

  // Double click on file
  this.element.delegate('li', 'dblclick', function() {
    var boundData = self.Handlebars.getBoundData(this);

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
      var file = path.join(dir, files[i]);
      console.log(file);

      var stats = fs.statSync(file);

      ret.files.push({
        name: files[i],
        fullPath: file,
        isDirectory: stats.isDirectory()
      });

//      files[i] = mime.stat(path.join(dir, files[i]));
    }

    self.element.html(self.template(ret));
  });
};

module.exports = Folder;
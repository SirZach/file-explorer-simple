/**
 * User: sirzach
 * Date: 11/3/13
 * Time: 11:11 PM
 */

'use strict';

var events = require('events'),
    util = require('util');


function AddressBar (element) {
  this.element = element;
  this.template = Handlebars.templates['addressbar.hbs'];
  this.currentPath = null;

  var self = this;

  element.delegate('a', 'click', function () {
    var boundData = Handlebars.getBoundData(this);

    self.emit('navigate', boundData);
  });
}

util.inherits(AddressBar, events.EventEmitter);

AddressBar.prototype.set = function (dir) {
  this.currentPath = dir;

  var data = {
        directory : []
      },
      directories = this.currentPath.split('/'),
      dirInLoop = '';

  for (var i = 0; i < directories.length; i++) {
    dirInLoop += directories[i] + '/';
    var currentDir = {
      name: directories[i],
      directory: dirInLoop,
      class: ''
    };

    if (i === directories.length - 1) {
      currentDir.class = "active";
    }

    data.directory.push(currentDir);
  }

  this.element.html(this.template(data));
};

module.exports = AddressBar;
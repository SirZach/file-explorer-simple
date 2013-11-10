/**
 * User: sirzach
 * Date: 11/6/13
 * Time: 11:40 PM
 */

'use strict';

var events = require('events'),
    util = require('util');

function Preview (element) {
  this.element = element;
  this.template = Handlebars.templates['preview.hbs'];

  this.element.html(this.template({
    isPicture: false,
    isMovie: false
  }));

  this.updateTemplate = function (fileData) {
    this.element.html(this.template(fileData));
  };

  this.clearTemplate = function () {
    this.element.html(this.template({
      isPicture: false,
      isMovie: false
    }));
  };
}

util.inherits(Preview, events.EventEmitter);


module.exports = Preview;
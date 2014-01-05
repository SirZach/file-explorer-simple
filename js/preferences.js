/**
 * User: sirzach
 * Date: 11/6/13
 * Time: 11:40 PM
 */

'use strict';

var events = require('events'),
    App = global.App,
    util = require('util');

var Preferences = function (element) {
  this.element = element;
  this.template = Handlebars.templates['preferences.hbs'];

  this.element.html(this.template());

  var self = this;

  this.element.delegate('input', 'click', function() {
    var selected = this.checked,
        option = this.getAttribute('value');

    self.emit('selectOption', option, selected);
  });
};

util.inherits(Preferences, events.EventEmitter);

Preferences.prototype.on('selectOption', function (option, selected) {
  App.folder.updateOptions(option, selected);
});

module.exports = Preferences;
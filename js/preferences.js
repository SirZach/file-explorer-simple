/**
 * User: sirzach
 * Date: 11/6/13
 * Time: 11:40 PM
 */

'use strict';

var events = require('events'),
    util = require('util');

function Preferences (element) {
  this.element = element;

  var self = this;

  this.element.delegate('input', 'click', function() {
    var selected = this.checked,
        option = this.getAttribute('value');

    self.emit('selectOption', option, selected);
  });
}

util.inherits(Preferences, events.EventEmitter);


module.exports = Preferences;
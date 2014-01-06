/**
 * User: sirzach
 * Date: 11/11/13
 * Time: 12:42 AM
 */

'use strict';

var ContextMenu = function (element) {
  /****************** CONSTRUCTOR **************/
  this.element = element;
  this.template = Handlebars.templates['context_menu.hbs'];
  this.file = null;

  var self = this;

  this.element.delegate('a[data-menu="close"]', 'click', function (event) {
    self.close();
  });
  /***************** END CONSTRUCTOR ************/

  /**
   * Given some file, open the right click menu
   * @param file
   */
  this.open = function (file, x, y) {
    this.file = file;
    this.element.html(this.template());
    $(this.element).css({
      display: 'block',
      left: x,
      top: y
    });
  };

  /**
   * Close the context menu
   */
  this.close = function () {
    $(this.element).toggle();
  };
};

module.exports = ContextMenu;
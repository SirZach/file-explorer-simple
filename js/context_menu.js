/**
 * User: sirzach
 * Date: 11/11/13
 * Time: 12:42 AM
 */

'use strict';

function ContextMenu (element) {
  /****************** CONSTRUCTOR **************/
  this.element = element;
  this.template = Handlebars.templates['context_menu.hbs'];
  this.file = null;
  /***************** END CONSTRUCTOR ************/

  /**
   * Given some file, open the right click menu
   * @param file
   */
  this.open = function (file) {
    this.file = file;
    $(this.element).toggle();
    this.element.html(this.template());
  };
}

module.exports = ContextMenu;
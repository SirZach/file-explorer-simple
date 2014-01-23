/**
 * User: sirzach
 * Date: 11/11/13
 * Time: 12:42 AM
 */

'use strict';

var App = global.App;

var ContextMenu = function (elem) {
  /****************** CONSTRUCTOR **************/
  var element = elem,
      template = Handlebars.templates['context_menu.hbs'],
      file = null;

  element.delegate('a[data-menu="close"]', 'click', function (event) {
    close();
  });

  element.delegate('a[data-menu="openFile"]', 'click', function (event) {
    openFile();
  });
  /***************** END CONSTRUCTOR ************/

  /**
   * Given some file, open the right click menu
   * @param file
   */
  function open (f, x, y) {
    file = f;
    element.html(template());
    $(element).css({
      display: 'block',
      left: x,
      top: y
    });
  }

  /**
   * Close the context menu
   */
  function close () {
    $(element).toggle();
  }

  function openFile () {
    App.shell.openItem(file.fullPath);
    close();
  }

  return {
    close: close,
    open: open
  };
};

module.exports = ContextMenu;
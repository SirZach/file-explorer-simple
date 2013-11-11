'use strict';

var path = require('path');

var mimeStats = function (stats, file) {
  var ret = {
        isDirectory: false,
        isPicture: false,
        isMovie: false,
        isHidden: false,
        faClass: 'fa-file-text'
      },
      ext = path.extname(file);

  if (stats.isDirectory()) {
    ret.isDirectory = true;
    ret.faClass = 'fa-folder';
  } else {
    switch (ext) {
      case '.html':
        ret.faClass = 'fa-html5';
        break;
      case '.mp4':
      case '.mov':
      case '.avi':
        ret.faClass = 'fa-video-camera';
        ret.isMovie = true;
        break;
      case '.mp3':
        ret.faClass = 'fa-headphones';
        break;
      case '.coffee':
        ret.faClass = 'fa-coffee';
        break;
      case '.jpg':
      case '.gif':
      case '.png':
        ret.faClass = 'fa-picture-o';
        ret.isPicture = true;
        break;
    }

  }

  if (file[0] === '.') {
    ret.isHidden = true;
    ret.faClass = 'fa-file-o';
  }

  if (ret.isHidden && ret.isDirectory) {
    ret.faClass = 'fa-folder-o';
  }

  if (ret.isMovie || ret.isPicture || ret.isDirectory) {
    ret.faClass += ' cursor-pointer';
  }

  return ret;
};

module.exports = mimeStats;
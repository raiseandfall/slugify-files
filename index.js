'use strict';

var globby = require('globby'),
  fs = require('fs'),
  eachAsync = require('each-async'),
  slug = require('slug'),
  objectAssign = require('object-assign');

module.exports = function (patterns, opts, cb) {

  if (typeof opts !== 'object') {
    cb = opts;
    opts = {};
  }

  opts = objectAssign({}, opts);
  cb = cb || function () {};

  globby(patterns, opts, function (err, files) {

    // Error
    if (err) {
      cb(err);
      return;
    }

    eachAsync(files, function(el, i, next) {

      // Get extension
      var file = el.split('.'),
        ext = '',
        old = '',
        filename = '';

      // If extension
      if (file.length > 1) {
        ext = file[file.length - 1];
        filename = file.slice(0, file.length - 1);
        old = filename.join('.');
      } else {
        old = el;
      }

      // Slug it
      var slugged = slug(old, {
        lower: true
      });
      slugged += '.'+ext;

      fs.rename(el, slugged, function(err) {
        if (err) {
          cb(err);
          next();
        }
      });

    }, function(err) {
      if (err) {
        cb(err);
        return;
      }

      cb();
    });

  });

};

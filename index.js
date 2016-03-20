'use strict';

var globby = require('globby');
var fs = require('fs');
var eachAsync = require('each-async');
var slug = require('slug');
var objectAssign = require('object-assign');

module.exports = function (patterns, opts, cb) {
  if (typeof opts !== 'object') {
    cb = opts;
    opts = {};
  }

  opts = objectAssign({}, opts);
  cb = cb || function () {};
  var sluggedFiles = [];

  globby(patterns, opts, function (err, files) {
    // Error
    if (err) {
      cb(err);
      return;
    }

    eachAsync(files, function (el, i, next) {
      // Path
      var path = el.split('/');
      var dirs = path.slice(0, path.length - 1);

      // Get extension
      var file = path[path.length - 1].split('.');
      var ext = '';
      var old = '';
      var filename = '';

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
      slugged += '.' + ext;

      dirs.push(slugged);
      var fullSlugged = dirs.join('/');

      fs.rename(el, fullSlugged, function (err) {
        if (err) {
          cb(err);
          next();
        }

        sluggedFiles.push({
          new: fullSlugged,
          old: el
        });

        next();
      });
    }, function (err) {
      if (err) {
        cb(err, null);
        return;
      }

      cb(null, sluggedFiles);
    });
  });
};

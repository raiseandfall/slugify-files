'use strict';

var test = require('tapes'),
  fs = require('fs-extra'),
  pathExists = require('path-exists'),
  slugify = require('./'),
  path = require('path'),
  unorm = require('unorm');

var mockSameLevel = [
  'file with spaces.tmp',
  'fileWithCamelCase.tmp',
  'filèwithàccénts.tmp',
  'filewithpunctuation!?.tmp'
];
var mockSluggedSameLevel = [
  'file-with-spaces.tmp',
  'filewithcamelcase.tmp',
  'filewithaccents.tmp',
  'filewithpunctuation.tmp'
];

var mockDifferentLevel = [
  'tmp/tmp2/tmp3/file with spaces.tmp',
  'tmp/tmp2/tmp3/fileWithCamelCase.tmp',
  'tmp/tmp2/tmp3/filèwithàccénts.tmp',
  'tmp/tmp2/tmp3/filewithpunctuation!?.tmp'
];
var mockSluggedDifferentLevel = [
  'tmp/tmp2/tmp3/file-with-spaces.tmp',
  'tmp/tmp2/tmp3/filewithcamelcase.tmp',
  'tmp/tmp2/tmp3/filewithaccents.tmp',
  'tmp/tmp2/tmp3/filewithpunctuation.tmp'
];

Array.prototype.find = function (predicate, thisValue) {
  var arr = Object(this);
  if (typeof predicate !== 'function') {
    throw new TypeError();
  }
  for(var i=0; i < arr.length; i++) {
    if (i in arr) {
      var elem = arr[i];
      if (predicate.call(thisValue, elem, i, arr)) {
        return elem;
      }
    }
  }
  return undefined;
}

function fileExistsCaseSensitive(filePath) {
  var dir = path.dirname(filePath);
  var filenames = fs.readdirSync(dir);
  if (filenames.indexOf(path.basename(filePath)) === - 1) {
    return false;
  }
  return fileExistsCaseSensitive(dir);
}

test('Files on same level', function(t) {

  t.beforeEach(function(t) {
    mockSameLevel.forEach(fs.ensureFileSync);
    t.end();
  });

  t.afterEach(function(t) {
    mockSluggedSameLevel.forEach(function(el) {
      fs.deleteSync(el, function() {
        if (err) {
          return console.error(err);
        }
      });
    });
    t.end();
  });

  t.test('should be slugged', function(t) {
    t.plan(mockSameLevel.length + mockSluggedSameLevel
           .length + 1);

    slugify(['*.tmp'], function(err) {
      t.ok(!err);

      mockSameLevel.forEach(function(file){
        t.ok(!fileExistsCaseSensitive(file));
      });

      mockSluggedSameLevel.forEach(function(file) {
        t.ok(pathExists.sync(file));
      });

      t.end();
    });
  });

  t.test('Should return an array with the slugged files', function(t) {
    t.plan(mockSameLevel.length);

    var mapMockObj = {};
    mockSameLevel.forEach(function(file, idx) {
      mapMockObj[mockSluggedSameLevel[idx]] = file;
    });

    slugify(['*.tmp'], function(err, sluggedFiles) {
      for (var mockFile in mapMockObj) {
        var isEqual = sluggedFiles.find(function(file) {
          return file.new === mockFile;
        });
        t.equal(unorm.nfkd(isEqual.old), unorm.nfkd(mapMockObj[mockFile]));
      }

      t.end();
    });
  });

  t.end();
});

test('Files on different level', function(t) {
  t.beforeEach(function(t) {
    mockDifferentLevel.forEach(fs.ensureFileSync);
    t.end();
  });

  t.afterEach(function(t) {
    mockSluggedDifferentLevel.forEach(function(el) {
      fs.deleteSync(el, function() {
        if (err) {
          return console.error(err);
        }
      });
    });
    t.end();
  });

  t.test('should be slugged', function(t) {
    t.plan(mockDifferentLevel.length + mockSluggedDifferentLevel.length + 1);

    slugify(['tmp/tmp2/tmp3/*.tmp'], function(err) {
      t.ok(!err);

      mockDifferentLevel.forEach(function(file){
        t.ok(!fileExistsCaseSensitive(file));
      });

      mockSluggedDifferentLevel.forEach(function(file) {
        t.ok(pathExists.sync(file));
      });

      t.end();
    });
  });

  t.end();
});


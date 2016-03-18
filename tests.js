'use strict';

var assert = require('assert'),
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

beforeEach(function() {
  // Same level
  mockSameLevel.forEach(fs.ensureFileSync);
  // Other level
  mockDifferentLevel.forEach(fs.ensureFileSync);
});

afterEach(function () {
  mockSluggedSameLevel.forEach(function(el) {
    fs.deleteSync(el, function(err) {
      if (err) return console.error(err);
    });
  });
  mockSluggedDifferentLevel.forEach(function(el) {
    fs.deleteSync(el, function(err) {
      if (err) return console.error(err);
    });
  });

  fs.deleteSync('tmp');
});

Array.prototype.find = function (predicate, thisValue) {
  var arr = Object(this);
  if (typeof predicate !== 'function') {
    throw new TypeError();
  }
  for(var i=0; i < arr.length; i++) {
    if (i in arr) {  // skip holes
      var elem = arr[i];
      if (predicate.call(thisValue, elem, i, arr)) {
        return elem;  // (1)
      }
    }
  }
  return undefined;  // (2)
}

function fileExistsCaseSensitive(filePath) {
  var dir = path.dirname(filePath);
  var filenames = fs.readdirSync(dir);
  if (filenames.indexOf(path.basename(filePath)) === - 1) {
    return false;
  }
  return fileExistsCaseSensitive(dir);
}

it('should rename files on same level', function(done) {
  slugify(['*.tmp'], function(err) {
    assert(!err, err);

    mockSameLevel.forEach(function(file){
      assert(!fileExistsCaseSensitive(file));
    });

    mockSluggedSameLevel.forEach(function(file) {
      assert(pathExists.sync(file));
    });

    done();
  });
});

it('should rename files on other level', function(done) {
  slugify(['tmp/tmp2/tmp3/*.tmp'], function(err) {
    assert(!err, err);

    mockDifferentLevel.forEach(function(file){
      assert(!fileExistsCaseSensitive(file));
    });

    mockSluggedDifferentLevel.forEach(function(file) {
      assert(pathExists.sync(file));
    });

    done();
  });
});

it('should return the slugged files in an object', function(done) {
  var mapMockObj = {};
  mockSameLevel.forEach(function(file, idx) {
    mapMockObj[mockSluggedSameLevel[idx]] = file;
  });

  slugify(['*.tmp'], function(err, sluggedFiles) {
    for (var mockFile in mapMockObj) {
      var isEqual = sluggedFiles.find(function(file) {
        return file.new === mockFile;
      });

      assert.equal(unorm.nfkd(isEqual.old), unorm.nfkd(mapMockObj[mockFile]));
    }

    done();
  });
});

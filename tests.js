'use strict';

var assert = require('assert'),
  fs = require('fs-extra'),
  pathExists = require('path-exists'),
  slugify = require('./');

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

before(function() {
  // Same level
  mockSameLevel.forEach(fs.ensureFileSync);
  // Other level
  mockDifferentLevel.forEach(fs.ensureFileSync);
});

after(function () {
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

it('should rename files on same level', function() {
  slugify(['*.tmp'], function(err) {
    assert(!err, err);

    mockSameLevel.forEach(function(file){
      assert(!pathExists.sync(file));
    });

    for (var i in mockSluggedSameLevel) {
      assert(pathExists.sync(mockSluggedSameLevel[i]));
    }
  });
});

it('should rename files on other level', function() {
  slugify(['tmp/tmp2/tmp3/*.tmp'], function(err) {
    assert(!err, err);

    mockDifferentLevel.forEach(function(file){
      assert(!pathExists.sync(file));
    });

    for (var i in mockSluggedDifferentLevel) {
      assert(pathExists.sync(mockSluggedDifferentLevel[i]));
    }
  });
});


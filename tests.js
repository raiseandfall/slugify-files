'use strict';

var assert = require('assert'),
  fs = require('fs-extra'),
  pathExists = require('path-exists'),
  sanitize = require('./');

var mock = [
  'file with spaces.tmp',
  'fileWithCamelCase.tmp',
  'filèwithàccénts.tmp',
  'filewithpunctuation!?.tmp'
];

var mockSlugged = [
  'file-with-spaces.tmp',
  'filewithcamelcase.tmp',
  'filewithaccents.tmp',
  'filewithpunctuation.tmp'
];

beforeEach(function () {
  mock.forEach(fs.ensureFileSync);
});

afterEach(function () {
  mockSlugged.forEach(function(el) {
    fs.remove(el);
  });
});

it('should rename files', function() {
  sanitize(['*.tmp'], function(err) {
    assert(!err, err);

    mock.forEach(function(file){
      assert(!pathExists.sync(file));
    });

    for (var i in mockSlugged) {
      assert(pathExists.sync(mockSlugged[i]));
    }
  });
});

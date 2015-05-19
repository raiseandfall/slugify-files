#! /usr/bin/env node

'use strict';

var meow = require('meow');
var slugify = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ slugify <source>',
    '',
    'Example',
    '  $ slugify \'*.tmp\'',
    '',
    '<source> can contain globs if quoted'
  ].join('\n')
}, {
  string: ['_']
});

function errHandler(err) {
  if (err) {
    throw err;
  }
}

try {
  slugify(cli.input[0], errHandler);
} catch (err) {
  errHandler(err);
}

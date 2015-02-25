'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util');

gulp.task('default', function() {
  gulp.watch(['index.js', 'tests.js'], ['jshint', 'mocha']);
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('index.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function() {
  return gulp.src(['tests.js'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util');

gulp.task('default', function() {

});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('index.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
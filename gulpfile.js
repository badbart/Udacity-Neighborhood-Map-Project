'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var miniCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-htmlmin');

gulp.task('usemin', function() {
  console.log('min task started');

  gulp.src('src/index.html')
    .pipe(usemin({
      css: [miniCss()],
      cssprint: [miniCss()],
      html: [minifyHtml({collapseWhitespace: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'));

  console.log('min task finished');
});

gulp.task('copy', function() {
  console.log('copy task started');
  gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img/'));

  gulp.src('src/views/*/*.*')
    .pipe(gulp.dest('dist/views/'));

  gulp.src('src/project-*.html')
    .pipe(gulp.dest('dist/'));

  console.log('copy task finished');
});

gulp.task('default', ['usemin', 'copy']);

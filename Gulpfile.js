var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var to5ify     = require('6to5ify');
var del        = require('del');
var jshint     = require('gulp-jshint');
var rename     = require('gulp-rename');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sequence   = require('run-sequence');

// Add more libs to this array to push more stuff out to the vendor bundle
var VENDOR_LIBS = [

  //3rd party
  'activities',
  'billy',
  'bluebird',
  'jquery',
  'debug',
  'httpinvoke',
  'typedef',
  'underscore',

  // local libs
  'activity-service',
  'http-transport',
  'local-storage'
];

gulp.task('clean', function() {
  del.sync(['./public/dist']);
});

gulp.task('lint', function() {
  return gulp.src(['./app/server/**/*.js', './app/server/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// vendor libraries
gulp.task('browserify-vendor', function() {
    // Single entry point to browserify
    gulp.src('./app/gulp/noop.js', { read: false })
    .pipe(browserify({
      debug : false,
      insertGlobals : true,
    }))
    .on('prebundle', function(bundle) {
      VENDOR_LIBS.forEach(function(el){
        bundle.require(el);
      });
    })
    .pipe(rename('vendor.js'))
    .pipe(gulp.dest('./public/dist/'));
});

// client code
gulp.task('browserify-client', function() {
  // Single entry point to browserify
  gulp.src('./app/client/main.js')
  .pipe(browserify({
    transform: ['6to5ify'],
    debug : true,
  }))
  .on('prebundle', function(bundle) {
    VENDOR_LIBS.forEach(function(el){
      bundle.external(el);
    });
  })
  .pipe(gulp.dest('./public/dist/'));
});


gulp.task('sass', function () {
  gulp.src('./style/site.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./public/dist/'));
  
});

/* 
 * Top-level Tasks
 */

gulp.task('client', function() {
  return sequence(
    'lint',
    'clean',
    'browserify-vendor',
    'browserify-client',
    'sass'
  );
});

gulp.task('watch', function() {
  //gulp.watch('/**/*.less', ['less']);
  gulp.watch('./app/client/**/*.js', ['browserify-client']);
  gulp.watch('./app/client/**/*.jsx', ['browserify-client']);
});

gulp.task('default', ['client']);

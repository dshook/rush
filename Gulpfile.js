var gulp        = require('gulp');
var browserify  = require('browserify');
var to5ify      = require('6to5ify');
var del         = require('del');
var jshint      = require('gulp-jshint');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sequence    = require('run-sequence');

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
  'vanilla-modal',

  // local libs
  './app/node_modules/activity-service',
  './app/node_modules/http-transport',
  './app/node_modules/local-storage'
];

//Catch build errors and emit end so watch doesn't bail
function handleError(err){
  console.log(err.toString());
  this.emit('end');
};

gulp.task('clean', function() {
  return del(['./public/dist/**/*']);
});

gulp.task('lint', function() {
  return gulp.src(['./app/server/**/*.js', './app/client/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// vendor libraries
gulp.task('browserify-vendor', function() {
  var bundleStream = browserify({
    read: false,
    debug: false,
    insertGlobals: true
  })
  .require(VENDOR_LIBS)
  .bundle();

  var bundle = function() {
    return bundleStream
      .on("error", handleError)
      .pipe(vinylSource('noop.js'))
      .pipe(rename('vendor.js'))
      .pipe(gulp.dest('./public/dist/'));
  };

  return bundle();
});

// client code
gulp.task('browserify-client', function() {
  var bundleStream = browserify({
    entries: ['./app/client/main.js'],
    debug: true,
  })
  .external(VENDOR_LIBS)
  .transform(to5ify.configure({
    experimental: true,
    playground: true
  }))
  .bundle();

  var bundle = function() {
    return bundleStream
      .on("error", handleError)
      .pipe(vinylSource('main.js'))
      .pipe(vinylBuffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./maps/'))
      .pipe(gulp.dest('./public/dist/'));
  };

  return bundle();
});

gulp.task('sass', function () {
  return gulp.src('./style/site.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./public/dist/'));
});

/* 
 * Top-level Tasks
 */

gulp.task('client', function() {
  return sequence(
    //'lint',
    'clean',
    ['browserify-vendor', 'browserify-client', 'sass']
  );
});

gulp.task('watch', function() {
  sequence('client');
  gulp.watch('./style/**/*.scss', ['sass']);
  gulp.watch('./app/client/**/*.js', ['browserify-client']);
  gulp.watch('./app/client/**/*.jsx', ['browserify-client']);
});

gulp.task('default', ['client']);

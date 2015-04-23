var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var del         = require('del');
var lint        = require('gulp-eslint');
var rename      = require('gulp-rename');
var livereload  = require('gulp-livereload');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var vinylSource = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
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
  'lodash',
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
}

gulp.task('clean', function() {
  return del(['./public/dist/**/*']);
});

gulp.task('lint', function() {
  return sequence(
    ['lint-client', 'lint-server']
  );
});

gulp.task('lint-client', function() {
  return gulp.src('./app/client/**/*.{js,jsx}')
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('lint-server', function() {
  return gulp.src('./app/server/**/*.js')
    .pipe(lint())
    .pipe(lint.format());
});

// vendor libraries
gulp.task('browserify-vendor', function() {
  var bundleStream = browserify({
    read: false,
    debug: true,
    insertGlobals: true
  })
  .require(VENDOR_LIBS)
  .bundle();

  var bundle = function() {
    return bundleStream
      .on('error', handleError)
      .pipe(vinylSource('noop.js'))
      .pipe(rename('vendor.js'))
      .pipe(gulp.dest('./public/dist/'))
      .pipe(livereload());
  };

  return bundle();
});

// client code
gulp.task('browserify-client', function() {
  var bundleStream = browserify({
    entries: ['./app/client/main.js'],
    debug: true
  })
  .external(VENDOR_LIBS)
  .transform(babelify.configure({
    stage: 0
  }))
  .bundle();

  var bundle = function() {
    return bundleStream
      .on('error', handleError)
      .pipe(vinylSource('main.js'))
      .pipe(vinylBuffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./maps/'))
      .pipe(gulp.dest('./public/dist/'))
      .pipe(livereload());
  };

  return bundle();
});

gulp.task('sass', function () {
  return gulp.src('./style/site.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('./public/dist/'))
    .pipe(livereload());
});

/*
 * Top-level Tasks
 */

gulp.task('client', function() {
  return sequence(
    'lint',
    'clean',
    ['browserify-vendor', 'browserify-client', 'sass']
  );
});

gulp.task('watch', function() {
  livereload.listen();
  sequence('client');
  gulp.watch('./style/**/*.scss', ['sass']);
  gulp.watch('./app/client/**/*.js', ['lint-client', 'browserify-client']);
  gulp.watch('./app/client/**/*.jsx', ['lint-client', 'browserify-client']);
});

gulp.task('default', ['client']);

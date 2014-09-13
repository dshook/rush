module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Add more libs to this array to push more stuff out to the vendor bundle
  var VENDOR_LIBS = [

    // 3rd party
    'activities',
    'billy',
    'bluebird',
    'debug',
    'httpinvoke',
    'jquery',
    'typedef',
    'underscore',

    // local libs
    'activity-service',
    'http-transport',
    'local-storage'
  ];

  grunt.initConfig({

    jshint: {
      client: ['./app/client/**/*.js'],
      server: ['./app/server/**/*.js'],
      lib: ['./app/lib/**/*.js'],
      gruntfile: ['./Gruntfile.js'],
      options: { jshintrc: '.jshintrc' }
    },

    clean: {
      client: { src: ['./public/dist'] }
    },

    browserify: {
      client: {
        src: ['./app/client/main.js'],
        dest: './public/dist/main.js',
        options: {
          external: VENDOR_LIBS,
          browserifyOptions: {
            debug: true
          }
        }
      },

      vendor: {
        src: [],
        dest: './public/dist/vendor.js',
        options: {
          require: VENDOR_LIBS,
          browserifyOptions: {
            basedir: './app',
            debug: true
          }
        }
      }

    },

    less: {
      client: {
        src: './style/style.less',
        dest: './public/dist/style.css',
        options: {
          paths: ['node_modules']
        }
      }
    },

    watch: {
      client: {
        files: [
          './app/client/**/*.js'
        ],
        tasks: ['browserify:client'],
        options: { livereload: true }
      }
    }

  });

  grunt.registerTask('client', [
    'jshint:client',
    'jshint:lib',
    'clean:client',
    'browserify:vendor',
    'browserify:client',
    'less:client'
  ]);

  grunt.registerTask('default', [
    'client'
  ]);
};

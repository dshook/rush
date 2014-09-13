module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

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
          browserifyOptions: { debug: true }
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
    'browserify:client',
    'less:client'
  ]);

  grunt.registerTask('default', [
    'client'
  ]);
};

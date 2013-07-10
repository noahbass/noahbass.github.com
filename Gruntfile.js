/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! noahbass.com - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> ' +
      'http://noahbass.com/ ' +
      'Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Noah Bass; Licensed MIT */',
    // Task configuration.
    sass: {
      dist: {
        files: {
          'assets/css/main.css': 'assets/scss/main.scss'
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'assets/css/main.min.css': ['assets/css/main.css']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['sass', 'cssmin']);

};

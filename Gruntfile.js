module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        files: {
          "css/main.css": "less/bootstrap.less"
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> | Last build on <%= grunt.template.today("yyyy-mm-dd") %> | Source code at <%= pkg.repository.url %> */'
      },
      minify: {
        src: ['css/main.css'],
        dest: 'main.min.css'
      }
    },
    concat: {
      build: {
        src: ['js/lib/bootstrap/*.js', 'js/lib/smoothscroll.js', 'js/lib/main.js'],
        dest: 'js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> | Last build on <%= grunt.template.today("yyyy-mm-dd") %> | Source code at <%= pkg.repository.url %> */\n'
      },
      build: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['js/lib/bootstrap/*.js', 'js/lib/*.js', 'less/*.less', 'index.html'],
      tasks: ["less", "cssmin", "concat", "uglify"]
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['concat', 'less', 'cssmin', 'uglify']);
};

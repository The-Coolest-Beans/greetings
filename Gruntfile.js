module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'serverStart.js',
        }
      },
    },
    watch: {
      express: {
        files: ['**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      public: {
        options: {
          reload: true
        },
        files: [
          "public/**/*.css",
          "public/**/*.js",
          "public/*.*",
        ]
      }
    }
  });

  grunt.registerTask('default', ['express:dev', 'watch']);
};

module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      files: [
        "Gruntfile.js",
        "test.js",
        "src/**/*.js"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["jshint"]);

};

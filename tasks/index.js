var prettyStringify = require('js-object-pretty-print').pretty;

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('requirejsconfig', 'Prepends a require.js config file.', function () {

    var options = this.options();
    var src = '';
    if (this.data.src) {
      if (grunt.file.exists(this.data.src)) {
        src = grunt.file.read(this.data.src, {encoding: 'utf8'});
      }
      else {
        grunt.log.error('No source file found at: ' + this.data.src);
      }
    }

    var content = [
      '(function(requirejs) {',
      '// Config added by grunt-requirejs-config',
      'return requirejs.config(' + prettyStringify(options, 2, 'JSON', true) + ');',
      '})(requirejs);',
      src
    ];
    grunt.file.write(this.data.dest, content.join('\n'));
    grunt.log.ok('Require.js config created at: ' + this.data.dest);
  });
};

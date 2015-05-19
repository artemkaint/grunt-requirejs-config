var fs = require('fs');
var prettyStringify = require('js-object-pretty-print').pretty;

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('requirejsconfig', 'Prepends a require.js config file.', function () {

    var options = this.options();

    if (fs.existsSync(this.data.src)) {
      var content = [
        '(function(requirejs) {',
        '// Config added by grunt-requirejs-config',
        'return requirejs.config(' + prettyStringify(options, 2, 'JSON', true) + ');',
        '})(requirejs);',
        fs.readFileSync(this.data.src, 'utf8')
      ];
      fs.appendFileSync(this.data.dest, content.join('\n'));
      grunt.log.ok('Require.js config created at: ' + this.data.dest);
    } else {
      grunt.log.error('No source file found at: ' + this.data.src);
    }
  });
};

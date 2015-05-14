var fs = require('fs');
var prettyStringify = require('js-object-pretty-print').pretty;

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('requirejsconfig', 'Prepends a require.js config file.', function () {

    var options = this.options();
    var done = this.async();

    if (fs.existsSync(this.data.src)) {
      var configContents = fs.readFileSync(this.data.src, 'utf8');
      fs.writeFileSync(this.data.dest, '// Config added by grunt-requirejs-config\n');
      var localRequireVarDefinition = '';
      if (typeof options.localRequireVar == 'string' && options.localRequireVar.length) {
        localRequireVarDefinition = 'var ' + options.localRequireVar + ' = ';
        delete options.localRequireVar;
      }
      var configString = prettyStringify(options, 2, 'JSON', true);
      fs.appendFileSync(this.data.dest, localRequireVarDefinition + 'requirejs.config(' + configString + ');\n');
      fs.appendFileSync(this.data.dest, configContents);
      grunt.log.ok('Require.js config created at: ' + this.data.dest);
      done();
    } else {
      grunt.log.error('No source file found at: ' + this.data.src);
      done();
    }
  });
};

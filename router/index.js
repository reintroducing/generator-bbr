/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  // required for router.js template which uses `appname`
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = '.js',
      directory = (typeof this.dirPath !== 'undefined') ? '/' + this.dirPath : '';

  var destFile = path.join('app/js/router' + directory + '/', this.name + ext);
  var template = [
    'define([',
    '    \'jquery\',',
    '    \'backbone\'',
    '], function ($, Backbone) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Router = Backbone.Router.extend({',
    '        routes: {',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Router;',
    '});'
  ].join('\n');

  this.write(destFile, template);

};

/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);

  // XXX default and banner to be implemented
  this.argument('attributes', {
    type: Array,
    defaults: [],
    banner: 'field[:type] field[:type]'
  });

  // parse back the attributes provided, build an array of attr
  this.attrs = this.attributes.map(function (attr) {
    var parts = attr.split(':');
    return {
      name: parts[0],
      type: parts[1] || 'string'
    };
  });

}

util.inherits(Generator, scriptBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  var ext = '.js',
      directory = (typeof this.dirPath !== 'undefined') ? '/' + this.dirPath : '';

  var destFile = path.join('app/js/models' + directory + '/', this.name + ext);
  var template = [
    'define([',
    '    \'underscore\',',
    '    \'backbone\'',
    '], function (_, Backbone) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Model = Backbone.Model.extend({',
    '        defaults: {}',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Model;',
    '});'
  ].join('\n');

  this.write(destFile, template);
};

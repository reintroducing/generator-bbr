/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

}

util.inherits(Generator, scriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = '.js';
  var templateExt = '.ejs';
  this.jst_path = 'app/js/templates/' + this.name + templateExt;
  var destFile = path.join('app/js/views', this.name + ext);

  this.template('view.ejs', this.jst_path);

  var template = [
    'define([',
    '    \'jquery\',',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'views/abstract\',',
    '    \'templates\'',
    '], function ($, _, Backbone, AbstractView, JST) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'View = AbstractView.extend({',
    '        ' + 'template: JST[\'' + this.jst_path + '\'],',
    '',
    '        events: {},',
    '',
    '        /* ----------------------------------------------------------------------------- *\\',
    '           Public Methods',
    '        \\* ----------------------------------------------------------------------------- */',
    '',
    '        /**',
    '        @method initialize',
    '',
    '        @return {null}',
    '        **/',
    '        initialize: function(opts) {',
    '            AbstractView.prototype.initialize.apply(this, arguments);',
    '        },',
    '',
    '        /**',
    '        @method render',
    '',
    '        @return {' + this._.classify(this.name) + 'View}',
    '        **/',
    '        render: function() {',
    '            this.$el.html(_.template(this.template));',
    '',
    '            return this;',
    '        }',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'View;',
    '});'
  ].join('\n');

  this.write(destFile, template);
};

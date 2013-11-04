'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    scriptBase = require('../script-base');


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  scriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(Generator, yeoman.generators.NamedBase, scriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.dirPath = (typeof this.arguments[1] !== 'undefined') ? '/' + this.arguments[1] : '';
  this.jstPath = 'app/js/templates' + this.dirPath + '/' + this.name + '.ejs';
  this.jadePath = 'app/jade' + this.dirPath + '/' + this.name + '.jade';

  this.template('js/view.jade', this.jadePath);
  this.copy('js/view.js', 'app/js/views' + this.dirPath + '/' + this.name + '.js');
};
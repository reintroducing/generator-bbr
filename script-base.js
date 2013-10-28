'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('./util.js');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (err) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  if (this.env.options.minsafe) {
    sourceRoot += '-min';
  }

  var sourceRoot = '/templates/';
  this.scriptSuffix = '.js';

  this.dirPath = arguments[0][1];

  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.addScriptToIndex = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'index.html');

    backboneUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="js/' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};
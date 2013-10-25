var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.sourceRoot(path.join(__dirname, '../templates'));

  this.dirs = 'models collections views router helpers templates'.split(' ');

  args = ['application'];

  // if (this.options['template-framework']) {
  //   this.env.options['template-framework'] = this.options['template-framework'];
  // }

  if (this.options['test-framework']) {
    this.env.options['test-framework'] = this.options['test-framework'];
  }

  // the api to hookFor and pass arguments may vary a bit.
  this.hookFor('bbr:app', {
    args: args
  });
  this.hookFor('bbr:router', {
    args: args
  });
  this.hookFor('bbr:view', {
    args: args
  });
  this.hookFor('bbr:model', {
    args: args
  });
  this.hookFor('bbr:collection', {
    args: args
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });
}

util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.createDirLayout = function createDirLayout() {
  this.dirs.forEach(function (dir) {
    this.log.create('app/js/' + dir);
    this.mkdir(path.join('app/js', dir));
  }.bind(this));
};

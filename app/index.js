var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = 'lodash';
  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.sourceRoot(path.join(__dirname, '../templates'));
  this.on('end', function () {
    if (['app', 'bbr'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include jQuery, Backbone.js, RequireJS, GSAP and Modernizr.');

  var prompts = [];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.copy('common/gitignore', '.gitignore');
  this.copy('common/gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.copy('common/bowerrc', '.bowerrc');
  this.copy('common/_bower.json', 'bower.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('common/Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('common/_package.json', 'package.json');
};

Generator.prototype.configRB = function packageJSON() {
  this.template('common/config.rb', 'config.rb');
};

Generator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs() {
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'common/index.html'));
  this.indexFile = this.engine(this.indexFile, this);
  this.indexFile = this.append(this.indexFile, 'body', '\n        <script data-main="js/main" src="js/libs/bower/requirejs/require.js"></script>\n    ');
};

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir('app');
  this.mkdir('app/js');
  this.mkdir('app/js/libs/');
  this.mkdir('app/js/libs/bower');
  this.mkdir('app/js/libs/vendor');
  this.mkdir('app/css');
  this.mkdir('app/sass');
  this.mkdir('app/images');
  this.mkdir('app/jade');
  this.mkdir('app/jade/mixins');
  this.template('common/app/404.html', 'app/404.html');
  this.template('common/app/favicon.ico', 'app/favicon.ico');
  this.template('common/app/robots.txt', 'app/robots.txt');
  this.copy('common/app/htaccess', 'app/.htaccess');
  this.write('app/index.html', this.indexFile);
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  this.directory('sass/mixins', 'app/sass/mixins');
  this.template('sass/_normalize.scss', 'app/sass/_normalize.scss');
  this.template('sass/_base.scss', 'app/sass/_base.scss');
  this.template('sass/main.scss', 'app/sass/main.scss');
};

Generator.prototype.mainJs = function mainJs() {
  this.template('js/main.js', 'app/js/main.js');
  this.template('js/app.js', 'app/js/app.js');
  this.template('js/router-default.js', 'app/js/router/router.js');
  this.template('js/abstract.js', 'app/js/views/abstract.js');
};
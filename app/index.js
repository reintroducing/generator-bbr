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
  this.templateFramework = this.options['template-framework'] || 'lodash';
  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

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
  console.log('Out of the box I include jQuery, Backbone.js, RequireJS and Modernizr.');

  var prompts = [];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    this.includeRequireJS = true;

    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  var contentText = [
    'body {\n    background: #fafafa;\n}',
    '\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}'
  ];
  var ext = '.css';
  this.template('main.scss', 'app/sass/main.scss');
  this.write('app/css/main' + ext, contentText.join('\n'));
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js'
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'js/vendor.js', vendorJS);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    searchPath: ['.tmp', 'app'],
    optimizedPath: 'js/main.js',
    sourceFileList: [
      'js/main.js',
      'js/templates.js'
    ]
  });
};

Generator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs() {
  if (!this.includeRequireJS) {
    return;
  }
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', [
    'bower_components/requirejs/require.js'
  ], {'data-main': 'js/main'});
};

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir('app');
  this.mkdir('app/js');
  this.mkdir('app/js/vendor/');
  this.mkdir('app/css');
  this.mkdir('app/sass');
  this.mkdir('app/images');
  this.template('app/404.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');
  this.write('app/index.html', this.indexFile);
};

Generator.prototype.mainJs = function mainJs() {
  this.sourceRoot(path.join(__dirname, '../templates'));

  var mainJsFile = this.engine(this.read('requirejs_app.js'), this),
      abstractView = this.engine(this.read('abstract.js'), this);

  this.write('app/js/main.js', mainJsFile);
  this.write('app/js/views/abstract.js', abstractView);
};
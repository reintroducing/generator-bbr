'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: '<%= templateFramework %>'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            scss: {
                files: ['<%%= yeoman.app %>/sass/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '{.tmp,<%%= yeoman.app %>}/css/{,*/}*.css',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    'test/spec/{,*/}*.js'
                ]
            },
            markup: {
                files: ['<%%= yeoman.app %>/*.html'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['Gruntfile.js', '<%%= yeoman.app %>/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: ['<%%= yeoman.app %>/jade/**/*.jade'],
                tasks: ['jade', 'jst'],
                options: {
                    livereload: true
                }
            }
            // test: {
            //     files: ['<%%= yeoman.app %>/js/{,*/}*.js', 'test/spec/**/*.js'],
            //     tasks: ['test']
            // }
        },
        connect: {
            options: {
                port: SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                forin: true,
                noarg: true,
                noempty: true,
                eqeqeq: true,
                bitwise: true,
                strict: true,
                undef: true,
                curly: true,
                expr: true,
                browser: true,
                devel: true,
                maxerr: 50,
                node: true,
                globals: {
                    jQuery: true,
                    $: true,
                    define: true,
                    require: true
                }
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/js/{,*/}*.js',
                '!<%%= yeoman.app %>/js/libs/*',
                'test/spec/{,*/}*.js'
            ]
        }<% if (testFramework === 'mocha') { %>,
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.test.options.port %>/index.html']
                }
            }
        }<% } else { %>,
        jasmine: {
            all:{
                src : ,'<%= yeoman.app %>/js/{,*/}*.js',
                options: {
                    keepRunner: true,
                    specs : 'test/spec/**/*.js',
                    vendor : [
                        '<%%= yeoman.app %>/js/libs/bower/jquery/jquery.js',
                        '<%%= yeoman.app %>/js/libs/bower/underscore/underscore.js',
                        '<%%= yeoman.app %>/js/libs/bower/backbone/backbone.js',
                        '.tmp/js/templates.js'
                    ]
                }
            }
        }<% } %>,
        compass: {
            options: {
                config: 'config.rb'
            },
            dist: {
                options: {
                    environment: 'production',
                    force: true
                }
            },
            server: {
                options: {
                    environment: 'development',
                    debugInfo: true
                }
            }
        },
        jade: {
            dist: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/jade',
                    src: ['**/*.jade'],
                    dest: '<%%= yeoman.app %>/js/templates',
                    ext: '.ejs'
                }]
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%%= yeoman.app %>/js',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/js/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/**/*.html'],
            css: ['<%%= yeoman.dist %>/css/**/*.css'],
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            }
        },
        imageoptim: {
            src: ['<%%= yeoman.dist %>/images'],
            options: {
                jpegMini: true,
                imageAlpha: true,
                quitAfter: true
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/css/main.css': [
                        // '.tmp/css/**/*.css'
                        '<%%= yeoman.app %>/css/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'css/fonts/{,*/}*.*',
                        'images/**/*.{png,jpg,jpeg,gif,webp}',
                        '!images/sprite/**'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%%= yeoman.app %>/js/main.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                options: {
                    templateSettings: {
                        variable: 'data'
                    }
                },
                files: {
                    '.tmp/js/templates.js': ['<%%= yeoman.app %>/js/templates/**/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/js/{,*/}*.js',
                        '<%%= yeoman.dist %>/css/{,*/}*.css'
                        // '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        // '<%= yeoman.dist %>/css/fonts/{,*/}*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/js/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'jade',
                'createDefaultTemplate',
                'jst',
                'compass:server',
                'connect:test',
                'watch:livereload'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'jade',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'jade',
        'createDefaultTemplate',
        'jst',
        'compass',<% if(testFramework === 'mocha') { %>
        'connect:test',
        'mocha',<% } else { %>
        'jasmine',<% } %>
        'watch:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jade',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'imageoptim',
        // 'rev',
        'usemin'
    ]);

    grunt.registerTask('default', ['server']);
};

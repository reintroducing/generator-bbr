'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        tweenmax: {
            exports: 'TweenMax'
        }
    },
    paths: {
        jquery: '../js/libs/bower/jquery/jquery',
        backbone: '../js/libs/bower/backbone/backbone',
        underscore: '../js/libs/bower/underscore/underscore',
        tweenmax: '../js/libs/bower/tweenMax/src/minified/TweenMax.min'
    }
});

require([
    'app'
], function (App) {
    window.App = App;

    jQuery(function() {
        App.initialize();
    });
});
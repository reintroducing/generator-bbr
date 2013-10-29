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
        jquery: '../js/libs/jquery/jquery',
        backbone: '../js/libs/backbone/backbone',
        underscore: '../js/libs/underscore/underscore',
        tweenmax: '../js/libs/tweenMax/src/minified/TweenMax.min'
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
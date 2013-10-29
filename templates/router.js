define([
    'jquery',
    'backbone'
], function($, Backbone) {
    'use strict';

    var newView = null,
        currentView = null,

    Router = Backbone.Router.extend({
        routes: {}
    }),

    initialize = function() {
        var router = new Router();

        Backbone.history.start();
    },

    showView = function(view) {
        newView = view;

        (currentView) ? currentView.hide(showNext) : showNext();
    },

    showNext = function() {
        if (currentView) { currentView.clean(); }
        currentView = newView;
        currentView.render();
    };

    return {
        initialize: initialize
    };
});
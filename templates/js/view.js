define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates'
], function($, _, Backbone, AbstractView, JST) {
    'use strict';

    var <%= _.classify(name) %>View = AbstractView.extend({
        className: '<%= name %>',
        template: JST['<%= jstPath %>'],

        events: {},

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            AbstractView.prototype.initialize.apply(this, arguments);
        },

        /**
        @method render

        @return {<%= _.classify(name) %>View}
        **/
        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return <%= _.classify(name) %>View;
});
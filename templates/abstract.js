define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var AbstractView = function (options) {
        Backbone.View.apply(this, [options]);
    };

    _.extend(AbstractView.prototype, Backbone.View.prototype, {
        /**
        Executed immediately when creating a new instance. Hides the containing element so that we can use the transitioning methods to show it.

        @method initialize

        @return {null}
        **/
        initialize: function() {

        },

        show: function() {
            this.$el.fadeIn(0);
        },

        hide: function(cb, scope, params) {
            this.$el.fadeOut(0, function() {
                if (typeof cb === 'function') {
                    if (typeof params === 'undefined') { params = []; }
                    cb.apply(scope, params);
                }
            });
        },

        /**
        Cleans up the view.  Unbinds its events and removes it from the DOM.

        @method clean

        @return {null}
        **/
        clean: function() {
            this.undelegateEvents();
            this.remove();
        }
    });

    AbstractView.extend = Backbone.View.extend;

    return AbstractView;
});
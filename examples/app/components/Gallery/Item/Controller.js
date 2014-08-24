define(function(require) {
    'use strict';

    var $ = require('jquery');

    function ItemController($rootEl, eventBus) {
        this.$rootEl = $rootEl;
        this.eventBus = eventBus;

        this.setupModels();
        this.bindEvents();
    }

    ItemController.prototype = {
        constructor: ItemController,

        currentIndex: 0,

        setupModels: function() {
            this.$items = this.$rootEl.find('[data-item]');
        },

        bindEvents: function() {
            this.eventBus.on(
                'gallery:goto',
                function(eventName, index) {
                    this._goTo(index);
                }.bind(this)
            );
        },

        _goTo: function(index) {
            this.$items.each(function(i, el) {
                $(el).hide();
            });

            this.$items.eq(index).show();
        }
    };

    return ItemController;
});

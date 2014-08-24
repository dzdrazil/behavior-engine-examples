define(function(require) {
    'use strict';

    var $ = require('jquery');

    function ListController($rootEl, eventBus) {
        this.$rootEl = $rootEl;
        this.eventBus = eventBus;

        this.setupModels();
        this.bindEvents();
    }

    ListController.prototype = {
        constructor: ListController,

        $listItems: null,

        setupModels: function() {
            this.$listItems = this.$rootEl.find('li');
        },

        bindEvents: function() {
            var self = this;

            this.$listItems.on('click', function(e) {
                e.preventDefault();

                self.eventBus.trigger('gallery:goto', $(this).index());
            });

            this.eventBus.on('gallery:goto', function(eventName, index) {
                self._goTo(index);
            });
        },

        _goTo: function(index) {
            this.$listItems.each(function(i, el) {
                $(el).css('background-color', '#ffffff');
            });

            this.$listItems.eq(index).css('background-color', '#def');
        }
    };

    return ListController;
});

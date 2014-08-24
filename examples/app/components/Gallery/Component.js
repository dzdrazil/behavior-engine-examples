define(function(require) {
    'use strict';

    var EventBus = require('EventBus');

    var ItemController = require('./Item/Controller');
    var ListController = require('./List/Controller');

    function GalleryComponent($rootEl, globalEventBus) {
        this.$rootEl = $rootEl;
        this.globalEventBus = globalEventBus;

        this.localEventBus = new EventBus();

        this.itemController = new ItemController(
            $rootEl.find('[data-gallery-item]'),
            this.localEventBus
        );

        this.listController = new ListController(
            $rootEl.find('[data-gallery-list]'),
            this.localEventBus
        );

        this.localEventBus.trigger('gallery:goto', 0);
    }

    GalleryComponent.prototype = {
        constructor: GalleryComponent,

        listController: null,

        itemController: null,
    };

    return GalleryComponent;
});

require(
    [
        './App',
        './AppEvents',
        'jquery',
        'EventBus'
    ],
    function(
        App,
        APP_EVENTS,
        $,
        EventBus
    ) {
        'use strict';

        var eventBus = new EventBus();
        var $rootEl = $(document);

        $.when(App.init($rootEl, eventBus))
            .then(function() {
                eventBus.trigger(APP_EVENTS.READY);
            });
    }
);

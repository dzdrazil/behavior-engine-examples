require(
    [
        'bcengine',
        './app/AppEvents',
        'jquery',
        'EventBus'
    ],
    function(
        bcengine,
        APP_EVENTS,
        $,
        EventBus
    ) {
        'use strict';

        var eventBus = new EventBus();
        var $rootEl = $(document);
        var BCEngine = bcengine.BCEngine;

        var appEngine = new BCEngine();

        $.when(appEngine.init($rootEl, eventBus))
            .then(function() {
                eventBus.trigger(APP_EVENTS.READY);
            });
    }
);

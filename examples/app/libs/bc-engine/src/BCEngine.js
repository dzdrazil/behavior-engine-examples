define(function(require) {
    'use strict';

    var Engine = require('./Engine');
    var EventBus = require('EventBus');

    var ComponentParser = require('./parsers/ComponentParser');
    var ComponentLoader = require('./loaders/Loader');

    var BehaviorParser = require('./parsers/BehaviorParser');
    var BehaviorLoader = require('./loaders/BehaviorLoader');

    function BCEngine() {

    }

    BCEngine.prototype = new Engine();

    BCEngine.prototype.constructor = BCEngine;

    BCEngine.prototype.init = function($rootEl) {
        this.addParserLoaderPair(
            new BehaviorParser(),
            new BehaviorLoader()
        );

        this.addParserLoaderPair(
            new ComponentParser(),
            new ComponentLoader()
        );

        Engine.prototype.init.call(
            this,
            $rootEl,
            new EventBus()
        );
    };

    return BCEngine;
});

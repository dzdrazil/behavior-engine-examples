define(function(require) {
    'use strict';

    var ComponentParser = require('../app/libs/behavior-engine/parsers/ComponentParser');
    var ComponentLoader = require('../app/libs/behavior-engine/loaders/Loader');

    var BehaviorParser = require('../app/libs/behavior-engine/parsers/BehaviorParser');
    var BehaviorLoader = require('../app/libs/behavior-engine/loaders/BehaviorLoader');

    var Engine = require('../app/libs/behavior-engine/Engine');

    return {
        init: function($rootEl, eventBus) {
            var engine = new Engine();

            engine.addParserLoaderPair(
                new BehaviorParser(),
                new BehaviorLoader()
            );

            engine.addParserLoaderPair(
                new ComponentParser(),
                new ComponentLoader()
            );

            return engine.init($rootEl, eventBus);
        }
    };
});

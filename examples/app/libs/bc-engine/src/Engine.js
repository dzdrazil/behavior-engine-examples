define(function(require) {
    'use strict';

    var _ = require('lodash');

    function Engine() {
        this.parseLoadPairs = [];
    }

    Engine.prototype = {
        constructor: Engine,

        eventBus: null,

        parseLoadPairs: null,

        addParserLoaderPair: function(parser, loader) {
            this.parseLoadPairs.push([
                parser,
                loader
            ]);
        },

        init: function($rootEl, eventBus) {
            this.eventBus = eventBus;

            return this.load(
                this.parse($rootEl)
            );
        },

        parse: function($rootEl) {
            return _.map(this.parseLoadPairs, function(arrParseLoad) {
                return arrParseLoad[0].parse($rootEl);
            });
        },

        load: function(componentMaps) {
            return _.map(this.parseLoadPairs, function(arrParseLoad, index) {
                arrParseLoad[1].load(componentMaps[index], this.eventBus);
            }, this);
        }
    };

    return Engine;
});

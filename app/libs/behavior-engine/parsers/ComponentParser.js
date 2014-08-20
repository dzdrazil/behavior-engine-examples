define(function(require) {
    'use strict';

    var Parser = require('./Parser');

    function ComponentParser() {

    }

    ComponentParser.prototype = new Parser();

    ComponentParser.prototype.constructor = ComponentParser;

    ComponentParser.prototype.attribute = 'data-component';

    return ComponentParser;
});

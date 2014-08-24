define(function(require) {
    'use strict';

    var $ = require('jquery');
    var Parser = require('./Parser');
    var ElementMap = require('./ElementMap');

    function BehaviorParser() {

    }

    BehaviorParser.prototype = new Parser();

    BehaviorParser.prototype.constructor = BehaviorParser;

    BehaviorParser.prototype.attribute = 'data-behavior';

    BehaviorParser.prototype._generateElementMap = function($elementSet) {
        var elementMap = new ElementMap();
        var attribute = this.attribute;

        $elementSet.each(function(index, element) {
            var $element = $(element);
            var componentNames = $element.attr(attribute).split('|');
            var i;
            var len = componentNames.length;
            var componentName;

            for (i = 0; i < len; i++) {
                componentName = componentNames[i];
                elementMap.add(componentName, $element);
            }
        });

        return elementMap;
    };

    return BehaviorParser;
});

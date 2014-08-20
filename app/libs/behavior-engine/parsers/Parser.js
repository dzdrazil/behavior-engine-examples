define(function(require) {
    'use strict';

    var $ = require('jquery');
    var ElementMap = require('./ElementMap');

    function Parser() {

    }

    Parser.prototype = {
        attribute: 'data-x',
        parse: function($rootNode) {
            return this._generateElementMap(
                $rootNode.find('[' + this.attribute + ']')
            );
        },

        _generateElementMap: function($elementSet) {
            var elementMap = new ElementMap();
            var attribute = this.attribute;

            $elementSet.each(function(index, element) {
                var $element = $(element);
                var componentName = $element.attr(attribute);

                elementMap.add(componentName, $element);
            });

            return elementMap;
        }
    };

    return Parser;
});

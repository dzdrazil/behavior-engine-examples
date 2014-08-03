define(function(require) {
    'use strict';

    var $ = require('jquery');

    return {
        parse: function($domElement) {
            var $behaviorElements = $domElement.find('data-behavior');

            var $componentElements = $domElement.find('data-component');

            var behaviorMap = {};
            var componentMap = {};

            var moduleNames;
            var moduleName;
            var $element;
            $behaviorElements.each(function(index, element) {
                var i;
                var len;
                $element = $(element);
                moduleNames = $element.attr('data-behavior').split('|');

                for (i = 0, len = moduleNames.length; i < len; i++) {
                    moduleName = moduleNames[i];
                    if (!behaviorMap[moduleName]) {
                        behaviorMap[moduleName] = [];
                    }

                    (behaviorMap[moduleName]).push($element);
                }
            });

            $componentElements.each(function(index, element) {
                $element = $(element);
                moduleName = $element.attr('data-component');

                if (!componentMap[moduleName]) {
                    componentMap[moduleName] = [];
                }

                (componentMap[moduleName]).push($element);
            });

            return {
                behaviorMap: behaviorMap,
                componentMap: componentMap
            };
        }
    };
});

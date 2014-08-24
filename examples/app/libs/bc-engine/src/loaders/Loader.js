define(function(require, exports, module) {
    'use strict';

    var _ = require('lodash');
    var $ = require('jquery');

    function Loader() {

    }

    Loader.prototype = {
        constructor: Loader,

        componentUri: 'components/',

        load: function(elementMap, eventBus) {
            var deferred = $.Deferred();
            var resolvedComponents = 0;
            var totalComponents = elementMap.length;
            var componentPrefix = module.config().uri || this.componentUri;
            var initializedComponents = [];

            elementMap.each(function(componentName, $domElements) {
                require([componentPrefix + componentName], function(ComponentModule) {
                    resolvedComponents++;

                    _.each($domElements, function($domElement) {
                        initializedComponents.push(
                            new ComponentModule($domElement, eventBus)
                        );
                    });

                    if (resolvedComponents === totalComponents) {
                        deferred.resolve(initializedComponents);
                    }
                });
            });

            return deferred.promise;
        }
    };

    return Loader;
});

define(function(require, exports, module) {
    'use strict';

    var _ = require('lodash');
    var $ = require('jquery');
    var Loader = require('./Loader');

    function BehaviorLoader() {

    }

    BehaviorLoader.prototype = new Loader();

    BehaviorLoader.prototype.constructor = BehaviorLoader;

    BehaviorLoader.prototype.componentUri = 'behaviors/';

    BehaviorLoader.prototype.load = function(elementMap /*, eventBus */) {
        var deferred = $.Deferred();
        var resolvedComponents = 0;
        var totalComponents = elementMap.length;
        var componentPrefix = module.config().uri || this.componentUri;
        var components = [];

        deferred.then(this.initializeBehaviors);

        elementMap.each(function(componentName, $domElements) {
            require([componentPrefix + componentName], function(behaviorModule) {
                resolvedComponents++;

                _.each($domElements, function($domElement) {
                    components.push({
                        module: behaviorModule,
                        $el: $domElement
                    });
                });

                if (resolvedComponents === totalComponents) {
                    deferred.resolve(components);
                }
            });
        });

        return deferred.promise;
    };

    BehaviorLoader.prototype.initializeBehaviors = function(loadedBehaviorSets) {
        var sortedBehaviorSets = _.sortBy(loadedBehaviorSets, function(behaviorSet) {
            if (typeof behaviorSet.module.priority !== 'number') {
                return 1;
            }

            return -behaviorSet.module.priority;
        });

        _.each(sortedBehaviorSets, function(behaviorSet) {
            behaviorSet.module.attach(
                behaviorSet.$el
            );
        });

        return sortedBehaviorSets;
    };

    return BehaviorLoader;
});

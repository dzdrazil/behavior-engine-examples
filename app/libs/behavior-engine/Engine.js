define(function(require) {
    'use strict';

    var Parser = require('./Parser');
    var EventBus = require('EventBus');

    var $ = require('jquery');
    var _ = require('lodash');

    var components = [];

    function generateBehaviors(behaviorMap) {
        var deferred = $.Deferred();
        var behaviorCount = _.size(behaviorMap);
        var behaviorSets = [];

        // callback for when all modules have loaded.  Sort behaviors by priority.  If a behavior's
        // priority is undefined or otherwise not a number, it defaults to -1.  Behaviors are attached
        // to DOM elements in order of priority, highest first
        function initBehaviors() {
            behaviorSets = _.sortBy(behaviorSets, function(behaviorSet) {
                if (typeof behaviorSet.priority !== 'number') {
                    return 1;
                }

                return -behaviorSet.priority;
            });

            _.each(behaviorSets, function(behaviorSet) {
                _.each(behaviorSet.elements, function(element) {
                    behaviorSet.behavior.attach($(element));
                });
            });
        }

        // iterate over each of the names of the behaviors found in the DOM
        _.each(behaviorMap, function(domElements, behaviorName) {

            // dynamically require them from the server
            require(['behaviors/' + behaviorName], function(BehaviorModule) {
                behaviorCount--;
                behaviorSets.push({
                    behavior: BehaviorModule,
                    priority: BehaviorModule.priority || 0,
                    elements: domElements
                });

                if (behaviorCount === 0) {
                    initBehaviors();
                    deferred.resolve();
                }
            });
        });

        return deferred;
    }

    function generateComponents(componentMap, eventBus, behaviorsDeferred) {
        var deferred = $.Deferred();

        var componentCount = _.size(componentMap);
        // iterate over each of the names of the controllers found in the DOM
        _.each(componentMap, function(domElements, componentName) {
            // dynamically require them from the server
            require(['components/' + componentName], function(ComponentModule) {

                componentCount--;
                if (componentCount === 0) {
                    behaviorsDeferred.then(function() {
                        // iterate over each of the DOM elements that need to be associated with the controller
                        _.each(domElements, function(domElement) {
                            // create a new instance of the controller, giving it the dom element, and push that
                            // into the Application class's controllers array
                            components.push(
                                new ComponentModule(
                                    $(domElement),
                                    eventBus
                                )
                            );
                        });
                    });

                    deferred.resolve();
                }
            });
        });

        return deferred;
    }

    return {
        init: function($rootElement) {
            var moduleMap = Parser.parse($rootElement);

            var eventBus = new EventBus();

            generateComponents(
                moduleMap.componentMap,
                eventBus,
                generateBehaviors(moduleMap.behaviorMap)
            );

            return {
                components: components,
                eventBus: eventBus
            };
        }
    };
});

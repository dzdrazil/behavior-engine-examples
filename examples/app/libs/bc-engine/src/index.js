define(
    'bcengine',
    [
        './Engine',
        './BCEngine',
        './parsers/ElementMap',
        './parsers/Parser',
        './parsers/BehaviorParser',
        './parsers/ComponentParser',
        './loaders/Loader',
        './loaders/BehaviorLoader'
    ],
    function(
        Engine,
        BCEngine,
        ElementMap,
        Parser,
        BehaviorParser,
        ComponentParser,
        Loader,
        BehaviorLoader
    ) {
        'use strict';

        return {
            // core
            Engine: Engine,
            BCEngine: BCEngine,
            ElementMap: ElementMap,

            // parsers
            Parser: Parser,
            BehaviorParser: BehaviorParser,
            ComponentParser: ComponentParser,

            // loaders
            Loader: Loader,
            BehaviorLoader: BehaviorLoader
        };
    }
);

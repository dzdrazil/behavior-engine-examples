var rjs = require('requirejs');

// core
rjs.optimize(
    {
        name: 'bcengine',
        baseUrl: 'src/',
        out: 'dist/bcengine.min.js',
        paths: {
            bcengine: 'index',
            jquery: 'empty:',
            lodash: 'empty:',
            EventBus: 'empty:'
        }
    },
    function(result) {
        console.log(result);
    }
);


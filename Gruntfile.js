module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt-tasks'), //path to task.js files, defaults to grunt dir
        init: true, //auto grunt.initConfig
        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });
};

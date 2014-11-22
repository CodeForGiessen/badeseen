'use strict';


module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '..',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha', 'chai', 'chai-as-promised'],

        // list of files / patterns to load in the browser
        files: [
            'public/js/vendor/angular.min.js',
            'public/js/vendor/**.js',
            'public/js/**.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/*/**.js'
        ],

        preprocessors: {
            'assets/js/*.js': ['coverage']
        },

        // list of files / patterns to exclude
        exclude: [],

        reporters: ['story', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        plugins: [
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai-plugins',
            'karma-coverage',
            'karma-story-reporter',
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};

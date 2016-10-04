// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-google-places-autocomplete/src/autocomplete.js',
      'client/bower_components/angular-google-places-autocomplete/dist/autocomplete.min.js',
      'client/bower_components/toastr/toastr.js',
      'client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'client/bower_components/angular-ui-select/dist/select.js',
      'client/bower_components/auth0-lock/build/auth0-lock.js',
      'client/bower_components/auth0.js/build/auth0.js',
      'client/bower_components/auth0-angular/build/auth0-angular.js',
      'client/bower_components/a0-angular-storage/dist/angular-storage.js',
      'client/bower_components/ng-tags-input/ng-tags-input.js',
      'client/bower_components/angular-jwt/dist/angular-jwt.js',
      'client/bower_components/select2/select2.js',
      'client/bower_components/angular-select2/dist/angular-select2.js',
      'client/bower_components/moment/moment.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/angular-ui-grid/ui-grid.js',
      'client/bower_components/angular-material-icons/angular-material-icons.min.js',
      'client/bower_components/angularUtils-pagination/dirPagination.js',
      'client/bower_components/mdPickers/dist/mdPickers.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'client/bower_components/angular-material/angular-material-mocks.js',
      '.tmp/app/app.js',
      '.tmp/{app,components}/**/*.module.js',
      '.tmp/{app,components}/**/*.js',
      '.tmp/test/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,
    captureTimeout: 60000,
    browserDisconnectTimeout : 10000,
    browserDisconnectTolerance : 1,
    browserNoActivityTimeout : 60000,
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
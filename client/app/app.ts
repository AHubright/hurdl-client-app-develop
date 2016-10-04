'use strict';

angular.module('falconApp', [
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.select',
  'ngMaterial',
  'mdPickers',
  'ngTagsInput',
  'rt.select2',
  'google.places',
  'falconApp.constantService',
  'falconApp.logger',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.autoResize',
  'angularUtils.directives.dirPagination'
]).config(function($provide, authProvider, $urlRouterProvider,
                   $stateProvider, $httpProvider,
                   jwtInterceptorProvider, $locationProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  authProvider.init({
    domain: 'testlimeball.auth0.com',
    clientID: '5zInsW7kAWGxyTThF6Hf7huCzzs0IAL5',
    callbackUrl: location.href,
    loginState: 'login'
  });

  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '900'
    }).backgroundPalette('grey', {
        'default': '200'
    });
}).run(function(auth, store, jwtHelper, $state, $rootScope) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $state.go('login');
        }
      }
    }
  });
});

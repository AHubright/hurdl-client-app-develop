'use strict';

angular.module('falconApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventseriesindex', {
        url: '/',
        template: '<eventseriesindex></eventseriesindex>',
        data: {
          requiresLogin: true
        }
      });
  });

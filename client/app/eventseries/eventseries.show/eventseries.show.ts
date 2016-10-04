'use strict';
angular.module('falconApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventSeriesShow', {
        url: '/eventseries/details/:id',
        parent: 'eventseriesindex',
        data: {
          requiresLogin: true
        },
        onEnter: ['$stateParams', '$state', '$mdDialog', '$resource', function($stateParams, $state, $mdDialog, $resource, ev) {
          $mdDialog.show({
            template: '<event-series-show></event-series-show>',
            targetEvent: ev,
          }).finally(function() {
            $state.go('eventseriesindex', null, { reload: false });
          });
        }]
      });
  });

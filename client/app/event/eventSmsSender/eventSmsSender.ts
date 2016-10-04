'use strict';

angular.module('falconApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventSmsSender', {
        url: '/event/sms/',
        template: '<event-sms-sender></event-sms-sender>'
      });
  });

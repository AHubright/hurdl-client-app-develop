'use strict';

describe('Service: eventSeriesService', function () {

  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.logger'));

  // instantiate service
  var eventSeriesService;
  beforeEach(inject(function (_eventSeriesService_) {
    eventSeriesService = _eventSeriesService_;
  }));

  it('Should be defined', function() {
    chai.expect(eventSeriesService).to.be.not.undefined;
  });

});

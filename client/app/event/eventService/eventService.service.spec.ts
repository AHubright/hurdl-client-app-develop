'use strict';

describe('Service: eventService', function () {

  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.logger'));

  // instantiate service
  var eventService;
  beforeEach(inject(function (_eventService_) {
    eventService = _eventService_;
  }));

  it('Should be defined', function() {
    chai.expect(eventService).to.be.not.undefined;
  });

});

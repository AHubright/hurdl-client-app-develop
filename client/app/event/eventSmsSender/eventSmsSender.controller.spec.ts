/// <reference path="../eventSmsSender/eventSmsSender.controller.ts"/>
'use strict';

describe('Component: EventSmsSender', function() {
  var eventSmsSenderController: IEventSmsSender;
  var eventService: IEventService;
  var scope: IEventSmsSenderScope;
  var stubEventService: any;
  var smsSentPromise: angular.IPromise<boolean>;
  var smsSentFailedPromise: angular.IPromise<any>;
  var $rootScope: angular.IRootScopeService;
  var spyLogServiceSuccess: any;
  var spyLogServiceError: any;
  var logger: ILogger;

  var event: any = {
      id: "somespecialGUID",
      placeDescription: "test",
      utcTime: "test",
      city: "test",
      country: "test",
      raspberrySerialNumber: 'serial',
      deviceStatusUpdate: 'date'
  };

  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.logger'));
  beforeEach(angular.mock.module('stateMock'));


  beforeEach(inject(function($componentController: angular.IControllerService,
                             _$rootScope_: angular.IRootScopeService,
                             _$q_: angular.IQService, _logger_: ILogger, _eventService_: IEventService) {
    $rootScope = _$rootScope_;
    scope = <IEventSmsSenderScope>$rootScope.$new();
    eventSmsSenderController = $componentController('eventSmsSender', {
      $scope: scope
    });
    smsSentPromise = getSmsSentPromise(_$q_);
    smsSentFailedPromise = getSmsFailedPromise(_$q_);
    eventService = _eventService_;
    logger = _logger_;
  }));

  beforeEach(function() {
    stubEventService = sinon.stub(eventService, 'SendSms');
    spyLogServiceSuccess = sinon.spy(logger, 'success');
    spyLogServiceError = sinon.spy(logger, 'error');
  });

  afterEach(function() {
    stubEventService.restore();
    spyLogServiceSuccess.restore();
    spyLogServiceError.restore();
  });

  it('Should be defined', function() {
    chai.expect(eventSmsSenderController).to.be.not.undefined;
  });

  describe('When user send a sms to an event', function() {
    it('Should call the create service event', function() {
      stubEventService.returns(smsSentPromise);
      var request: IEventSmsRequest = {
        message: 'test'
      };
      eventSmsSenderController.CleanUp = sinon.spy();
      eventSmsSenderController.event = event;
      eventSmsSenderController.message = 'test';
      eventSmsSenderController.SendSms();
      $rootScope.$apply();
      chai.expect(stubEventService).to.have.been.calledWith(event.id, request);
    });
    it('Should call the logger success in case a good request', function() {
      stubEventService.returns(smsSentPromise);
      eventSmsSenderController.CleanUp = sinon.spy();
      eventSmsSenderController.message = 'test';
      eventSmsSenderController.event = event;
      eventSmsSenderController.SendSms();
      $rootScope.$apply();
      chai.expect(spyLogServiceSuccess).to.have.been.calledWith('Success', 'Message sent!');
    });

    it('Should call the logger error in case a bad request', function() {
      stubEventService.returns(smsSentFailedPromise);
      eventSmsSenderController.CleanUp = sinon.spy();
      eventSmsSenderController.event = event;
      eventSmsSenderController.message = 'test';
      eventSmsSenderController.SendSms();
      $rootScope.$apply();
      chai.expect(spyLogServiceError).to.have.been.calledWith('Error', 'We have a problem sending your message, please try again.');
    });

  });

  function getSmsSentPromise($q: angular.IQService): angular.IPromise<boolean> {
    var deferred = $q.defer<boolean>();
    deferred.resolve(true);
    return deferred.promise;
  }

  function getSmsFailedPromise($q: angular.IQService): angular.IPromise<any> {
    var deferred = $q.defer();
    deferred.reject('error');
    return deferred.promise;
  }
});

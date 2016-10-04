/// <reference path="../eventseries.show/eventseries.show.controller.ts"/>
/// <reference path="../eventseriesService/eventseriesService.service.ts"/>

'use strict';

describe('Component: EventseriesShowComponent', function() {
  var seriesController: IEventSeriesShowController;
  var eventSeriesService: IEventSeriesService;
  var scope: IEventSeriesShowEventScope;
  var stubSeriesService: any;
  var eventsPromise: angular.IPromise<IEventResponse[]>;
  var $rootScope: angular.IRootScopeService;
  var logger: ILogger;
  var events: any[] = [
    {
      id: "somespecialGUID",
      placeDescription: "test",
      utcTime: "test",
      city: "test",
      country: "test",
      raspberrySerialNumber: 'serial',
      deviceStatusUpdate: 'date'
    }
  ];

  beforeEach(angular.mock.module('ngMaterial'));
  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.logger'));
  beforeEach(angular.mock.module('stateMock'));

  beforeEach(inject(function($componentController: angular.IControllerService,
                             _$rootScope_: angular.IRootScopeService,
                             _$q_: angular.IQService, _logger_: ILogger, _eventSeriesService_: IEventSeriesService) {
    $rootScope = _$rootScope_;
    scope = <IEventSeriesShowEventScope>$rootScope.$new();
    seriesController = $componentController('eventSeriesShow', {
      $scope: scope
    });
    eventsPromise = getEventsPromise(_$q_);
    eventSeriesService = _eventSeriesService_;
    logger = _logger_;
  }));

  beforeEach(function() {
    stubSeriesService = sinon.stub(eventSeriesService, 'GetEvents');
  });

  afterEach(function() {
    stubSeriesService.restore();
  });

  it('Should be defined', function() {
    chai.expect(seriesController).to.be.not.undefined;
  });

  describe('When user request events', function() {
    it('Should load all the events created to the controller variable', function() {
      stubSeriesService.returns(eventsPromise);
      var expectedEvents: any[] = [
        {
          id: "somespecialGUID",
          placeDescription: "test",
          utcTime: "test",
          city: "test",
          country: "test",
          raspberrySerialNumber: 'serial',
          deviceStatusUpdate: 'date'
        }
      ];
      seriesController.Events = expectedEvents;
      seriesController.GetEvents();
      $rootScope.$apply();
      chai.expect(seriesController.Events).to.be.deep.equal(expectedEvents);
    });
  });

  function getEventsPromise($q: angular.IQService): angular.IPromise<IEventResponse[]> {
    var deferred = $q.defer<IEventResponse[]>();
    deferred.resolve(events);
    return deferred.promise;
  }
});

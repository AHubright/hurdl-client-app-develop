/// <reference path="../eventseries.service/eventSeriesService.service.ts"/>
/// <reference path="../eventseries.index/eventseriesindex.controller.ts"/>
'use strict';

describe('Component: EventseriesindexComponent', function() {
  var seriesController: IEventIndexController;
  var eventSeriesService: IEventSeriesService;
  var scope: IEventSeriesIndexScope;
  var stubSeriesService: any;
  var eventSeriesPromise: angular.IPromise<IEventSeriesResponse[]>;
  var $rootScope: angular.IRootScopeService;
  var logger: ILogger;
  var eventSeries: IEventSeriesResponse[] = [
    {
      id: "somespecialGUID",
      eventHost: "test",
      name: "test",
      eventIdentifier: "test"
    }
  ];
  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.logger'));
  beforeEach(angular.mock.module('stateMock'));


  beforeEach(inject(function($componentController: angular.IControllerService,
                             _$rootScope_: angular.IRootScopeService,
                             _$q_: angular.IQService, _logger_: ILogger, _eventSeriesService_: IEventSeriesService) {
    $rootScope = _$rootScope_;
    scope = <IEventSeriesIndexScope>$rootScope.$new();
    seriesController = $componentController('eventseriesindex', {
      $scope: scope
    });
    eventSeriesPromise = getSeriesPromise(_$q_);
    eventSeriesService = _eventSeriesService_;
    logger = _logger_;
  }));

  beforeEach(function() {
    stubSeriesService = sinon.stub(eventSeriesService, 'GetEventSeries');
  });

  afterEach(function() {
    stubSeriesService.restore();
  });

  it('Should be defined', function() {
    chai.expect(seriesController).to.be.not.undefined;
  });

  describe('When user request event series', function() {
    it('Should load all the events created to the controller variable', function() {
      stubSeriesService.returns(eventSeriesPromise);
      var expectedSeries: any[] = [
        {
          eventHost: "test",
          name: "test",
          eventIdentifier: "test"
        }
      ];
      seriesController.EventSeries = expectedSeries;
      seriesController.GetEventsSeries();
      $rootScope.$apply();
      chai.expect(seriesController.EventSeries.length).to.be.equal(1);
    });
  });

  function getSeriesPromise($q: angular.IQService): angular.IPromise<IEventSeriesResponse[]> {
    var deferred = $q.defer<IEventSeriesResponse[]>();
    deferred.resolve(eventSeries);
    return deferred.promise;
  }

});

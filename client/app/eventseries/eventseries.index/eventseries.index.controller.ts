/// <reference path="../eventseriesService/eventseriesService.service.ts"/>
'use strict';

interface IEventSeriesIndexScope extends angular.IScope {
  vm: EventseriesindexComponent;
}

interface IEventIndexController {
  SearchText: string;
  GetEventsSeries(): void;
}

class EventseriesindexComponent implements IEventIndexController {
  SearchText: string;
  static $inject: any = ['$scope', 'eventSeriesService'];
  /*@ngInject*/
  constructor(private $scope: IEventSeriesIndexScope,
              private eventSeriesService: IEventSeriesService) {
    $scope.vm = this;
    this.SearchText = '';
  }

  GetEventsSeries(): void {
    this.eventSeriesService.GetEventSeries().then((data: IEventSeriesResponse[]) => {
      this.eventSeriesService.SetEventSeries(data);
      _.each(this.eventSeriesService.GetEventSeriesList(), function(element) {
        var locations: string = _.pluck(element.events, 'placeDescription').join(',');
        element.locations = locations;
      });
    });
  }

  QuerySearch(criteria: string): IEventSeriesResponse[] {
    var results: IEventSeriesResponse[] = _.filter(this.eventSeriesService.GetEventSeriesList(), function(event) {
      return event.name.toLocaleLowerCase().indexOf(criteria) !== -1;
    });
    return results;
  }
}

angular.module('falconApp')
  .component('eventseriesindex', {
    templateUrl: 'app/eventseries/eventseries.index/eventseries.index.html',
    controller: EventseriesindexComponent,
    controllerAs: 'vm'
  });

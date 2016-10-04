/// <reference path="../eventseriesService/eventSeriesService.service.ts"/>
/// <reference path="../../logger/logger.service.ts"/>

'use strict';

interface IEventSeriesShowEventScope extends angular.IScope {
  vm: EventSeriesShowComponent;
}

interface IEventSeriesShowController {
  EventSeriesId: string;
  EventSeries: IEventSeriesResponse;
  Events: IEventResponse[];
  selectedEvent: IEventResponse;
  GeneralVisible: boolean;
  EventsVisible: boolean;
  canSendSms: boolean;
  ShowSmsSender(event: IEventResponse): void;
  GetData(): void;
  GetEventSeriesInfo(): void;
  GetEvents(): void;
  Close(): void;
}

class EventSeriesShowComponent implements IEventSeriesShowController {
  EventSeriesId: string;
  Events: IEventResponse[];
  EventSeries: IEventSeriesResponse;
  selectedEvent: IEventResponse;
  GeneralVisible: boolean;
  EventsVisible: boolean;
  canSendSms: boolean;
  static $inject: any = ['$scope', '$stateParams', 'logger', 'eventSeriesService', '$mdDialog',
    '$location', '$anchorScroll', '$timeout'];
  /*@ngInject*/
  constructor(private $scope: IEventSeriesShowEventScope,
              private $stateParams: any,
              private logger: ILogger,
              private eventSeriesService: IEventSeriesService,
              private $mdDialog: any,
              private $location: any,
              private $anchorScroll: any,
              private $timeout: any) {
    $scope.vm = this;
    this.EventSeriesId = $stateParams.id;
    this.EventsVisible = false;
    this.GeneralVisible = true;
  }
  GetData(): void {
    this.GetEventSeriesInfo();
    this.GetEvents();
  }
  GetEventSeriesInfo(): void {
    this.eventSeriesService.GetEventSeriesInfo(this.EventSeriesId).then((data: IEventSeriesResponse) => {
      this.EventSeries = data;
    });
  }
  GetEvents(): void {
    this.eventSeriesService.GetEvents(this.EventSeriesId).then((data: IEventResponse[]) => {
      this.Events = data;
    });
  }
  Close(): void {
    this.$mdDialog.hide();
  }
  ShowSmsSender(event: IEventResponse): void {
    this.canSendSms = true;
    this.selectedEvent = event;
  }
}

angular.module('falconApp').component('eventSeriesShow', {
  templateUrl: 'app/eventseries/eventseries.show/eventseries.show.html',
  controller: EventSeriesShowComponent,
  controllerAs: 'vm'
});

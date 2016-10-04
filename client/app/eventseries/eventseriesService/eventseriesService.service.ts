'use strict';

interface IEventSeriesResponse {
  id: string;
  name: string;
  eventHost: string;
  eventIdentifier: string;
  events: IEventResponse[];
}
interface IEventResponse {
  id: string;
  placeDescription: string;
  utcTime: string;
  city: string;
  country: string;
  state: string;
  raspberrySerialNumber: string;
  deviceStatusUpdate: string;
  totalRegistrations: number;
  successfulRegistrations: number;
  longitude: number;
  latitude: number;
}
interface IEventSeries {
  EventSeriesList: IEventSeriesResponse[];
}

interface IEventSeriesService {
  EventsSeries: IEventSeries;
  SetEventSeries(eventSeriesList: IEventSeriesResponse[]): void;
  GetEventSeriesList(): IEventSeriesResponse[];
  GetEventSeries(): angular.IPromise<IEventSeriesResponse[]>;
  GetEventSeriesInfo(eventseriesId: string): angular.IPromise<IEventSeriesResponse>;
  GetEvents(id: string): angular.IPromise<IEventResponse[]>;
}

class EventSeriesService implements IEventSeriesService {
  EventsSeries: IEventSeries = {
    EventSeriesList: []
  };

  static $inject: any = ['httpq'];
  /*@ngInject*/
  constructor(private httpQ: IHttpQ) {
  }

  GetEventSeriesList(): IEventSeriesResponse[] {
    return this.EventsSeries.EventSeriesList;
  }
  SetEventSeries(eventSeriesList: IEventSeriesResponse[]): void {
    this.EventsSeries.EventSeriesList = eventSeriesList;
  }
  GetEventSeries(): angular.IPromise<IEventSeriesResponse[]> {
    return this.httpQ.Get<IEventSeriesResponse[]>('/reports/clients/eventseries');
  }
  GetEventSeriesInfo(eventseriesId: string): angular.IPromise<IEventSeriesResponse> {
    return this.httpQ.Get<IEventSeriesResponse>('/eventseries/' + eventseriesId);
  }
  GetEvents(id: string): angular.IPromise<IEventResponse[]> {
    return this.httpQ.Get<IEventResponse[]>('/eventseries/' + id + '/events');
  }
}

angular.module('falconApp')
  .factory('eventSeriesService', ['httpq', (httpq: IHttpQ) => new EventSeriesService(httpq)]);

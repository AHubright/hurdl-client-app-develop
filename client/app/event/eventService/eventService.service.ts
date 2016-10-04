'use strict';

interface IEventSmsRequest {
  message: string;
}

interface IEventService {
  SendSms(eventId: string, eventSmsRequest: IEventSmsRequest): angular.IPromise<boolean>;
}

class EventService implements IEventService {
  EventsSeries: IEventSeries = {
    EventSeriesList: []
  };

  static $inject: any = ['httpq'];
  /*@ngInject*/
  constructor(private httpQ: IHttpQ) {
  }

  SendSms( eventId: string, eventSmsRequest: IEventSmsRequest ): angular.IPromise<boolean> {
    return this.httpQ.Post<IEventSmsRequest, boolean>('/events/' + eventId + '/sms', eventSmsRequest);
  }
}

angular.module('falconApp')
  .factory('eventService', ['httpq', (httpq: IHttpQ) => new EventService(httpq)]);

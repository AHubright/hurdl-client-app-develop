/// <reference path="../../logger/logger.service.ts"/>
/// <reference path="../../event/eventService/eventService.service.ts"/>

'use strict';

interface IEventSmsSenderScope extends angular.IScope {
  vm: EventSmsSenderComponent;
}

interface IEventSmsSender {
  canSendSms: boolean;
  message: string;
  form: any;
  event: IEventResponse;
  SendSms(): void;
  CleanUp(): void;
}

class EventSmsSenderComponent implements IEventSmsSender {
  canSendSms: boolean;
  message: string;
  event: IEventResponse;
  form: any = {};

  static $inject: any = ['$scope', '$stateParams', 'logger', 'eventService'];
  /*@ngInject*/
  constructor(private $scope: IEventSmsSenderScope,
              private $stateParams: any,
              private logger: ILogger,
              private eventService: IEventService) {
    $scope.vm = this;
  }

  SendSms(): void {
    var request: IEventSmsRequest = {
      message: this.message
    };
    this.eventService.SendSms(this.event.id, request).then((data: any) => {
      this.CleanUp();
      this.logger.success('Success', 'Message sent!', null);
    }).catch((error: any) =>  {
      this.logger.error('Error', 'We have a problem sending your message, please try again.', null);
    });
  }

  CleanUp(): void {
    this.canSendSms = false;
    this.message = '';
    this.form.$setPristine();
    this.form.$setUntouched();
  }
}

angular.module('falconApp')
  .component('eventSmsSender', {
    templateUrl: 'app/event/eventSmsSender/eventSmsSender.html',
    controller: EventSmsSenderComponent,
    controllerAs: 'vm',
    bindings: {
      event:  '=',
      canSendSms: '='
    }
  });


'use strict';

interface ILogger {
  error(title: string, message: string, data: any, notShowOnScreen?: boolean): void;
  info(title: string, message: string, data: any): void;
  success(title: string, message: string, data: any): void;
  warning(title: string, message: string, data: any): void;
}

class Logger implements ILogger {
  log: angular.ILogService;
  toastr: any;
  static $inject: any = ['$log', 'toastr'];
  /*@ngInject*/
  constructor(log: angular.ILogService, toastr: any) {
    this.log = log;
    this.toastr = toastr;
  }

  error(title: string, message: string, data?: any, notShowOnScreen?: boolean): void {
    if (!notShowOnScreen) {
      this.toastr.error(message, title);
    }
    this.log.error(`Error: ${message}`, data);
  }

  info(title: string, message: string, data: any): void {
    this.toastr.info(message, title);
    this.log.info(`Info: ${message}`, data);
  }

  success(title: string, message: string, data: any): void {
    this.toastr.success(message, title);
    this.log.info(`Success: ${message}`, data);
  }

  warning(title: string, message: string, data: any): void {
    this.toastr.warning(message, title);
    this.log.info(`Warning: ${message}`, data);
  }
}

angular.module('falconApp.logger', [])
  .constant('toastr', this.toastr)
  .factory('logger', ['$log', 'toastr', ($log: angular.ILogService, toastr: any) => new Logger($log, toastr)]);

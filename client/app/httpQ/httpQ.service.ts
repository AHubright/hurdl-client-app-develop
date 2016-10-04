'use strict';
interface IHttpQ {
  Get<T>(resource: string): angular.IPromise<T>;
  Post<T, K>(resource: string, payload: T): angular.IPromise<K>;
  Put<T, K>(resource: string, payload: T): angular.IPromise<K>;
}

class HttpQ implements IHttpQ {
  static $inject: any = ['$http', '$q', 'serverUrl'];
  /*@ngInject*/
  constructor(private $http: angular.IHttpService, private $q: angular.IQService, private serverUrl: string) {
  }

  getApiUrl(resource: string): string {
    return (this.serverUrl || '') + resource;
  }

  Get<T>(resource: string): angular.IPromise<T> {
    var defer: angular.IDeferred<T> = this.$q.defer();
    this.$http.get<T>(this.getApiUrl(resource))
      .success(function (data: T): void {
        defer.resolve(data);
      })
      .error(function (error: T): void {
        defer.reject(error);
      });
    return defer.promise;
  }

  Post<T, K>(resource: string, payload: T): angular.IPromise<K> {
    var defer: angular.IDeferred<K> = this.$q.defer();
    this.$http.post<T>(this.getApiUrl(resource), payload)
      .success(function (data: any): void {
        defer.resolve(data);
      })
      .error(function (error: any): void {
        defer.reject(error);
      });
    return defer.promise;
  }

  Put<T, K>(resource: string, payload: T): angular.IPromise<K> {
    var defer: angular.IDeferred<K> = this.$q.defer();
    this.$http.put<T>(this.getApiUrl(resource), payload)
      .success(function (data: any): void {
        defer.resolve(data);
      })
      .error(function (error: any): void {
        defer.reject(error);
      });
    return defer.promise;
  }
}
angular.module('falconApp')
  .factory('httpq', ['$http', '$q', 'serverUrl', ($http: angular.IHttpService, $q: angular.IQService, serverUrl: string) =>
  new HttpQ($http, $q, serverUrl)]);

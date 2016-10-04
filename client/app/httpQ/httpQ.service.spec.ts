'use strict';

interface IDataMock {
  name: string;
}

describe('Service: httpq', function() {

  var $httpBackend: angular.IHttpBackendService;
  var $q: angular.IQService;
  var serverUrl: string;
  var httpQ: HttpQ;
  var dataMock: IDataMock = {
  		name: 'test data'
  };

  beforeEach(angular.mock.module('falconApp'));
  beforeEach(angular.mock.module('falconApp.constantService'));

  beforeEach(inject(function(_$httpBackend_: angular.IHttpBackendService,
    _$q_: angular.IQService
    , _httpq_: HttpQ
    , _serverUrl_: string) {
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    serverUrl = _serverUrl_;
    httpQ = _httpq_;
  }));

  it('should be defined', function() {
    expect(httpQ).to.be.defined;
  });

  describe('When making a GET request', () => {
    it('Return data from the server on success', function() {
      $httpBackend.whenGET(serverUrl + '/test').respond(dataMock);
      var response: IDataMock;
      var promise = httpQ.Get<IDataMock>('/test');
      promise.then(function(data: IDataMock) {
        response = data;
      });
      $httpBackend.flush();
      expect(response.name).to.be.equal(dataMock.name);
    });
    it('Return error in case on failure', function() {
      $httpBackend.whenGET(serverUrl + '/test').respond(400, 'badrequest');
      var promise = httpQ.Get<IDataMock>('/test');
      var result: any;
      promise.then(function(data: IDataMock) {
        result = data;
      }, function(error) {
          result = error;
        });
      $httpBackend.flush();
      expect(result).to.be.equal('badrequest');
    });
  });

  describe('When making a POST request', () => {
    it('Return data from the server on success', function() {
      $httpBackend.whenPOST(serverUrl + '/test', dataMock).respond(201, 'success');
      var promise = httpQ.Post<IDataMock, IDataMock>('/test', dataMock);
      var result: any;
      promise.then(function(data: any) {
        result = data;
      });
      $httpBackend.flush();
      expect(result).to.be.equal('success');
    });
    it('Return error in case on failure', function() {
      $httpBackend.whenPOST(serverUrl + '/test', dataMock).respond(405, 'error');
      var promise = httpQ.Post<IDataMock, IDataMock>('/test', dataMock);
      var result: any;
      promise.then(function(data: any) {
        result = data;
      }, function(error) {
          result = error;
        });
      $httpBackend.flush();
      expect(result).to.be.equal('error');
    });
  });

  describe('When making a PUT request', () => {
    it('Return data from the server on success', function() {
      $httpBackend.whenPUT(serverUrl + '/test', dataMock).respond(201, 'success');
      var promise = httpQ.Put<IDataMock, IDataMock>('/test', dataMock);
      var result: any;
      promise.then(function(data: any) {
        result = data;
      });
      $httpBackend.flush();
      expect(result).to.be.equal('success');
    });
    it('Return error in case on failure', function() {
      $httpBackend.whenPUT(serverUrl + '/test', dataMock).respond(405, 'error');
      var promise = httpQ.Put<IDataMock, IDataMock>('/test', dataMock);
      var result: any;
      promise.then(function(data: any) {
        result = data;
      }, function(error) {
          result = error;
        });
      $httpBackend.flush();
      expect(result).to.be.equal('error');
    });
  });


});

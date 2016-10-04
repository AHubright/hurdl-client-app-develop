'use strict';

describe('Service: googleplacesparser', function () {

  // load the service's module
  beforeEach(angular.mock.module('falconApp'));

  // instantiate service
  var googleplacesparser;
  beforeEach(inject(function (_googleplacesparser_) {
    googleplacesparser = _googleplacesparser_;
  }));

  it('should instantiate googleplacesparser service', function () {
    expect(googleplacesparser).to.be.defined;
  });

});

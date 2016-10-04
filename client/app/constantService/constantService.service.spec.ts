'use strict';

describe('Service: constantService', function() {

  beforeEach(angular.mock.module('falconApp.constantService'));

  it('Constant serverUrl should be defined', inject(function(serverUrl: string) {
    chai.expect(serverUrl).to.be.not.undefined;
  }));

});

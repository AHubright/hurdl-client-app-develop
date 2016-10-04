'use strict';

describe('Component: LoginComponent', function () {

  // load the controller's module
  beforeEach(angular.mock.module('falconApp'));

  var LoginComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoginComponent = $componentController('login', {
      $scope: scope
    });
  }));

  it('should create login component', function () {
    chai.expect(LoginComponent).not.be.undefined;
  });
});

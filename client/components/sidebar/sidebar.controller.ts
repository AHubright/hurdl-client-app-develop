'use strict';

class SidebarController {
  static $inject: Array<string> = ['auth', 'store', '$rootScope', '$mdSidenav', '$state'];
  /*@ngInject*/
  constructor(private auth: any, private store: any, private $rootScope: any, private $mdSidenav: any,
    private $state: any) {
    this.$rootScope.isAuthenticated = this.auth.isAuthenticated;
  }
  
  logout(): void {
    this.auth.signout();
    this.store.remove('profile');
    this.store.remove('token');
    this.$rootScope.isAuthenticated = false;
    window.location.href = '/';
  }

}

angular.module('falconApp')
  .controller('SidebarController', SidebarController);

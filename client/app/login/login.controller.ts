'use strict';
interface ILoginScope extends angular.IScope {
  vm: LoginComponent;
}

interface ILoginController {
  email: string;
  password: string;
  rememberMe: boolean;
  Login(): void;
}

class LoginComponent implements ILoginController {
  email: string;
  password: string;
  rememberMe: boolean;
  static $inject: Array<string> = [ '$scope', 'auth', 'store', '$location', 'logger'];
 /*@ngInject*/
 constructor(private $scope: ILoginScope, private auth: any,
             private store: any, private $location: any,
             private logger: any) {
    $scope.vm = this;
  }
  Login(): void {
    this.auth.signin({

      username: this.email,
      password: this.password,
      connection: 'clients-db',
      authParams: {
        scope: 'openid name email user_metadata'
      }
    }, (profile: any, token: any) => {
       this.store.set('profile', profile);
       this.store.set('token', token);
       this.$location.path('/');

    }, (response: any) => {
      if ( response.status === 401 ) {
        this.logger.error('Error', 'Your account has been suspended! Please contact Hurdl for more information');
      } else {
        this.logger.error('Error', response.details.description);
      }
    });
  }
}
angular.module('falconApp')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: LoginComponent
  });

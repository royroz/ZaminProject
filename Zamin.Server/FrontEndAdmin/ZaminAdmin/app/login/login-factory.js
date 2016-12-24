(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name login.factory:Login
   *
   * @description
   *
   */
  angular
    .module('login')
    .factory('Login', Login);

  function Login() {
    var LoginBase = {};
    LoginBase.someValue = 'Login';
    LoginBase.someMethod = function () {
      return 'Login';
    };
    return LoginBase;
  }
}());

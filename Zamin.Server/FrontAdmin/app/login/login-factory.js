(function() {
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

  function Login($http, consts) {
    var LoginBase = {};

    LoginBase.signIn = function(username, password) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Account/Login",
        data: {
          username: username,
          password: password
        }
      });
    },

    LoginBase.forgotPassword = function(email) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Account/ForgotPassword",
        data: {
          username: email
        }
      });
    }


    LoginBase.getCurrentUser = function() {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Account/GetCurrentUser"
      });
    }



    return LoginBase;
  }
}());

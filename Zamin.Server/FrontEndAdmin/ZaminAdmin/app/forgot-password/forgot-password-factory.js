(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name forgotPassword.factory:ForgotPassword
   *
   * @description
   *
   */
  angular
    .module('forgotPassword')
    .factory('ForgotPassword', ForgotPassword);

  function ForgotPassword() {
    var ForgotPasswordBase = {};
    ForgotPasswordBase.someValue = 'ForgotPassword';
    ForgotPasswordBase.someMethod = function () {
      return 'ForgotPassword';
    };
    return ForgotPasswordBase;
  }
}());

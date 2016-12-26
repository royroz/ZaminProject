(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name resetPassword.factory:ResetPassword
   *
   * @description
   *
   */
  angular
    .module('resetPassword')
    .factory('ResetPassword', ResetPassword);

  function ResetPassword() {
    var ResetPasswordBase = {};
    ResetPasswordBase.someValue = 'ResetPassword';
    ResetPasswordBase.someMethod = function () {
      return 'ResetPassword';
    };
    return ResetPasswordBase;
  }
}());

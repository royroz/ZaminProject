(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name resetPassword.controller:ResetPasswordCtrl
   *
   * @description
   *
   */
  angular
    .module('resetPassword')
    .controller('ResetPasswordCtrl', ResetPasswordCtrl);

  function ResetPasswordCtrl() {
    var vm = this;
    vm.ctrlName = 'ResetPasswordCtrl';
  }
}());

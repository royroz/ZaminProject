(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name signup.controller:SignupCtrl
   *
   * @description
   *
   */
  angular
    .module('signup')
    .controller('SignupCtrl', SignupCtrl);

  function SignupCtrl() {
    var vm = this;
    vm.ctrlName = 'SignupCtrl';
  }
}());

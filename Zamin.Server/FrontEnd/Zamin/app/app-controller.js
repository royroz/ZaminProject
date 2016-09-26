(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name zamin.controller:AppCtrl
   *
   * @description
   *
   */
  angular
    .module('zamin')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl() {
    var vm = this;
    vm.ctrlName = 'AppCtrl';
  }
}());

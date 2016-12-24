(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name contentManagement.controller:ContentManagementCtrl
   *
   * @description
   *
   */
  angular
    .module('contentManagement')
    .controller('ContentManagementCtrl', ContentManagementCtrl);

  function ContentManagementCtrl() {
    var vm = this;
    vm.ctrlName = 'ContentManagementCtrl';
  }
}());

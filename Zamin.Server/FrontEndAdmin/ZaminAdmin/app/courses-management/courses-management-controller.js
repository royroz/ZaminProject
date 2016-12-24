(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name coursesManagement.controller:CoursesManagementCtrl
   *
   * @description
   *
   */
  angular
    .module('coursesManagement')
    .controller('CoursesManagementCtrl', CoursesManagementCtrl);

  function CoursesManagementCtrl() {
    var vm = this;
    vm.ctrlName = 'CoursesManagementCtrl';
  }
}());

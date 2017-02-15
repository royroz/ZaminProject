(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name courseForm.controller:CourseFormCtrl
   *
   * @description
   *
   */
  angular
    .module('courseForm')
    .controller('CourseFormCtrl', CourseFormCtrl);

  function CourseFormCtrl() {
    var vm = this;
    vm.ctrlName = 'CourseFormCtrl';
  }
}());

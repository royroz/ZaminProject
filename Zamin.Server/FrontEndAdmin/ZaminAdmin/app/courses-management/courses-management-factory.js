(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name coursesManagement.factory:CoursesManagement
   *
   * @description
   *
   */
  angular
    .module('coursesManagement')
    .factory('CoursesManagement', CoursesManagement);

  function CoursesManagement() {
    var CoursesManagementBase = {};
    CoursesManagementBase.someValue = 'CoursesManagement';
    CoursesManagementBase.someMethod = function () {
      return 'CoursesManagement';
    };
    return CoursesManagementBase;
  }
}());

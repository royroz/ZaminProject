(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name course.factory:Course
   *
   * @description
   *
   */
  angular
    .module('course')
    .factory('Course', Course);

  function Course($http, consts) {
    var CourseBase = {};

    CourseBase.getAll = function () {
        return $http({
          method: "GET",
          url: consts.serverUrl + "Course/GetCourses",
        });
      };


      CourseBase.delete = function(franchiseId) {
        return $http({
          method: "POST",
          url: consts.serverUrl + "Course/DeleteCourse",
          data: {
            id: courseId
          }
        });
      };
    return CourseBase;
  }
}());

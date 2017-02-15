(function() {
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

  function CourseFormCtrl($scope, $location, CourseForm) {
    $scope.course = {};
    $scope.categories = [{"Name" : "test", "Id" : 1}];

    $scope.save = function(valid) {
      if (!valid) return;
      CourseForm.create($scope.course).then(function(response) {
        if (response.data) {
          $location.path("course");
        }
      })
    }


  }
}());

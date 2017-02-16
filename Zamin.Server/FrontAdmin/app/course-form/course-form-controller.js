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

  function CourseFormCtrl($scope, $location, $stateParams, $state, CourseForm) {
    $scope.course = {};
    $scope.categories = [];
    $scope.tags = [];
    $scope.editMode = $state.current.name == 'courseFormUpdate';

    $scope.save = function(valid) {
      if (!valid) return;
      CourseForm.create($scope.course).then(function(response) {
        if (response.data) {
          $location.path("course");
        }
      })
    }
    $scope.getCourse = function() {
      showLoader();
      CourseForm.getCourse($stateParams.courseId).then(function(response) {
        $scope.course = response.data;
        hideLoader();
      });
    }

    $scope.getCategories = function() {
      showLoader();
      CourseForm.getCategories().then(function(response) {
        $scope.categories = response.data;
        hideLoader();
      })
    }

    $scope.getTags = function() {
      showLoader();
      CourseForm.getTags().then(function(response) {
        $scope.tags = response.data;
        hideLoader();
      })
    }

    //Tags autocomplete
    $scope.searchText = "";
    $scope.selectedItem = undefined;

    $scope.querySearch = function(query) {
      var results = query ? $scope.tags.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(tag) {
        return (tag.TagName.indexOf(lowercaseQuery) === 0) ||
          (tag.TagName.indexOf(lowercaseQuery) === 0);
      };
    }


    //Start
    if ($scope.editMode) $scope.getCourse();
    $scope.getCategories();
    $scope.getTags();

  }
}());

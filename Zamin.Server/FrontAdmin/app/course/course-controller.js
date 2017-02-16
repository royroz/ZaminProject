(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name course.controller:CourseCtrl
   *
   * @description
   *
   */
  angular
    .module('course')
    .controller('CourseCtrl', CourseCtrl);

  function CourseCtrl($scope, $rootScope, $mdDialog,Course) {
  $scope.courses = [];

    $scope.getAll = function() {
      showLoader();
      Course.getAll().then(function(response) {
        $scope.courses = response.data;
        hideLoader();
      });
    }

    $scope.deleteDialog = function(itemToDelete, index, ev) {
      $scope.itemToDelete = itemToDelete;
      $scope.itemToDelete.index = index;
      $mdDialog.show({
        targetEvent: ev,
        templateUrl: 'deleteDialog.html',
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true
      });
    }

    $scope.delete = function() {
      showLoader();
      Course.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.courses.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }


   $scope.getAll();
  }
}());

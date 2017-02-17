(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name lessonPlan.controller:LessonPlanCtrl
   *
   * @description
   *
   */
  angular
    .module('lessonPlan')
    .controller('LessonPlanCtrl', LessonPlanCtrl);

  function LessonPlanCtrl($scope, $rootScope, $mdDialog,LessonPlan) {
    $scope.lessonPlans = [];
    $scope.lessonPlan={
      'numOfPresentations':0,
      'numOfWritten':0
    }



      $scope.getAll = function() {
        showLoader();
        LessonPlan.getAll().then(function(response) {
          $scope.lessonPlans = response.data;
          //TODO Loops on all LessonPlans and count num of presentations and written
          $scope.lessonPlan.numOfPresentations=0;
          $scope.lessonPlan.numOfWritten=0;

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
        LessonPlan.delete($scope.itemToDelete.Id).then(function(response) {
          if (response.data) {
            $scope.lessonPlans.splice($scope.itemToDelete.index, 1);
            $scope.itemToDelete = {};
            $scope.hideDialog();
          }
          hideLoader();
        });
      }


    //  $scope.getAll();
    }
  }());

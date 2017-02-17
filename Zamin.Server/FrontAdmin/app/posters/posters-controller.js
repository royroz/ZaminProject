(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name posters.controller:PostersCtrl
   *
   * @description
   *
   */
  angular
    .module('posters')
    .controller('PostersCtrl', PostersCtrl);

  function PostersCtrl($scope, $rootScope, $mdDialog,Posters) {
    $scope.posters = [];

      $scope.getAll = function() {
        showLoader();
        Posters.getAll().then(function(response) {
          $scope.posters = response.data;
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
        Posters.delete($scope.itemToDelete.Id).then(function(response) {
          if (response.data) {
            $scope.posters.splice($scope.itemToDelete.index, 1);
            $scope.itemToDelete = {};
            $scope.hideDialog();
          }
          hideLoader();
        });
      }


     $scope.getAll();
    }
  }());

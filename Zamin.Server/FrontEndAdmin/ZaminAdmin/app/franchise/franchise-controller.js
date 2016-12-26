(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name franchise.controller:FranchiseCtrl
   *
   * @description
   *
   */
  angular
    .module('franchise')
    .controller('FranchiseCtrl', FranchiseCtrl);

  function FranchiseCtrl($scope, $rootScope, $mdDialog, Franchise) {
    //$scope.franchises = [];

    // $scope.getAll = function() {
    //   showLoader();
    //   Franchise.getAll().then(function(response) {
    //     $scope.franchises = response.data;
    //     hideLoader();
    //   });
    // }

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
      Franchise.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.franchises.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }


//    $scope.getAll();
  }
}());

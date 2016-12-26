(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name combo.controller:ComboCtrl
   *
   * @description
   *
   */
  angular
    .module('combo')
    .controller('ComboCtrl', ComboCtrl);

  function ComboCtrl($scope, $rootScope, $mdDialog,  Combo) {

    $scope.combos = [];

    $scope.getCombos = function(){
      showLoader();
      Combo.getCombos($rootScope.user.FranchiseId).then(function(response){
        $scope.combos = response.data;
        hideLoader();
      });
    };

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
      Combo.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.combos.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    $scope.getCombos();
  }
}());

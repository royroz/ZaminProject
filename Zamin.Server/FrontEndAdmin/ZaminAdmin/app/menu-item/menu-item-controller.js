(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name menuItem.controller:MenuItemCtrl
   *
   * @description
   *
   */
  angular
    .module('menuItem')
    .controller('MenuItemCtrl', MenuItemCtrl);

  function MenuItemCtrl($scope, $rootScope,$mdDialog,$stateParams, MenuItem) {

    $scope.items = [];
    $scope.newItem = undefined;
    $scope.itemToDelete = {};
    $scope.imageVersion = 1;
    $scope.categoryName = $stateParams.categoryName;
    $scope.categoryId = $stateParams.categoryId;


    //---------------Get functions---------------------
    $scope.getItems = function() {
      showLoader();
      MenuItem.getItemByCategoryId($stateParams.categoryId).then(function(response) {
        $scope.items = response.data;
        hideLoader();
      });
    }


    //---------------Post functions--------------------

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
      MenuItem.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.items.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(item) {
      item.edit = true;
    }
    $scope.addItem = function() {
      $scope.newItem = {
        FranchiseId: $rootScope.user.FranchiseId,
        Name: ""
      }
    }


    //-----------------------Start------------------
    $scope.getItems();

  }
}());

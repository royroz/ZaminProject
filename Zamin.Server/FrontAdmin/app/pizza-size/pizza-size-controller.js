(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name pizzaSize.controller:PizzaSizeCtrl
   *
   * @description
   *
   */
  angular
    .module('pizzaSize')
    .controller('PizzaSizeCtrl', PizzaSizeCtrl);

  function PizzaSizeCtrl($scope, $rootScope, $mdDialog, PizzaSize) {
    $scope.pizzaSizes = [];
    $scope.newPizzaSize = undefined;
    $scope.itemToDelete = {};

    //---------------Get functions---------------------
    $scope.getPizzaSizes = function() {
      showLoader();
      PizzaSize.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzaSizes = response.data;
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function() {
      showLoader();
      PizzaSize.create($scope.newPizzaSize).then(function(response) {
        if (response.data.Success) {
          $scope.newPizzaSize.Id = response.data.PizzaSizeId;
          $scope.pizzaSizes.push(angular.copy($scope.newPizzaSize));
          $scope.newPizzaSize = undefined;
        }
        hideLoader();
      });
    }

    $scope.update = function(pizzaSize) {
      showLoader();
      PizzaSize.update(pizzaSize).then(function(response) {
        if (response.data) {
          pizzaSize.edit = false;
        }
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
      PizzaSize.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.pizzaSizes.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(size) {
      size.edit = true;
    }
    $scope.addItem = function(){
      $scope.newPizzaSize = {
        FranchiseId: $rootScope.user.FranchiseId
      }
    }


    //-----------------------Start------------------
    $scope.getPizzaSizes();
  }
}());

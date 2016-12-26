(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name topping.controller:ToppingCtrl
   *
   * @description
   *
   */
  angular
    .module('topping')
    .controller('ToppingCtrl', ToppingCtrl);

  function ToppingCtrl($scope, $rootScope, $mdDialog, Topping, PizzaSize) {
    $scope.toppings = [];
    $scope.itemToDelete = {};
    $scope.pizzaSizes = [];
    $scope.imageVersion = 1;
    //---------------Get functions---------------------
    $scope.getToppings = function() {
      showLoader();
      Topping.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.toppings = response.data;
        $scope.getPizzaSizes();
        hideLoader();
      });
    }

    $scope.getPizzaSizes = function() {
      showLoader();
      PizzaSize.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzaSizes = response.data;
        $scope.pizzaSizes.forEach(function(size) {
          $scope.toppings.forEach(function(top) {
            if (_.find(top.ToppingPrices, function(e) { return e.PizzaSizeId == size.Id}) == undefined){
              //No price for this size
              top.ToppingPrices.push({
                PizzaSizeId: size.Id
              });
            }
          });
        });
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function() {
      showLoader();
      Topping.create($scope.newTopping).then(function(response) {
        if (response.data.Success) {
          $scope.toppings.push(response.data.Topping);
          $scope.newTopping = undefined;
        }
        hideLoader();
      });
    }

    $scope.update = function(topping) {
      showLoader();
      Topping.update(topping).then(function(response) {
        if (response.data) {
          topping.edit = false;
          $scope.imageVersion++;
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
      Topping.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.toppings.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }



    //---------------------- Other -----------------
    $scope.setEditMode = function(topping) {
      topping.edit = true;
    }
    $scope.addItem = function() {
      $scope.newTopping = {
        FranchiseId: $rootScope.user.FranchiseId,
        ToppingPrices: []
      }
      $scope.pizzaSizes.forEach(function(item) {
        $scope.newTopping.ToppingPrices.push({
          PizzaSizeId: item.Id,
          Name: item.Name
        })
      });
    }

    //-----------------------Start------------------
    $scope.getToppings();
  }
}());

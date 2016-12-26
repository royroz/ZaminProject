(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name pizza.controller:PizzaCtrl
   *
   * @description
   *
   */
  angular
    .module('pizza')
    .controller('PizzaCtrl', PizzaCtrl);

  function PizzaCtrl($scope, $rootScope, $mdDialog, Pizza, PizzaSize, Topping) {
    $scope.pizzas = [];
    $scope.itemToDelete = {};
    $scope.pizzaSizes = [];
    $scope.toppings = [];
    $scope.imageVersion = 1;
    $scope.newPizza = undefined;

    //---------------Get functions---------------------
    $scope.getPizzas = function() {
      showLoader();
      Pizza.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzas = response.data;
        $scope.getPizzaSizes();
        $scope.getToppings();
        hideLoader();
      });
    }


    $scope.getPizzaSizes = function() {
      showLoader();
      PizzaSize.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzaSizes = response.data;
        $scope.pizzaSizes.forEach(function(size) {
          $scope.pizzas.forEach(function(pizza) {
            if (_.find(pizza.PizzaPrices, function(e) { return e.PizzaSizeId == size.Id}) == undefined){
              //No price for this size
              pizza.PizzaPrices.push({
                PizzaSizeId: size.Id
              });
            }
          });
        });
        hideLoader();
      });
    }

    $scope.getToppings = function() {
      showLoader();
      Topping.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.toppings = response.data;

        $scope.pizzas.forEach(function(pizza) {
          $scope.setPizzasToppings(pizza);
        })


        hideLoader();
      });
    }

    //---------------Post functions--------------------

    $scope.create = function() {
      showLoader();
      if ($scope.newPizza.toppings != undefined) {
        if ($scope.newPizza.PizzaToppings == undefined) $scope.newPizza.PizzaToppings = [];
        $scope.newPizza.toppings.forEach(function(top) {
          $scope.newPizza.PizzaToppings.push({
            ToppingId: top.Id,
            Topping: top
          })
        })
      }
      Pizza.create($scope.newPizza).then(function(response) {
        if (response.data.Success) {
          $scope.setPizzasToppings(response.data.Pizza);
          $scope.pizzas.push(response.data.Pizza);
          $scope.newPizza = undefined;
        }
        hideLoader();
      });
    }


    $scope.update = function(pizza) {
      showLoader();
      if (pizza.toppings != undefined) {
        pizza.PizzaToppings = [];
        pizza.toppings.forEach(function(top) {
          pizza.PizzaToppings.push({
            ToppingId: top.Id,
            Topping: top
          })
        })
      }
      Pizza.update(pizza).then(function(response) {
        pizza.PizzaSize = _.find($scope.pizzaSizes, function(e){return e.Id == pizza.SizeId})
        if (response.data) {
          pizza.edit = false;
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
      Pizza.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.pizzas.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(pizza) {
      pizza.edit = true;
    }

    $scope.addItem = function() {
      $scope.newPizza = {
        FranchiseId: $rootScope.user.FranchiseId,
        PizzaToppings: [],
        PizzaPrices : []
      }
      $scope.pizzaSizes.forEach(function(item) {
        $scope.newPizza.PizzaPrices.push({
          PizzaSizeId: item.Id,
          PizzaSizeName: item.Name
        })
      });
    }

    $scope.setPizzasToppings = function(pizza) {
      //for index table
      pizza.toppings = []
      pizza.PizzaToppings.forEach(function(pt) {
        var top = _.find($scope.toppings, function(e) {
          return e.Id == pt.ToppingId
        });
        if (top != undefined) pizza.toppings.push(top);
        pt.Topping = top;
      });

    }

    //-----------------------Start------------------
    $scope.getPizzas();
  }
}());

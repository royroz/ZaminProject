(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name pizzaForm.controller:PizzaFormCtrl
   *
   * @description
   *
   */
  angular
    .module('pizzaForm')
    .controller('PizzaFormCtrl', PizzaFormCtrl);

  function PizzaFormCtrl($scope, $rootScope, $location, $mdDialog, $state, $stateParams, Pizza, PizzaSize, Topping) {
    $scope.pizzaSizes = [];
    $scope.toppings = [];
    $scope.imageVersion = 1;
    $scope.pizza = undefined;
    $scope.editMode = $state.current.name == 'pizzaFormEdit';

    //---------------Get functions---------------------
    $scope.getPizza = function() {
      showLoader();
      Pizza.getPizza($stateParams.pizzaId).then(function(response) {
        $scope.pizza = response.data;
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
          if (_.find($scope.pizza.PizzaPrices, function(e) {
              return e.PizzaSizeId == size.Id
            }) == undefined) {
            //No price for this size
            $scope.pizza.PizzaPrices.push({
              PizzaSizeId: size.Id,
              PizzaSizeName: size.Name
            });
          }
        });
        hideLoader();
      });
    }

    $scope.getToppings = function() {
      showLoader();
      Topping.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.toppings = response.data;
        $scope.setPizzasToppings($scope.pizza);
        hideLoader();
      });
    }

    //---------------Post functions--------------------

    $scope.save = function() {
      if ($scope.editMode) {
        $scope.update($scope.pizza);
      } else {
        $scope.create();
      }
    }

    $scope.create = function() {
      showLoader();
      if ($scope.pizza.toppings != undefined) {
        if ($scope.pizza.PizzaToppings == undefined) $scope.pizza.PizzaToppings = [];
        $scope.pizza.toppings.forEach(function(top) {
          $scope.pizza.PizzaToppings.push({
            ToppingId: top.Id,
            Topping: top
          })
        })
      }
      Pizza.create($scope.pizza).then(function(response) {
        if (response.data.Success) {
          $location.path("pizza");
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
        if (response.data) {
          $location.path("pizza");
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------

    $scope.addItem = function() {
      $scope.pizza = {
        FranchiseId: $rootScope.user.FranchiseId,
        PizzaToppings: [],
        PizzaPrices: []
      }
      $scope.pizzaSizes.forEach(function(item) {
        $scope.pizza.PizzaPrices.push({
          PizzaSizeId: item.Id,
          PizzaSizeName: item.Name
        })
      });
      $scope.getToppings();
      $scope.getPizzaSizes();
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


    //Start
    if ($scope.editMode) $scope.getPizza();
    else {
      $scope.addItem();
    }
  }
}());

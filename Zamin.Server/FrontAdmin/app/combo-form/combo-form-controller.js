(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name comboForm.controller:ComboFormCtrl
   *
   * @description
   *
   */
  angular
    .module('comboForm')
    .controller('ComboFormCtrl', ComboFormCtrl);

  function ComboFormCtrl($scope, $rootScope, $mdpDatePicker, $mdpTimePicker, $stateParams, $state, $location, Pizza, Category, ComboForm, PizzaSize) {
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.startTime = undefined;
    $scope.endTime = undefined;
    $scope.pizzas = [];
    $scope.categories = [];
    $scope.combo = {};
    $scope.comboOriginal = {};
    $scope.combo.PizzaCombos = [];
    $scope.combo.Pizzas = [];
    $scope.combo.ItemCombos = [];
    $scope.pizza = undefined;
    $scope.items = undefined;
    $scope.editMode = $state.current.name == 'comboFormUpdate';
    $scope.pizzaSizes = [];

    $scope.getPizzaSizes = function() {
      showLoader();
      PizzaSize.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzaSizes = response.data;
        hideLoader();
      });
    }();

    $scope.getCombo = function() {
      showLoader();
      ComboForm.getCombo($stateParams.comboId).then(function(response) {
        $scope.combo = response.data;
        $scope.startDate = new Date(response.data.StartDate);
        $scope.endDate = new Date(response.data.EndDate);
        $scope.startTime = new Date(response.data.StartTime);
        $scope.endTime = new Date(response.data.EndTime);
        $scope.comboOriginal = angular.copy(response.data);
        $scope.getPizzas();
        $scope.getCategories();
        hideLoader();

      });
    }

    $scope.getPizzas = function() {
      Pizza.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.pizzas = response.data;
        $scope.combo.Pizzas = [];
        if ($scope.editMode) {
          $scope.combo.PizzaCombos.forEach(function(pizzaCombo) {
            var pizza = _.find($scope.pizzas, function(e) {
              return e.Id == pizzaCombo.PizzaId
            });
            pizza.PizzaId = pizzaCombo.PizzaId;
            pizza.SizeId = pizzaCombo.SizeId;
            pizza.Quantity = pizzaCombo.Quantity;
            pizza.MaxToppings = pizzaCombo.MaxToppings;
            pizza.pizzaComboId = pizzaCombo.Id;

            $scope.combo.Pizzas.push(pizza);
          })
        }
      });
    };

    $scope.getCategories = function() {
      Category.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.categories = response.data;

        $scope.combo.ItemCombos.forEach(function(comboItem) {
          var itemsDb = [];
          comboItem.Items.forEach(function(item) {
            $scope.categories.forEach(function(cat) {
              var temp = _.find(cat.Items, function(e) {
                return e.Id == item.Id
              });

              if (temp != undefined) itemsDb.push(temp);

            })
          });
          comboItem.Items = itemsDb;
        })
      });
    };

    $scope.deleteTableRow = function(tableId, index, ev) {
      if (index > -1) {
        if (tableId == 0) {
          $scope.combo.Pizzas.splice(index, 1);
          $scope.pizzasListChange();
        } else if (tableId == 1) {
          $scope.combo.ItemCombos.splice(index, 1);
        }
      }
    };


    $scope.addItem = function() {
        $scope.combo.ItemCombos.push({
          Name: "",
          Items: [],
          Quantity: 1,
          MaxGarnishes: undefined
        });
      }
      //
      // $scope.selectPizzas = function(){
      //     var pizzacombo = {
      //       PizzaId:$scope.pizza.Id,
      //       Pizza:$scope.pizza,
      //       Quantity:1
      //     }
      //     $scope.combo.PizzaCombos.push(pizzacombo);
      //     $scope.pizza = undefined;
      // };

    // $scope.selectItems = function() {
    //   var itemcombo = {
    //     ItemId: $scope.item.Id,
    //     Item: $scope.item,
    //     Quantity: 1
    //   }
    //   $scope.combo.ItemCombos.push(itemcombo);
    //   $scope.item = undefined;
    // };

    $scope.save = function() {
      $scope.combo.FranchiseId = $rootScope.user.FranchiseId;
      if ($scope.startDate != undefined) $scope.combo.StartDate = $scope.dateTimeToString($scope.startDate, false);
      if ($scope.endDate != undefined) $scope.combo.EndDate = $scope.dateTimeToString($scope.endDate, false);
      if ($scope.startTime != undefined) $scope.combo.StartTime = $scope.dateTimeToString($scope.startTime, true);
      if ($scope.endTime != undefined) $scope.combo.EndTime = $scope.dateTimeToString($scope.endTime, true);
      $scope.combo.PizzaCombos = [];
      $scope.combo.Pizzas.forEach(function(pizza) {
        $scope.combo.PizzaCombos.push({
          Id: pizza.pizzaComboId,
          PizzaId: pizza.Id,
          SizeId: pizza.SizeId,
          Quantity: pizza.Quantity,
          MaxToppings: pizza.MaxToppings
        })
      });

      showLoader();
      if ($scope.editMode) {
        ComboForm.update($scope.combo).then(function(response) {
          if (response.data) {
            $location.path("combo");
          }
          hideLoader();
        });
      } else {
        ComboForm.create($scope.combo).then(function(response) {
          if (response.data) {
            $location.path("combo");
          }
          hideLoader();
        });
      }
    };

    $scope.pizzasListChange = function() {
      console.log($scope.combo.Pizzas);
      $scope.pizzas.forEach(function(pizza) {
        if (_.find($scope.combo.Pizzas, function(e) {
            return e.Id == pizza.Id
          }) == undefined) {
          pizza.PizzaId = undefined;
          pizza.SizeId = undefined;
          pizza.Quantity = undefined;
          pizza.MaxToppings = undefined;
          pizza.pizzaComboId = undefined;
        }

      })
    }


    $scope.dateTimeToString = function(date, isTimeObject) {
      var str = "";
      if (isTimeObject) {
        str = "1/1/1970" + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      } else {
        var month = date.getMonth() + 1;
        str = date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      }
      return str;
    };

    //START
    if ($scope.editMode) $scope.getCombo();
    else {
      $scope.getPizzas();

      $scope.getCategories();
    }

  }
}());

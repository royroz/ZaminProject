(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name pizzaSize.factory:PizzaSize
   *
   * @description
   *
   */
  angular
    .module('pizzaSize')
    .factory('PizzaSize', PizzaSize);

  function PizzaSize($http, consts) {
    var PizzaSizeBase = {};

    PizzaSizeBase.getAll = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "PizzaSize/GetPizzaSizes",
        params: {
          franchiseId: franchiseId
        }
      });
    };


    PizzaSizeBase.create = function(pizzaSize) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "PizzaSize/CreatePizzaSize",
        data: {
          webModel: pizzaSize
        }
      });
    };


    PizzaSizeBase.update = function(pizzaSize) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "PizzaSize/UpdatePizzaSize",
        data: {
          webModel: pizzaSize
        }
      });
    };


    PizzaSizeBase.delete = function(pizzaSizeId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "PizzaSize/DeletePizzaSize",
        data: {
          id: pizzaSizeId
        }
      });
    };

    return PizzaSizeBase;
  }
}());

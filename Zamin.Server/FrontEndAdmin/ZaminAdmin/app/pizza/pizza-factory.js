(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name pizza.factory:Pizza
   *
   * @description
   *
   */
  angular
    .module('pizza')
    .factory('Pizza', Pizza);

  function Pizza($http, consts) {
    var PizzaBase = {};

    PizzaBase.getAll = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Pizza/GetPizzas",
        params: {
          franchiseId: franchiseId
        }
      });
    };

    PizzaBase.getPizza = function(pizzaId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Pizza/GetPizza",
        params: {
          id: pizzaId
        }
      });
    };


    PizzaBase.create = function(pizza) {
      var fd = new FormData();
      fd.append("Name", pizza.Name);
      fd.append("FranchiseId", pizza.FranchiseId);
      fd.append("Description", pizza.Description);
      fd.append("SizeId", pizza.SizeId);
      fd.append("Price", pizza.Price);
      fd.append("ImageFile", pizza.ImageFile);
      fd.append("Information", pizza.Information);
      pizza.PizzaPrices.forEach(function(price, index) {
        fd.append("PizzaPrices[" + index + "].Price", price.Price);
        fd.append("PizzaPrices[" + index + "].PizzaSizeId", price.PizzaSizeId);
      });

      pizza.PizzaToppings.forEach(function(top, index) {
        fd.append("PizzaToppings[" + index + "].ToppingId", top.ToppingId);
      });
      return $http({
        method: "POST",
        url: consts.serverUrl + "Pizza/CreatePizza",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    PizzaBase.update = function(pizza) {
      var fd = new FormData();
      fd.append("Id", pizza.Id);
      fd.append("Name", pizza.Name);
      fd.append("FranchiseId", pizza.FranchiseId);
      fd.append("Description", pizza.Description);
      fd.append("SizeId", pizza.SizeId);
      fd.append("Price", pizza.Price);
      fd.append("ImageFile", pizza.ImageFile);
      fd.append("Information", pizza.Information);
      pizza.PizzaPrices.forEach(function(price, index) {
        fd.append("PizzaPrices[" + index + "].Price", price.Price);
        fd.append("PizzaPrices[" + index + "].Id", price.Id);
        fd.append("PizzaPrices[" + index + "].PizzaSizeId", price.PizzaSizeId);
        fd.append("PizzaPrices[" + index + "].PizzaId", price.PizzaId);
      });

      pizza.PizzaToppings.forEach(function(top, index) {
        if (top.Id != undefined) fd.append("PizzaToppings[" + index + "].Id", top.Id);
        fd.append("PizzaToppings[" + index + "].ToppingId", top.ToppingId);
      });

      return $http({
        method: "POST",
        url: consts.serverUrl + "Pizza/UpdatePizza",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    PizzaBase.delete = function(pizzaId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Pizza/DeletePizza",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    return PizzaBase;
  }
}());

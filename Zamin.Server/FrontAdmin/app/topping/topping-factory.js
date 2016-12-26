(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name topping.factory:Topping
   *
   * @description
   *
   */
  angular
    .module('topping')
    .factory('Topping', Topping);

  function Topping($http, consts) {
    var ToppingBase = {};
    ToppingBase.getAll = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Topping/GetToppings",
        params: {
          franchiseId: franchiseId
        }
      });
    };


    ToppingBase.create = function(topping) {
      var fd = new FormData();
      fd.append("Name", topping.Name);
      fd.append("FranchiseId", topping.FranchiseId);
      if (topping.ImageFile != undefined) fd.append("ImageFile", topping.ImageFile);
      topping.ToppingPrices.forEach(function(price, index) {
        fd.append("ToppingPrices[" + index + "].Price", price.Price);
        fd.append("ToppingPrices[" + index + "].PizzaSizeId", price.PizzaSizeId);
      });

      return $http({
        method: "POST",
        url: consts.serverUrl + "Topping/CreateTopping",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    ToppingBase.update = function(topping) {
      var fd = new FormData();
      fd.append("Id", topping.Id);
      fd.append("Name", topping.Name);
      fd.append("FranchiseId", topping.FranchiseId);

      if (topping.ImageFile != undefined) fd.append("ImageFile", topping.ImageFile);
      topping.ToppingPrices.forEach(function(price, index) {
        fd.append("ToppingPrices[" + index + "].Price", price.Price);
        fd.append("ToppingPrices[" + index + "].Id", price.Id);
        fd.append("ToppingPrices[" + index + "].PizzaSizeId", price.PizzaSizeId);
        fd.append("ToppingPrices[" + index + "].ToppingId", price.ToppingId);
      });


      return $http({
        method: "POST",
        url: consts.serverUrl + "Topping/UpdateTopping",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    ToppingBase.delete = function(toppingId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Topping/DeleteTopping",
        data: {
          id: toppingId
        }
      });
    };

    return ToppingBase;
  }
}());

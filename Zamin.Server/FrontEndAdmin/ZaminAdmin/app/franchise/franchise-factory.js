(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name franchise.factory:Franchise
   *
   * @description
   *
   */
  angular
    .module('franchise')
    .factory('Franchise', Franchise);

  function Franchise($http, consts) {
    var FranchiseBase = {};

    FranchiseBase.getAll = function () {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Franchise/GetFranchises",
      });
    };


    FranchiseBase.delete = function(franchiseId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Franchise/DeleteFranchise",
        data: {
          id: franchiseId
        }
      });
    };

    return FranchiseBase;
  }
}());

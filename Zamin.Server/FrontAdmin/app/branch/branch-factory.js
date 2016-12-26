(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name branch.factory:Branch
   *
   * @description
   *
   */
  angular
    .module('branch')
    .factory('Branch', Branch);

  function Branch($http, consts) {
    var BranchBase = {};

    BranchBase.getAll = function (franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Branch/GetAll",
        params:{
          franchiseId:franchiseId
        }
      });
    };


    return BranchBase;
  }
}());

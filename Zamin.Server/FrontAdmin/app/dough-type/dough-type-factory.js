(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name doughType.factory:DoughType
   *
   * @description
   *
   */
  angular
    .module('doughType')
    .factory('DoughType', DoughType);

  function DoughType($http, consts) {
    var DoughTypeBase = {};

    DoughTypeBase.getAll = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "DoughType/GetDoughTypes",
        params: {
          franchiseId: franchiseId
        }
      });
    };


    DoughTypeBase.create = function(doughType) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "DoughType/CreateDoughType",
        data: {
          webModel: doughType
        }
      });
    };


    DoughTypeBase.update = function(doughType) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "DoughType/UpdateDoughType",
        data: {
          webModel: doughType
        }
      });
    };


    DoughTypeBase.delete = function(doughTypeId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "DoughType/DeleteDoughType",
        data: {
          id: doughTypeId
        }
      });
    };


    return DoughTypeBase;
  }
}());

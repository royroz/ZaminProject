(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name combo.factory:Combo
   *
   * @description
   *
   */
  angular
    .module('combo')
    .factory('Combo', Combo);

  function Combo($http, consts) {
    var ComboBase = {};

    ComboBase.getCombos = function (franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Combo/GetCombos",
        params:{
          franchiseId:franchiseId
        }
      });
    };

    ComboBase.delete = function(comboId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Combo/DeleteCombo",
        data: {
          id: comboId
        }
      });
    };

    return ComboBase;
  }
}());

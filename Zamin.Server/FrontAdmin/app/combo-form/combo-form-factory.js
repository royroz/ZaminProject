(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name comboForm.factory:ComboForm
   *
   * @description
   *
   */
  angular
    .module('comboForm')
    .factory('ComboForm', ComboForm);

  function ComboForm($http, consts) {
    var ComboFormBase = {};


    ComboFormBase.create = function(combo) {
      var fd = new FormData();
      fd.append("Name", combo.Name);
      fd.append("ImageFile", combo.ImageFile);
      fd.append("FranchiseId", combo.FranchiseId);
      fd.append("Description", combo.Description);
      combo.ItemCombos.forEach(function(itemCombo, i){
          fd.append("ItemCombos[" + i + "].Name", itemCombo.Name);
          fd.append("ItemCombos[" + i + "].Quantity", itemCombo.Quantity);
          fd.append("ItemCombos[" + i + "].MaxGarnishes", itemCombo.MaxGarnishes);
          itemCombo.Items.forEach(function(item, j){
                fd.append("ItemCombos[" + i + "].Items[" + j + "].Id", item.Id);
          })
      });
      combo.PizzaCombos.forEach(function(pizza, index){
          fd.append("PizzaCombos[" + index + "].PizzaId", pizza.PizzaId);
          fd.append("PizzaCombos[" + index + "].Quantity", pizza.Quantity);
          fd.append("PizzaCombos[" + index + "].MaxToppings", pizza.MaxToppings);
          fd.append("PizzaCombos[" + index + "].SizeId", pizza.SizeId);
      });

      fd.append("Price", combo.Price);
      fd.append("StartDate", combo.StartDate);
      fd.append("EndDate", combo.EndDate);
      fd.append("StartTime", combo.StartTime);
      fd.append("EndTime", combo.EndTime);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Combo/CreateCombo",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    ComboFormBase.update = function(combo) {
      var fd = new FormData();
      fd.append("Id", combo.Id);
      fd.append("Name", combo.Name);
      fd.append("ImageFile", combo.ImageFile);
      fd.append("FranchiseId", combo.FranchiseId);
      fd.append("Description", combo.Description);
      combo.ItemCombos.forEach(function(itemCombo, i){
          fd.append("ItemCombos[" + i + "].Id", itemCombo.Id);
          fd.append("ItemCombos[" + i + "].Name", itemCombo.Name);
          fd.append("ItemCombos[" + i + "].Quantity", itemCombo.Quantity);
          fd.append("ItemCombos[" + i + "].MaxGarnishes", itemCombo.MaxGarnishes);
          itemCombo.Items.forEach(function(item, j){
                fd.append("ItemCombos[" + i + "].Items[" + j + "].Id", item.Id);
          })
      });

      combo.PizzaCombos.forEach(function(pizza, index){
          fd.append("PizzaCombos[" + index + "].Id", pizza.Id);
          fd.append("PizzaCombos[" + index + "].PizzaId", pizza.PizzaId);
          fd.append("PizzaCombos[" + index + "].Quantity", pizza.Quantity);
          fd.append("PizzaCombos[" + index + "].MaxToppings", pizza.MaxToppings);
          fd.append("PizzaCombos[" + index + "].SizeId", pizza.SizeId);
      });

      fd.append("Price", combo.Price);
      fd.append("StartDate", combo.StartDate);
      fd.append("EndDate", combo.EndDate);
      fd.append("StartTime", combo.StartTime);
      fd.append("EndTime", combo.EndTime);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Combo/UpdateCombo",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    ComboFormBase.getCombo = function(comboId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Combo/GetCombo",
        params: {
          id: comboId
        }
      });
    };

    return ComboFormBase;
  }
}());

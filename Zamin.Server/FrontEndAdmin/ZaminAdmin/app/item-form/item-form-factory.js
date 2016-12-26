(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name itemForm.factory:ItemForm
   *
   * @description
   *
   */
  angular
    .module('itemForm')
    .factory('ItemForm', ItemForm);

  function ItemForm($http, consts) {
    var ItemFormBase = {};

    ItemFormBase.getItem = function(itemId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Item/GetItem",
        params: {
          id: itemId
        }
      });
    };


    ItemFormBase.create = function(item) {
      var fd = new FormData();
      fd.append("Name", item.Name);
      fd.append("CategoryId", item.CategoryId);
      fd.append("Image", item.Image);
      fd.append("Price", item.Price);
      fd.append("Information", item.Information);

      if (item.Garnishes != undefined) {
        item.Garnishes.forEach(function(gar, index) {
          fd.append("Garnishes[" + index + "].Name", gar.Name);
          fd.append("Garnishes[" + index + "].Price", gar.Price);
        })
      }

      return $http({
        method: "POST",
        url: consts.serverUrl + "Item/CreateItem",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    ItemFormBase.update = function(item) {
      var fd = new FormData();
      fd.append("Id", item.Id);
      fd.append("Name", item.Name);
      fd.append("CategoryId", item.CategoryId);
      fd.append("Image", item.Image);
      fd.append("Price", item.Price);
      fd.append("Information", item.Information);
      item.Garnishes.forEach(function(gar, index) {
        if (gar.Id != undefined) fd.append("Garnishes[" + index + "].Id", gar.Id);
        fd.append("Garnishes[" + index + "].Name", gar.Name);
        fd.append("Garnishes[" + index + "].Price", gar.Price);
        fd.append("Garnishes[" + index + "].ItemId", gar.ItemId);
      })

      return $http({
        method: "POST",
        url: consts.serverUrl + "Item/UpdateItem",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    ItemFormBase.deleteGarnish = function(garnishId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Item/DeleteGarnish",
        data: {
          garnishId: garnishId
        }
      });
    }

    return ItemFormBase;
  }
}());

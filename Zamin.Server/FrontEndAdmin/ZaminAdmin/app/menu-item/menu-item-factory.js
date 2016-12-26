(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name menuItem.factory:MenuItem
   *
   * @description
   *
   */
  angular
    .module('menuItem')
    .factory('MenuItem', MenuItem);

  function MenuItem($http, consts) {
    var MenuItemBase = {};


        MenuItemBase.getItemByCategoryId = function(categoryId) {
          return $http({
            method: "GET",
            url: consts.serverUrl + "Item/GetItemsByCategory",
            params: {
              categoryId: categoryId
            }
          });
        };


        MenuItemBase.create = function(item) {

          var fd = new FormData();
          fd.append("Name", item.Name);
          fd.append("Image", item.Image);
          fd.append("CategoryId", item.CategoryId);
          fd.append("CategoryId", item.CategoryId);

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


        MenuItemBase.update = function(item) {
          var fd = new FormData();

          fd.append("Id", item.Id);
          fd.append("Name", item.Name);
          fd.append("FranchiseId", item.FranchiseId);
          fd.append("Image", item.Image);
          fd.append("CategoryId", item.CategoryId);

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


        MenuItemBase.delete = function(itemId) {
          return $http({
            method: "POST",
            url: consts.serverUrl + "Item/DeleteItem",
            data: {
              id: itemId
            }
          });
        };


    return MenuItemBase;
  }
}());

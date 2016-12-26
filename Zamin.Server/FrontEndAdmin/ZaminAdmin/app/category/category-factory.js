(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name category.factory:Category
   *
   * @description
   *
   */
  angular
    .module('category')
    .factory('Category', Category);

  function Category($http, consts) {
    var CategoryBase = {};

    CategoryBase.getAll = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Category/GetCategories",
        params: {
          franchiseId: franchiseId
        }
      });
    };


    CategoryBase.create = function(categpry) {

      var fd = new FormData();
      fd.append("Name", categpry.Name);
      fd.append("FranchiseId", categpry.FranchiseId);
      fd.append("Image", categpry.Image);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Category/CreateCategory",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    CategoryBase.update = function(categpry) {
      var fd = new FormData();

      fd.append("Id", categpry.Id);
      fd.append("Name", categpry.Name);
      fd.append("FranchiseId", categpry.FranchiseId);
      fd.append("Image", categpry.Image);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Category/UpdateCategory",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    CategoryBase.delete = function(categpryId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Category/DeleteCategory",
        data: {
          id: categpryId
        }
      });
    };


    return CategoryBase;
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name categories.factory:Categories
   *
   * @description
   *
   */
  angular
    .module('categories')
    .factory('Categories', Categories);

  function Categories($http, consts) {
    var CategoriesBase = {};

    CategoriesBase.getAll = function() {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Categories/GetCategories"
      });
    };

    CategoriesBase.create = function(category) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Categories/CreateCategory",
        data: {
          webModel: category
        }
      });
    };

    CategoriesBase.update = function(category) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Categories/UpdateCategory",
        data: {
          webModel: category
        }
      });
    };

    CategoriesBase.delete = function(categoryId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Categories/Deletecategory",
        data: {
          id: categoryId
        }
      });
    };

    return CategoriesBase;
  }
}());

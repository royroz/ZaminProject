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
        url: consts.serverUrl + "Category/GetCategories"
      });
    };

    // CategoriesBase.create = function(category) {
    //   return $http({
    //     method: "POST",
    //     url: consts.serverUrl + "Category/SaveCategory",
    //     data: {
    //       webModel: category
    //     }
    //   });
    // };

    CategoriesBase.update = function(category) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Category/SaveCategory",
        data: {
          category: category
        }
      });
    };

    CategoriesBase.delete = function(categoryId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Category/DeleteCategory",
        data: {
          categoryId: categoryId
        }
      });
    };

    return CategoriesBase;
  }
}());

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

  function Categories() {
    var CategoriesBase = {};
    CategoriesBase.someValue = 'Categories';
    CategoriesBase.someMethod = function () {
      return 'Categories';
    };
    return CategoriesBase;
  }
}());

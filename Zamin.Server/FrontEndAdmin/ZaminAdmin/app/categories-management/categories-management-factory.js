(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name categoriesManagement.factory:CategoriesManagement
   *
   * @description
   *
   */
  angular
    .module('categoriesManagement')
    .factory('CategoriesManagement', CategoriesManagement);

  function CategoriesManagement() {
    var CategoriesManagementBase = {};
    CategoriesManagementBase.someValue = 'CategoriesManagement';
    CategoriesManagementBase.someMethod = function () {
      return 'CategoriesManagement';
    };
    return CategoriesManagementBase;
  }
}());

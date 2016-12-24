(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name categoriesManagement.controller:CategoriesManagementCtrl
   *
   * @description
   *
   */
  angular
    .module('categoriesManagement')
    .controller('CategoriesManagementCtrl', CategoriesManagementCtrl);

  function CategoriesManagementCtrl() {
    var vm = this;
    vm.ctrlName = 'CategoriesManagementCtrl';
  }
}());

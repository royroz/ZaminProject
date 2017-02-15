(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name categories.controller:CategoriesCtrl
   *
   * @description
   *
   */
  angular
    .module('categories')
    .controller('CategoriesCtrl', CategoriesCtrl);

  function CategoriesCtrl() {
    var vm = this;
    vm.ctrlName = 'CategoriesCtrl';
  }
}());

(function () {
  'use strict';

  angular
    .module('categories')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('categories', {
        url: '/categories',
        templateUrl: 'categories/categories.tpl.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'categories'
      });
  }
}());

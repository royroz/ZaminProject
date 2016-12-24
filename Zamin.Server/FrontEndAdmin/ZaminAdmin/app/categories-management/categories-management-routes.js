(function () {
  'use strict';

  angular
    .module('categoriesManagement')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('categoriesManagement', {
        url: '/categories-management',
        views: {
          'mainView': {
            templateUrl: 'categories-management/categories-management.tpl.html',
            controller: 'CategoriesManagementCtrl',
            controllerAs: 'categoriesManagement'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }

      });
  }
}());

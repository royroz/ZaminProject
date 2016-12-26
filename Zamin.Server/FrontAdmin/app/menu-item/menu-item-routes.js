(function() {
  'use strict';

  angular
    .module('menuItem')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('menuItem', {
        url: '/menu-item/:categoryId/:categoryName',
        views: {
          'mainView': {
            templateUrl: 'menu-item/menu-item.tpl.html',
            controller: 'MenuItemCtrl',
            controllerAs: 'menuItem'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

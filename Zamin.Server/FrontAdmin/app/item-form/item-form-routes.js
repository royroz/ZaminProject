(function () {
  'use strict';

  angular
    .module('itemForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('itemForm', {
        url: '/item-form/:categoryId/:categoryName',
        views: {
          'mainView': {
            templateUrl: 'item-form/item-form.tpl.html',
            controller: 'ItemFormCtrl',
            controllerAs: 'itemForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }

      })
      .state('itemFormUpdate', {
        url: '/item-form/:categoryId/:categoryName/:itemId',
        views: {
          'mainView': {
            templateUrl: 'item-form/item-form.tpl.html',
            controller: 'ItemFormCtrl',
            controllerAs: 'itemForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

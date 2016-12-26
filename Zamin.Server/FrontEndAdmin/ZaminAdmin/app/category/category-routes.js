(function () {
  'use strict';

  angular
    .module('category')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category',
        views:{
          'mainView':{
            templateUrl: 'category/category.tpl.html',
            controller: 'CategoryCtrl',
            controllerAs: 'category'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

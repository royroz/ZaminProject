(function () {
  'use strict';

  angular
    .module('topping')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('topping', {
        url: '/topping',
        views:{
          'mainView':{
            templateUrl: 'topping/topping.tpl.html',
            controller: 'ToppingCtrl',
            controllerAs: 'topping'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

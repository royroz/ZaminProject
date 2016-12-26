(function () {
  'use strict';

  angular
    .module('pizza')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('pizza', {
        url: '/pizza',
        views:{
          'mainView':{
            templateUrl: 'pizza/pizza.tpl.html',
            controller: 'PizzaCtrl',
            controllerAs: 'pizza'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

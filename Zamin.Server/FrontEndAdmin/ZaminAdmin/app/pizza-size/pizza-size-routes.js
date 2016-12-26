(function () {
  'use strict';

  angular
    .module('pizzaSize')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('pizzaSize', {
        url: '/pizza-size',
        views:{
          'mainView':{
            templateUrl: 'pizza-size/pizza-size.tpl.html',
            controller: 'PizzaSizeCtrl',
            controllerAs: 'pizzaSize'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

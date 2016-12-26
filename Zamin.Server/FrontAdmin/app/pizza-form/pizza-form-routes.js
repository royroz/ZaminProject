(function () {
  'use strict';

  angular
    .module('pizzaForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('pizzaForm', {
        url: '/pizza-form',
        views:{
          'mainView':{
            templateUrl: 'pizza-form/pizza-form.tpl.html',
            controller: 'PizzaFormCtrl',
            controllerAs: 'pizzaForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('pizzaFormEdit', {
        url: '/pizza-form/:pizzaId',
        views:{
          'mainView':{
            templateUrl: 'pizza-form/pizza-form.tpl.html',
            controller: 'PizzaFormCtrl',
            controllerAs: 'pizzaForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

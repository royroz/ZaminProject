(function () {
  'use strict';

  angular
    .module('comboForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('comboForm', {
        url: '/combo-form',
        views:{
          'mainView':{
            templateUrl: 'combo-form/combo-form.tpl.html',
            controller: 'ComboFormCtrl',
            controllerAs: 'comboForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('comboFormUpdate', {
        url: '/combo-form/:comboId',
        views:{
          'mainView':{
            templateUrl: 'combo-form/combo-form.tpl.html',
            controller: 'ComboFormCtrl',
            controllerAs: 'comboForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      });

  }
}());

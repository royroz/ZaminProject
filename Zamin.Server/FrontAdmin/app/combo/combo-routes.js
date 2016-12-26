(function () {
  'use strict';

  angular
    .module('combo')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('combo', {
        url: '/combo',
        views:{
          'mainView':{
            templateUrl: 'combo/combo.tpl.html',
            controller: 'ComboCtrl',
            controllerAs: 'combo'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

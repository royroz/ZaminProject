(function () {
  'use strict';

  angular
    .module('doughType')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('doughType', {
        url: '/dough-type',
        views:{
          'mainView':{
            templateUrl: 'dough-type/dough-type.tpl.html',
            controller: 'DoughTypeCtrl',
            controllerAs: 'doughType'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

(function () {
  'use strict';

  angular
    .module('franchise')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('franchise', {
        url: '/franchise',
        views:{
          'mainView':{
            templateUrl: 'franchise/franchise.tpl.html',
            controller: 'FranchiseCtrl',
            controllerAs: 'franchise'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }

      });
  }
}());

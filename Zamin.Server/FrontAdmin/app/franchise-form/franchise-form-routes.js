(function() {
  'use strict';

  angular
    .module('franchiseForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('franchiseForm', {
        url: '/franchise-form',
        views: {
          'mainView': {
            templateUrl: 'franchise-form/franchise-form.tpl.html',
            controller: 'FranchiseFormCtrl',
            controllerAs: 'franchiseForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('franchiseFormUpdate', {
        url: '/franchise-form/:franchiseId',
        views: {
          'mainView': {
            templateUrl: 'franchise-form/franchise-form.tpl.html',
            controller: 'FranchiseFormCtrl',
            controllerAs: 'franchiseForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

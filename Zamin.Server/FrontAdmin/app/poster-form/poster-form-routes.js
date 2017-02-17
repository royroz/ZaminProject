(function() {
  'use strict';

  angular
    .module('posterForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('posterForm', {
        url: '/poster-form',
        views: {
          'mainView': {
            templateUrl: 'poster-form/poster-form.tpl.html',
            controller: 'PosterFormCtrl',
            controllerAs: 'posterForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('posterFormUpdate', {
        url: '/poster-form/:posterId',
        views: {
          'mainView': {
            templateUrl: 'poster-form/poster-form.tpl.html',
            controller: 'PosterFormCtrl',
            controllerAs: 'posterForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

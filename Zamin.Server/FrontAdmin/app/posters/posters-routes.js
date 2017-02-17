(function () {
  'use strict';

  angular
    .module('posters')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('posters', {
        url: '/posters',
        views: {
          'mainView': {
            templateUrl: 'posters/posters.tpl.html',
            controller: 'PostersCtrl',
            controllerAs: 'posters'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
    }
    }());

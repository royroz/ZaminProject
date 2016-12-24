(function() {
  'use strict';

  angular
    .module('home')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'mainView': {
            templateUrl: 'home/home.tpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          },
          'menuView': {
              templateUrl: 'sideNav.html'
          }
        }

      });
  }
}());

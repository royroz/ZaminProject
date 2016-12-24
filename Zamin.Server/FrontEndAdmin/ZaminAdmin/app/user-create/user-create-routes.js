(function () {
  'use strict';

  angular
    .module('userCreate')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('userCreate', {
        url: '/user-create',

        views: {
          'mainView': {
            templateUrl: 'user-create/user-create.tpl.html',
            controller: 'UserCreateCtrl',
            controllerAs: 'userCreate'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }

      }).state('userCreateUpdate', {
        url: '/user-create/:userId',

        views: {
          'mainView': {
            templateUrl: 'user-create/user-create.tpl.html',
            controller: 'UserCreateCtrl',
            controllerAs: 'userCreate'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }

      });
  }
}());

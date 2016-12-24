(function() {
  'use strict';

  angular
    .module('userManagement')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('userManagement', {
        url: '/user-management',
        views: {
          'mainView': {
            templateUrl: 'user-management/user-management.tpl.html',
            controller: 'UserManagementCtrl',
            controllerAs: 'userManagement'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }

      });
  }
}());

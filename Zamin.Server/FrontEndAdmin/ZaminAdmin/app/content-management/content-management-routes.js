(function () {
  'use strict';

  angular
    .module('contentManagement')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('contentManagement', {
        url: '/content-management',
        views: {
          'mainView': {
            templateUrl: 'content-management/content-management.tpl.html',
            controller: 'ContentManagementCtrl',
            controllerAs: 'contentManagement'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }

      });
  }
}());

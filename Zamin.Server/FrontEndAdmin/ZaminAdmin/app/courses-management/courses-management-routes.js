(function () {
  'use strict';

  angular
    .module('coursesManagement')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('coursesManagement', {
        url: '/courses-management',
        views: {
          'mainView': {
            templateUrl: 'courses-management/courses-management.tpl.html',
            controller: 'CoursesManagementCtrl',
            controllerAs: 'coursesManagement'
          },
          'menuView': {
            templateUrl: 'sideNav.html'
          }
        }
      });
  }
}());

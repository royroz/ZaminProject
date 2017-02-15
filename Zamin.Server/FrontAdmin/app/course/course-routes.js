(function() {
  'use strict';

  angular
    .module('course')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('course', {
        url: '/course',
        views: {
          'mainView': {
            templateUrl: 'course/course.tpl.html',
            controller: 'CourseCtrl',
            controllerAs: 'course'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

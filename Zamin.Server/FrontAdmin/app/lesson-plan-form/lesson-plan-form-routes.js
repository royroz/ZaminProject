(function() {
  'use strict';

  angular
    .module('lessonPlanForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('lessonPlanForm', {
        url: '/lesson-plan-form',
        views: {
          'mainView': {
            templateUrl: 'lesson-plan-form/lesson-plan-form.tpl.html',
            controller: 'LessonPlanFormCtrl',
            controllerAs: 'lessonPlanForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('lessonPlanFormUpdate', {
        url: '/lesson-plan-form/:lessonPlanId',
        views: {
          'mainView': {
            templateUrl: 'lesson-plan-form/lesson-plan-form.tpl.html',
            controller: 'LessonPlanFormCtrl',
            controllerAs: 'lessonPlanForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('lessonPlan')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('lessonPlan', {
        url: '/lesson-plan',
        views:{
          'mainView':{
            templateUrl:'lesson-plan/lesson-plan.tpl.html',
            controller:'LessonPlanCtrl',
            controllerAs:'lessonPlan'
          },
          'layoutView':{
            templateUrl:'partials/layoutView.html'
          }
        }
      });
    }
  }());



      

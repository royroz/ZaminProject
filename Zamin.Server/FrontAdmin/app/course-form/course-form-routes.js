(function () {
  'use strict';

  angular
    .module('courseForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('courseForm', {
        url: '/course-form',
        views: {
                  'mainView': {
                    templateUrl: 'course-form/course-form.tpl.html',
                    controller: 'CourseFormCtrl',
                    controllerAs: 'courseForm'
                  },
                  'layoutView': {
                    templateUrl: 'partials/layoutView.html'
                  }
                }
              })
              .state('courseFormUpdate', {
                url: '/course-form/:courseId',
                views: {
                  'mainView': {
                    templateUrl: 'course-form/course-form.tpl.html',
                    controller: 'CourseFormCtrl',
                    controllerAs: 'courseForm'
                  },
                  'layoutView': {
                    templateUrl: 'partials/layoutView.html'
                  }
                }
              });
          }
        }());

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name lessonPlan.factory:LessonPlan
   *
   * @description
   *
   */
  angular
    .module('lessonPlan')
    .factory('LessonPlan', LessonPlan);

  function LessonPlan($http ,consts) {
    var LessonPlanBase = {};

        LessonPlanBase.getAll = function () {
            return $http({
              method: "GET",
              url: consts.serverUrl + "LessonPlan/GetLessonPlans",
            });
          };


          LessonPlanBase.delete = function(lessonPlanId) {
            return $http({
              method: "POST",
              url: consts.serverUrl + "Poster/DeleteLessonPlan",
              data: {
                lessonPlanId: lessonPlanId
              }
            });
          };
        return LessonPlanBase;
      }
    }());

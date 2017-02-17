(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name lessonPlanForm.factory:LessonPlanForm
   *
   * @description
   *
   */
  angular
    .module('lessonPlanForm')
    .factory('LessonPlanForm', LessonPlanForm);

  function LessonPlanForm() {
    var LessonPlanFormBase = {};



    LessonPlanFormBase.getLessonPlan = function(lessonPlanId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "LessonPlan/GetLessonPlan",
        params: {
          lessonPlanId: lessonPlanId
        }
      });
    };

    LessonPlanFormBase.save = function(lessonPlan) {
      var fd = new FormData();
      fd.append("Id", lessonPlan.Id);
      fd.append("Name", lessonPlan.Name);
      if (lessonPlan.Description != undefined) fd.append("Description", lessonPlan.Description);
  //TODO - Cheak *****************************************************************************************************************
      // lessonPlan.Presentations.forEach(function(presentation,index){
      //   fd.append("Presentations[" + index + "].FileUrl", presentation.FileUrl);
      // });
      // lessonPlan.WrittenLessonPlans.forEach(function(writtenLessonPlans,index){
      //   fd.append("WrittenLessonPlans[" + index + "].FileUrl", writtenLessonPlans.FileUrl);
      // });
  // Cheak *****************************************************************************************************************

      if (lessonPlan.IsAuthorizedContent != undefined) fd.append("IsAuthorizedContent", lessonPlan.IsAuthorizedContent);

      lessonPlan.Tags.forEach(function(tag, index) {
        fd.append("Tags[" + index + "].Id", tag.Id);
        fd.append("Tags[" + index + "].TagName", tag.TagName);
      });

      return $http({
        method: "POST",
        url: consts.serverUrl + "LessonPlan/SaveLessonPlan",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    LessonPlanFormBase.getTags = function() {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Tag/GetTags"
      });
    }
    return LessonPlanFormBase;
  }
}());

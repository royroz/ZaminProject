(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name courseForm.factory:CourseForm
   *
   * @description
   *
   */
  angular
    .module('courseForm')
    .factory('CourseForm', CourseForm);

  function CourseForm($http, consts) {
    var CourseFormBase = {};


    CourseFormBase.getCourse = function(courseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Course/GetCourse",
        params: {
          courseId: courseId
        }
      });
    };

    CourseFormBase.save = function(course) {
      var fd = new FormData();
      fd.append("Id", course.Id);
      fd.append("Name", course.Name);
      if (course.Description != undefined) fd.append("Description", course.Description);
      if (course.ImageFile != undefined) fd.append("ImageFile", course.ImageFile);
      if (course.CourseCategoryId != undefined) fd.append("CourseCategoryId", course.CourseCategoryId);
      if (course.IsAuthorizedContent != undefined) fd.append("IsAuthorizedContent", course.IsAuthorizedContent);

      course.Tags.forEach(function(tag, index) {
        fd.append("Tags[" + index + "].Id", tag.Id);
        fd.append("Tags[" + index + "].TagName", tag.TagName);
      });

      return $http({
        method: "POST",
        url: consts.serverUrl + "Course/SaveCourse",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };



    CourseFormBase.getCategories = function() {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Category/GetCategories"
      });
    }

    CourseFormBase.getTags = function() {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Tag/GetTags"
      });
    }
    return CourseFormBase;
  }
}());

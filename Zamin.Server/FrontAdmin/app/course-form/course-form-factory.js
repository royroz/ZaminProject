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

    CourseFormBase.create = function(course) {
      var fd = new FormData();
      fd.append("Name", course.Name);
      if (course.Description != undefined) fd.append("Description", course.Description);
      if (course.ImageFile != undefined) fd.append("ImageFile", course.ImageFile);
      if (course.CourseCategory != undefined) fd.append("CourseCategoryId", course.CourseCategory.Id);
      if (course.IsAuthorizedContent != undefined) fd.append("IsAuthorizedContent", course.IsAuthorizedContent);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Course/CreateCourse",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    CourseFormBase.update = function(course) {
      var fd = new FormData();
      fd.append("Name", course.Name);
      if (course.Description != undefined) fd.append("Description", course.Description);
      if (course.ImageFile != undefined) fd.append("ImageFile", course.ImageFile);
      if (course.CourseCategory != undefined) fd.append("CourseCategoryId", course.CourseCategory.Id);
      if (course.IsAuthorizedContent != undefined) fd.append("IsAuthorizedContent", course.IsAuthorizedContent);

      return $http({
        method: "POST",
        url: consts.serverUrl + "Course/UpdateCourse",
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

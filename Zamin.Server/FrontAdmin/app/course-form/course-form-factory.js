(function () {
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
          id: courseId
        }
      });
    };

    CourseFormBase.create = function(course) {
      var fd = new FormData();
      fd.append("Name", course.Name);
      if(course.ManagerName != undefined) fd.append("ManagerName", course.ManagerName);
      fd.append("ImageFile", franchise.ImageFile);
      if(course.Description != undefined) fd.append("Description", course.Description);



      if (course.GalleryFiles != undefined) {
        course.GalleryFiles.forEach(function(file, index) {
          fd.append("GalleryFiles[" + index + "]", file);
        });
      }

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
      fd.append("Id", course.Id);
      fd.append("Name", course.Name);

      fd.append("ImageFile", course.ImageFile);
              if(course.Description != undefined) fd.append("Description", course.Description);

      if (course.GalleryFiles != undefined) {
        course.GalleryFiles.forEach(function(file, index) {
          fd.append("GalleryFiles[" + index + "]", file);
        });
      }
      if (course.GalleryUrlsToDelete != undefined) {
        course.GalleryUrlsToDelete.forEach(function(file, index) {
          fd.append("GalleryUrlsToDelete[" + index + "]", file);
        });
      }


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


    CourseFormBase.deleteLesson = function(lessonId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Lesson/DeleteLesson",
        data: {
          id: lessonId
        }
      });
    }
    return CourseFormBase;
  }
}());

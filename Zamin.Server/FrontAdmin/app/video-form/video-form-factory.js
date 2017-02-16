(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name videoForm.factory:VideoForm
   *
   * @description
   *
   */
  angular
    .module('videoForm')
    .factory('VideoForm', VideoForm);

  function VideoForm() {
    var VideoFormBase = {};
    VideoFormBase.someValue = 'VideoForm';
    VideoFormBase.someMethod = function () {
      return 'VideoForm';
    };
    return VideoFormBase;
  }
}());

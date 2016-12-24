(function () {
  'use strict';

  /* @ngdoc object
   * @name zaminAdmin
   * @description
   *
   */
  angular
    .module('zaminAdmin', [
      'ngAria',
      'ngMaterial',
      'ui.router',
      'home',
      'login',
      'userManagement',
      'categoriesManagement',
      'contentManagement',
      'coursesManagement',
      'userCreate'
    ]).constant("consts", {
       serverUrl: "http://zamin/"
    })
}());

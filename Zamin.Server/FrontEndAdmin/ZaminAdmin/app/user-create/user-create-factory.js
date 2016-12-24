(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name userCreate.factory:UserCreate
   *
   * @description
   *
   */
  angular
    .module('userCreate')
    .factory('UserCreate', UserCreate);

  function UserCreate() {
    var UserCreateBase = {};
    UserCreateBase.someValue = 'UserCreate';
    UserCreateBase.someMethod = function () {
      return 'UserCreate';
    };
    return UserCreateBase;
  }
}());

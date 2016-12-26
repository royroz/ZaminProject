(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name userForm.factory:UserForm
   *
   * @description
   *
   */
  angular
    .module('userForm')
    .factory('UserForm', UserForm);

  function UserForm($http, consts) {
    var UserFormBase = {};

    UserFormBase.getUser = function (userId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "User/GetUser",
        params:{
          userId : userId
        }
      });
    };

    UserFormBase.create = function (user) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "User/Create",
        data:{
          user : user
        }
      });
    };


    UserFormBase.update = function (user) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "User/Update",
        data:{
          user : user
        }
      });
    };
    return UserFormBase;
  }
}());

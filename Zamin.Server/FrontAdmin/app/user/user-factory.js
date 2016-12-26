(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.factory:User
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('User', User);

  function User($http, consts) {
    var UserBase = {};

    UserBase.getAllUsers = function (franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "User/GetAllUsers",
        params:{
          franchiseId : franchiseId
        }
      });
    };

    UserBase.delete = function(userId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "User/DeleteUser",
        data: {
          id: userId
        }
      });
    };

    UserBase.lock = function(userId, isLock) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "User/LockUser",
        data: {
          id: userId,
          isLock: isLock
        }
      });
    };
    return UserBase;
  }
}());

(function () {
  'use strict';

  /**
  * @ngdoc service
  * @name userManagement.factory:UserManagement
  *
  * @description
  *
  */
  angular
  .module('userManagement')
  .factory('UserManagement', UserManagement);

  function UserManagement($http,consts) {
    var UserManagementBase = {};

    UserManagementBase.someValue = 'UserManagement';

    UserManagementBase.getGrades=function(){
      return $http({
        method :"GET",
        url: consts.serverUrl +"Grades/GetGrades"
      });
    };

    UserManagementBase.getFilteredUsers=function(gradeId,classroomId,query){
      return $http({
        method : "GET",
        url: consts.serverUrl +"Users/GetFilteredUsers",
        params:{gradeId:gradeId, classroomId:classroomId,query:query}
      })
    }
    UserManagementBase.checkIfEmailIsTaken=function(email){
      return $http({
        method:"GET",
        url:consts.serverUrl+ "Users/CheckIfEmailIsTaken",
        params:{email:email}
      });
    }
    UserManagementBase.getCreateEditMetaData=function(){
      return $http({
        method:"GET",
        url:consts.serverUrl+"Users/GetCreateEditMetaData"
      });
    }
    UserManagementBase.getUserDetailsById=function(userId){
      return $http({
        method:"GET",
        url:consts.serverUrl+"Users/GetUserDetailsById",
        params:{userId:userId}
      })
    }
    UserManagementBase.CreateUpdateUser=function(userId,email,roleId,gradeId,classroomId,password){
      return $http({
        method:"POST",
        url:consts.serverUrl+"Users/CreateUpdateUser",
        data:{
               UserId:userId,
               Email:email,
               RolesEnumId:roleId,
               GradeId:gradeId,
               ClassRoomId:classroomId,
               Password:password
             }

      });
    }

    return UserManagementBase;
  }
}());

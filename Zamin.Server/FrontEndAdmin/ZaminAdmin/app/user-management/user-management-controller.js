(function () {
  'use strict';

  /**
  * @ngdoc object
  * @name userManagement.controller:UserManagementCtrl
  *
  * @description
  *
  */
  angular
  .module('userManagement')
  .controller('UserManagementCtrl', UserManagementCtrl);

  function UserManagementCtrl($scope,$location,UserManagement,AdminPage) {

    $scope.grades=[];
    $scope.gradeId=null;
    $scope.classRooms=[];
    $scope.classRoomId=null;
    $scope.users =[];
    $scope.filter = {};

    $scope.getGrades=function(){
      showLoader();
      UserManagement.getGrades().then(function(response) {

        if (response.data) {
          $scope.grades = response.data;
        }

        hideLoader();
      });
    }
    $scope.goToCreateUser=function(){
      $location.path('user-create');
    }
    $scope.updateUser=function(user){
        $location.path('user-create/'+user.UserId);
    }

    $scope.filterUsers = function(){
        showLoader();
      UserManagement.getFilteredUsers($scope.gradeId,$scope.classRoomId,$scope.filter.query).then(function(response){
        $scope.users=response.data;
        hideLoader();
      })
    }

    $scope.clearFilter = function() {
      $scope.filter = {};
      $scope.users = [];
    }

    $scope.getGrades();

  }
}());

(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name userCreate.controller:UserCreateCtrl
   *
   * @description
   *
   */
  angular
    .module('userCreate')
    .controller('UserCreateCtrl', UserCreateCtrl);

  function UserCreateCtrl($scope, $state, $stateParams, $location, UserManagement) {
    $scope.afterEmailCheck = false;
    $scope.isEmailTaken = true;
    $scope.roles = [];
    $scope.grades = [];
    $scope.grade={};
    $scope.classrooms = [];
    $scope.editMode = $state.current.name == 'userCreateUpdate';

    $scope.getUserDetails = function() {
        $scope.afterEmailCheck = true;
        $scope.isEmailTaken=false;
      showLoader();
      UserManagement.getUserDetailsById($stateParams.userId).then(function(response) {
        if (response.data) {
          $scope.userDetail = response.data;
          $scope.userEmail=$scope.userDetail.Email;
          $scope.roleId = $scope.userDetail.RolesEnumId
          $scope.classroomId = $scope.userDetail.ClassRoomId;
            $scope.getCreateEditMetaData();

          hideLoader();
        }
      })
    }

    $scope.checkUserEmail = function() {
      showLoader();
      UserManagement.checkIfEmailIsTaken($scope.userEmail).then(function(response) {
        $scope.afterEmailCheck = true;
        if (response.data) {
          $scope.isEmailTaken = true;
          hideLoader();
        } else {
          $scope.isEmailTaken = false;
          if(!$scope.editMode){  $scope.getCreateEditMetaData();}

        }
      });
    }

    $scope.getCreateEditMetaData = function() {
      UserManagement.getCreateEditMetaData().then(function(response) {
        if (response.data) {
          $scope.roles = response.data.roles;
          $scope.grades = response.data.grades;
          if($scope.editMode)
          {
            $scope.grade=_.find($scope.grades,function(e){return e.Id == $scope.userDetail.GradeId})
          }

          hideLoader();
        }
      })
    }

    $scope.save = function() {
      if (!$scope.editMode) {
        $scope.userId = 0;
      } else {
        $scope.userId = $stateParams.userId;
        $scope.checkUserEmail();
      }
      $scope.password = "1234"; //temp
      showLoader();
      if(!$scope.isEmailTaken){
      UserManagement.CreateUpdateUser($scope.userId, $scope.userEmail, $scope.roleId, $scope.grade.GradeId, $scope.classroomId, $scope.password).then(function(response) {
        if (response.data) {
          hideLoader();
          $scope.showSuccsessDialog();
          $location.path('/user-management');
        } else {
          hideLoader();
          $scope.showFailureDialog();
          $location.path('/user-management');
        }
      })}
    };
if ($scope.editMode) $scope.getUserDetails();

  }
}());

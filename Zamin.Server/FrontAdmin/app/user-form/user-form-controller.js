(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name userForm.controller:UserFormCtrl
   *
   * @description
   *
   */
  angular
    .module('userForm')
    .controller('UserFormCtrl', UserFormCtrl);

  function UserFormCtrl($scope,$mdDialog , $rootScope,$location,$stateParams, $state, UserForm, Branch) {

    $scope.user = {IsBranchAdmin:true, FranchiseId:$rootScope.user.FranchiseId};
    $scope.branches = [];
    $scope.editMode = $state.current.name == 'userFormUpdate'
    $scope.errorMassage="";



    $scope.getBranches = function(){
      Branch.getAll($rootScope.user.FranchiseId).then(function(response){
          $scope.branches = response.data;
      });
    };


    $scope.getUser = function(){
      UserForm.getUser($stateParams.userId).then(function(response){
          $scope.user = response.data;
      });
    };


    $scope.save = function(){
      if($scope.user.BranchId=="" || $scope.user.BranchId == undefined && $scope.user.IsBranchAdmin){
        $scope.errorMassage="יש לבחור סניף עבור משתמש רשת";
        $mdDialog.show({
          templateUrl: 'errorDialog.html',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
        return;
      }
      showLoader();
      if ($scope.editMode) {
        UserForm.update($scope.user).then(function(response) {
          if (response.data) {
            $location.path("user");
            hideLoader();
          }else{
              hideLoader();
            $scope.errorMassage="ארעה שגיאה";
            $mdDialog.show({
              templateUrl: 'errorDialog.html',
              scope: $scope,
              preserveScope: true,
              clickOutsideToClose: true
            });
            return;
          }
        });
      } else {
        UserForm.create($scope.user).then(function(response) {
          if (response.data) {
            $location.path("user");
            hideLoader();
          }else{
              hideLoader();
          $scope.errorMassage="ארעה שגיאה";
            $mdDialog.show({
              templateUrl: 'errorDialog.html',
              scope: $scope,
              preserveScope: true,
              clickOutsideToClose: true
            });
            return;
          }
        });
      }
    };

    $scope.roleChange = function(role){
      if(role == "franchise" && $scope.user.IsFranchiseAdmin){
        $scope.user.IsBranchAdmin = false;
      }
      else if(role == 'branch' && $scope.user.IsBranchAdmin) {
        $scope.user.IsFranchiseAdmin = false;
      }

    }

    if($scope.editMode) $scope.getUser();
    $scope.getBranches();
  }
}());

(function () {
  'use strict';

  /**
  * @ngdoc object
  * @name login.controller:LoginCtrl
  *
  * @description
  *
  */
  angular
  .module('login')
  .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl($scope, $location, $mdDialog, $rootScope, Login) {
    $scope.user = {};
    $scope.errorMessage = "";

    $scope.emailSent = false;
    $scope.userNotExists = false;
    $scope.email = "";

    $scope.signIn = function (valid) {
      if (!valid) {
        $scope.errorMessage = "לא מילאת את כל השדות..";
        return;
      }
      showLoader();
      Login.login($scope.user).then(function (response) {
        hideLoader();
        if (response.data.success) {
          $scope.userData = response.data;
          if($scope.userData.isGradeManager && $scope.userData.gradeId != undefined){
            $scope.navigateTo('grade-overview');
          }else{
            $location.path("home");
          }
        } else {
          $scope.errorMessage = "אימייל או סיסמא לא נכונים";
        }

      });
    }

    $scope.forgotDialog = function(ev) {
      $mdDialog.show({
        // parent: parentEl
        targetEvent: ev,
        templateUrl: 'login/forgotPasswordDialog.html',
        scope: $scope,
        preserveScope: true
      });
    }

    $scope.closeDialog = function() {
      $mdDialog.hide();
      $scope.emailSent = false;
    }

    $scope.forgotPassword = function(email) {
      showLoader();
      Login.forgotPassword(email).then(function(response) {
        $scope.emailSent = response.data;
        if (!response.data) {
          //$scope.closeDialog();
          $scope.userNotExists = true;
        }

        hideLoader();
      });

    }

  }
}());

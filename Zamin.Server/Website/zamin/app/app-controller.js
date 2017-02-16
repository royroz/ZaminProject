(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name zamin.controller:AppCtrl
   *
   * @description
   *
   */
  angular
    .module('zamin')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope, $location, $rootScope, $stateParams) {
    $scope.userName = "";
    $scope.logedIn = false;

    //login details
    $scope.email = "";
    $scope.password = "";
    $scope.rememberMe = true;

    $scope.contactUs = {
      name: '',
      email: ''
    };

    $scope.forgotPasswordEmail = "";
    $scope.showInvalidUserNameMessage = false;
    $scope.codeExists = "";
    $scope.emailDoesntExists = false;

    $scope.resetPasswordObject = {};
    $scope.wrongResetPassword = false;
    $scope.passwordChanged = false;

    $scope.contactUsThanks = false;

    $scope.songs = [];

    $scope.currentLocation = "";
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        $scope.currentLocation = toState.name;
      })
    //--------------------------------------login functions-----------------------------------------------
    $scope.isLogedIn = function() {
      showLoader();
      userService.isLogedIn().then(function(response) {
        $scope.logedIn = response.isLogedIn;
        $scope.userName = response.userName;
        hideLoader();
      });
    }




    $scope.login = function() {
      if ($scope.email === "" || $scope.password === "") {
        return;
      }
      showLoader();
      userService.login($scope.email, $scope.password, $scope.rememberMe).then(function(response) {
        $("#login-modal").modal("hide");
        $scope.logedIn = response.success;
        $scope.userName = response.userName;
        if (!$scope.logedIn) {
          $scope.showInvalidUserNameMessage = true;
          $scope.password = "";
        } else {
          $rootScope.$broadcast("userLogedIn", $scope.userName);
          $location.path("account");
        }
        hideLoader();

      });
    }

    $scope.logOut = function() {
      window.location.href = "#";
      $scope.userName = "";
      $scope.logedIn = false;
      userService.logOut();
      $rootScope.$broadcast("userLogedOut");
    }

    //---------------------------------------Reset Password Functions------------------------------------------------

    $scope.forgotPassword = function() {
      var location = $location.absUrl().substring(0, $location.absUrl().indexOf("#"));

      userService.forgotPassword($scope.forgotPasswordEmail, location).then(function(response) {
        if (response == null || response === "") {
          $scope.emailDoesntExists = true;
        } else {
          $scope.forgotPasswordEmail = "";
          $("#forgot-password-modal").modal('hide');
        }

      });
    }

    $scope.resetPassword = function() {
      if ($scope.resetPasswordObject.password == undefined || $scope.resetPasswordObject.confirmPassword == undefined) {
        return;
      }

      if ($scope.resetPasswordObject.password !== $scope.resetPasswordObject.confirmPassword) {
        $scope.wrongResetPassword = true;
        $scope.resetPasswordObject.confirmPassword = undefined;
        return;
      }
      userService.resetPassword($stateParams.resetCode, $scope.resetPasswordObject.password).then(function(response) {
        if (response === "true") {
          $scope.passwordChanged = true;
        }
      });


    }
    //----------------------------------------------------------------------------------------------------------------

    $scope.contactUsRequest = function() {
      $scope.contactUsFormSubmitted = true;
      if ($scope.contactUs.name === '' || $scope.contactUs.email === '') {
        return;
      }
      userService.contactUsRequest($scope.contactUs).then(function(response) {
        if (response === "true") {
          $scope.contactUsThanks = true;
        }
      });
    }

    $scope.forgotPasswordModal = function() {
      $("#login-modal").modal("hide");
      $("#forgot-password-modal").modal("show");
    }


    $scope.loginModal = function() {
      $("#login-modal").modal("show");
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.$on("userLogedIn", function(e, userName) {
      $scope.logedIn = true;
      $scope.userName = userName;
    });

    $scope.goTo = function(url){
      $location.path(url);
    }
    //
    // $scope.removeBg = function () {
    //     $("body").removeClass("home-bg");
    //     $("body").removeClass("lib-bg");
    //     $("body").removeClass("portfolio-bg");
    //     $("body").removeClass("businessMusic-bg");
    // }
    //
    // $scope.removeBg();
    // $scope.isLogedIn();
  }
}());

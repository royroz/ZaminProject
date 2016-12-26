(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name forgotPassword.controller:ForgotPasswordCtrl
   *
   * @description
   *
   */
  angular
    .module('forgotPassword')
    .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

  function ForgotPasswordCtrl($scope,Login) {

    $scope.email = "";


    $scope.getNewPassword = function(valid){
      if(!valid) return;

      Login.forgotPassword($scope.email).then(function(response){
          if(response.data){
            console.log("new password sent to your email");
          }
          else{
            console.log("no account found with that emaill address");
          }
      });

    };
  }
}());

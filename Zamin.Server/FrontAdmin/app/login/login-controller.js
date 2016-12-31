(function() {
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

  function LoginCtrl($scope, $location, $rootScope, Login) {

    $scope.username = "";
    $scope.password = "";
    $scope.invalidUsernameOrPassword = false;




    $scope.signIn = function(valid) {
      if (!valid) return;

      $scope.invalidUsernameOrPassword = false;

      Login.signIn($scope.username, $scope.password).then(function(response) {

        if (response.data.Success) {
          $rootScope.user = {
            Id: response.data.UserId,
            Username: response.data.userName
          }
        
          $location.url('/home');
        } else {
          $scope.username = '';
          $scope.password = '';
          $scope.invalidUsernameOrPassword = true;
        }
      });
    };


  }
}());

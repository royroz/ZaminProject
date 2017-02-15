(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name zaminSystemAdmin.controller:AppCtrl
   *
   * @description
   *
   */
  angular
    .module('zamin')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope, $rootScope, $location, $mdDialog, Login) {
    $scope.setItemInLocalStorage = function(key, value) {
      var str = JSON.stringify(value);
      localStorage.setItem(key, str);
    };

    $scope.getItemFromLocalStorage = function(key) {
      var str = localStorage.getItem(key);
      if (str) return JSON.parse(str);
      else return undefined;
    };

    $rootScope.user = {};
      $scope.currentLocation = "";




    $scope.hideDialog = function() {
      $mdDialog.hide();
    }


    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        $scope.currentLocation = toState.name;
      })


    $scope.getCurrentUser = function() {
      Login.getCurrentUser().then(function(response) {
        if (response.data == false) {
          $location.path("login")
        } else {
          $rootScope.user.Id = response.data.Id;
          $rootScope.user.Username = response.data.Username;
          //TODO delete the HC FranchiseId
          // $rootScope.user.FranchiseId = 1;
        }
      });
      // $scope.getFranchises();





    }


    //Start
    // $scope.getCurrentUser();

  }
}());

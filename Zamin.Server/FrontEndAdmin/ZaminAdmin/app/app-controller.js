(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name sliceSystemAdmin.controller:AppCtrl
   *
   * @description
   *
   */
  angular
    .module('slice')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope, $rootScope, $location, $mdDialog, Franchise, Login) {
    $scope.setItemInLocalStorage = function(key, value) {
      var str = JSON.stringify(value);
      localStorage.setItem(key, str);
    };

    $scope.getItemFromLocalStorage = function(key) {
      var str = localStorage.getItem(key);
      if (str) return JSON.parse(str);
      else return undefined;
    };

    $scope.currentFranchise = undefined;
    $rootScope.user = {};
    $scope.currentLocation = "";
    $scope.franchises = $scope.getItemFromLocalStorage('franchises');
    if($scope.franchises != undefined){
      if ($scope.franchises.length > 0 && $rootScope.user.FranchiseId == undefined) {
        $rootScope.user.FranchiseId = $scope.franchises[0].Id;
        $rootScope.user.FranchiseName = $scope.franchises[0].Name;
        $scope.currentFranchise = $scope.franchises[0];
      }
    }


    //      FranchiseId: 1,
    //   Username: "Noa"
    // }; //TODO - get after login



    $scope.hideDialog = function() {
      $mdDialog.hide();
    }

    $scope.getFranchises = function() {
      Franchise.getAll().then(function(response) {
        $scope.franchises = response.data;
        $scope.setItemInLocalStorage('franchises', response.data);
        if ($scope.franchises.length > 0 && $rootScope.user.FranchiseId == undefined) {
          $rootScope.user.FranchiseId = $scope.franchises[0].Id;
          $rootScope.user.FranchiseName = $scope.franchises[0].Name;
          $scope.currentFranchise = $scope.franchises[0];
        }
      });
    }

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        $scope.currentLocation = toState.name;
      })

    $scope.selectFranchise = function(fr) {
      $rootScope.user.FranchiseId = fr.Id;
      $rootScope.user.FranchiseName = fr.Name;
      $scope.currentFranchise = fr;
      $location.path("home");
    }


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
      $scope.getFranchises();
    }

    $scope.setCurrentFranchiseById = function(franchiseId){
      var franchise =  _.find($scope.franchises, {'Id': franchiseId});
        $scope.currentFranchise = franchise;
        $rootScope.user.FranchiseId =franchise.Id;
        $rootScope.user.FranchiseName = franchise.Name;

    }



    //Start
    $scope.getCurrentUser();

  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name branchForm.controller:BranchFormCtrl
   *
   * @description
   *
   */
  angular
    .module('branchForm')
    .controller('BranchFormCtrl', BranchFormCtrl);

  function BranchFormCtrl($scope, $rootScope, $state,$stateParams, $location, $mdDialog, BranchForm) {


    $scope.branch = {
      FranchiseId: $rootScope.user.FranchiseId

     };

     $scope.branch.BranchId = $stateParams.branchId;
    $scope.editMode = $state.current.name == 'branchFormUpdate';

    $scope.setBranchesAddressData = function() {
        if (typeof($scope.branch.GooglePlaceAddress) == "object") {
          var addressData = getDataFromGooglePlaceObject($scope.branch.GooglePlaceAddress);
          $scope.branch.Longitude = addressData.Longitude;
          $scope.branch.Latitude = addressData.Latitude;
          $scope.branch.Address = addressData.Address;
        }

    }

    var getDataFromGooglePlaceObject = function(place) {
      if(place == undefined || place.geometry == undefined) return {};
      return {
        Longitude: place.geometry.location.lng(),
        Latitude: place.geometry.location.lat(),
        Address: place.formatted_address
      }
    }

    $scope.getBranch = function(){
      BranchForm.getBranch($scope.branch.BranchId ).then(function(response){
          $scope.branch = response.data;
          if($scope.branch.FranchiseId == 0){
              $scope.branch.FranchiseId = $rootScope.user.FranchiseId;
          }
          $scope.branch.DayWorkingHours.forEach(function(day){
            if(day.StartTime != '') day.StartTime = new Date(day.StartTime);
            if(day.FinishTime != '') day.FinishTime = new Date(day.FinishTime);
          });
      });
    }

    $scope.save = function() {
      $scope.branch.DayWorkingHours.forEach(function(day){
        if(day.StartTime != undefined && day.StartTime != "" && typeof day.StartTime != 'string' ){
          var startTimeStr = "1/1/1970" + " " + day.StartTime.getHours() + ":" + day.StartTime.getMinutes() + ":" + day.StartTime.getSeconds();
            day.StartTime = startTimeStr;
        }

        if(day.FinishTime != undefined && day.FinishTime != ""&& typeof day.FinishTime != 'string'){
          var finishTimeStr = "1/1/1970" + " " + day.FinishTime.getHours() + ":" + day.FinishTime.getMinutes() + ":" + day.FinishTime.getSeconds();
          day.FinishTime = finishTimeStr;
        }
      });
      showLoader();
      $scope.setBranchesAddressData();
      if ($scope.editMode) {
        BranchForm.update($scope.branch).then(function(response) {
          if (response.data) {
            $location.path("branch/" + $rootScope.user.FranchiseId);
            hideLoader();
          }
        });
      } else {
        BranchForm.create($scope.branch).then(function(response) {
          if (response.data) {
            $location.path("branch/" + $rootScope.user.FranchiseId);
            hideLoader();
          }
        });
      }
    }

  $scope.getBranch();

  }
}());

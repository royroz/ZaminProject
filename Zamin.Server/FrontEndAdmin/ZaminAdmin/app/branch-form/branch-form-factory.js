(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name branchForm.factory:BranchForm
   *
   * @description
   *
   */
  angular
    .module('branchForm')
    .factory('BranchForm', BranchForm);

  function BranchForm($http, consts) {
    var BranchFormBase = {};

    BranchFormBase.getBranch = function(branchId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Branch/GetBranch",
        params: {
          id: branchId
        }
      });
    };

        BranchFormBase.create = function(branch) {
          var fd = new FormData();
          fd.append("FranchiseId", branch.FranchiseId);
          fd.append("Name", branch.Name);
          fd.append("BranchPhone", branch.BranchPhone);
          fd.append("BranchPhone2", branch.BranchPhone2);
          fd.append("ManagerName", branch.ManagerName);
          fd.append("ManagerPhone", branch.ManagerPhone);
          fd.append("ManagerMobile", branch.ManagerMobile);
          fd.append("ManagerEmail", branch.ManagerEmail);
          fd.append("ManagerPhone", branch.ManagerPhone);
          fd.append("Address", branch.Address);
          fd.append("Longitude", branch.Longitude);
          fd.append("Latitude", branch.Latitude);
          fd.append("ImageFile", branch.ImageFile);
          fd.append("DeliveryTimeInMinutes", branch.DeliveryTimeInMinutes);
          fd.append("TakeawayTimeInMinutes", branch.TakeawayTimeInMinutes);

          branch.DayWorkingHours.forEach(function(item, index){
              fd.append("DayWorkingHours[" + index + "].DayOfWeekId", item.DayOfWeekId);
              fd.append("DayWorkingHours[" + index + "].StartTime", item.StartTime);
              fd.append("DayWorkingHours[" + index + "].FinishTime", item.FinishTime);
          });

          return $http({
            method: "POST",
            url: consts.serverUrl + "Branch/CreateBranch",
            data: fd,
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          });
        };

        BranchFormBase.update = function(branch) {
          var fd = new FormData();
          fd.append("FranchiseId", branch.FranchiseId);
          fd.append("Id", branch.Id);
          fd.append("Name", branch.Name);
          fd.append("BranchPhone", branch.BranchPhone);
          fd.append("BranchPhone2", branch.BranchPhone2);
          fd.append("ManagerName", branch.ManagerName);
          fd.append("ManagerPhone", branch.ManagerPhone);
          fd.append("ManagerMobile", branch.ManagerMobile);
          fd.append("ManagerEmail", branch.ManagerEmail);
          fd.append("ManagerPhone", branch.ManagerPhone);
          fd.append("Address", branch.Address);
          fd.append("Longitude", branch.Longitude);
          fd.append("Latitude", branch.Latitude);
          fd.append("ImageFile", branch.ImageFile);
          fd.append("DeliveryTimeInMinutes", branch.DeliveryTimeInMinutes);
          fd.append("TakeawayTimeInMinutes", branch.TakeawayTimeInMinutes);

          branch.DayWorkingHours.forEach(function(item, index){
              fd.append("DayWorkingHours[" + index + "].BranchId", item.BranchId);
              fd.append("DayWorkingHours[" + index + "].DayOfWeekId", item.DayOfWeekId);
              fd.append("DayWorkingHours[" + index + "].StartTime", item.StartTime);
              fd.append("DayWorkingHours[" + index + "].FinishTime", item.FinishTime);
          });

          return $http({
            method: "POST",
            url: consts.serverUrl + "Branch/UpdateBranch",
            data: fd,
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          });
        };

    return BranchFormBase;
  }
}());

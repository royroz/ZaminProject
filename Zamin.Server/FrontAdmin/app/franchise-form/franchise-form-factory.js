(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name franchiseForm.factory:FranchiseForm
   *
   * @description
   *
   */
  angular
    .module('franchiseForm')
    .factory('FranchiseForm', FranchiseForm);

  function FranchiseForm($http, consts) {
    var FranchiseFormBase = {};

    FranchiseFormBase.getFranchise = function(franchiseId) {
      return $http({
        method: "GET",
        url: consts.serverUrl + "Franchise/GetFranchise",
        params: {
          id: franchiseId
        }
      });
    };


    FranchiseFormBase.create = function(franchise) {
      var fd = new FormData();
      fd.append("Name", franchise.Name);
      if(franchise.ManagerName != undefined) fd.append("ManagerName", franchise.ManagerName);
      if(franchise.ManagerPhone != undefined) fd.append("ManagerPhone", franchise.ManagerPhone);
      if(franchise.ManagerMobile != undefined) fd.append("ManagerMobile", franchise.ManagerMobile);
      if(franchise.ManagerEmail != undefined) fd.append("ManagerEmail", franchise.ManagerEmail);
      if(franchise.FacebookLink != undefined) fd.append("FacebookLink", franchise.FacebookLink);
      if(franchise.InstagramLink != undefined) fd.append("InstagramLink", franchise.InstagramLink);
      fd.append("ImageFile", franchise.ImageFile);
      fd.append("CoverImageFile", franchise.CoverImageFile);
      fd.append("PizzaCategoryImageFile", franchise.PizzaCategoryImageFile);
      if(franchise.ButtonColor != undefined) fd.append("ButtonColor", franchise.ButtonColor);
      if(franchise.Description != undefined) fd.append("Description", franchise.Description);

      if (franchise.GalleryFiles != undefined) {
        franchise.GalleryFiles.forEach(function(file, index) {
          fd.append("GalleryFiles[" + index + "]", file);
        });
      }

      return $http({
        method: "POST",
        url: consts.serverUrl + "Franchise/CreateFranchise",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };

    FranchiseFormBase.update = function(franchise) {
      var fd = new FormData();
      fd.append("Id", franchise.Id);
      fd.append("Name", franchise.Name);
      if(franchise.ManagerName != undefined) fd.append("ManagerName", franchise.ManagerName);
      if(franchise.ManagerPhone != undefined) fd.append("ManagerPhone", franchise.ManagerPhone);
      if(franchise.ManagerMobile != undefined) fd.append("ManagerMobile", franchise.ManagerMobile);
      if(franchise.ManagerEmail != undefined) fd.append("ManagerEmail", franchise.ManagerEmail);
      fd.append("ImageFile", franchise.ImageFile);
      if(franchise.FacebookLink != undefined) fd.append("FacebookLink", franchise.FacebookLink);
      if(franchise.InstagramLink != undefined) fd.append("InstagramLink", franchise.InstagramLink);
      fd.append("ImageFile", franchise.ImageFile);
      fd.append("CoverImageFile", franchise.CoverImageFile);
      fd.append("PizzaCategoryImageFile", franchise.PizzaCategoryImageFile);
      if(franchise.ButtonColor != undefined) fd.append("ButtonColor", franchise.ButtonColor);
      if(franchise.Description != undefined) fd.append("Description", franchise.Description);

      if (franchise.GalleryFiles != undefined) {
        franchise.GalleryFiles.forEach(function(file, index) {
          fd.append("GalleryFiles[" + index + "]", file);
        });
      }
      if (franchise.GalleryUrlsToDelete != undefined) {
        franchise.GalleryUrlsToDelete.forEach(function(file, index) {
          fd.append("GalleryUrlsToDelete[" + index + "]", file);
        });
      }


      return $http({
        method: "POST",
        url: consts.serverUrl + "Franchise/UpdateFranchise",
        data: fd,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      });
    };


    FranchiseFormBase.deleteBranch = function(branchId) {
      return $http({
        method: "POST",
        url: consts.serverUrl + "Branch/DeleteBranch",
        data: {
          id: branchId
        }
      });
    }

    return FranchiseFormBase;
  }
}());

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name accountService.factory:AccountService
   *
   * @description
   *
   */
  angular
    .module('zamin')
    .factory('accountService', accountService);

  function accountService($http, $rootScope,consts) {
    var AccountServiceBase = {};

    // BranchBase.getAll = function (franchiseId) {
    //   return $http({
    //     method: "GET",
    //     url: consts.serverUrl + "Branch/GetAll",
    //     params:{
    //       franchiseId:franchiseId
    //     }
    //   });
    // };

    AccountServiceBase.signUp = function(signupInfo) {
      return $http({
        method:"POST",
        url: consts.serverUrl + 'Account/SignUp',
        data:{
          WebsiteUser: signupInfo
        }
      });
    }
    //             var deferred = $q.defer();
    //             $.ajax({
    //                 type: "POST",
    //                 url: consts.serverUrl + 'Account/SignUp',
    //                 xhrFields: {
    //                     withCredentials: true
    //                 },
    //                 data: { WebsiteUser: signupInfo },
    //                 crossDomain: true
    //             }).done(function(response) {
    //                 deferred.resolve(response);
    //             });
    //             return deferred.promise;

    return AccountServiceBase;
  }
}());


// ﻿angular.module('zamin').factory('accountService', function ($q, $http, $rootScope,consts) {
//     return {
//
//         signUp: function(signupInfo) {
//             var deferred = $q.defer();
//             $.ajax({
//                 type: "POST",
//                 url: consts.serverUrl + 'Account/SignUp',
//                 xhrFields: {
//                     withCredentials: true
//                 },
//                 data: { WebsiteUser: signupInfo },
//                 crossDomain: true
//             }).done(function(response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         },
//         getUserLicenses: function() {
//             var deferred = $q.defer();
//             $.ajax({
//                 url: consts.serverUrl + 'Website/GetUserLicensesData',
//                 xhrFields: {
//                     withCredentials: true
//                 }
//             }).done(function(response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         },
//         getPriceList: function() {
//             return $http({
//                 method: "GET",
//                 url: consts.serverUrl + 'Website/GetPriceList'
//             });
//         },
//         addLicense: function(clientId, businessSizeId, price, nickname, comments) {
//             var deferred = $q.defer();
//             $.ajax({
//                 type: "POST",
//                 url: consts.serverUrl + 'Licenses/LicensePayment',
//                 xhrFields: {
//                     withCredentials: true
//                 },
//                 data: { clientId: clientId, businessSizeId: businessSizeId, price: price, nickname: nickname, comments: comments },
//                 crossDomain: true
//             }).done(function(response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         },
//         renewLicense: function(licenseId) {
//             var deferred = $q.defer();
//             $.ajax({
//                 type: "POST",
//                 url: consts.serverUrl + 'Licenses/RenewLicense',
//                 xhrFields: {
//                     withCredentials: true
//                 },
//                 data: { licenseId: licenseId },
//                 crossDomain: true
//             }).done(function(response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         },
//         purchaseLicenseRequest: function(priceListId, renew, licenseId) {
//
//             var deferred = $q.defer();
//             $.ajax({
//                 type: "POST",
//                 url: consts.serverUrl + 'Website/PurchaseLicenseRequest',
//                 xhrFields: {
//                     withCredentials: true
//                 },
//                 data: { priceListId: priceListId, renew: renew, licenseId: licenseId },
//                 crossDomain: true
//             }).done(function (response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         },
//         extendLicenseRequest: function (priceListId, licenseId) {
//             var deferred = $q.defer();
//             $.ajax({
//                 type: "POST",
//                 url: consts.serverUrl + 'Website/ExtendLicenseRequest',
//                 xhrFields: {
//                     withCredentials: true
//                 },
//                 data: { priceListId: priceListId, licenseId: licenseId },
//                 crossDomain: true
//             }).done(function (response) {
//                 deferred.resolve(response);
//             });
//             return deferred.promise;
//         }
//
// };
// });

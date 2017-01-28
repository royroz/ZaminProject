angular.module('zamin').factory('licenseService', function ($q, $http, $rootScope, consts) {
    return {
        getUpgradeOptions: function (licenseSalesForceId) {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/GetLicenseUpgradeOptions?licenseSalesForceId=' + licenseSalesForceId,
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        getExtensionsOptions: function (licenseSalesForceId) {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/GetLicenseExtensionOptions?licenseSalesForceId=' + licenseSalesForceId,
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        upgradePackage: function (licenseSalesForceId, packageId) {
            var deferred = $q.defer();
            $.ajax({
                type: "POST",
                url: consts.serverUrl + 'Website/UpgradePackage',
                xhrFields: {
                    withCredentials: true
                },
                data: {licenseSalesForceId:licenseSalesForceId , packageId: packageId }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        extendPackage: function (licenseSalesForceId, packageId) {
            var deferred = $q.defer();
            $.ajax({
                type: "POST",
                url: consts.serverUrl + 'Website/ExtendPackage',
                xhrFields: {
                    withCredentials: true
                },
                data: { licenseSalesForceId: licenseSalesForceId, packageId: packageId }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        getUserCode: function () {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/GetUserCode',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        buyPackage: function (packageNum) {
            var deferred = $q.defer();
            $.ajax({
                type: "POST",
                url: consts.serverUrl + 'Website/PurchaseLicense',
                xhrFields: {
                    withCredentials: true
                },
                data: { packageEnum: packageNum }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        CanUserGetTrialLicense: function() {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/CanUserGetTrialLicense',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        getCurrentUser: function () {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/GetCurrentUser',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        isUserTokenExists: function() {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/GetCurrentUserId',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
});

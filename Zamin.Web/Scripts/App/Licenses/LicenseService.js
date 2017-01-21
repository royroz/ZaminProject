angular.module('music4BizApp').factory('licenseService', function ($q, $http, $rootScope) {
    return {
        getLicenseTypes: function () {
            return $http.get('/MetaData/GetLicenseTypes');
        },
        getClient: function (id) {
            return $http.get("/Clients/GetClient?clientId=" + id);
        },
        addLicense: function (clientId, price, licenseType, from, to, businessSizeId, comments, nickname) {
            return $http({
                url: '/Licenses/LicensePayment',
                method: "POST",
                data: { clientId: clientId, price: price, licenseType: licenseType, startDate: from, endDate: to, businessSizeId: businessSizeId, comments: comments, nickname: nickname }
            });
        },
        addLicenseAndChecks: function (clientId, price, licenseType, from, to, checks, businessSizeId) {
            return $http({
                url: '/Licenses/LicenseCheckPayment',
                method: "POST",
                data: { clientId: clientId, price: price, licenseType: licenseType, startDate: from, endDate: to, checks: checks, businessSizeId :businessSizeId}
            });
        },
        getLicensePrices: function () {
            return $http({
                method: 'GET',
                url: '/Licenses/GetLicensePrices'
            });
        },
        addPaymentRequest: function (sum, userId) {
            return $http({
                method: "POST",
                url: '/Licenses/PurchaseLicensePaymentRequest',
                data: { sum: sum, userId: userId }
            });
        }

    }
});
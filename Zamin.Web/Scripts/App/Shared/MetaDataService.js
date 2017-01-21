angular.module("music4BizApp").factory("metaDataService", function ($q, $http, $rootScope) {

    return {
        getSpecialServices: function () {

            var deferred = $q.defer();

            $http.get("/MetaData/GetActiveSpecialServices")
                .then(function (response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        },

        getLicenseTypes: function () {
            var deferred = $q.defer();

            $http.get("/MetaData/GetLicenseTypes")
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        },
        getPaymentTypes: function () {
            return $http.get('/MetaData/GetPaymentTypes');
        },
        getBanks: function () {
            return $http.get('/MetaData/GetBanks');
        },
        getPricesList: function() {
            return $http({
                method: 'GET',
                url: '/Licenses/GetLicensePrices'
            });
        }


    }
});
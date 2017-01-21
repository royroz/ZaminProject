angular.module("music4BizApp").factory("clientsService", function ($q, $http, $rootScope) {

    return {
        getClients: function () {
            var deferred = $q.defer();

            $http.get("/Clients/GetAllClients")
                .then(function (response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        },

        getClient: function (clientId) {
            var deferred = $q.defer();

            $http.get("/Clients/GetClient?clientId=" + clientId)
                .then(function (response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        },
        updateClient: function (client) {

            var deferred = $q.defer();

            $http.post("/Clients/Update", { model: client }).then(function (response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
        },
        emailLicenses: function (clientId, licenseHtmlTable) {
            return $http({
                method: 'POST',
                data: { clientId: clientId, licenseHtmlTable: licenseHtmlTable },
                url: "/Clients/EmailLicensesToClient"
            });
        },
        deleteClient: function(clientId) {
            return $http({
                method: 'POST',
                data: { clientId: clientId},
                url: "/Clients/DeleteClient"
            });
        }
    }

});
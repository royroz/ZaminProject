angular.module('music4BizApp').factory('servicesService', function ($q, $http, $rootScope) {
    return {
        getSpecialServices: function () {
            return $http.get("/Services/GetAllServices");
        },
        saveService: function(service) {
            return $http({
                url: '/Services/SaveService',
                method: "POST",
                data: { service: service}
            });
        },
        deleteService: function (id) {
            return $http({
                url: '/Services/DeleteService',
                method: "POST",
                data: { serviceId: id }
            });
        },
        addServiceToClient: function (clientId, serviceId, price) {
            return $http({
                url: '/Services/AddServiceToClient',
                method: "POST",
                data: { clientId: clientId, serviceId: serviceId , price: price}
            });
        },
        getClient: function (clientId) {
            return $http.get("/Clients/GetClient?clientId=" + clientId);
        },
        addServiceAndChecks: function(clientId, servicePrice, serviceId, checks) {
            return $http({
                url: '/Services/ServiceCheckPayment',
                method: "POST",
                data: { clientId: clientId, price: servicePrice, serviceId: serviceId, checks: checks }
            });
        }
    }
});
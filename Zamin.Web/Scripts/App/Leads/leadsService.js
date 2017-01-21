angular.module("music4BizApp").factory("leadsService", function ($q, $http) {
    return {
        getLeads: function () {
            var deferred = $q.defer();
            $http.get("/Leads/GetData").then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        changeStarStatus: function (lead) {
            var deferred = $q.defer();

            $http.post("/Leads/ChangeStarStatus", { leadId: lead.Id }).then(function (response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
        },

        readLead: function (lead) {
            var deferred = $q.defer();

            $http.post("/Leads/MarkAsRead", { leadId: lead.Id }).then(function (response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
        }
    }
});
angular.module('music4BizApp').factory('bpmService', function($q, $http, $rootScope) {
    var bpms = [];
    return {
        getAllBpms: function () {
            var deferred = $q.defer();
            $http.get('/Bpm/GetAllBpms').then(function (response) {
                bpms = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        addBpm: function (bpm) {
            $http.post('/Bpm/CreateBpm', { bpm: bpm }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshBpms');
                }
            });
        },
        editBpm: function (bpm) {
            $http.post('/Bpm/UpdateBpm', { bpm: bpm }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshBpms');
                }
            });
        },
        removeBpm: function (bpm) {
            $http.post('/Bpm/RemoveBpm', { bpm: bpm }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshBpms');
                }
            });
        }
    };
});
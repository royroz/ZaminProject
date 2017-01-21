angular.module('music4BizApp').factory('performersService', function ($q, $http, $rootScope) {
    var performers = [];
    return {
        getAllPerformers: function() {
            var deferred = $q.defer();
            $http.get('/Performers/GetAllPerformers').then(function (response) {
                performers = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        editPerformer: function (performer) {
            $http.post('/Performers/UpdatePerformerName', { performer: performer }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPerformers');
                }
            });
        },
        addPerformer: function(performerName) {
            var fd = new FormData();
            fd.append('performerName', performerName);
            $http.post('/Performers/CreatePerformer', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPerformers');
                }

            });
        },
        removePerformer: function (performer) {
            $http.post('/Performers/RemovePerformer', { performer: performer }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPerformers');
                }
            });
        }

    }
});
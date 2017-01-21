angular.module('music4BizApp').factory('atmospheresService', function ($q, $http, $rootScope) {
    var atmospheres = [];
    return {
        getAllAtmospheres: function () {
            var deferred = $q.defer();
            $http.get('/Atmospheres/GetAllAtmospheres').then(function (response) {
                atmospheres = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        editAtmosphere: function (atmosphere) {
            $http.post('/Atmospheres/UpdateAtmosphereName', { atmosphere: atmosphere }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshAtmospheres');
                }
            });
        },
        addAtmosphere: function (atmosphereName) {
            var fd = new FormData();
            fd.append('atmosphereName', atmosphereName);
            $http.post('/Atmospheres/CreateAtmosphere', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshAtmospheres');
                }

            });
        },
        removeAtmosphere: function (atmosphere) {
            $http.post('/Atmospheres/RemoveAtmosphere', { atmosphere: atmosphere }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshAtmospheres');
                }
            });
        }
    };
});
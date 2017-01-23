angular.module('music4BizWebsite').factory('songsService', function($q, $http, $rootScope,consts) {
    return {
        getSongsFromBucket: function() {
            var deferred = $q.defer();
            $http.get(consts.serverUrl + 'Website/GetSongsFromBucket').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getPriceList: function() {
            return $http({
                method: "GET",
                url: consts.serverUrl + 'Website/GetPriceList'
            });
        }
    }
})

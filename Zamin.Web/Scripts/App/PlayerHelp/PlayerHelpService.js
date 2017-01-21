angular.module('music4BizApp').factory('playerHelpService', function($q, $http, $rootScope) {
    return{
        getPlayerHelp: function() {
            var deferred = $q.defer();
            $http.get('/PlayerHelp/GetPlayerHelp').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        savePlayerHelp: function(playerHelp) {
            $http.post('/PlayerHelp/Save', { PlayerHelp: playerHelp }).then(function (response) {
                $rootScope.$broadcast("getCookieMessage");
            });
        }
    }
});

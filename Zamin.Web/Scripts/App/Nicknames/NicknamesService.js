angular.module('music4BizApp').factory('nicknamesService', function($q, $http, $rootScope) {
    var nicknames = [];
    return {
        getAllNickNames: function() {
            var deferred = $q.defer();
            $http.get('/Nicknames/GetAllNicknames').then(function(response) {
                nicknames = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        addNickname: function(newName) {
            var fd = new FormData();
            fd.append('name', newName);
            $http.post('/Nicknames/CreateNickname', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshNicknames');
                }
               
            });
        },
        editNickname: function (nicknameModel) {
            $http.post('/Nicknames/UpdateNicknameName', { nickname: nicknameModel }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshNicknames');
                }
            });
        },

        removeNickname: function (nicknameModel) {
            $http.post('/Nicknames/RemoveNickname', { nickname: nicknameModel }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshNicknames');
                }
            });
        }
    };
});

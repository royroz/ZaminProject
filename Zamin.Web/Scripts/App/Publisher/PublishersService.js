angular.module('music4BizApp').factory('publishersService', function($q, $http, $rootScope) {
    var publishers = [];
    return {
        getAllPublishers: function() {
            var deferred = $q.defer();
            $http.get('/Publishers/GetAllPublishers').then(function (response) {
                publishers = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        addPublisher: function(publisherName) {
            var fd = new FormData();
            fd.append('publisherName', publisherName);
            $http.post('Publishers/CreatePublisher', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function(data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPublishers');
                }
            });
        },
        editPublisher: function (publisher) {
            $http.post('/Publishers/UpdatePublisherName', { publisher: publisher }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPublishers');
                }
            });
        },
        removePublisher: function(publisher) {
            $http.post('/Publishers/RemovePublisher', { publisher: publisher }).success(function (data) {
                if (data === "true") {
                    $rootScope.$broadcast('refreshPublishers');
                }
            });
        }

    }
});
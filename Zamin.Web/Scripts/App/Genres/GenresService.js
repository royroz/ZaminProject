angular.module('music4BizApp').factory('genresService', function ($q, $http, $rootScope) {
    var genres = [];
    return {
        getAllGenres: function () {
            var deferred = $q.defer();
            $http.get('/Genres/GetAllGenres').then(function (response) {
                genres = response.data;
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        addGenre: function (genreName, largeImageFile, smallImageFile) {
            var fd = new FormData();
            fd.append('genreName', genreName);
            fd.append('largeImageFile', largeImageFile);
            fd.append('smallImageFile', smallImageFile);
            $http.post('/Genres/CreateGenre', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (data) {
                $rootScope.$broadcast('refreshGenres');
            });
        },
        editGenre: function (genre) {
            var fd = new FormData();
            fd.append('largeImageFile', genre.LargeImageFile);
            fd.append('smallImageFile', genre.SmallImageFile);
            fd.append('name', genre.Name);
            fd.append('id', genre.Id);
            $http.post('/Genres/UpdateGenre', fd, { genre: genre, transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (data) {
                $rootScope.$broadcast('refreshGenres');
            });
        },
        removeGenre: function (genre) {
            $http.post('/Genres/RemoveGenre', { genre: genre }).success(function (data) {
                $rootScope.$broadcast('refreshGenres');
            });
        }
    }
});
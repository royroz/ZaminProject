angular.module('music4BizApp').factory('songsService', function ($q, $http, $rootScope) {
    return {
        getData: function (songId) {
            var deferred = $q.defer();
            $http.get('/Songs/GetInitData?songId=' + songId).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        tagSongs: function (selectedSongs, songName, bpm, publisher, performer, genres, packages, atmospheres, nicknames, folder) {
            $http.post('/Songs/Create', { songs: selectedSongs, name: songName, bpm: bpm, publisher: publisher, performer: performer, genres: genres, packages: packages, atmospheres: atmospheres, nicknames: nicknames, folder: folder })
                .success(function (data) {
                    $rootScope.$broadcast("hideLoaderAndRedirect", data);
                });
        },
        updateSong: function (songId, songName, bpm, publisher, performer, genres, packages, atmospheres, nicknames) {
            $http.post('/Songs/Update', { Id: songId, SongName: songName, Bpm: bpm, Publisher: publisher, Performer: performer, Genres: genres, Packages: packages, Atmospheres: atmospheres, Nicknames: nicknames })
                .success(function (data) {
                    $rootScope.$broadcast("hideLoaderAndModalAndRefreshSongs");
                });
        },
        updateSongs: function (songsIds, bpm, publisher, performer, genres, packages, atmospheres, nicknames) {
            $http.post('/Songs/EditSongs', { songsIds: songsIds, bpm: bpm, publisher: publisher, performer: performer, genres: genres, packages: packages, atmospheres: atmospheres, nicknames: nicknames })
              .success(function (data) {
                  $rootScope.$broadcast("hideLoaderAndModalAndRefreshSongs");
              });
        },
        getIndexData: function (performerId, page) {
            var deferred = $q.defer();
            $http.get('/Songs/GetIndexData?performerId=' + performerId + '&page=' + page).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getFilteredData: function (performerId, page, keyword) {
            var deferred = $q.defer();
            $http.get('/Songs/GetSongsByFilter?performerId=' + performerId + '&page=' + page + '&keyword=' + keyword).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },  
        deleteSong: function (songId) {
            $http.post('/Songs/Delete', { songId: songId }).success(function () {
                $rootScope.$broadcast("refreshSongs");
            });
        },
        getSongsFromFolder: function (folder) {
            var deferred = $q.defer();
            $http.get('/Songs/GetSongsFromFolder?folderName=' + folder).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getRecommendations: function () {
            var deferred = $q.defer();
            $http.get('/Recommendations/GetIndexData').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getSongsViewData: function (recommendationId) {
            return $http.get('/Songs/GetSongsViewData?recommendationId=' + recommendationId);
        },
        getGenres: function () {
            var deferred = $q.defer();
            $http.get('/Genres/GetAllGenres').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getSongsByGenre : function(genreId, page) {
            return $http.get('/Songs/GetSongsByGenre?genreId=' + genreId +"&page=" + page);
        },
        saveSongsIsFavorite: function(songId, isFavorite) {
            return $http.post('/Songs/SaveSongsIsFavorite', {songId: songId, isFavorite: isFavorite});
        }
    };
});
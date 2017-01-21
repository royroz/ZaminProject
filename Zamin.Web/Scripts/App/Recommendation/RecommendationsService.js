angular.module("music4BizApp").factory("recommendationsService", function ($q, $http, $rootScope) {
    return {
        getCreateEditData: function (recommendationId) {
            var deferred = $q.defer();
            $http.get("/Recommendations/GetCreateEditData?recommendationId=" + recommendationId).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        SaveRecommendation: function (genres, atmospheres, bpms, nicknames, recommendationName, id) {
            var deferred = $q.defer();
            $http.post("/Recommendations/SaveRecommendation",
                {
                    Genres: genres,
                    Atmospheres: atmospheres,
                    Bpms: bpms,
                    Nicknames: nicknames,
                    Name: recommendationName,
                    Id: id
                })
                .then(function (response) {
                  //  $rootScope.$broadcast("hideRecommendationLoader");
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        },
        getIndexData: function () {
            var deferred = $q.defer();
            $http.get("/Recommendations/GetIndexData").then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        deleteRecommendation: function (recommendationId) {
            $http.post("/Recommendations/Delete", { id: recommendationId }).then(function () {
                $rootScope.$broadcast("refreshRecommendations");
            });
        },
        getSongsByRecommedation: function(recomnmendationId) {
            var deferred = $q.defer();
            $http.get("/Recommendations/GetSongsByRecommendation/" + recomnmendationId).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        updateSongPosition: function (recommendationId, song) {
            return $http.post("/Recommendations/UpdateSongPosition", { recommendationId: recommendationId, song: song });
        },
        saveSongsWithoutPositions: function (recommendationId) {
            return $http.post("/Recommendations/SaveSongsWithoutPositions", { recommendationId: recommendationId});
        },
        deleteSongPosition: function (recommendationId, song) {
            return $http.post("/Recommendations/DeleteSongPosition", { recommendationId: recommendationId, song: song });

        },
        createSongPosition: function (recommendationId, song) {
            return $http.post("/Recommendations/CreateSongPosition", { recommendationId: recommendationId, song: song });

        },
        downloadFiles: function (recommendationId) {
            return $http.post("/Recommendations/DownloadFiles", { recommendationId: recommendationId });
        },
        saveReommendationsOrder: function(recommendations) {
            return $http.post("/Recommendations/SaveRecommendationsOrder", { recommendations: recommendations });
        }
    }

});
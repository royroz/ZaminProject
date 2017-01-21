angular.module('music4BizApp')
    .controller('songsCtrl', function ($scope, $rootScope, $filter, $location, songsService) {

        // ---------------------------- scope variables ----------------------
        $scope.songs = [];
        $scope.folders = [];
        $scope.songsIndexFolder = [];
        $scope.selectedSongs = [];
        $scope.publishers = [];
        $scope.publisher = {};
        $scope.performers = [];
        $scope.performer = {};
        $scope.bpms = [];
        $scope.bpm = {};
        $scope.genres = [];
        $scope.selectedGenres = [];
        $scope.packages = [];
        $scope.selectedPackages = [];
        $scope.atmospheres = [];
        $scope.selectedAtmospheres = [];
        $scope.nicknames = [];
        $scope.selectedNicknames = [];
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.songName = "";
        $scope.indexSongs = [];
        $scope.totalItems = 0;
        $scope.songsView = [];
        $scope.selectedSongsToEdit = [];
        $scope.editMultiple = false;
        //paging
        $scope.currentPage = 0;
        $scope.numberOfPages = 0;
        $scope.startPagesRange = 0;
        $scope.pagesInRange = 25;
        $scope.pagesJumpRange = 15;
        $scope.keyword = '';


        $scope.showLeftPage = false;
        $scope.showRightPage = false;

        $scope.folderSelected = false;

        $scope.recommendations = [];
        $scope.recommendation = {};

        $scope.genresFilter = [];
        $scope.genreFilter = {};
        $scope.showFavoriteCheckbox = false;
        $scope.totalFavorites = 0;
        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.songs, $scope.filterFunction);

        };

        $scope.filterFunction = function (element) {
            if (element.SongName.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };

        //--------------------------------pagination-------------------------------------------
        $scope.getPagesNum = function (num) {
            return new Array(num);
        }

        $scope.nextPages = function () {
            if ($scope.startPagesRange + $scope.pagesJumpRange > $scope.numberOfPages) {
                $scope.startPagesRange = $scope.numberOfPages - $scope.pagesJumpRange;
            } else {
                $scope.startPagesRange += $scope.pagesJumpRange;
            }
            $scope.setPaging();

        }

        $scope.prevPages = function () {
            if ($scope.startPagesRange - $scope.pagesJumpRange < 0) {
                $scope.startPagesRange = 0;
            } else {
                $scope.startPagesRange -= $scope.pagesJumpRange;
            }
            $scope.setPaging();
        }

        $scope.getPage = function (page) {
            $scope.currentPage = page;
            if ($scope.genreFilter.Id !== -1) {
                $scope.getSongsByGenre(false);
            }
            else if ($scope.keyword !== '') {
                $scope.getFilteredData(false);
            } else {
                $scope.getIndexData();
            }

        }

        $scope.indexInPagesRange = function (index) {
            if (index >= $scope.startPagesRange && index < $scope.startPagesRange + $scope.pagesInRange) {
                return true;
            }
            return false;
        }
        $scope.setPaging = function () {
            if ($scope.startPagesRange > 0) {
                $scope.showLeftPage = true;
            } else {
                $scope.showLeftPage = false;
            }
            if ($scope.startPagesRange + $scope.pagesInRange < $scope.numberOfPages) {
                $scope.showRightPage = true;
            } else {
                $scope.showRightPage = false;
            }

        }

        // ----------------------------get functions ----------------------------

        $scope.getData = function (songId) {
            showLoader();
            songsService.getData(songId).then(function (response) {
                $scope.publishers = response.publishers;
                $scope.performers = response.performers;
                $scope.genres = response.genres;
                $scope.packages = response.packages;
                $scope.atmospheres = response.atmospheres;
                $scope.nicknames = response.nicknames;
                $scope.songs = response.songsIndexFolder;
                $scope.bpms = response.bpms;
                $scope.folders = response.s3Folders;
                $scope.songsIndexFolder = response.songsIndexFolder;
                if (response.song != null) {
                    $scope.songName = response.song.SongName;
                    $scope.publisher = response.song.Publisher;
                    $scope.performer = response.song.Performer;
                    $scope.bpm = response.song.Bpm;
                    $scope.songUrl = response.song.SongUrl;
                }
                $scope.openLastFolder();
                hideLoader();
            });
        };

        $scope.getIndexData = function () {
            if (window.location.href.indexOf("Tag") !== -1 || window.location.href.indexOf("SongsView") !== -1) return;
            showLoader();
            if (performerId === -1) {
                performerId = null;
            }
            songsService.getIndexData(performerId, $scope.currentPage).then(function (response) {
                $scope.indexSongs = response.songs;
                $scope.numberOfPages = response.numberOfPages;
                //$scope.indexFilterFunction();
                $scope.setPaging();
                hideLoader();
            });
        };

        $scope.getFilteredData = function (fromClient) {
            if (fromClient) {
                $scope.currentPage = 0;
            }
            $scope.genreFilter = {Id:-1, Name : 'All'};
            $scope.showFavoriteCheckbox = false;

            if (window.location.href.indexOf("Tag") !== -1 || window.location.href.indexOf("SongsView") !== -1) return;
            showLoader();
            if (performerId === -1) {
                performerId = null;
            }
            songsService.getFilteredData(performerId, $scope.currentPage, $scope.keyword).then(function (response) {
                $scope.indexSongs = response.songs;
                $scope.numberOfPages = response.numberOfPages;
                $scope.setPaging();
                hideLoader();
            });
        }

        $scope.openFolder = function (folder, addHash) {
            showLoader();
            songsService.getSongsFromFolder(folder).then(function (response) {
                $scope.songs = response;
                $scope.folderSelected = true;

                $scope.songs.forEach(function (song) {
                    var isSongSelected = $scope.isSongExistsInSelectedCollectionByUrl(song.SongUrl);

                    song.Selected = isSongSelected === true;
                });
                if (addHash) {
                    $location.hash(folder);
                }

                hideLoader();
            });
        }

        $scope.getRecommendations = function () {
            songsService.getRecommendations().then(function (response) {
                $scope.recommendations = response;
                $scope.recommendations.push({ Name: 'All', Id: -1 });
                $scope.recommendation = { Name: 'All', Id: -1 };
            });
        }
        $scope.getGenres = function () {
            songsService.getGenres().then(function (response) {
                $scope.genresFilter = response;
                $scope.genresFilter.push({ Name: 'All', Id: -1 });
                $scope.genreFilter = { Name: 'All', Id: -1 };
            });
        }

        $scope.getSongsByGenre = function (fromClient) {
            $scope.keyword = '';

            if (fromClient) {
                $scope.currentPage = 0;
            }

            if ($scope.genreFilter.Id == -1) {
                $scope.getIndexData();
                $scope.showFavoriteCheckbox = false;
            } else {
                songsService.getSongsByGenre($scope.genreFilter.Id, $scope.currentPage).success(function (response) {
                    $scope.indexSongs = response.songs;
                    $scope.numberOfPages = response.numberOfPages;
                    $scope.setPaging();
                    $scope.showFavoriteCheckbox = true;
                    $scope.totalFavorites = $.grep($scope.indexSongs, function (song) { return true === song.IsFavorite }).length;
                    hideLoader();
                });
            }
        }

        $scope.saveSongsIsFavorite = function (song) {
            if (song.IsFavorite === true) {
                $scope.totalFavorites++;
            } else {
                $scope.totalFavorites--;
            }
            showLoader();
            songsService.saveSongsIsFavorite(song.Id, song.IsFavorite).success(function() {
                getCookieMessages();
                hideLoader();
            });
        }

        $scope.getSongsCsv = function () {
            window.open('/Songs/GetSongsCsv/' + $scope.recommendation.Id, '_blank', '');
        }
        $scope.songsViewHref = function () {
            window.open('/Songs/SongsView/' + $scope.recommendation.Id, '_blank', '');
        }
        $scope.getSongsViewData = function () {
            if (window.location.href.indexOf("SongsView") === -1) return;
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.length);
            showLoader();
            songsService.getSongsViewData(recommendationId).success(function (response) {
                $scope.songsView = response;
                hideLoader();
            });
        }
        $scope.getSongsViewData();
        // ----------------------------post functions ----------------------------


        $scope.updateSong = function () {
            showLoader();
            $scope.selectedGenres = [];
            $scope.selectedPackages = [];
            $scope.selectedAtmospheres = [];
            $scope.selectedNicknames = [];
            $scope.genres.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedGenres.push(element);
                    element.Selected = false;
                };
            });
            $scope.packages.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedPackages.push(element);
                    element.Selected = false;
                };
            });
            $scope.atmospheres.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedAtmospheres.push(element);
                    element.Selected = false;
                };
            });
            $scope.nicknames.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedNicknames.push(element);
                    element.Selected = false;
                };
            });
            if ($scope.editMultiple) {
                if ($scope.selectedSongsToEdit.length === 0) {
                    hideLoader();
                    $("#editSongModal").modal('hide');
                    return;
                };
                songsService.updateSongs($scope.selectedSongsToEdit, $scope.bpm, $scope.publisher, $scope.performer, $scope.selectedGenres, $scope.selectedPackages, $scope.selectedAtmospheres, $scope.selectedNicknames);
            } else {
                songsService.updateSong($scope.songId, $scope.songName, $scope.bpm, $scope.publisher, $scope.performer, $scope.selectedGenres, $scope.selectedPackages, $scope.selectedAtmospheres, $scope.selectedNicknames);
            }

        }

        $scope.tagSongs = function () {
            showLoader();
            $scope.selectedGenres = [];
            $scope.selectedPackages = [];
            $scope.selectedAtmospheres = [];
            $scope.selectedNicknames = [];
            $scope.genres.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedGenres.push(element);
                };
            });
            $scope.packages.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedPackages.push(element);
                };
            });
            $scope.atmospheres.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedAtmospheres.push(element);
                };
            });
            $scope.nicknames.forEach(function (element) {
                if (element.Selected === true) {
                    $scope.selectedNicknames.push(element);
                };
            });
            if ($scope.selectedSongs.length > 1) {
                $scope.songName = "";
            }
            songsService.tagSongs($scope.selectedSongs, $scope.songName, $scope.bpm, $scope.publisher, $scope.performer, $scope.selectedGenres, $scope.selectedPackages, $scope.selectedAtmospheres, $scope.selectedNicknames, $location.hash());
        };

        $scope.editSelected = function () {
            $scope.editMultiple = true;
            $scope.selectedSongsToEdit = [];
            $scope.bpm = {};
            $scope.publisher = {};
            $scope.performer = {};
            $scope.indexSongs.forEach(function (song) {
                if (song.selected) {
                    $scope.selectedSongsToEdit.push(song.Id);
                }
            });
            if ($scope.selectedSongsToEdit.length > 0) {
                $("#editSongModal").modal('show');
            }
        }

        $scope.deleteSong = function () {
            songsService.deleteSong($scope.songId);
        }

        $scope.selectAllSongsToEdit = function (selected) {
            $scope.indexSongs.forEach(function (song) {
                song.selected = !selected;
            });
        }

        // ----------------------------other functions ----------------------------
        $scope.addSelectedSong = function (song) {
            if (song.Selected === false) {
                $scope.selectedSongs.push(song);
            }
            else if (song.Selected === true) {
                var index = $scope.selectedSongs.indexOf(song);
                $scope.selectedSongs.splice(index, 1);
            }
        };

        $scope.removeSelectedSong = function (selectedSong) {
            var index = $scope.selectedSongs.indexOf(selectedSong);
            $scope.selectedSongs.splice(index, 1);

            $scope.songs.forEach(function (song) {
                if (song.SongUrl === selectedSong.SongUrl) {
                    song.Selected = false;
                }
            });
        };

        $scope.openPlaySongModal = function () {
            $('#playSong').modal();
        };


        $scope.EditSong = function (songId) {
            $scope.editMultiple = false;
            $scope.songId = songId;
            $scope.getData(songId);
        }
        $scope.SaveSongId = function (songId) {
            $scope.songId = songId;
        }

        $scope.$on("hideLoaderAndRedirect", function (p, response) {
            hideLoader();
            getCookieMessages();
            if (response.result === true) {
                window.location.href = "Tag##" + response.folder;
                $scope.getData();
                $scope.removeSelectedSongs();
                hideLoader();
            }
        });

        $scope.$on("hideLoaderAndModalAndRefreshSongs", function () {
            hideLoader();
            getCookieMessages();
            $("#editSongModal").modal('hide');
            $scope.selectAll = false;
            $scope.getIndexData();
        });

        $scope.$on("refreshSongs", function () {
            $scope.getIndexData();

        });

        $scope.selectAllSong = function () {
            $scope.songs.forEach(function (song) {
                song.Selected = true;
                if ($scope.isSongExistsInSelectedCollectionByUrl(song.SongUrl) === false) {
                    $scope.selectedSongs.push(song);
                }
            });

        }
        $scope.removeSelectedSongs = function () {
            $scope.selectedSongs.forEach(function (song) {
                song.Selected = false;
            });
            $scope.selectedSongs = [];
        }

        $scope.isSongExistsInSelectedCollectionByUrl = function (url) {
            var result = $.grep($scope.selectedSongs, function (selectedSong) { return url === selectedSong.SongUrl });
            return result.length > 0;
        }
        $scope.openLastFolder = function () {
            if ($location.hash() != undefined && $location.hash() !== '') {
                $scope.openFolder($location.hash(), false);
            }
        }

        // ---------------------------- flow start ---------------------------

        $scope.getData();
        $scope.getIndexData();
        $scope.getRecommendations();
        $scope.getGenres();

    });
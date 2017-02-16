(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name media.controller:MediaCtrl
   *
   * @description
   *
   */
  angular
    .module('media')
    .controller('MediaCtrl', MediaCtrl);

  function MediaCtrl($scope, $location, $rootScope, $timeout, $sce, $mdDialog) {
    $scope.videos = [{
            Id: 1,
            Name: "123",
            Url: "https://www.youtube.com/watch?v=DDXnrqifaD0"
        },
        {
            Id: 2,
            Name: "345",
            Url: "https://www.youtube.com/watch?v=j_mFJ2d0qxQ"
        },
        {
            Id: 3,
            Name: "657",
            Url: "https://www.youtube.com/watch?v=Yvw7QGytgNQ"
        },
        {
            Id: 4,
            Name: "789",
            Url: "https://www.youtube.com/watch?v=TRyOcLSJDzk&t=3s"
        },
        {
            Id: 5,
            Name: "qwe",
            Url: "https://www.youtube.com/watch?v=Ro724MKk0lg"
        }
    ];

    $scope.currentIframe = undefined;


    $scope.getVideos = function() {

        //TODO: Get from server

        $scope.videos.forEach(function(video) {
            var url = video.Url.replace("watch?v=", "v/");
            video.iframe = $sce.trustAsResourceUrl(url);
        })
        $timeout(function() {
            $("#videos").slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                initialSlide:       $scope.videos.length - 3,
                centerMode: true
            });
        }, 100);

    };

    $scope.openVideoModal = function(iframe, ev) {
        $scope.currentIframe = iframe;
        $mdDialog.show({
          targetEvent: ev,
          templateUrl: 'dialogs/videoDialog.html',
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true
        });
    }



    $scope.getVideos();
  }
}());

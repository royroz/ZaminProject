(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $location, $rootScope) {
    $scope.getBgHeight = function () {
        var img = new Image();
        img.src = window.getComputedStyle(document.body).getPropertyValue("background-image").replace(/url\(|\)$/ig, "");
        return document.body.offsetWidth * img.height / img.width;
    }

    $scope.changeBg = function (path) {
        $("body").removeClass("home-bg");
        $("body").removeClass("lib-bg");
        $("body").removeClass("portfolio-bg");
        $("body").removeClass("businessMusic-bg");

        var className = "";
        if (path === "/") className = "home-bg";
        if (path === "/libraries") className = "lib-bg";
        if (path === "/portfolio") className = "portfolio-bg";
        if (path === "/businessMusic") className = "businessMusic-bg";
        $("body").addClass(className);


        //if ($("#ng-view .home-row")[0] != undefined) $("#ng-view .home-row")[0].style.marginTop = "25%";

    }
    $scope.changeBg($location.path());

  }
}());

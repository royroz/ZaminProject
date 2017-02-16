(function () {
  'use strict';

  /* @ngdoc object
   * @name zamin
   * @description
   *
   */
  angular
    .module('zamin', [
      'ngMaterial',
      'ui.router',
      'home',
      'media'
    ])
    .constant("consts", {
      serverUrl: 'http://zamin/'
    })
}());

var showLoader = function(){
  $("#loader").show();
}

var hideLoader = function(){
  $("#loader").hide();
}

var imgError = function (image) { //Hide image if notFound
    image.style.display = 'none';
}

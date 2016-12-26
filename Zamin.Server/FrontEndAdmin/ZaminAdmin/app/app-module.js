(function() {
  'use strict';

  /* @ngdoc object
   * @name slice
   * @description
   *
   */
  angular
    .module('slice', [
      'ngAria',
      'ngMaterial',
      'ui.router',
      //'angular-flot',
      'google.places',
      'app.core',
      'app.charts',
      'app.routes',
      'app.sidebar',
      'app.navsearch',
      'app.preloader',
      'app.loadingbar',
      'app.translate',
      'app.settings',
      'app.maps',
      'app.utils',
      'app.material',
      'ngFileUpload',
      'home',
      'login',
      'forgotPassword',
      'resetPassword',
      'pizzaSize',
      'doughType',
      'topping',
      'franchise',
      'franchiseForm',
      'category',
      'menuItem',
      'itemForm',
      'pizza',
      'combo',
      'comboForm',
      'mdPickers',
      'branch',
      'branchForm',
      'user',
      'userForm',
      'pizzaForm'
    ]).constant("consts", {
      serverUrl: 'http://slice/'
    });;
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


(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig)
        ;
    materialConfig.$inject = ['$mdIconProvider'];
    function materialConfig($mdIconProvider){
      $mdIconProvider
        .icon('share-arrow', 'images/icons/share-arrow.svg', 24)
        .icon('upload', 'images/icons/upload.svg', 24)
        .icon('copy', 'images/icons/copy.svg', 24)
        .icon('print', 'images/icons/print.svg', 24)
        .icon('hangout', 'images/icons/hangout.svg', 24)
        .icon('mail', 'images/icons/mail.svg', 24)
        .icon('message', 'images/icons/message.svg', 24)
        .icon('copy2', 'images/icons/copy2.svg', 24)
        .icon('facebook', 'images/icons/facebook.svg', 24)
        .icon('twitter', 'images/icons/twitter.svg', 24);
    }
})();

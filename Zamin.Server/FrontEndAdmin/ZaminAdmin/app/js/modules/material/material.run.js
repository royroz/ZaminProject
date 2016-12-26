(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
        ;
    materialRun.$inject = ['$http', '$templateCache'];
    function materialRun($http, $templateCache){
      var urls = [
        'images/icons/share-arrow.svg',
        'images/icons/upload.svg',
        'images/icons/copy.svg',
        'images/icons/print.svg',
        'images/icons/hangout.svg',
        'images/icons/mail.svg',
        'images/icons/message.svg',
        'images/icons/copy2.svg',
        'images/icons/facebook.svg',
        'images/icons/twitter.svg'
      ];

      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });

    }

})();

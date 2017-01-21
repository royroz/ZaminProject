angular.module('music4BizWebsite').factory('portfolioService', function ($q, $http, $rootScope, consts) {
    return {
        getPortfolioImages: function() {
            return $http({
                method: "GET",
                url: consts.serverUrl + 'Website/GetPortfolios'
            });
        }
    }
});

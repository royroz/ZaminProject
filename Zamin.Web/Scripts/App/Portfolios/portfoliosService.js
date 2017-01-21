angular.module("music4BizApp").factory("portfoliosService", function ($q, $http, $rootScope) {
    return {
        getPortfolios: function () {
            var deferred = $q.defer();
            $http.get("/Cms/GetPortfolios").then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        saveItem: function (item) {
            var fd = new FormData();
            fd.append("id", item.id);
            fd.append("ImageFile", item.ImageFile);
            fd.append("video", item.video);
            fd.append("image", item.image);
            return $http.post('/Cms/SavePortfolio', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } });
        },
        deleteItem: function(itemId) {
            return $http({
                method: "POST",
                url: '/Cms/RemovePortfolio',
                data: { itemId: itemId }
            });
        },
        saveItemOrder: function(items) {
            return $http.post("/Cms/SavePortfolioItemsOrder", { portfolioItems: items });
        }
    }
});

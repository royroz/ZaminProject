angular.module('music4BizApp').controller('tranzilaSuccessCtrl', function ($scope) {

    $scope.closeModal = function () {
        $("#licenseModal").modal('hide');
        hideLoader();
        window.location.href = "/Clients";
    }
    
    $scope.closeModalAndRedirect();
});
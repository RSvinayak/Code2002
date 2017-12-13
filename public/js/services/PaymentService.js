angular.module('CFApp').factory('PaymentService', ['$http', '$q', function ($http, $q) {
    var getPaymentDetails = function () {
        return $http({
            url: '/api/payment/',
            method: 'GET',
        });
    }

    var getInstallmentDetails = function (groupID, subscriberID) {
        return $http({
            url: '/api/paymentinstallment/'+groupID+'/'+subscriberID,
            method: 'GET',
        });
    }

    return {
        getPaymentDetails: getPaymentDetails,
        getInstallmentDetails: getInstallmentDetails
    }
}]);
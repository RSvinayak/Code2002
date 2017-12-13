angular.module('CFApp').factory('InstallmentAdvanceService', ['$http', '$q',  function($http, $q) {
    var getPaymentAndReceiptDetails = function(){              
        return $http({
                url: '/api/payment/',
                method: 'GET',
        });
    }

    return {
        getPaymentAndReceiptDetails: getPaymentAndReceiptDetails
    }        
}]); 
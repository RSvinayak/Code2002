angular.module('CFApp').factory('InstallmentReceiptService', ['$http', '$q', function ($http, $q) {

    var getReceiptDetails = function () {
        return $http({
            url: '/api/receipt/',
            method: 'GET',
        });
    }

    var addReceiptDetails = function (receiptdata) {
        return $http({
            url: '/api/receipt',
            method: 'POST',
            data: receiptdata
        });
    }

    var updateReceiptDetail = function (rowid, receiptdata) {
        return $http({
            url: '/api/receipt/'+rowid,
            method: 'PUT',
            data: receiptdata
        });
    }
    

    return {
        getReceiptDetails: getReceiptDetails,
        addReceiptDetails: addReceiptDetails,
        updateReceiptDetail: updateReceiptDetail
    }
}]);
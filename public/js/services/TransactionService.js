angular.module('CFApp').factory('TransactionService', ['$http', '$q',  function($http, $q) {
    
    var getTransactionDetails = function(){              
        return $http({
                url: '/api/transactions',
                method: 'GET',
        });
    }

        
    
    return {
        getTransactionDetails: getTransactionDetails
    }
        
}]);
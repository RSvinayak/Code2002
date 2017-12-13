angular.module('CFApp').factory('HomeService', ['$http', '$q',  function($http, $q) {
    
    var getApplicationConfigDetails = function(){              
        return $http({
                url: '/api/appconfig',
                method: 'GET',
        });
    }

    return {
        getApplicationConfigDetails: getApplicationConfigDetails
    }
        
}]);
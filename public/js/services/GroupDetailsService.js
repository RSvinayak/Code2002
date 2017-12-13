angular.module('CFApp').factory('GroupDetailsService', ['$http', '$q',  function($http, $q) {
    
        var getGroupDetails = function(){              
                return $http({
                        url: '/api/groupdetails',
                        method: 'GET',
                });
        }

        var addGroupDetails = function(data){
                return $http({
                        url: '/api/groupdetails',
                        method: 'POST',
                        data: data
                });
        }

        var updateGroupDetails = function(id, data){
                return $http({
                        url: '/api/groupdetails/'+id,
                        method: 'PUT',
                        data: data
                });
        }

        var getSubscriberTicketMapping = function(groupid){              
                return $http({
                        url: '/api/stm/'+groupid,
                        method: 'GET',
                });
        }

        var createDefaultSubscriberTicketMapping = function(id, count){
                return $http({
                        url: '/api/stm/'+id+'/'+count,
                        method: 'POST'
                });
        }

        var updateSubscriberTicketMapping = function(id, data){
                return $http({
                        url: '/api/stm/'+id,
                        method: 'PUT',
                        data: data
                });
        }
    
        return {
            getGroupDetails: getGroupDetails,
            addGroupDetails: addGroupDetails,
            updateGroupDetails: updateGroupDetails,
            createDefaultSubscriberTicketMapping: createDefaultSubscriberTicketMapping,
            getSubscriberTicketMapping: getSubscriberTicketMapping,
            updateSubscriberTicketMapping: updateSubscriberTicketMapping
        }
}]);
angular.module('CFApp').factory('ManageSubscriberService', ['$http', '$q',  function($http, $q) {
    
        var getSubscribers = function(){              
                return $http({
                        url: '/api/subscriber',
                        method: 'GET',
                });
        }

        var getSubscriberImages = function(user, imageType){              
                return $http({
                        url: '/api/subscriber_images/'+user+'/'+imageType,
                        method: 'GET',
                });
        }

        var addSubscriber = function(subscriber){
                return $http({
                        url: '/api/subscriber',
                        method: 'POST',
                        data: subscriber
                });
        }

        var updateSubscriber = function(id, subscriber){
                return $http({
                        url: '/api/subscriber/'+id,
                        method: 'PUT',
                        data: subscriber
                });
        }

        var updatePartyKYCDetails = function(id, kycData){
               return $http({
                        url: '/api/subscriber/kyc/'+id,
                        method: 'PUT',
                        data: kycData
                }); 
        }

        var getDropDownListData = function(identifier, filtervalue){
                return $http({
                        url: '/api/dropdown/'+identifier+'/'+filtervalue,
                        method: 'GET',
                });
        }
    
        return {
            getSubscribers: getSubscribers,
            addSubscriber: addSubscriber,
            updateSubscriber: updateSubscriber,
            updatePartyKYCDetails: updatePartyKYCDetails,
            getSubscriberImages: getSubscriberImages,
            getDropDownListData: getDropDownListData
        }
}]);
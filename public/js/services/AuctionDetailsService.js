angular.module('CFApp').factory('AuctionDetailsService', ['$http', '$q',  function($http, $q) {
    
        var getGroupsForAuction = function(){              
                return $http({
                        url: '/api/auction/groups',
                        method: 'GET',
                });
        }

        var getAuctionDetailsForGroup = function(groupid){              
                return $http({
                        url: '/api/auction/groupauctions/'+groupid,
                        method: 'GET',
                });
        }

        var addAuctionDetailsForGroup = function (data){
                return $http({
                        url: '/api/auction',
                        method: 'POST',
                        data: data
                });
        }
    
        return {
            getGroupsForAuction: getGroupsForAuction,
            getAuctionDetailsForGroup: getAuctionDetailsForGroup,
            addAuctionDetailsForGroup: addAuctionDetailsForGroup
        }
}]);
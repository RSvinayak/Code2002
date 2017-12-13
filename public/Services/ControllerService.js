angular.module('myApp').factory('ControllerService', ['$http', '$q',  function($http, $q) {
    console.log("ControllerService");
    //alert("gigigi")
        var getTaxwithinState = function(){
                   // alert(" getTaxwithinState in factory call ")      
                return $http({
                        url: '/apigettaxwithinstate',
                        method: 'GET',
                });
        }
         var getTaxOutState = function(){
                   // alert(" getTaxwithinState in factory call ")      
               return  $http({
                        url: '/apigettaxoutstate',
                        method: 'GET',
                })
                 
        }
//          $http.get('/gettaxwithinstate').success(function(response) {
//      console.log(response);
//      console.log(response.length);
// for (i=0;i<=response.length-1;i++){
//             duplicat.push({
//               'aliasname':response[i].aliasname,
//               'taxname':response[i].taxname
//             });

//        }
//           //for checking duplicates in object and removes
//           function arrUnique(arr) {
//                var cleaned = [];
//                duplicat.forEach(function(itm) {
//                var unique = true;
//                cleaned.forEach(function(itm2) {
//                if (_.isEqual(itm, itm2)) unique = false;
//                 });
//                if (unique)  cleaned.push(itm);
//                 });
//                return cleaned;
//           }
//       console.log(duplicat.length);
//       var uniqueStandards = arrUnique(duplicat);
//       console.log(uniqueStandards)
//       console.log(uniqueStandards.length)
//       $scope.withinstat = uniqueStandards;
//       duplicat = []
//  });

        // var getSubscriberImages = function(user, imageType){              
        //         return $http({
        //                 url: '/api/subscriber_images/'+user+'/'+imageType,
        //                 method: 'GET',
        //         });
        // }

        // var addSubscriber = function(subscriber){
        //         return $http({
        //                 url: '/api/subscriber',
        //                 method: 'POST',
        //                 data: subscriber
        //         });
        // }

        // var updateSubscriber = function(id, subscriber){
        //         return $http({
        //                 url: '/api/subscriber/'+id,
        //                 method: 'PUT',
        //                 data: subscriber
        //         });
        // }

        // var updatePartyKYCDetails = function(id, kycData){
        //        return $http({
        //                 url: '/api/subscriber/kyc/'+id,
        //                 method: 'PUT',
        //                 data: kycData
        //         }); 
        // }

        // var getDropDownListData = function(identifier, filtervalue){
        //         return $http({
        //                 url: '/api/dropdown/'+identifier+'/'+filtervalue,
        //                 method: 'GET',
        //         });
        // }
    
            return{
                getTaxwithinState:getTaxwithinState,
                getTaxOutState:getTaxOutState,
            }
       
}]);
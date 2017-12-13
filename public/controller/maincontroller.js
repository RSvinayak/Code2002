
myApp.factory('maincontroller1',function(){
	alert("welcome to maincontroller")
	//return{
		var process = function(input) {
			// for(i=0;i<$scope.items.length;i++){
       
         			// if (itemname == $scope.items[i].Name){
         					alert("entered process")
         			 		 $http.get('/itemnamedetails'+input).success(function(response){
                              console.log(response)
                            console.log( response[0].InvGroupID)

                          

                 			 $http.get('/itemdetails'+response[0].InvGroupID).success(function(response){
                            //console.log(response)
                      		 $http.get('/itemPurityDetails'+response[0].InvGroupID).success(function(response){
                              console.log(response)
                            $scope.irate=response; 

                            })   
            
                  		  })
                 	 })  
             		// break;
         		// }    
       
   //}
		}
	//}
})
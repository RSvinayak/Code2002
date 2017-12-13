var myApp=angular.module('myApp',[]); 
myApp.controller('loginCntrl',['$scope','$http','$rootScope',
function($scope,$http,$rootScope){
	//alert("login call")
	var validation = 0;	
	var name = null;
	var desgination = null;
	$scope.loginCall = function(){
		
		
		$http.get('/getLoginDetails',{params:{"password":$scope.password,"username":$scope.username}}).success(function(response){
			console.log(response[0].name);
			console.log(response[0].desgination);
			console.log(response.length);
			// $rootScope.name = response[0].name;
			// console.log($rootScope.name)
			
			if(response.length == 0){
				validation = 0;

				//$scope.myloginlink = "mainpage.html";
				//alert("Please check Details again")
			}else{
			validation = 1;
			name = response[0].name;
			desgination = response[0].desgination;
			}


		})
		 
	}
	$scope.loginValidateCall = function(){
		if(validation == 1){
				
				//console.log($rootScope.name)
				 window.sessionStorage.setItem("username",name);
				 window.sessionStorage.setItem("desgination",desgination);
				$scope.myloginlink = "mainpage.html";
				//alert("Please check Details again")
			}else{
				//alert("Please check Details again")
				$scope.failure = true;
			}

	}

	$scope.cancelCall = function(){
		$scope.password = null;
		$scope.username = null;
		//alert("cancel call")
		//$scope.myloginlink = "mainpage.html";
	}
// alert("login")
}])

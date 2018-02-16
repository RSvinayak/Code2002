var myApp=angular.module('myApp',[]); 
myApp.controller('loginCntrl',['$scope','$http','$rootScope',
function($scope,$http,$rootScope){
	//alert("login call")
	var validation = 0;	
	var dailyRateCall = false;
	var name = null;
	var desgination = null;
	$http.get('/getinventorygroupvaluenotationlast').success(function(response){
		console.log(response[0].date);
		//compareDate = new Date();
		var lastDate  = new Date(((new Date(response[0].date).toISOString().slice(0, 23))+"-05:30")).toISOString();
     
		 var currentDate  = new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
     
		console.log(currentDate+" "+lastDate);
		 // console.log($scope.bit1.date2)
   //   console.log(Date.parse($scope.bit1.date2) )
   		currentDate = currentDate.slice(0,10);
   		lastDate = lastDate.slice(0,10);
   		console.log(currentDate+" "+lastDate);

      if (Date.parse(currentDate) != Date.parse(lastDate )) {
            //alert("Invalid Date Range!\nFrom Date cannot be after To Date!")
            dailyRateCall = false;
        }else{
        	//alert(" ok proceed ")
        	dailyRateCall = true;
        }
	})
	$scope.loginCall = function(){
		$scope.failure = false;
		
		$http.get('/getLoginDetails',{params:{"password":$scope.password,"username":$scope.username}}).success(function(response){
			// console.log(response[0].name);
			// console.log(response[0].desgination);
			// console.log(response.length);
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
	$scope.charan=function(event) {
			//console.log(event)
		//alert("jj")
		
		if (event.keyCode==13 && validation == 1 ) {
			//alert("jj")
		window.sessionStorage.setItem("username",name);
				 window.sessionStorage.setItem("desgination",desgination);
				// $scope.mylogi = "Transaction.html";
				window.location="Transaction.html"	
		} 
		else if(event.keyCode==13 && validation != 1){
			// alert("else")
			 $scope.failure = true;
		}
	}
	$scope.loginValidateCall = function(){
		 window.sessionStorage.setItem("username",name);
		 window.sessionStorage.setItem("desgination",desgination);
				
		if(validation == 1 && dailyRateCall == false){
				
				$scope.myloginlink = "dailyRates.html";
				
		}else if (validation == 1 && dailyRateCall == true){
				//alert("Please check Details again")
				$scope.myloginlink = "Transaction.html";
				
		}else{
			$scope.failure = true;
		}

	}

	$scope.cancelCall = function(){
		//alert($scope.password)
		$scope.password = null;
		$scope.username = null;
		$scope.failure = false;
		//alert("cancel call")
		//$scope.myloginlink = "mainpage.html";
	}
// alert("login")
}])

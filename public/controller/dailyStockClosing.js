var myApp=angular.module('myApp',[]); 

myApp.controller('stockCntrl',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){

$scope.bit1 = {
    date2: new Date()
  };

  $scope.clearCall = function () {
    $scope.displayReport = '';
  } 
  $scope.stockVerifyPreview = function () {
  	var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
              todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";

           var d  = new Date($scope.bit1.date2);
            d.setDate(d.getDate()-1);
               var previousDate  = new Date(((new Date(d).toISOString().slice(0, 23))+"-05:30")).toISOString();
     			previousDate = previousDate.slice(0,10);
           //  previousDate =previousDate+"T00:00:00.000Z";
             previousDate =previousDate+"T23:59:59.999Z";

 //alert("fromdate "+fromdate+" todate "+todate+" previousDate "+previousDate)
            // todate= todate.slice(0,10);
             //todate = todate+"T23:59:59.999Z";
            // date= fromdate+","+todate;
           // alert(fromdate)

  	//alert($scope.bit1.date2)
  	$http.get('/stockVerifyPreview', {params:{"todate":todate,"fromdate":fromdate,"previousDate":previousDate}}).success(function(response){
      //alert(response.length);
      console.log(response);
      if(response.length == 0){
        alert(" No matches are found");
        $scope.displayReport = "";

      }else{

             $scope.displayReport = response;
      }

     

    })
    // $http.get('/stockVerifyPreview').success(function(response){
    // })
  }

//alert("jjj")
}]);
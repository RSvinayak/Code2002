 var myApp=angular.module('myApp',[]); 

myApp.controller('stockDetailsCntrl',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){

//for default values
//for sorted data barcoded found
//var sortedBarCode = [];
//var sortedBarCodeMinus = []; //for substract the finded one
//$scope.item.InvGroupName = "Gold Bullion";
//for group
 $http.get('/getinventorygroupmaster').success(function(response){
       console.log(response);
       $scope.inventorygroupmaster1 = response
        
  });
//for category
 $http.get('/getsalescategorymaster').success(function(response){
        console.log(response);
        $scope.salescategorymaster1 = response
 });

//display call
$scope.displayBarcodedItems = function () {
	//alert("diss");
	//alert($scope.item.InvGroupName)
	$http.get('/stockDetaildisplayBarcodedItems', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
       
      //  console.log(response);
        
        $http.get('/stockResetTrue', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(result){
        	$scope.sortedBarcodeDataItems = result;
        	 	$scope.itemsFound = result.length;

        	 	$scope.foundScaleWt = null;
        	 	$scope.foundPieces = null;
         	for (var j = result.length - 1; j >= 0; j--) {
         		$scope.foundScaleWt = $scope.foundScaleWt + result[j].gwt;
         		$scope.foundPieces = $scope.foundPieces +result[j].gpcs;
         	}
        })
       
        $scope.displayBarcoded = response;
        $scope.item.barcode ="";
       // sortedBarCode = [];
        totalCall()
 	});

}

var totalCall = function () {
	$http.get('/stockTotalCall', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
     	//console.log(response[0].count);
     	//console.log(response[0].gwt);
     	//	console.log(response[0].gpcs)
      if (response.length!=0) {
     	$scope.itemsListedTotal = response[0].count ;
     	$scope.totalScaleWt = response[0].gwt;
     	$scope.totalScale = response[0].gpcs;
     }else{
          $scope.itemsListedTotal = "" ;
      $scope.totalScaleWt = "";
      $scope.totalScale = "";
     }
     		
     	
     })  
    // }

}
$scope.codedBarcodedItems = function () {

  var barcodenum = $scope.item.barcode;
  var len = barcodenum.toString().length;
  //console.log(barcodenum.toString().length);
  if (len == 8 ){
  	//{params:{}}).success(function(response){
       
  	//alert("codedBarcodedItems");
      $http.get('/stockCodedBarcodedItems', {params:{"barcode":$scope.item.barcode,"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){  
      		console.log(response.length);
          console.log(response)

         	//console.log($scope.displayBarcoded.length);
         	$scope.sortedBarcodeDataItems = response;
         	$scope.itemsFound = response.length;

	            $scope.foundScaleWt = null;
        	 	$scope.foundPieces = null;
         		for (var j = response.length - 1; j >= 0; j--) {
         				$scope.foundScaleWt = $scope.foundScaleWt + response[j].gwt;
         				$scope.foundPieces = $scope.foundPieces +response[j].gpcs;
         		}

         	
           		 //console.log( $scope.sortedBarcodes);
           		 $http.get('/stockDetaildisplayBarcodedItems', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
       
        				 //console.log(response);
        				 $scope.displayBarcoded = response;
        		 })
 
        })
   }
}
$scope.resetCall = function (sortedBarcodeDataItems) {
	//alert(sortedBarcodeDataItems.length);
	
	for (var i = sortedBarcodeDataItems.length - 1; i >= 0; i--) {
		//alert(sortedBarcodeDataItems[i]._id);
		//console.log(sortedBarcodeDataItems[i]._id)
		$http.get('/stockUninstallReset', {params:{"id":sortedBarcodeDataItems[i]._id}}).success(function(response){  
     		 //console.log(response);
     		 $scope.sortedBarcodeDataItems = "";
      		 $scope.item.barcode ="";
      });
		 const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
     						$scope.displayBarcodedItems();
                         }, 1000);
	}
	 

	// body...
}
 
 
}]);
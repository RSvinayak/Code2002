//for item.html 
var myApp=angular.module('myApp',[]); 

myApp.controller('ItemCntrl',['$scope','$http','$window',
function($scope,$http,$window){
  //alert("well come to ItemCntrl")
  $scope.itemdetails = []
  var duplicat = [];
  var duplicate = [];
  var selectedrow = null;
 var editcheck = false;
 // $scope.item1.filter="All "

 //validation

 
  $http.get('/getinventorygroupmaster').success(function(response){
      // console.log(response);
       $scope.inventorygroupmaster1 = response
        
    })

  $http.get('/getitemtype').success(function(response){
        //console.log(response);
          $scope.itemtype1 = response
    })

  $http.get('/getsalescategorymaster').success(function(response){
        console.log(response);
        $scope.salescategorymaster1 = response
    })

  
    $http.get('/gettaxwithinstate').success(function(response) {
     console.log(response);
     console.log(response.length);
for (i=0;i<=response.length-1;i++){
            duplicat.push({
              'aliasname':response[i].aliasname,
              'taxname':response[i].taxname
            });

       }
          //for checking duplicates in object and removes
          function arrUnique(arr) {
               var cleaned = [];
               duplicat.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
      console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      console.log(uniqueStandards)
      console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
 });
//};

//refresh();
 $http.get('/gettaxoutofstate').success(function(response) {
     console.log(response);
     console.log(response.length);
    //for duplicates
        for (i=0;i<=response.length-1;i++){
            duplicate.push({
              'aliasname':response[i].aliasname,
              'taxname':response[i].taxname
            });
            
       }
          //for checking duplicates in object and removes 
          function arrUnique(arr) {
               var cleaned = [];
               duplicate.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
      console.log(duplicate.length);
      var uniqueStandards = arrUnique(duplicate);
      console.log(uniqueStandards)
      console.log(uniqueStandards.length)
      $scope.outofstat  = uniqueStandards;
      duplicate = []
 });
var itemdatafetch = function(){
  $http.get('/getitemdata').success(function(response){
        //console.log(response);
        $scope.itemdetails = response
        // console.log($scope.itemdetails);
    })
}
 itemdatafetch();

// for new button

$scope.all = true
$scope.new = function(){
    console.log("i got new call")
    $scope.all = false
}

//for save item
//$scope.item1 = {}
//var $scope.item1.Name=null;
//alert($scope.item1.Name)

//$scope.saveitem = function(){
   //var $scope.item1.Name = ;
//alert($scope.item1.Name)
// alert($scope.item1.Name)
//         if(  $scope.item1.Hsc == undefined && $scope.item1.Desc == undefined &&$scope.item1.InvGroupName == undefined &&$scope.item1.Desc == undefined &&
// $scope.item1.ItemType == undefined &&$scope.item1.SaleCategory == undefined &&$scope.item1.Withinstate == undefined &&$scope.item1.Outofstate == undefined)
// {
//    alert("Please fill all mandetory fields");
         
// }

    //alert($scope.item1.Name );
    //validation purpose
    $scope.saveitem = function(){
    console.log("saving the call");
    //validation purpose
    if($scope.item1.Name == undefined ||$scope.item1.Hsc == undefined ||$scope.item1.Desc == undefined ||$scope.item1.InvGroupName == undefined ||$scope.item1.Desc == undefined ||
      $scope.item1.ItemType == undefined ||$scope.item1.SaleCategory == undefined ||$scope.item1.Withinstate == undefined ||$scope.item1.Outofstate == undefined){
      for(let q =0;q<1;q++){
       console.log("undefined call look this please"); 
       console.log($scope.item1.Name);
        if($scope.item1.Name == undefined){
          alert("Please enter Name");
          break;
        } 
       console.log($scope.item1.Hsc);
       if($scope.item1.Hsc == undefined){
          alert("Please enter Hsc");
          break;
        } 
        console.log($scope.item1.Desc);
        if($scope.item1.Desc == undefined){
          alert("Please enter Desc");
          break;
        } 
         console.log($scope.item1.InvGroupName);
         if($scope.item1.InvGroupName == undefined){
          alert("Please enter InvGroupName");
          break;
        } 
         console.log($scope.item1.ItemType);
         if($scope.item1.ItemType == undefined){
          alert("Please enter ItemType");
          break;
        } 
          console.log($scope.item1.SaleCategory);
         if($scope.item1.SaleCategory == undefined){
          alert("Please enter SaleCategory");
          break;
        } 
           console.log($scope.item1.Withinstate);
        if($scope.item1.Withinstate == undefined){
          alert("Please enter Withinstate");
          break;
        } 
           console.log($scope.item1.Outofstate);
       if($scope.item1.Outofstate == undefined){
          alert("Please enter Outofstate");
          break;
        } 
      }//for closer
    }else{
    

     if($scope.item1.comboItem == true){
        $scope.item1.comboItem = "yes"
        }else {
        $scope.item1.comboItem = "no"
     }
     if($scope.item1.marginReport == true){
        $scope.item1.marginReport = "yes"
        }else{
        $scope.item1.marginReport = "no"
     }
    //for editable
    if(editcheck == true){


      console.log($scope.item1)

     $http.put('/editeditem',$scope.item1).success(function(response)
                {
                 // alert("edit call")
                      itemdatafetch();
                   $scope.cancelitem()
                   editcheck = false
                })

     } else{

           $http.post('/saveitempost',$scope.item1).success(function(response){
               
                itemdatafetch();
                $scope.cancelitem()
                
               })
         }

  }
}
$scope.cancelitem = function(){
   // alert("i got cancelitem call")
    $scope.item1 =null;
    itemdatafetch();
    
}

$scope.filterchange = function(){
  
   console.log($scope.item1.filter)
   //var item1filter =' '+$scope.item1.filter
    var item1filter =$scope.item1.filter
      $http.get('/getfilter/'+item1filter).success(function(response){
         $scope.itemdetails = response 
         //alert(response)
     })
    
}
$scope.selectrow = function(tag){
  console.log(tag)
  //alert("selectrow call")
  selectedrow = tag
  $scope.idSelectedVote = tag;
}
$scope.edititem = function(){
  editcheck = true
 
  console.log(selectedrow)
 // alert("edititem call")
   if(selectedrow == null){
      alert("Please select item");
     
   }
   else{
 $scope.new()
      $scope.item1 = selectedrow
    if($scope.item1.comboItem == "yes"){
        $scope.item1.comboItem = true
        }else {
        $scope.item1.comboItem = false
     }
     if($scope.item1.marginReport == "yes"){
        $scope.item1.marginReport = true
        }else{
        $scope.item1.marginReport = false
     }

   }
   
   
}
var refresh=function(){
  var item1filter =$scope.item1.filter
 $http.get('/itemdata/'+item1filter).success(function(response)
{
  alert(response)
  $scope.itemdetails=response
  
 
})
}

$scope.deleteitem = function(){
 
 // console.log(selectedrow._id) 
  if(selectedrow == null ){
    alert("Please select item");
  }else{
  var r = confirm("Are you sure you want to delete this ?")
              if (r == true) {
                 console.log("true");
               $http.delete('/itemdelete/'+selectedrow._id).success(function(response)
                     {
                      
                    });
              

             }else{
                   console.log("false");

                  }
  
 
   selectedrow = null;
   }
  refresh();
}


}]);
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
// $scope.TypeName="All "
  //$scope.item1.filter="All "
//alert( $scope.item1.filter)
 //validation

 $scope.test = 'display'
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
     // alert(response)
        $scope.itemdetails = response
       
    })
}
 itemdatafetch();

// for new button

$scope.all = true
$scope.new = function(){
   //$scope.test = 'display'
    console.log("i got new call")
    $scope.all = false
       $scope.item1 ="" 
    //$scope.cancelitem()

//$scope.selectrow();
}


    $scope.saveitem = function(){
      //alert('kk')

       //$scope.test=='display'
      if($scope.item1.Name == undefined &&$scope.item1.Hsc == undefined &&$scope.item1.Desc == undefined &&
      $scope.item1.ItemType == undefined &&$scope.item1.SaleCategory == undefined && $scope.item1.InvGroupName== undefined)
      {
        alert("Please Fill All mandetory Fields")
      }
     
   
      else if ($scope.item1.Name == undefined ||$scope.item1.Hsc == undefined ||$scope.item1.Desc == undefined ||
      $scope.item1.ItemType == undefined ||$scope.item1.SaleCategory == undefined || $scope.item1.InvGroupName== undefined) {

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
      
      }//for closer
    }

    else {
    

     if($scope.item1.comboItem == true){
        $scope.item1.comboItem = "yes"
        }else {
        $scope.item1.comboItem = "no"
     }
  
   if(editcheck == true){


      console.log($scope.item1)

     $http.put('/editeditem',$scope.item1).success(function(response)
                {
                 // alert("edit call")
                      itemdatafetch();
                    $scope.cancelitem()
                      //editcheck = false

                })

 //$scope.cancelitem()
     } 
     else {
//alert('ff')
console.log($scope.item1)
           $http.post('/saveitempost',$scope.item1).success(function(response){
               alert(response)
                itemdatafetch();
                $scope.cancelitem()
                 //editcheck = false
                
            
               })
         }
  //$scope.filterchange();
   //$scope.itemdatafetch();
  }
}
$scope.findName =function(){
  //alert("aa")

           $http.get('/getitemname',{params:{"Name":$scope.item1.Name,"InvGroupName":$scope.item1.InvGroupName}}).success(function(response)
              {
                //alert(response.length);
                if (response.length >0) {
                  alert("Duplicates are not allowed in Tax Name");
                  $scope.item1.Name='';
                  //user.aliasname="";
                  $scope.item1.InvGroupName='';
                }
              //}
            })
         }
   
$scope.cancelitem = function(){
    $scope.test = 'display'
if($scope.item1.Name == undefined &&$scope.item1.Hsc == undefined &&$scope.item1.Desc == undefined &&
      $scope.item1.ItemType == undefined &&$scope.item1.SaleCategory == undefined && $scope.item1.InvGroupName== undefined)
      {
        alert("Please Fill All mandetory Fields")
      }
  

  editcheck = false
   // $scope.item1 =null;
   
    //refresh();
    //window.location.reload();
    $scope.item1 ="" 
   // $scope.item1.Name =null
   // $scope.item1.Hsc =null 
   // $scope.item1.Desc =null
   //     $scope.item1.ItemType =null
   //     $scope.item1.SaleCategory = null 
   //      $scope.item1.InvGroupName= null
    //itemdatafetch();
  
 //$scope.saveitem()
 //$scope.filterchange();
 $scope.selectrow()

}

 // var item1filter =$scope.item1.filter
 // alert(item1filter)
$scope.filterchange = function(){
  
  //alert("hh")
   //var item1filter =' '+$scope.item1.filter
   //alert($scope.item1.filter)
    var item1filter =$scope.item.filter
      $http.get('/getfilter/'+item1filter).success(function(response){
         $scope.itemdetails = response 
         //alert(response)
     })
    
}
$scope.selectrow = function(tag){
  console.log(tag)
 
  selectedrow = tag
  $scope.idSelectedVote = tag;
}
$scope.edititem = function(){
// if($scope.item1.Name == undefined &&$scope.item1.Hsc == undefined &&$scope.item1.Desc == undefined &&
//       $scope.item1.ItemType == undefined &&$scope.item1.SaleCategory == undefined && $scope.item1.InvGroupName== undefined)
//       {
//         alert("Please Fill All mandetory Fields")
//       }

  editcheck = true
 
  console.log(selectedrow)
 // alert("edititem call")
   if(selectedrow == null){
      alert("Please select item");
     
   }
   else{
 //$scope.new()
  $scope.all = false
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

$scope.test = 'update1'
   }
   
  //$scope.filterchange(); 
}


$scope.deleteitem = function(){
 //alert($scope.item1.filter)
 // console.log(selectedrow._id) 
  if(selectedrow == null ){
    alert("Please select item");
  }else{
  var r = confirm("Are you sure you want to delete this ?")
              if (r == true) {
                 console.log("true");
               $http.delete('/itemdelete/'+selectedrow._id).success(function(response)
                     {
                        //refresh();
                         //$scope.item1 ="" 
                    });
              
     $scope.item1 ="" 
             }else{
               $scope.item1 ="" 
                    //$scope.cancelitem()
   //                   $scope.item1.Name ="" 
   // $scope.item1.Hsc ="" 
   // $scope.item1.Desc = "" 
      // $scope.item1.ItemType = ""
      // $scope.item1.SaleCategory = "" 
      //  $scope.item1.InvGroupName= ""

                  }
  
 
   selectedrow = null;
   }
  $scope.filterchange();
}


}]);
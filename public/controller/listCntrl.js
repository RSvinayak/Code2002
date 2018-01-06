var myApp=angular.module('myApp',[]);
myApp.controller('ListCntrl',['$scope','$http','$window',
function($scope,$http,$window){
    console.log("hi listCntrl ");
     // for transaction details collection in inventory
         $http.get('/transactiondetails').success(function(response){
            console.log(response)
        $scope.transactions=response;
        //alert($scope.items);
    });
$scope.Transaction = function( ){
    
    console.log( $scope.transaction);
     var update=$scope.transaction;
     $scope.List=undefined;
     
 }

 $scope.list = function( ){
  //alert("hhjj")
    console.log("got call");
    console.log($scope.transaction);
    if($scope.transaction == undefined){
      alert("Please Select Transaction");
    }
   
else if($scope.transaction == "Estimate" ){
  // alert("jjjjjj")
     $http.get('/listtran/'+ $scope.transaction ).success(function(response)
        { 
            console.log(response)
           // $scope.List = response;
           // alert("h")
              if(response.length == 0){
        alert(" No matches are found");
        $scope.List = "";

      }else{

             $scope.List = response;
      // alert("hh")
}





        })
     }
     else{
      //alert('kkkkkk')
        var update = $scope.transaction;
        console.log(update)
     $http.get('/historyfet/'+update).success(function(response)
            { 
              //alert('ll')
            // console.log(response)
            //  $scope.List = response;
            //  console.log(response[0]);
            //  console.log(response[0].netamt)

            //  $scope.selected=[];
            //$scope.user = response;
                       if(response.length == 0){
        alert(" No matches are found");
        $scope.List = "";

      }else{

             $scope.List = response;
              $scope.selected=[];
     // alert("hh")
}





            })
        }
}
 
var deleteitem = null;
var  voucherNoEdit = null;
 $scope.row1 = function(item){
   // console.log("this is row id"+id);
  console.log("u clicked on row 1");
  $scope.idSelectedVote = item;
   console.log(item.voucherNo);
   voucherNoEdit = item.voucherNo; 
   deleteitem = item;

}

//for edit
$scope.listEdit = function(item){
    console.log("call from edit");
     console.log(deleteitem);
        if($scope.transaction == undefined){

      alert("Please Select Transaction");
    }
       else if($scope.List == undefined){
      alert("Please Select List");
    }
    else if(deleteitem == null){
      alert("Please Select any Party");

     }
   
   
    
    else{

           $scope.mylink = "index1.html";
           window.sessionStorage.setItem("Str3",JSON.stringify(deleteitem));
          // window.sessionStorage.setItem("voucherNo",JSON.stringify(deleteitem));
            window.sessionStorage.setItem("voucherNo", voucherNoEdit);
                
     }
     
   //  window.sessionStorage.setItem("edit",deleteitem);
    //   window.sessionStorage.setItem("Party",$scope.partyname);
    // })



}

//for deleting the items
// $scope.listDelete = function(){
//   //alert($scope.List)
//     if($scope.transaction == undefined){

//       alert("Please Select Transaction");
//     }
//        else if($scope.List == undefined){
//       alert("Please Select List");
//     }
//     else if(deleteitem == null){
//       alert("Please Select any Party");

//      }
//    else{
      
     

//    //     if ($scope.List[$scope.List.length-1].voucherNo == deleteitem.voucherNo) {
//    //    // alert("got match");
//    //    alert("Are You Sure You Want To Delete");
//    //       $http.delete('/listDeleteEnter/'+deleteitem.voucherNo).success(function(response)
//    //          {
//    //             //alert("Are You Sure You Want To Delete");
//    //             //  console.log(response)
//    //          });
//    //        clearListDeleted()
//    //      // $scope.remove = function(){
        
//    // // };

//    //     }else{
//    //      alert("Please Delete Only last item");

//    //     }
//    var r = confirm("Are you sure you want to delete this ?")
//               if (r == true) {
//                  console.log("true");
//               if ($scope.List[$scope.List.length-1].voucherNo == deleteitem.voucherNo) {
//    //    // alert("got match");
//       //alert("Are You Sure You Want To Delete");
//          $http.delete('/listDeleteEnter/'+deleteitem.voucherNo).success(function(response)
//             {
//                //alert("Are You Sure You Want To Delete");
//                //  console.log(response)
//             });
//         clearListDeleted()
//     //      $scope.remove = function(){
        
//     // };

//        }
              
//      //$scope.item1 ="" 
//              }
//               else{
//          alert("Please Delete Only last item");

//         }
  

//                   }
               
//      }



//}//listDelete
$scope.listDelete = function(){
   //alert(item);
       if($scope.transaction == undefined){

      alert("Please Select Transaction");
    }
       else if($scope.List == undefined){
      alert("Please Select List");
    }
    else if(deleteitem == null){
      alert("Please Select any Party");

     }
   else{
   // if(deleteitem == null){
   //    alert("Please Select any Party");

   //   }else{
       // alert("Please Sele");
         // alert($scope.List[0].voucherNo+" "+ deleteitem.voucherNo);
     

       if ($scope.List[$scope.List.length-1].voucherNo == deleteitem.voucherNo) {
       // alert("got match");

              var r = confirm("Are you sure you want to delete this ?")
              if (r == true) {
                     $http.delete('/listDeleteEnter/'+deleteitem.voucherNo).success(function(response)
                        {
                           //  console.log(response)
                        });
                      clearListDeleted()

              }
       

       }else{
        alert("Please Delete Only last item");

       }
               
     }



}//listDelete
//refresh call for table
function clearListDeleted() {
  // body...
  //alert(" clearListDeleted");
    var newDataList=[];
        angular.forEach($scope.List,function(v){
          //console.log(v)
        if(deleteitem != v){
  //alert("Are You Sure You Want To Delete");
            console.log(v)
            newDataList.push(v);
        }
    });    $scope.List=newDataList;
        //console.log($scope.List);
       // console.log(newDataList);
}
// $scope.delete = function(item){
//     console.log("call from delete");
//    console.log(deleteitem.barcodeNumber);
//    console.log(deleteitem.partyname);
//    console.log(deleteitem.Transaction);
//    console.log(deleteitem._id);
//    var udelete = deleteitem.partyname+","+deleteitem.Transaction;
//     console.log(udelete);

//     $http.delete('/saleinvoiced/'+udelete).success(function(response)
//             {
//                //  console.log(response)
//             });
//     $http.delete('/transactiond/'+udelete).success(function(response)
//             {
//                 // console.log(response)
//             });
//     $http.delete('/useritemd/'+udelete).success(function(response)
//             {
//                  //console.log(response)
//             });
//     //for barcoded one '/history',{params:{"barcode":deleteitem.barcode}}
//     $http.delete('/transactiondetaild',{params:{"barcode":deleteitem.barcodeNumber}}).success(function(response)
//             {
//                  //console.log(response)
//             });
//     $http.delete('/transactiondetaile',{params:{"barcode":deleteitem.barcodeNumber}}).success(function(response)
//             {
// //console.log(response)
//             });

//     }
//for list edit option
//  $scope.selected=[];
// $scope.getTemplate = function (item) {
//     console.log(item)
//         console.log(item._id)
//          console.log($scope.selected._id)
//         if (item._id === $scope.selected._id) return 'edit';
//         else return 'display';
//     };

//     $scope.editContact = function (item) {
//         console.log("iam edit")
//         $scope.selected = angular.copy(item);
//         console.log($scope.selected)
//     };

//     // $scope.saveContact = function (index) {
//     //     console.log(index)
// $scope.saveContact = function ( ) {
//       //  console.log(index)
//         console.log("Saving contact");
//        console.log($scope.selected);
//        // $scope.List[idx] = angular.copy($scope.selected);
//        // $scope.model.contacts[idx] = angular.copy($scope.model.selected);
//         //console.log( $scope.item);
//       //  $scope.reset();
//       var update = $scope.selected._id+","+$scope.selected.partyname +","+$scope.selected.VoucherNo+","+$scope.selected.Value
//       console.log(update)
//        $http.delete('/historydelete/'+update).success(function(response)
//                 {
//                     // $scope.result=response;
//                     // console.log($scope.result);
//                 })
//     };
    // $scope.save = function (item) {
    //     console.log("Saving contact");
     
    // };

    // $scope.reset = function () {
    //     $scope.selected = {};
    // };


    //for delete
    $scope.dele = function ( ) {
      //  console.log(index)
        console.log("delete contact");
       console.log($scope.selected);
       // $scope.List[idx] = angular.copy($scope.selected);
       // $scope.model.contacts[idx] = angular.copy($scope.model.selected);
        //console.log( $scope.item);
      //  $scope.reset();
      var update = $scope.selected._id
       $http.put('/historyup/'+update).success(function(response)
                {
                    $scope.result=response;
                    console.log($scope.result);
                })
    };

}])
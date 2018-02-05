var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',function($scope, $http,$route,$window) {
    console.log("Hello World from controller");
 //all global variables declared here
  $scope.usernamedetails = window.sessionStorage.getItem("username")
 $scope.test = 'display'
 var duplicat = [];
 var  forupdate = null;
 $scope.button1 = true;
//for radio default
   $scope.color = {
        state:'with in state'  
      };
 //default date
 $scope.bit = {
      date: new Date()
    };     
      
//for disable functions
$scope.disable = function(){
      $scope.button1 = false;
      refresh()
      $scope.pur1=[]
      add1()
       $scope.test = 'display'
}
$scope.findTaxName =function(){

           $http.get('/getTaxname'+$scope.tax.taxname).success(function(response)
              {
               //. alert(response.length);
                if (response.length >0) {
                  alert("Duplicates are not allowed in Tax structure Name");
                  $scope.tax.taxname = "";
                }
              //}
            })
         }
         $scope.findTaxAlias =function(){

           $http.get('/getTaxAlias'+$scope.tax.aliasname).success(function(response)
              {
               //. alert(response.length);
                if (response.length >0) {
                  alert("Duplicates are not allowed in Alias Name");
                  $scope.tax.aliasname = "";
                }
              //}
            })
         }


//for refersh of page
var refresh = function() {
    $http.get('/gettax').success(function(response) {
     console.log(response);
     console.log(response.length);
    //for duplicates
        for (var f=0;f<=response.length-1;f++){
            duplicat.push({
              'aliasname':response[f].aliasname,
              'taxname':response[f].taxname,
              'displaydate':response[f].displaydate
            });
            
       }
   // $scope.pur1[0] =""
     $scope.tax = "" 
   
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
      $scope.res = uniqueStandards;
      duplicat = []
 });
};

refresh();
//for assigning ledger account
$scope.ledgerAccontInt = function(account,index,type) {
  //alert(" account "+account+" index "+index+" type "+type);
   $http.get('/getLedgerAccont',{params:{"accountName":account}}).success(function(response) {
        
         if (type== 'PurchaseAC') {
             //alert(" account "+account+" index "+index);
               $scope.pur1[index].purchaseId = response.accountIds;
               forupdate[index].purchaseId = response.accountIds;
             
               console.log( $scope.pur1[index].purchaseId);
         }else{
              $scope.pur1[index].salesId = response.accountIds;
               forupdate[index].salesId = response.accountIds;
             
         }
         
   })
}//ledgerAccontInt
// saving of data
$scope.addnew = function() {
 // console.log($scope.tax.taxname);
  //console.log($scope.tax.aliasname);
  //console.log($scope.bit.date);
  if($scope.tax.taxname == undefined && $scope.tax.aliasname  == undefined )
  {
   alert("Please fill all mandetory fields");
  }
  else{
  //alert($scope.pur1.length)
 for (var i=0;i<=$scope.pur1.length-1;i++){
  if($scope.tax.taxname == undefined || $scope.tax.aliasname  == undefined || $scope.pur1[i].PurchaseAC  == "" || $scope.pur1[i].SaleAc  == "" || $scope.pur1[i].Rate  == ""|| $scope.pur1[i].name  == "" ){

    
        if($scope.tax.taxname == undefined ){
          alert("Please enter Tax Structure Name");
          break;
        }
        if($scope.tax.aliasname == undefined ){
          alert("Please enter Alias");
          break;
        }
        
        if($scope.pur1[i].name =="" ){
          alert("Please select Tax Name");
          break;
        }
          if($scope.pur1[i].PurchaseAC =="" ){
          alert("Please enter PurchaseAC" )
          break;
        }

          if($scope.pur1[i].SaleAc =="" ){
          alert("Please enter SaleAc ");
          break;
        }
          if($scope.pur1[i].Rate =="" ){
          alert("Please enter Rate ");
          break;
        }
        


        }

      else{

             if($scope.color.state == "with in state"){
                 $scope.pur1[i].withinstate = "yes"
                 $scope.pur1[i].outofstate = "no"
             }else{
                 $scope.pur1[i].withinstate = "no"
                 $scope.pur1[i].outofstate = "yes"
             }
             $scope.pur1[i].taxname = $scope.tax.taxname
             $scope.pur1[i].aliasname = $scope.tax.aliasname
             $scope.pur1[i].displaydate = $scope.bit.date
     
            // console.log($scope.pur1[i].outofstate);
             //console.log($scope.pur1[i].withinstate);
        
             console.log( $scope.pur1[i])
             $http.post('/opal1', $scope.pur1[i]).success(function(response) {
                  // console.log(response);
                   refresh();

                 });
             // $scope.pur1=[]
             // add1()
       }//else close undefined
              }//i loop
            }
              $scope.pur1=[];
             add1();
  
}

$scope.remove = function(tax) {
   console.log(tax);
   $scope.test='display' 
   //alert("kkk")
   //var r = confirm("Are you sure you want to delete the item ");
   $http.get('/editititem2',{params:{"aliasname":tax.aliasname,"taxname":tax.taxname}}).success(function(response) {
   console.log(response);
      for (i=0;i<=response.length-1;i++){
          var r = confirm("Are you sure you want to delete ");
                   if (r == true) {
                 console.log("true");
                 //console.log(response[i]._id)
                 $http.delete('/opal1/'+response[i]._id).success(function(response)
                     {
                                
                     });
  refresh()
                $scope.pur1=[]
                   add1()
            
             }else{
                   refresh()
                $scope.pur1=[]
                   add1()

                  }
          
      }
refresh(); 
  });

   // $scope.tax = "" 
};

// for edit function

$scope.editit = function(tax4) {
  $scope.pur1=[]
  add1()
  $scope.button1 = false;
  $scope.test = 'update1'
  $http.get('/editititem2',{params:{"aliasname":tax4.aliasname,"taxname":tax4.taxname}}).success(function(response) {
    console.log(response);
    forupdate = response
    // console.log(forupdate[0].withinstate);
    // //for radio button edit
    if(forupdate[0].withinstate == "yes"){
          $scope.color.state = "with in state"
          //console.log($scope.color.state);
          
        }else{
          
          $scope.color.state = "out of state"
          //console.log($scope.color.state);
        }
    console.log(response.length);
    $scope.tax = response[0];
     // $scope.bit.date = response[0].displaydate ;
     // console.log(response[0].displaydate);
     //  console.log($scope.bit.date);
      $scope.bit = {
          date: new Date(response[0].displaydate )
        };
        for (i=0;i<=response.length-1;i++){
             $scope.pur1[i] = response[i];

        }
  
  });
 // $scope.tax = "" 
};  
//for cancel
$scope.canceldata = function() {
   if($scope.tax.taxname == undefined && $scope.tax.aliasname  == undefined )
  {
   alert("Please fill all mandetory fields");
  }
  else{
  $scope.test='display' 
  refresh()
  $scope.pur1=[]
  add1()
}
}
//for update
$scope.updated = function() {
  console.log(forupdate);

  console.log(forupdate.length);
  console.log($scope.tax);
  //alert(forupdate.length)
   for (let i=0;i<=forupdate.length-1;i++){
    //alert('kk')
 if($scope.tax.taxname == undefined || $scope.tax.aliasname  == undefined || $scope.pur1[i].PurchaseAC  == "" || $scope.pur1[i].SaleAc  == "" || $scope.pur1[i].Rate  == ""|| $scope.pur1[i].name  == "" ){

    
        if($scope.tax.taxname == undefined ){
          alert("Please enter Tax Structure");
          break;
        }
        if($scope.tax.aliasname == undefined ){
          alert("Please enter Alias");
          break;
        }
        if($scope.pur1[i].name =="" ){
          alert("Please select Tax Name");
          break;
        }
          if($scope.pur1[i].PurchaseAC =="" ){
          alert("Please enter PurchaseAC" )
          break;
        }

          if($scope.pur1[i].SaleAc =="" ){
          alert("Please enter SaleAc ");
          break;
        }
          if($scope.pur1[i].Rate =="" ){
          alert("Please enter Rate ");
          break;
        }
        
        


      }else{

           if($scope.color.state == "with in state"){
                 forupdate[i].withinstate = "yes";
                 forupdate[i].outofstate = "no";
                 // alert(forupdate[i].withinstate)
           }else{
              forupdate[i].withinstate = "no"
              forupdate[i].outofstate = "yes"
             // alert("the else loop"+forupdate[i].withinstate)
           }

           forupdate[i].taxname = $scope.tax.taxname
           forupdate[i].aliasname = $scope.tax.aliasname
           forupdate[i].displaydate = $scope.bit.date;

           console.log(forupdate[i]);
           console.log(forupdate[i].withinstate); 
           console.log(forupdate[i].outofstate);   
           // $http.put('/updateedit',forupdate[i] ).success (function(response) {
           //        console.log(response)
           //        refresh();
           //     });
           // $scope.test = 'display'
           // $scope.pur1=[]
           // add1()
           $http.put('/updateedit',forupdate[i] ).success (function(response) {
                  console.log(response)
                  refresh();
                  setTimeout($scope.waitCall(), 1000);
               });
           
           $scope.waitCall = function () {
             
             $scope.test = 'display'
             $scope.pur1=[]
             add1()
           }

       }//else 
   }// for loop  closer
  
   
};

$scope.deselect = function() {
  $scope.tax = ""
}


//  // console.log("iam activated");
//   $http.get('/item').success(function(response) {
//  // console.log("i get the data i requested");
//     console.log(response)
//     $scope.taxnamedetails = response;
//      console.log("i displaying  from controller 2 a data")
//  /*res is var or a method for connection between controller and server*/
//  });
// //};
// for getting tax structure as drop down
$http.get('/getitemtaxation').success(function(response) {
  console.log("i get the data i requested");
    $scope.taxnamedetails = response;
    console.log(response);

  });
$http.get('/purchasess').success(function(response) {
  console.log("kkkkkkkkkkkkkkk");
 // $scope.taxp = response;
   console.log(response);
   $scope.purchase = response;
  // console.log(  $scope.purchase._id);
     console.log("i displaying a data");

});
// $http.get('/sales').success(function(response) {

//    console.log(response);
//    $scope.salesAC = response;
//    console.log(  $scope.salesAC[0]._id);
//      console.log("i displaying a data");

// });
// for done button
$scope.Taxcreate = function() {

  if((num%2)==0){
    
 console.log("the number in if loop  "+num);
    for (var i=0;i<=$scope.add.length-1;i++){
  $http.post('/opaltx', $scope.pur).success(function(response) {
     console.log(response);
    console.log("iam if loop done button");
    $scope.pur = ""
    });
  
   $http.post('/opaltx', $scope.add[i]).success(function(response) {
    console.log("iam done button prining here");
        console.log(response);

        });
       
  }
//for reload of page
  $scope.reloaddata = function (){
   console.log("iam reload working at reloaddata page ");
 location.reload();
}
  }
//only for single table
  else{
    console.log("the number in else loop  "+num);

$http.post('/opaltx', $scope.pur).success(function(response) {
    console.log(response);
    console.log("iam else loop done button");
    $scope.pur = ""
    });

}
 
  }
//pushing row
 $scope.add = [ ];
$scope.add.push({
  'SLNO': 1,
 'From':"",
 'To':"" ,
 'Rate':"",
 'Tax Name':"",
 'PurchaseAC':"",
 'Sale Ac':""

});

$scope.count = 2;

$scope.addrow = function(){

  console.log('i added')  
$scope.add.push({
  'SLNO': $scope.count++,
 'From':"",
 'To':"" ,
 'Rate':"",
  'Tax Name':$scope.pur.name,
 'PurchaseAC':$scope.pur.PurchaseAc,
 'Sale Ac':$scope.pur.SaleAc,
});
};

//for adding row
$scope.pur1 = []
var add1 = function(){
  $scope.pur1.push({
  // 'SLNO': $scope.count++,
 'name':"",
 'To':"" ,
 'Rate':"",
 'CessOn':"",
  'Tax Name':"",
 'PurchaseAC':"",
 'SaleAc':"",
})
}
add1()
$scope.addrow1 = function(){

  console.log('addrow1')  
  console.log($scope.pur)

//  $scope.pur1.push({
//   // 'SLNO': $scope.count++,
//  'name':"",
//  'To':"" ,
//  'Rate':"",
//  'CessOn':"",
//   'Tax Name':"",
//  'PurchaseAC':"",
//  'SaleAc':"",
// })
add1()
}
// console.log($scope.pur);

//if loop condition generating
var num = 1;
$scope.num = function(){
  ++num
   console.log("the number is here see it"+num);
}

}]);

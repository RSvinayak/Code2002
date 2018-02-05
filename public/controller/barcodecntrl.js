//console.log(this);
var myApp = angular.module('myApp',[ 'cfp.hotkeys']);     
myApp.controller('BarcodeCntrl',['$scope','$http','$window','hotkeys',
function($scope,$http,$window,hotkeys,){
console.log("welcome barcode")
console.log(this);

//hotkey usage
 $scope.usernamedetails = window.sessionStorage.getItem("username")
$scope.hotkeyButton = false;
hotkeys.bindTo($scope).add({
    combo: ['ctrl+b'],
    callback: function() {
    //  $scope.title = "Second Controller";
      alert("iam hot key working")
      if( $scope.hotkeyButton == false){
         $scope.hotkeyButton = true;
       }else{
          $scope.hotkeyButton = false;
       }
     
    }
  });
 $scope.test = 'display'
 // $scope.bitem= '';
 // $scope.bitem.count2= "86";
var fixdec= 0;
$scope.irate=[];
//disable of buttons
$scope.disablebutton = true;
var lastdate = null;
//default date
 $scope.bit1 = {
    date2: new Date()
  };
  $scope.bit2 = {
    date1: new Date()
  };
  $scope.bit = {
    date: new Date()
  };


//latest date using db
$http.get('/getinventorygroupvaluenotationlast').success(function(response){
                     console.log(response);  
                     console.log(response[0].date);
                      lastdate = response[0].date         
                 });

var batch=function()
{
   console.log($scope.userit[0].count);
    console.log($scope.userit[0].tags)
   // alert($scope.userit[0].tags)
         $http.get('/batchdata',{params:{"count":$scope.userit[0].count,"tags":$scope.userit[0].tags}}).success(function(response){  
     
  
    console.log("i got batch get request")
    $scope.batch=response;

    console.log($scope.batch)
  })
}
//batch()//6/6
// $http.get('/batchdata').success(function(response)
// {
//  console.log("i got batch get request")
//  $scope.batch=response;
// })

//date picker default




  var upper = 0;
 var lower = 0;
var itembarcodetolerence=0;
$http.get('/configuration').success(function(response){
       // response;
        console.log(response)
        upper = response[0].UpperLimit
        lower =  response[0].LowerLimit
      $scope.itembarcodetolerence =response[0].itembarcodetolerence
      fixdec  = response[0].DecimalPoints;
      $scope.rupeesDecimalPoints = response[0].rupeesDecimalPoints ;
      
      //alert(itembarcodetolerence)
       // console.log(response.UpperLimit)
         console.log(lower)

        //alert($scope.irate[0].rate);
    })
$http.get('/itemrate').success(function(response){
        $scope.irate=response;
        //alert($scope.irate[0].rate);
    })
$http.get('/Treasure').success(function(response){
        console.log(response)
        $scope.treasure=response;

        //alert($scope.irate[0].rate);
    })

    $http.get('/itemsdata').success(function(response){
        $scope.items=response;
        console.log(response)
      
    });

  //for delete problem
  // $scope.bitem = {}
  // $scope.bitem.count2 = $scope.rupeesDecimalPoints;
 $http.get('/deletequery').success(function(response){
       // $scope.labcal=response;
         //$scope.res = response;
        // alert("deletequery"+response)
         console.log(response)
         console.log(response.length)
         if(response.length == 0){
         // alert("undefined")
            console.log("undefined look here")
               $http.get('/greycolor').success(function(response)
                  { 
       // alert("in side list function");
                    // $scope.batch = response;
                    console.log(response);
                 })
         }else{

         console.log(response[0].count)
         
         list3 = response[0].count
        
        $scope.bitem.count2 = list3
           console.log( list3)
           console.log( $scope.bitem.count2)
            $http.get('/listdata'+list3).success(function(response)
    { 
       // alert("in side list function");
       $scope.tags = response;
        $scope.bitem.count2 = list3;
       console.log(response);
    })


         }
         
         

$http.get('/batchrecords/'+list3).success(function(response)
         {
          
          console.log(response);
          $scope.batch = response;
          
        })
//for deleting the record for refresh
 $http.delete('/updatelistdelete').success(function(response)
            {  
          //  alert("post "+response)    
         
           });

    })
 $scope.nu=function(){
$scope.batch=""
 }

  $scope.dateSearch=function(){
    $scope.tags=null;

    //$scope.res =""
    //$scope.list();
    //refresh()

    //$scope.res!="";

    // if($scope.batch==null){
    //   alert("No Matches Found")
    // }
    // for barcode search
//alert("kkk")
     // alert("barCodeSearch "+$scope.barCodeSearch);
    if ($scope.barCodeSearch != null || $scope.barCodeSearch != undefined  ) {
      //alert("jj")
        
        $http.get('/barcodeBatchFind',{params:{"Barcode":$scope.barCodeSearch}}).success(function(response){
     // $scope.ddata=response;

         // alert(response.length);
          if (response.length == 0) {
            alert("No Match Is Found")
          }
      console.log(response);
      $scope.batch=response;
    })
    }else{

       //for date search
       console.log($scope.bit1.date2)
     console.log(Date.parse($scope.bit1.date2) )
      if (Date.parse($scope.bit1.date2) > Date.parse($scope.bit2.date1)) {
            alert("Invalid Date Range!\nFrom Date cannot be after To Date!")

        }else{
    
 

       var fromdate  = new Date(((new Date($scope.bit1.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate;
          //   alert(fromdate+" "+todate)


      $http.get('/dateBatchFind/'+date).success(function(response){
     // $scope.ddata=response;
       if (response.length == 0) {
            alert("No Match Is Found")
          }
          else{
               console.log(response);
      $scope.batch=response;

          }
   
    })

 
  }
}//esle if 
  }
 // tags()
$scope.checkForCombo = function (ItemName) {
     $scope.all1 = false ;
   for(let j=0;j<$scope.items.length;j++){
       

                    if (ItemName == $scope.items[j].Name && $scope.items[j].comboItem == "yes" ){ 
                      //alert($scope.items[j]) comboItem
                      
                       console.log($scope.items[j]);
                       $scope.all1 = true ;
                       // document.getElementById("check1").style.display = "none";
                       // document.getElementById("inline").style.display = "none";
                       // //if ($scope.items[j].comboItem == "yes") {inline
                           //  alert("call for combo "+ItemName);
                     //  }
                      // alert("Hsc in  items matched"+$scope.items[j].Hsc)
                      //$scope.userit[p].Hsc=$scope.items[j].Hsc;
                      //console.log($scope.userit[p].Hsc)
                    
                      break;
                    }//   if ($scope.userit[p].itemName == 
  }//for j
}
var refresh=function(){
$http.get('/bardata').success(function(response)
{
  //alert(response)
  $scope.bardata=response;
  console.log(response)
  //alert("bardata "+response)
})
}
refresh()

$http.get('/uom').success(function(response){
        $scope.uom=response;
    })
var type = "Sale";
 $http.get('/pct'+type).success(function(response){
      
        $scope.pct=response;
    })
      $http.get('/labcal').success(function(response){
        $scope.labcal=response;
    })

// getting the count value 
//$http.get('/countdata',$scope.userit).success(function(response){
  var count3 = null;
   $http.get('/countdata').success(function(response){

               // alert("saved successfully");
                  console.log("in count reference");
                 console.log(response);
                 console.log(response.count);
                 console.log(response.length);
                  if(response.length == 0){
                     console.log("if loop ");
                //  response[0].count = 0
                   $scope.count = 1;
                   count3 = 1
                 }
                // 
                else{
                  console.log(response[0].count);
                  $scope.count = parseInt(response[0].count) +1 ;
                 count3 = parseInt(response[0].count) +1 ;
               }
                 // window.sessionStorage.setItem("count",$scope.count)

                  console.log("here is the count  "+ $scope.count);
            })


var add2 = 0;
var twt1 = 0;
var arrpush = [];
var invAccNo = null;
//$scope.userit[0] =null;
    //save of all data for barcode generatation page
$scope.saveBatchGeneration = function(){

  // alert("Generatation");
  console.log($scope.userit[0]);
//alert("edit in save  "+edit1);
  if($scope.userit[0] == undefined || $scope.userit[0].barcode == undefined || $scope.userit[0].itemName == undefined ||$scope.userit[0].gwt == undefined ||$scope.userit[0].purity== undefined||$scope.userit[0].gpcs == undefined ||$scope.userit[0].uom == undefined  ){
    //alert("missing");
    for(let k=0;k<1;k++){
    if($scope.userit[0] == undefined){
      alert("Please Select Necessary Details");
      break;
    }
    if($scope.userit[0].barcode == undefined){
      alert("Barcode is missing");
      break;
    }
     if($scope.userit[0].itemName == undefined){
      alert("Item is missing");
      break;
    }
    if($scope.userit[0].purity == undefined){
      alert("Please Select Purity");
      break;
    }
    if($scope.userit[0].gwt == undefined){
      alert("Please Enter Gross WT");
      break;
    }
    if($scope.userit[0].gpcs == undefined){
      alert("Please Enter Gross Pcs");
      break;
    }
    if($scope.userit[0].uom == undefined){
      alert("Please Select UoM");
      break;
    }
    
  }//for loop
  }else{
 


      if(edit1 != null){
            updateBarcode();
                       
     }else{ //not edit else loop
             console.log(" null");
              //  var tagno=window.sessionStorage.getItem("Tagno");
         
             // console.log("in save qty "+iqty);
            // console.log("in save batch "+ibatch);
            // console.log("in save tag "+itags);
      
            console.log($scope.userit);
            console.log($scope.userit[0].barcode);
            
            $http.post('/prn',$scope.userit[0]);
            //  .success(function(response){
            //          // alert("saved successfully");
            //          console.log("in save button");
            //          console.log(response);
                
            // })
        
            $scope.userit[0].color = "grey"
            $scope.userit[0]._id = null;
             console.log(" $scope.userit[0].date "+ $scope.userit[0].date)
    
            // $http.post('/batchdata1',$scope.userit[0]).success(function(response){
            //         // alert("saved successfully");
            //           console.log("in save button");
            //           console.log(response);
            //        //   console.log(response[0].barcode);
            //       //  batch()   
            // })
             //$http.post('/batchdata1',$scope.userit[0]);

            
            $http.delete('/tagdeleted12/'+tagdetails._id);


            $scope.list()
    
           // var stockin = window.sessionStorage.getItem("stockin");
           // var stockout = window.sessionStorage.getItem("stockout");
           //this is init to default change it programatically
           var invGroupName = "Diamond"
          //var invAccNo1 = []
          // alert("InvGroupName:"+invGroupName);
          $http.get('/getInvAccNo'+invGroupName).success(function(response){
                console.log(response)
                // alert(response)
                // invAccNo1 = response[0];
                 // invAccNo=invAccNo1.AccNo;
               invAccNo = response[0].AccNo;
               //invAccNo=invAccNo1.AccNo;

              $scope.userit[0].stockInward = "yes"
              $scope.userit[0].orderStatus = "available"
              $scope.userit[0].Transaction = "Barcoding"
              $scope.userit[0].stockPoint = stockout;
              $scope.userit[0].voucherClass = "";
              $scope.userit[0].voucherClassId = "";
              $scope.userit[0].transactionTypeId = "";
              //$scope.userit[0].invGroupName = invGroupName;
              $scope.userit[0].invGroupName = $scope.userit[0].InvGroupName;
          
              $scope.userit[0].invGroupAccNo = invAccNo;
              $scope.userit[0].voucherDate = "";
              $scope.userit[0].voucherTime = "";

              if(tagdetails.composite == 'yes' ){
                  for(let p = 0; p<4; p++){
                              if($scope.userit[p].gwt != undefined){
                                       if (p == 0) {
                                         $http.post('/batchdata1',$scope.userit[0]);

                                       };
                                      // alert('p '+p)
                                      //$scope.userit[p].compositeRef =  $scope.userit[0].barcode ;
                                       $scope.userit[p].compositeRef =  $scope.userit[0].barcode ;
                                       $scope.userit[p].compositenum  = p;
                                       for(let j=0;j<$scope.items.length;j++){
       
         
                                                        if ($scope.userit[p].itemName == $scope.items[j].Name){ 
                                                          //alert($scope.items[j])
                                                          console.log($scope.items[j])
                                                          // alert("Hsc in  items matched"+$scope.items[j].Hsc)
                                                          $scope.userit[p].Hsc=$scope.items[j].Hsc;
                                                          console.log($scope.userit[p].Hsc)
                                                        
                                                          break;
                                                        }//   if ($scope.userit[p].itemName == 
                                      }//for j
                                      // $scope.userit[j].barcode  = $scope.userit[0].barcode ;
                                      console.log($scope.userit[p])
                                      // $http.post('/transactionstock',$scope.userit[p]).success(function(response){  
                                      //       console.log("i got replay")
                                           
                                      //  });
                                      $http.post('/transactionstock',$scope.userit[p]);


                                        console.log( $scope.userit[0].StockPoint);

                                        // $http.post('/transactionstockInward',$scope.userit[p]).success(function(response){  
                                        //            console.log("i got replay")
                                        //            console.log(response);
                                         
                                        // })
                                          $scope.userit[p].stockPoint1 = stockin ;
                                         $http.post('/transactionstockInward',$scope.userit[p]);

                              }else{ // if($scope.userit[p].gwt != undefined)
                                      break;
                                   }
                  }//for

              }else{ //if(tagdetails.composite == 'yes' ){
                       $http.post('/transactionstock',$scope.userit[0]);
                       $scope.userit[0].stockPoint1 = stockin ;
                       $http.post('/transactionstockInward',$scope.userit[0]);
                       $http.post('/batchdata1',$scope.userit[0]);

                      //  .success(function(response){  
                                  
                      //  .success(function(response){  
                      //             $scope.userit[0].stockPoint1 = stockin ;
                      //             $http.post('/transactionstockInward',$scope.userit[0]).success(function(response){  
                      //                    console.log("i got replay")
                      //                    console.log(response);
                                
                                       
                      //              })

                           
                      // });

                     // console.log( $scope.userit[0].StockPoint);
                      // $scope.userit[0].stockPoint1 = stockin ;
                      // $http.post('/transactionstockInward',$scope.userit[0]).success(function(response){  
                      //        console.log("i got replay")
                      //        console.log(response);
                      //       // alert(" transactionstockInward i got replay")
                                 

                           
                      //  })
                       if( comboItemCheck  == "yes"){
                             $http.post('/transactionComboItemInsert',$scope.userit[0]).success(function(response) {  
                                        console.log("i got replay")
                                        console.log(response);
                             
                               })             
                       }

                    }
           colorCodeFun(icount)
           })//getInv

//colorCodeFun(icount)    


   }// else closer !edit

 }//else closer after validation
}// function closer

function updateBarcode() {
   if(edit1.composite == 'yes'){
                      for(f=0;f<=$scope.userit.length-1;f++){

                          $http.put('/editcompos', $scope.userit[f]).success(function(response) {
                      
                               console.log(response);
                               $scope.updateButton = false;
                               edit1 = null;
                               $scope.userit.splice(0, 1);
                                     // alert("updated ")
                                    //  alert("updated successfully");
                          })
                      }//for
                
              }else{
                 
                  
                             $http.put('/updateBarcodeDataGeneration',$scope.userit[0]).success(function(response){
                                    
                                         $scope.result=response;
                                        // console.log($scope.result);
                                        $scope.updateButton = false;
                                         edit1 = null;
                                          $scope.userit.splice(0, 1);
                                    
                                        

                             })
                            
                            alert("updated successfully"); 
                            $scope.batch[colorindex].color = colorpush
                     }
}//updateBarcode

function colorCodeFun(icount) {
  

      $http.get('/gettags',{params:{"count":icount}}).success(function(response){  
               //  alert(list3)
           var replay = response
         //  console.log(replay)
           if(replay == 0){
            // alert("replay == 0")
                    // console.log("if replay replay")
                 $http.get('/batchcount',{params:{"count":icount}}).success(function(response){
               
                     //console.log("batchcount batchcount batchcount");
                     //console.log(response);
                 
                    var lgn =  response.length
                    console.log(lgn)
                    //alert("len the len batch is  "+lgn)
                    for(i=0;i<= lgn-1;i++)
                     { 
                       twt1 = parseInt(response[i].wt)
                      // alert("twt1 "+twt1)
                       console.log(twt1);//bar summ totalwt
                       console.log(response[i].gwt);//gross wt
                      // alert("gwt "+response[i].gwt)
                        console.log(response[i].barcode)
                       arrpush.push(response[i].barcode)
                       console.log(arrpush[i]);
                      // alert("out side diff loop "+arrpush[i])
                       add2 = add2 + parseInt(response[i].gwt)
                       console.log(add2);
                     
                       console.log(upper);
                       console.log(lower);


                           if(i == lgn- 1 ){

                              // var diff = twt1 - add2
                              var diff   = Math.abs(twt1 - add2);
                              
                              console.log(diff)
                              // if(diff<=5){
                                  if(diff == 0){
                                   
                                    //   arrcon[i]
                             
                                    for(j=0;j<= lgn-1;j++)
                                      {
                                          var data = arrpush[j]+","+ "green";
                                         // console.log(arrpush[i]);
                                          $http.put('/colorupdate/'+data).success(function(response)
                                            {                 
                                           //$http.get('/saleinv',{params:{"name":$scope.partyname,"Transaction":tran}}).
                                          //console.log(response);
                                           batch();
                                            $scope.userit.splice(0,4);
                                     
                                           })
                                        
                                      }

                                  }else if(diff <=  $scope.itembarcodetolerence){
                                      // color = red
                                            for(let j=0;j<= lgn-1;j++)
                                            {
                                              var data = arrpush[j]+","+ "gold";
                      
                                              //console.log(arrpush[i]);
                                                  $http.put('/colorupdate/'+data).success(function(response)
                                                      {
                                 
                                                       //console.log(response);
                                                        batch();
                                                        $scope.userit.splice(0,4);
                                     
                                                      })
                                               }
                        
                                  } else if(diff >  $scope.itembarcodetolerence){
                                     // color = red
                                   for(let j=0;j<= lgn-1;j++)
                                   // alert("entered diff > 5")
                                    {
                                       // alert(j)
                                      var data = arrpush[j]+","+ "red";
                                       
                                      console.log(data)
                                       $http.put('/colorupdate/'+data).success(function(response)
                                            {
                                 
                                               console.log(response);
                                                 batch();
                                                    $scope.userit.splice(0, 4);
                                  
                                            })
                                        // batch()
                                      //   {params:{"count":count2,"color":"red"}}
                                     }
                      
                                  }//if
                        
                          } //if close


                     }
                     // for status update
                     //alert($scope.userit[0].count)
                      $http.delete('/barcodedelete/'+icount).success(function(response)
                       { 

                       }); 
                     // batch()
                    
                   // console.log("here is the count  "+ $scope.count);
               })
            } else{ //closer for replay == 0
                   // alert("window.location.reload")
                     window.location.reload();
                     $http.post('/updatelistinsert/'+icount).success(function(response)
                         {  
                            //  alert("post "+response)    
         
                         });

                  }

       }) //closer for gettags

 }//colorCodeFun 

  
var refno = 1;
//25/5$scope.userit = [];
$scope.bitem = [];
//var reload = 0;
// var qty = null;
// var wt = null;
// var tag = null;

    // save the compelete barcode summary button for barcode summary page
$scope.saveBarcode = function()
{ //validation purpose
   //$scope.test = 'update1'
   //alert($scope.bitem.stockout)

if($scope.bitem.ItemName == "" &&$scope.bitem.stockin == "" && $scope.bitem.stockout == ""&&$scope.bitem.wt == ""&& $scope.bitem.pcs == ""&& $scope.bitem.titems == "")
  {
alert("Please Fill All Mandatory Fields")
  }
  else if($scope.bitem.ItemName == undefined &&$scope.bitem.stockin == undefined && $scope.bitem.stockout == undefined&&$scope.bitem.wt == undefined&& $scope.bitem.pcs == undefined&& $scope.bitem.titems == undefined)
  {
alert("Please Fill All Mandatory Fields")
  }


  
//if($scope.bitem.date == undefined ||$scope.bitem.ItemName == undefined ||$scope.bitem.stockin == undefined || $scope.bitem.stockout == undefined ||$scope.bitem.wt == undefined || $scope.bitem.pcs == undefined || $scope.bitem.titems == undefined){
 else  if($scope.bitem.ItemName == undefined ||$scope.bitem.stockin == undefined || $scope.bitem.stockout == undefined ||$scope.bitem.wt == undefined || $scope.bitem.pcs == undefined || $scope.bitem.titems == undefined || $scope.bitem.ItemName == "" ||$scope.bitem.stockin == "" || $scope.bitem.stockout == "" ||$scope.bitem.wt == "" || $scope.bitem.pcs == "" || $scope.bitem.titems == ""){
  
  
    for(let m = 0; m<=1;m++){
       // alert("not save ing here")
        //console.log($scope.bitem.date)
  // if($scope.bitem.date == undefined){
  //   alert("Please select date")
  //   return;
  // }
  console.log($scope.bitem.ItemName)
  if($scope.bitem.ItemName == undefined || $scope.bitem.ItemName == ""){
    alert("Please select ItemName")
    return;
  }
  console.log($scope.bitem.stockin)
  if($scope.bitem.stockin == undefined || $scope.bitem.stockin == ""){
    alert("Please select Stock From")
    return;
  }
  console.log($scope.bitem.stockout)
  if($scope.bitem.stockout == undefined || $scope.bitem.stockout == ""){
    alert("Please select Stock To")
    return;
  }
  if($scope.bitem.wt == undefined||$scope.bitem.wt == ""){
    alert("Please select Total weight")
    return;
  }
  if($scope.bitem.pcs == undefined ||$scope.bitem.pcs == ""){
    alert("Please select Total Pcs")
   return;
  }
  if($scope.bitem.titems == undefined||$scope.bitem.titems == ""){
    alert("Please select Total Tags")
    return;
  }
 
  }

 }else{
  
  
 // reload = 1;
  //alert("entered into save function")
  if($scope.bitem.composite == true){
      $scope.bitem.composite = "yes"
   }else if($scope.bitem.composite == false || $scope.bitem.composite == undefined ){
      $scope.bitem.composite = "no"
   }
  // console.log($scope.bitem.splittable)
   if($scope.bitem.splittable == true){
    $scope.bitem.splittable = "yes"
   }else if($scope.bitem.splittable == false || $scope.bitem.splittable == undefined ){
    $scope.bitem.splittable = "no"
   }

    var wt = $scope.bitem.wt.toFixed(fixdec);
   

   var tag = $scope.bitem.titems.toFixed(0);
   var qty = (wt/tag);

// console.log("here is tag table starts");
 var iname=$scope.bitem.ItemName;
 // console.log("here is item name"+iname);
  var tags=$scope.bitem.titems;
  //console.log(tags);
  var inward=$scope.bitem.inward;
 composite = $scope.bitem.composite;
 split = $scope.bitem.splittable;
 //var invGroupName = $scope.bitem.invGroupName

 
 //var weigth = $scope.bitem.wt;
 // console.log(weigth);
  refno++;
  console.log("ref number is"+refno);
  var qt = " ";
  for(i=1;i<=tags;i++)
  {     
        
         var qt = qty + (qty*(i-1));
        //  console.log("the qty is " +qty); 
    $scope.userit.push({
       // 6/6'count': $scope.count +1 ,
        'count': parseInt( $scope.count),
      'itemno':i,
      'refno':refno,
      'ttags':tags,
      'iname': iname, //////
      'qty' : qty,
      'batch' : qt ,// no need here
      'wt' : wt,//7/6
      'status':"avl ",
      'composite':composite,
    'split': split,
    'stockfrom':$scope.bitem.stockin,
   'stockto':$scope.bitem.stockout,
   'invGroupName':"Gold",
   'status':"Inprogress"

    })
  }

 //var editsummary =true
  if(editsummary == true){
    
         console.log(" if loop if  loop")
         $http.delete('/deleteTagsError/'+$scope.count).success(function(response){       
              //  alert("delete call") ;
                $http.post('/tags',$scope.userit).success(function(response){
                       console.log(response);
                       //alert("tags update call")
                })  
         });
          // $scope.editupdate._id
          console.log(id3)
         // alert($scope.bitem.date)
         var data = id3 +","+$scope.count+","+ $scope.bit.date+","+$scope.bitem.ItemName+","+$scope.bitem.wt+
         ","+$scope.bitem.pcs+","+ $scope.bitem.titems+","+ $scope.bitem.remark+","+ $scope.bitem.stockin+","+$scope.bitem.stockout +","+$scope.bitem.composite+
         ","+ $scope.bitem.splittable
         // alert($scope.bit.date)

         $http.put('/editsummarycountupdate/'+data).success(function(response){ 
                    console.log(response)
                   alert("Data is Updated");
                   window.location.reload();
                    // edit_id = response[0]._id
                    // console.log(response[0]._id)

         })
 

  }

  else{
     //$scope.test = 'display'
    console.log(" else loop else  loop")
 
 //alert(date3)

     $scope.bitem.push({
  //6/6 'count': $scope.count +1 ,
   'count': $scope.count ,
   'Summaryno':$scope.bitem.summaryno , 
  'date':$scope.bit.date,
  // //30/6 'date':ISODate($scope.bitem.date),
   'itemname':$scope.bitem.ItemName,
  // 'iscomposite':$scope.bitem.composite,
 //  'issplittable':$scope.bitem.splittable,
   'totalweight': $scope.bitem.wt.toFixed(fixdec) ,//7/6
   'totalpcs': $scope.bitem.pcs.toFixed(0),
   'totaltags':$scope.bitem.titems.toFixed(0),
   'remarks':$scope.bitem.remark,
   'composite':$scope.bitem.composite,
   'split':$scope.bitem.splittable,
   'stockfrom':$scope.bitem.stockin,
   'stockto':$scope.bitem.stockout,
  'status':"Inprogress"
   })  
       console.log( $scope.bitem.date)
       console.log($scope.bit.date)
$scope.res = [];
//alert($scope.bitem.date)
 //$scope.test = 'display'
  $http.post('/bardata',$scope.bitem).success(function(response){
               // alert("saved successfully"); 
               console.log("iam in save button see me")
                $scope.res=response; 
               // alert($scope.res)
               console.log("working with res");
               console.log($scope.res);
              console.log("end of save button");
           //   location.reload(); //10/4
  //$scope.bitem = ""; //i commented 15/4

})

 
 //refresh()
  $http.post('/tags',$scope.userit).success(function(response)
    {
      console.log(response);
    })
  window.location.reload();

$scope.test = 'display'

} //else loop
 // refresh()
 //reload issue
 // if(reload == 1){
 //  window.location.reload();
 // }
  
}
refresh() 
}

//for validation of treasure
$scope.stock = function(){
if($scope.bitem.stockin == $scope.bitem.stockout){
      alert("stock From and stock To cannot equal Please try with different one!")
      $scope.bitem.stockout = null;
    }
  }

// for batch edit selection
var edit1 = null;
var edit1Index = null;
// $scope.f1 = function(valuecount){
//    console.log("f1")
//    console.log(valuecount) 
//   }
var colorpush = null;
var colorindex = null;
$scope.row2 = function(row,index){
  $scope.all=true
//console.log(colorpush.color)
   // console.log("this is row id"+id);
   console.log(row)
   //alert(row)
   console.log(index)
   if(colorpush != null && $scope.batch[colorindex] != undefined){
     console.log("colorpush.color");
     // alert(" $scope.batch[colorindex]  "+$scope.batch[colorindex])
     // alert("colorpush "+colorpush+" $scope.batch[colorindex].color "+$scope.batch[colorindex].color)
     // // $scope.batch[colorindex].color = '';
   
     $scope.batch[colorindex].color = colorpush;
   }
  console.log("u clicked on row $scope.rupeesDecimalPoints");
  console.log(row.barcode)
  console.log(row.color)
  if(row.color == undefined){
   row.color = "white";
  }
  console.log(index)
  colorpush = row.color
  colorindex = index
   console.log(colorpush);
  
 $scope.batch[index].color ="blue";
  $scope.idSelectedVote = row;
  //alert($scope.idSelectedVote)
  edit1 = $scope.idSelectedVote;
  edit1Index = index;
 // alert(edit1)
  // console.log($scope.valuecount)
  // $scope.f1() 
  //console.log($index.length)
  // $http.get('/batchbarcode',{params:{"barcode":batch.barcode}}).success(function(response)
  //       { 
  //           console.log(response)
  //          //  $scope.batch = response
  //          response[0].color = "yellow"
  //          $scope.batch[index] = response[0]
  //       })
  
  // //$scope.batch.color = "yellow"
  // console.log(batch.color = "yellow")
  // console.log( batch)
  //  console.log($scope.batch = batch[0])
 // $scope.batch[index].color = ""
  //color()
  //$scope.list()
  $scope.userit= $scope.userit.slice(0, 0);

  //$scope.all=false;
  }
  //change color process
// var color = function(){
  
// }
//for edit function
$scope.edit = function(){
     //alert("edit call");
   // alert("edit2 edit "+edit1);
    if(edit1 != null){

      
            $http.get('/codeDetails'+ edit1.barcode).success(function(response) {
            //alert("reerer "+response)
            console.log(response);
            
            console.log(response.length);
            //alert("in call "+response.length);
            var editBarcodeLength = response.length ;
            if(editBarcodeLength >0){
              alert("The barcoded item is soldout!");
              
              $scope.batch[colorindex].color = colorpush
            
            }else if(edit1.composite == 'yes'){
                    $http.get('/compos'+ edit1.barcode).success(function(response) {
                           // alert(response.length)
                           $scope.userit = response;
                           (async function loop() {
                            for (let i = 0; i <= $scope.userit.length-1; i++) {
                             // alert($scope.userit.length)
                                await new Promise(resolve => setTimeout(resolve,
                               // Math.random()
                            $http.get('/itemnamedetails'+$scope.userit[i].itemName).success(function(response){
                                                       
                                                    //alert(userit[i])
                                               $http.get('/itemdetails'+response[0].InvGroupName).success(function(response){
                                               // alert(userit[0].length)
                                                     console.log(response);
                                                    console.log(response[0].PurchaseAcc);
                                                    // if($scope.transaction =="Urd Purchase"){
                                                    //    $scope.userit[i].accNumbers = response[0].PurchaseAcc; 

                                                    //  }else if($scope.transaction =="Regular Sale"){
                                                    //     $scope.userit[i].accNumbers = response[0].SalesAcc;
                                                    //  }
                                                   
                                                   var itempuritydata = response[0].InvGroupID +","+lastdate;
                                               $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                                                   //alert(response.length)
                                                 //   console.log(index4)

                                                       $scope.userit[i].irate = response
                                                       
                                                       console.log($scope.userit[i].irate)

                                                    //   index4++
                                                       // alert("inside http "+n)
                                                       if($scope.userit[i].mrp != undefined){
                                                       // alert($scope.userit[i].mrp )
                                                        $scope.mrpCal(i)
                                                       }else{
                                                        //$scope.disableMrp1(i)
                                                        //alert( $scope.disableMrp1(i))
                                                         $scope.disableMrp[i] = false;
                                                       }
                                                    })   
                                    
                                                })
                                           })  






                                ));


                              

                            }
                        })();
                     $scope.updateButton = true;
                     })
               

             }//else if



            else{

                     $scope.userit[0] = edit1;
                     console.log( $scope.userit[0]);
                     $scope.itemSelect($scope.userit[0].itemName,0);
              

                     $scope.updateButton = true;
                   //  edit1 = null;

                 }

         })

      
    }
   


    else{
      alert("Please Select Batch ")

    }
      
  
}
// $scope.updateBatchGeneration = function(){
// alert("updated successfully");
// $scope.updateButton = false;
// }

//for delete barcode one
$scope.close=function(){
  alert("Are You Sure You Want To Leave This Page")
}
  //$scope.test=='display';
$scope.deletebarcodegeneration = function(index){
 // $scope.test=='display';

    console.log("delete call");
    console.log(edit1);

    if(edit1 != null){
       $http.get('/codeDetails'+ edit1.barcode).success(function(response) {
            //alert("reerer "+response)
            console.log(response);
            
            console.log(response.length);
            var editBarcodeLength = response.length ;
            if(editBarcodeLength >0){
              alert("The barcoded item is soldout!");
              //$scope.batch[colorindex].color = colorpush

            }else{
                    var r = confirm("Are you sure you want to delete the barcode "+edit1.barcode+" ?");
                    if (r == true) {
                        console.log("true");
                        $http.delete('/deletebarcode/'+edit1.barcode);
                        console.log($scope.batch.length) 
                         console.log($scope.batch.splice(edit1Index,1)) 
                           console.log($scope.batch.length) ; 
                        edit1 = null;
                        //$scope.userit= $scope.userit.slice(0, 0);

                    }
               // else{
               //     console.log("false");
// $scope.batch[colorindex].color = "white";
$scope.batch[colorindex].color = colorpush;
               //    }
            }//else if(editBarcodeLength >0
        })//$http
     
     }else{
             alert("Please select Batch");
          }
   //$scope.batch[colorindex].color = colorpush       
}//deleteclose
// for cancel in barcode generation
$scope.cancelbarcodegeneration = function(){

//alert("ff");
    if($scope.userit[0] == undefined){
      alert("Please Select Necessary Details");
      //break;
    }
     console.log("cancel call");
    $scope.batch[colorindex].color = colorpush
   //$scope.list() 
    $scope.updateButton = false;
     edit1 = null;
  //$scope.userit[0] = null;
  $scope.userit= $scope.userit.slice(0, 0);
  // editrow3 = null;
}

var num = 0;
$scope.userit = [];
 // $scope.test = 'display';
$scope.generateBarcode = function( ){

         // alert(tagno);
         console.log( tagdetails);
          var count = 0
        for(i=1;i<=100;i++){
             // var barno = Math.floor(Math.random() * 100000000) + 1;
             //    // barno = "99203078" Math.floor(Math.random() * ((y-x)+1) + x);
             var barno = Math.floor(Math.random() *  ((99999999-10000000)+1) + 10000000);
            
             //alert("the barcode is "+barno)
             console.log("the value of i "+i)
              $http.get('/barcode',{params:{"barcode":barno}}).success(function(response) { 
                        console.log(response.length)
                        count = response.length
                        console.log(count)

              })

              if(count == 0){
                //alert(count)
                break;
              }
          }//for

   $scope.test = 'display';
 // alert(tagno);
 console.log( tagdetails);

  // for last barcode details

  //       var desc=response[0].desc;
  //       var size=response[0].size;
  //       var gwt=response[0].gwt;
  //       var ntwt=response[0].ntwt;

  // var count = 0
  // for(i=1;i<=100;i++)
  // {
  //     // var barno = Math.floor(Math.random() * 100000000) + 1;
  //     //    // barno = "99203078" Math.floor(Math.random() * ((y-x)+1) + x);
  //      var barno = Math.floor(Math.random() *  ((99999999-10000000)+1) + 10000000);
      
  //     //alert("the barcode is "+barno)
  //     console.log("the value of i "+i)
  // $http.get('/barcode',{params:{"barcode":barno}}).success(function(response)
  //       { 
  //           console.log(response.length)
  //           count = response.length
  //           console.log(count)

  //       })

  //       if(count == 0){
  //         //alert(count)
  //         break;
  //         }
  //   }

   
          var data = icount 
          $http.get('/lastrec/'+data).success(function(response){
              console.log(response)
              //$scope.userit=response;
              console.log($scope.userit)
                // $scope.userit=response;
                // $scope.userit[0]=barno
                
              if(response.length == 0){
                      //alert("entered into if loop response.length response.length == 0 lastrec")
                      console.log("null")
                     $scope.userit.splice(0,1,({
                          'barcode':barno,
                          // 8/5'iname': item1,
                            'itemName': item1,
                          'date':new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString(),
                                           // how transfered to final table
                         'Batch': ibatch, //no need here
                          'Qty' : iqty,
                          'tags' : itags,
                          'wt' : iwt,
                          'stats': istatus,

                         'count':icount,
                          'composite':icomposite, // not necessary
                         'split': isplit, 
                         'uom':"Gms",// not necessary
                    
                     })) //

                     if(tagdetails.composite == 'yes'){
                      for(let m = 1; m<=3;m++){
                        $scope.userit.splice(m,1,({
                       
                        })) 
                       }
                     }

                     $scope.itemSelect(item1,0);   
                      console.log($scope.userit[0])
              } else{

                        //alert("entered into else loop else response.length >= 0")
                              $scope.userit=response;
                              $scope.userit[0].barcode=barno
                              if (response[0].mrp != undefined) {
                                 // alert(response[0].mrp)
                                 $scope.disableMrp =true;

                              }  
                              // $scope.userit[0].barcode=barno
                             //$scope.userit[0].iname= item1,
                             $scope.userit[0].gwt = null;
                             //alert(  $scope.userit[0].gwt)
                             $scope.userit[0].itemName=item1;
                           $scope.userit[0].date= new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString(),
                                            // how transfered to final table
                          $scope.userit[0].Batch = ibatch, //no need here
                          $scope.userit[0].Qty = iqty,
                          $scope.userit[0].tags = itags,
                           $scope.userit[0].wt = iwt,
                          $scope.userit[0].stats = istatus,

                          $scope.userit[0].count = icount,
                           $scope.userit[0].composite = icomposite, // not necessary
                           $scope.userit[0].split = isplit,
                             console.log("in else loop")
                               console.log(barno)
                               console.log(" $scope.userit[0].date "+ $scope.userit[0].date)
                               $scope.itemSelect(item1,0);
                      
                      }//else

             
             
          })//lastrec
             // $(window).load(function() {
             //      init();
             //   });
             //  console.log("in allocate"+$scope.tag); 
             // $scope.itemSelect(item1,0); 
  
  
 }//generateBarcode
var comboItemCheck = null;
$scope.itemSelect = function(itemname,in1) {
     // alert("itemSelect itemSelect "+in1+itemname)
     // console.log($scope.userit[in1])
     // $scope.userit[in1].itemName =itemname 
     //check for combo or not
       $http.get('/checkofcomboitem/'+itemname).success(function(response) { 
           
                //console.log("i got replay form confirm")
                console.log(response);
                //alert(response[0].comboItem);
                 if(response[0].comboItem == "yes"){
                      comboItemCheck = 'yes';
                      $scope.userit[in1].comboItem = 'yes';
                 }else{
                          comboItemCheck = 'no';
                          $scope.userit[in1].comboItem =  'no';
                      }
       })
                
           
     if(in1 > 0){
       $scope.userit[in1].uom = "Carats";
     }   

      for(let a=0;a<$scope.items.length;a++){
       
          if (itemname == $scope.items[a].Name){
                 // alert("$scope.items[i].Name "+$scope.items[i].Name)
                    console.log($scope.items[a].InvGroupName)
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                            console.log(response);
                            console.log(response[0].PurchaseAcc);
                             $scope.userit[in1].InvGroupName = $scope.items[a].InvGroupName;
                            $scope.userit[in1].SaleCategory = $scope.items[a].SaleCategory;
                           
            
                            console.log(lastdate);
                            if(response[0].InvGroupName =="Diamond" ){
                                $scope.userit[in1].uom = "Carats"
                              }
                           // alert(lastdate)
                            var itempuritydata = response[0].InvGroupID +","+lastdate;
                           $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                              console.log(response)
                             $scope.irate=response; 
                             $scope.userit[in1].irate = response;
                            })   
            
                    })
              break;
          }    
       
       }

  
}
// for composite items
var complex = 0;
$scope.complex = function($index){
  if (icomposite  == true){
       console.log(" iam composite")
       console.log($index );
       console.log(complex);
      console.log("iam complex here");
//console.log( $scope.userit[$index].barcode);
if( $index == complex ) {
     $scope.userit.push({
   
    })
    console.log("iam not equal");
    complex = complex+1
  }
 
    console.log(complex);
  }
}

var list3 = null;
// working for list 

$scope.list = function(){
console.log("function is clicked in list ");
 // var list =$scope.bitem.count2;
  var list3 = $scope.bitem.count2 //from controller
// var list3 =  //from controller
 console.log( list3)
 // alert("list is" +list3);
 // console.log($scope.bitem.count2);
 // $scope.bite = $scope.bitem.count2;
 // console.log("trail is "+$scope.bite);
 $http.get('/listdata'+list3).success(function(response)
    { 
       // alert("in side list function");
      $scope.tags = response;
       console.log(response);

    })
$http.get('/batchrecords/'+list3).success(function(response)
         {
          
          console.log(response);
          $scope.batch = response;
          
        })
 
  

}



$scope.idSelectedVote = " "
var item1 = null;
var iqty = null;
var ibatch = null;
var itags = null;
var iwt = null;
var tagno=null;
var istatus =null;
var icount = null;
var icomposite = null; 
 var  isplit = null; 
 var tagdetails = null;
 var iinvGroupName = null;
 var stockin = null ;
 var stockout = null;
    

 $scope.row1 = function(tag){
  $scope.all = false
  console.log(tag)
   tagdetails = tag;
   edit1 = null;
   // console.log("this is row id"+id);
  console.log("u clicked on row 1");
  $scope.idSelectedVote = tag;
 // console.log(tag);
  //console.log(tag.iname);
   console.log(tag.batch);
   console.log(tag.qty);
   console.log(tag.wt);
   console.log("the status is");
   console.log(tag.status);
  //item1 = tag.iname;
  item1 = tag.iname;
  iqty = tag.qty;
  ibatch =tag.batch;
  itags = tag.ttags;
  iwt = tag.wt;
  istatus = tag.status;
  icount = tag.count;
  tagno = tag.itemno;
  icomposite = tag.composite; 
  isplit = tag.split; //not necessary
  iinvGroupName = tag.invGroupName;
  
   console.log("the items is " +item1);
   console.log("the weight is " +iwt);
   console.log("the composite is " +icomposite);
   console.log("the batch is " +ibatch);
    console.log("the stockin is " +tag.stockfrom);
   console.log("the stockout is " +tag.stockto);
   // window.sessionStorage.setItem("stockin", tag.stockfrom);
   // window.sessionStorage.setItem("stockout", tag.stockto);


    // var stockin = window.sessionStorage.getItem("stockin");
    //        var stockout = window.sessionStorage.getItem("stockout");
      stockin = tag.stockfrom ;   
      stockout = tag.stockto ;
   //alert("tag.stockfrom  "+tag.stockfrom+" tag.stockto "+tag.stockto)
   // $http.get('/batchrecords/'+list3).success(function(response)
   //       {
   //         console.log(response);
   //        $scope.batch = response;
          
         
   //      })
   //$scope.batch[colorindex].color = colorpush;
    $scope.updateButton=false;
   $scope.batch[colorindex].color = colorpush
 
  $scope.userit= $scope.userit.slice(0, 0);
   //refresh()
 }


 //  no need of this code in web and nodejs also
 
   // $http.get('/tags',$scope.userit).success(function(response)
   //  {
   //    $scope.response = response;
   //    console.log(response);
   //  })

   //for list search
   
   var summarylist = function(){
    //alert("ll")
   $http.get('/list',$scope.bitem).success(function(response)
    { 
     // alert("summarylist call call")
        console.log("list adta");
       // alert("Summary call")
      $scope.res = response;
     // $scope.res[0].count = list3;
      //   $scope.bitem.count2 = $scope.res[0].count; 
      console.log(response);
       console.log(response[0].count);
      console.log(response.length);
      //do it here
      // $scope.batch = []
      // for(i=0;i<=response.length;i++){
      //  // console.log(response[i].count);
      //  $http.get('/batchrecords/'+response[i].count).success(function(response)
      //    {
      //      console.log("i got batch get request")
      //     // $scope.batch=response;
      //     var  a = response
      //     console.log(response);
      //    // console.log(response[0].iname);
      //        for(i=0;i<=response.length;i++){
      //       $scope.batch.push({iname:response[i].iname,date:response[i].date,barcode:response[i].barcode,Batch:response[i].Batch,tags:response[i].tags,wt:response[i].wt,color:response[i].color});
      //    // console.log($scope.batch)
      //  }
      //   })
      //  }

    })
 }
 summarylist()
// for cancel button
$scope.cancel = function(){
  editsummary=false
  if($scope.bitem.ItemName == "" &&$scope.bitem.stockin == "" && $scope.bitem.stockout == ""&&$scope.bitem.wt == ""&& $scope.bitem.pcs == ""&& $scope.bitem.titems == "")
  {
alert("Please Fill All Mandatory Fields")
  }
    else if($scope.bitem.ItemName == undefined &&$scope.bitem.stockin == undefined && $scope.bitem.stockout == undefined&&$scope.bitem.wt == undefined&& $scope.bitem.pcs == undefined&& $scope.bitem.titems == undefined)
  {
alert("Please Fill All Mandatory Fields")
  }
   $scope.test = 'display'
  console.log("i got cancel call")
 // $scope.count = ""
 //   'Summaryno':$scope.bitem.summaryno , 
 // $scope.bitem.date = ""
 $scope.bitem.ItemName = ""
 $scope.bitem.composite = ""
 $scope.bitem.splittable = ""
$scope.bitem.wt = ""
  $scope.bitem.pcs = ""
 $scope.bitem.titems = ""
 $scope.bitem.remark = ""
$scope.bitem.composite = ""
 //   'split':$scope.bitem.splittable,
 $scope.bitem.stockin = ""
$scope.bitem.stockout = ""
 $scope.count = count3 
console.log(count3)
//window.location.reload();
   $scope.list() 
//refresh()
}
// for new button

 $scope.all = true
$scope.newBarSumm = function(){
  // $scope.test = 'display'
  console.log("i got new call")
  $scope.all = false
   $scope.bitem.ItemName = ""
 $scope.bitem.composite = ""
 $scope.bitem.splittable = ""
$scope.bitem.wt = ""
  $scope.bitem.pcs = ""
 $scope.bitem.titems = ""
 $scope.bitem.remark = ""
$scope.bitem.composite = ""
 //   'split':$scope.bitem.splittable,
 $scope.bitem.stockin = ""
$scope.bitem.stockout = ""
 $scope.count = count3 
  //$scope.cancel()
  refresh()
}

// for edit button
var editsummary = null;
  $scope.editupdate = null;
 //var editrow3._id = null;
  var id3 =null;
//$scope.test='update1';
$scope.editBarSumm = function(){
  $scope.test='update1';
    
     
     //alert("kk")
      //$scope.test = 'update1'

        if(editrow3 == undefined){
          alert("Please select any item");
       }
       else{
          $scope.newBarSumm();
         //    $scope.all = false
         // $scope.bitem = ""
       }
     

      console.log("i got edit call")
      console.log(editrow3);
      console.log(editrow3._id);
      id3 = editrow3._id
 
  
      // $scope.bitem = editrow3
      console.log(editrow3.composite);
      console.log(editrow3.split);
      console.log(editrow3.count);
      if(editrow3.composite == "yes"){
          $scope.bitem.composite = true
          console.log("if"+editrow3.composite);
      }else{
          $scope.bitem.composite = false
          console.log("else"+editrow3.composite);
      }
      if(editrow3.split == "yes"){
          $scope.bitem.splittable = true
      }else{
          $scope.bitem.splittable = false
      }
      $scope.count = editrow3.count 
      console.log($scope.count)
      // $scope.bit.date = editrow3.date;
      $scope.bit = {
          date: new Date(editrow3.date)
        };
        // alert($scope.bit.date);
      $scope.bitem.ItemName = editrow3.itemname
  
      $scope.bitem.wt = parseFloat(editrow3.totalweight);
      console.log($scope.bitem.wt)
      $scope.bitem.pcs = parseFloat(editrow3.totalpcs);
      $scope.bitem.titems = parseFloat(editrow3.totaltags);
      $scope.bitem.remark = editrow3.remarks

      $scope.bitem.stockin = editrow3.stockfrom
      $scope.bitem.stockout = editrow3.stockto

      editsummary = true
      //$scope.test=='update1';
//$scope.row1()
 //window.location.reload();
 //$scope.newBarSumm()
  editrow3 = undefined;
 refresh()
}
//window.location.reload();
refresh()
// for delete button
$scope.delete = function(){
   $scope.test = 'display'
       console.log("i got delete call")
       console.log(editrow3);
       // console.log(editrow3._id);
      if(editrow3 == undefined){
          alert("Please select any item");
       }else{
               var r = confirm("Are you sure you want to delete the item "+editrow3.itemname+" ?");
                    if (r == true) {
                 console.log("true");
                 $http.delete('/barcodesummarydelete/'+editrow3._id).success(function(response)
                     { 

                     });
                                                      $scope.bitem.ItemName = ""
 $scope.bitem.composite = ""
 $scope.bitem.splittable = ""
$scope.bitem.wt = ""
  $scope.bitem.pcs = ""
 $scope.bitem.titems = ""
 $scope.bitem.remark = ""
$scope.bitem.composite = ""
 //   'split':$scope.bitem.splittable,
 $scope.bitem.stockin = ""
$scope.bitem.stockout = ""
 $scope.count = count3 

             }else{
                   $scope.bitem.ItemName = ""
 $scope.bitem.composite = ""
 $scope.bitem.splittable = ""
$scope.bitem.wt = ""
  $scope.bitem.pcs = ""
 $scope.bitem.titems = ""
 $scope.bitem.remark = ""
$scope.bitem.composite = ""
 //   'split':$scope.bitem.splittable,
 $scope.bitem.stockin = ""
$scope.bitem.stockout = ""
 $scope.count = count3 

                  }
              editrow3 = undefined;
            }
  refresh()
}

// for close button
$scope.close = function(){
  console.log("i got close call")
}
//row selection in barcode summary page
var editrow3 = null;
$scope.row3 = function(item){
   // console.log("this is row id"+id);
  console.log("u clicked on row 3");
  $scope.idSelectedVote = item;
   console.log(item);
   editrow3 = item;
}
//for date edit function
$scope.date1 = false
$scope.datechange = function(){
  //$scpe.date2 = true
  $scope.date1 = false
  console.log("$scope.datechange $scope.datechange $scope.datechange");
}

$scope.purityCal=function(val,purity){
        
       //alert("purity calculation function called"+purity.Rate+purity)
       //alert("length is:"+$scope.irate.length)

       for(i=0;i<$scope.irate.length;i++)
       {
        //alert($scope.irate[i].ValueNotation)
          if (purity == $scope.irate[i].ValueNotation)
          {
            //alert( $scope.userit[val].rate)
              $scope.userit[val].rate=$scope.irate[i].Rate;
              break;
          }
        
       
       }



       
        var labvar = parseFloat($scope.userit[val].labamt)
        if(labvar==NaN){
         $scope.userit[val].labval=0;
        }
        var stvar = parseFloat($scope.userit[val].stchg)
        if(stvar==NaN){
         $scope.userit[val].stval=0;
        }

    if($scope.userit[val].gwt=="")
    {
        //alert("null value")
        $scope.userit[val].chgunt=0;
        $scope.userit[val].ntwt=0;
        $scope.userit[val].taxval=0;
        $scope.userit[val].taxamt=0;
        $scope.userit[val].final=0;
        $scope.newwas(val,pctcal);
    }
   /* else if($scope.userit[$index].wastage!=null && $scope.userit[$index].gwt!=null)
{
    alert("not null wastage value")
    $scope.newwas($index,pctcal);

}*/
    else 
    {
        //alert("null value")
      //26/4  var gwt=$scope.userit[$index].gwt;
   //   $scope.userit[$index].gwt = 3;//added 26/4
      console.log($scope.userit[val].gwt)//added 26/4
        var gwt=$scope.userit[val].gwt;
        //alert(gwt);
   
    $scope.userit[val].ntwt = $scope.userit[val].gwt;
    if($scope.userit[val].stwt!=null)
    {
      // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
         
      $scope.userit[val].ntwt=(parseFloat($scope.userit[val].ntwt)-parseFloat($scope.userit[val].stwt)).toFixed(fixdec);
    }
    //$scope.userit[val].chgunt=($scope.userit[val].ntwt).toFixed(fixdec);
     $scope.userit[val].chgunt=($scope.userit[val].ntwt);
   
    //alert("here is index"+$scope.userit[$index].chgunt)
    //
    //$scope.newwas($index,pctcal);
 
    $scope.userit[val].taxval=($scope.userit[val].chgunt*$scope.userit[val].rate).toFixed(fixdec);;
    // $scope.userit[val].taxamt=$scope.userit[val].taxval/100;
    // $scope.userit[val].final=parseFloat($scope.userit[val].taxval)+parseFloat($scope.userit[val].taxamt)
    
}
}      

  $scope.newgwt=function($index,pctcal){
    var grossWeight = null;
    
    if($scope.userit[$index].labamt==null){
         $scope.userit[$index].labval=0;
        }

    if($scope.userit[$index].stchg==null){
         $scope.userit[$index].stval=0;
        }

    if($scope.userit[$index].gwt==""){
    
        //alert("null value")
        $scope.userit[$index].chgunt=0;
        $scope.userit[$index].ntwt=0;
        $scope.userit[$index].taxval=0;
        $scope.userit[$index].taxamt=0;
        $scope.userit[$index].final=0;
        $scope.newwas($index,pctcal);
    }else{
            //alert("$scope.userit[$index].gwt!=")
            //alert($scope.userit[$index].gwt)
            
            $scope.userit[$index].gwt  = (parseFloat($scope.userit[$index].gwt)).toFixed(fixdec);
            $scope.userit[$index].gwt  = parseFloat($scope.userit[$index].gwt)
            grossWeight = $scope.userit[$index].gwt
            //console.log("lop"+grossWeight);
            //alert("out"+grossWeight)
            //grossWeight.toString()
           // alert("grossWeight "+typeof(grossWeight)+grossWeight);
      
            if(grossWeight.toString()  == "NaN"){
               //alert("in"+grossWeight)
               
               grossWeight = 0;
            }
            //159   $scope.userit[$index].stwt = 0;
            if(tagdetails.composite == 'yes' && $index > 0){

              //setTimeout($scope.valuationPrint(), 1000);
              //setTimeout($scope.valuationPrint(), 1000);
            
                $scope.uomConversion($index,$scope.userit[$index].uom)
                // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
                //$scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
                   
                //$scope.userit[$index].taxval=($scope.userit[$index].chgunt*$scope.userit[$index].rate).toFixed($scope.rupeesDecimalPoints);
  
                $scope.userit[0].stwt =parseFloat($scope.userit[$index].ntwt );
                //total netwt
                var totalNetWeight = stwt1;
                //4 because length is already 4 by default
                // setTimeout(compositeCall(), 100);
                // function compositeCall() {
                  // body...
               
                for(let a = 0;a< 4;a++){
                    // alert(" $scope.userit[a].gwt "+$scope.userit[a].gwt )
                   if($scope.userit[a].gwt != undefined){
                        if( $scope.userit[0].pctcal!= undefined){
                              $scope.newwas(0,$scope.userit[0].pctcal)
                       }
                      taxValCal($index)
                     //taxval2
                      //setTimeout( taxValCal(a), 100);
                   }
              
                } //for

               //}//compsitecall
     
          

 
             }else{ // if(tagdetails.composite == 'yes' && $index > 0){
                    //159 $scope.userit[$index].stwt = 0;
                    //alert("not composite")
                   
                    if($scope.userit[$index].stwt!=null){
          
                     // alert("gwt ntwt  "+typeof($scope.userit[$index].stwt)+$scope.userit[$index].gwt);
      
                     $scope.userit[$index].ntwt=(grossWeight-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
                    }else{
                           // alert(" not null ")
                           $scope.userit[$index].ntwt=(grossWeight).toFixed(fixdec);
                    
                         }
                    $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
                    $scope.userit[$index].taxval=($scope.userit[$index].chgunt*$scope.userit[$index].rate).toFixed($scope.rupeesDecimalPoints);
                     //alert($scope.userit[$index].taxval)
                    if( $scope.userit[$index].pctcal!= undefined){
                          $scope.newwas($index,$scope.userit[$index].pctcal)
                      } 
                    if( $scope.userit[$index].labcal!= undefined){
                          $scope.newlab($index,$scope.userit[$index].labcal)
                      } 
                    if( $scope.userit[$index].stonecal!= undefined){
                          $scope.newstchg($index,$scope.userit[$index].stonecal)
                      }  

                      
                    taxValCal($index)
                  }
    

            }
  }
//decimal validations gpcs
 $scope.gpcsDecimals = function($index){
   $scope.userit[$index].gpcs  = (parseFloat($scope.userit[$index].gpcs)).toFixed(0);
   $scope.userit[$index].gpcs = parseFloat($scope.userit[$index].gpcs)
    //alert($scope.disableMrp);
    if ($scope.disableMrp == true) {
        $scope.mrpCal($index, $scope.userit[$index].mrp)
    }
  // $scope.disableMrp =true;
 }

 $scope.stoneTolerence = function($index) {
  //alert($scope.userit[$index].stwt+" "+$scope.userit[$index].gwt)
  if($scope.userit[$index].stwt >$scope.userit[$index].gwt){
    alert("Stone wt cannot be greater the Gross wt");
    $scope.userit[$index].stwt = 0;
    $scope.newstwt($index);
  } 
}//
 var stwt1 = 0;
$scope.newstwt=function($index)
{
   //alert(($scope.userit[$index].stwt))
    //indexvalue = $index;
   console.log($scope.userit[$index].stwt)
   if($index == 0){
       stwt1 = parseFloat ($scope.userit[$index].stwt) ;
        //alert(stwt1+" stwt1")
    }
  
    if($scope.userit[$index].stwt == undefined){
      
       // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)).toFixed(fixdec);
       // $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
       $scope.uomConversion($index,$scope.userit[$index].uom)
   }else{

            $scope.userit[$index].stwt =( $scope.userit[$index].stwt).toFixed(fixdec);
            $scope.userit[$index].stwt = parseFloat ($scope.userit[$index].stwt) ;
         
            $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
            $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
             if(tagdetails.composite == 'yes' && $index > 0){
                        $scope.uomConversion($index,$scope.userit[$index].uom)
                        //total netwt
                        var totalNetWeight = stwt1;
                        //4 because length is already 4 by default
                       for(let a = 1;a< 4;a++){
                        
                          if($scope.userit[a].gwt != undefined){
                             if( $scope.userit[0].pctcal!= undefined){
                                      $scope.newwas(0,$scope.userit[0].pctcal)
                                  }
                                  taxValCal($index)
                                
                          }
                          
                       }
             }

    }
   // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
   // $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);
        
    $scope.userit[$index].taxval1 = parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate);
    $scope.userit[$index].taxval = parseFloat($scope.userit[$index].taxval1).toFixed($scope.rupeesDecimalPoints);
                   if( $scope.userit[$index].pctcal!= undefined){
                          $scope.newwas($index,$scope.userit[$index].pctcal)
                      } 
                    if( $scope.userit[$index].labcal!= undefined){
                          $scope.newlab($index,$scope.userit[$index].labcal)
                      } 
                    if( $scope.userit[$index].stonecal!= undefined){
                          $scope.newstchg($index,$scope.userit[$index].stonecal)
                      }
     taxValCal($index)
 }
 //$scope.userit[$index].wastage = 0;
$scope.newwas=function($index,pctcal)
{
   // 
  //alert(" newwas pct "+pctcal)
  $scope.totmat=0;
  if(pctcal == undefined && tagdetails.composite != 'yes'){
    alert("Please select pct");
     
     $scope.userit[$index].wastage = 0;
  }else{
    /*alert($scope.userit[$index].chgunt)*/
     
   // var lab= window.sessionStorage.getItem("taxv");
   //taxValCal($index)
   $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
   $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   

    if($scope.userit[$index].wastage==null || $scope.userit[$index].wastage=="")
    {
        
        
  /*$scope.userit[$index].taxval1=lab;
         $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
         alert($scope.userit[$index].taxval)*/
         $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);

    }
     else if($scope.userit[$index].wastage==undefined)
     {
       // alert("null value")
        //alert($scope.userit[$index].chgunt)
         $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);
    }

   else if(pctcal=="AddPercent")
    {
        //alert(pctcal);
        var wastage=(($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100).toFixed(fixdec);
        //alert("AddPercent "+wastage);
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        //alert($scope.userit[$index].chgunt);
         
          $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
          // taxValCall($scope.userit[$index].chgunt,$index)
           //reuseMethods($index)
           reuseMethodsForLabStone($index)
          taxValCal($index)

    }
    else if(pctcal=="Add Units")
    {
        var wastage=$scope.userit[$index].wastage;
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        // taxValCall($scope.userit[$index].chgunt,$index)
          $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
          reuseMethodsForLabStone($index)
          taxValCal($index)
    }
    else if(pctcal=="SubPercent")
    {
       var wastage=($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100;
        //alert($scope.userit[$index].wastage);
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        //taxValCall($scope.userit[$index].chgunt,$index)
          $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
          taxValCal($index)
    }
    else if(pctcal=="Sub Units")
    {
       var wastage=$scope.userit[$index].wastage;
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
       // taxValCall($scope.userit[$index].chgunt,$index)
        $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
        taxValCal($index)
    }
    
    
  }
}

//mrp calculations
$scope.mrpCal = function(index,mrp){
      $scope.disableMrp =true;
      $scope.indexValueDisable = index;
     
      if (mrp == undefined || mrp == ''|| mrp == null) {
         //alert(mrp);
         //taxValCal(index)
          $scope.indexValueDisable = 100;
           $scope.newgwt(index);
           $scope.newstwt(index);
          if( $scope.userit[0].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
            $scope.newwas(0,$scope.userit[0].pctcal)
                  
             }
          if( $scope.userit[0].labcal!= undefined){
               $scope.newlab(0,$scope.userit[0].labcal)
          } 
          if( $scope.userit[0].stonecal!= undefined){
             $scope.newstchg(0,$scope.userit[0].stonecal)
          }
      }
     //  console.log($scope.userit[index].gpcs*mrp)
     // console.log( $scope.userit[index].gpcs);
     // console.log( $scope.userit[index].mrp);
      // if ($scope.userit[index].gpcs == undefined) {
      //   // alert("$scope.userit[index].gpcs "+$scope.userit[index].gpcs);
      //    alert("Please Enter GrossPcs ");
      //    $scope.userit[index].mrp = "";
      //  }else{
      $scope.userit[index].taxval=($scope.userit[index].mrp).toFixed($scope.rupeesDecimalPoints);
         
           // }
}
$scope.calMrpValue = function(index,mrp){ 

     if ($scope.disableMrp == true) {
          $scope.userit[index].taxval=($scope.userit[index].mrp).toFixed($scope.rupeesDecimalPoints);
     }  
}//$scope.calMrpValue
//composite final addition
var  taxval2 = 0;
var stwt2 = 0;
var chgunt2 = 0;

var taxValCal = function(index){
 //alert("got call for ")
      console.log("var taxValCal var taxValCal")
     // var totaltaxVal = 0;
      if(index == 0 && tagdetails.composite == 'yes' ){
        //alert(" 0 "+$scope.userit[index].taxval)
       taxval2 = parseFloat ($scope.userit[index].taxval) ;
      // console.log($scope.userit[0].taxval)
      //  console.log($scope.userit[1].taxval)

       stwt2 = parseFloat ($scope.userit[index].stwt) ;
       chgunt2 = parseFloat ($scope.userit[index].chgunt) ;
        //alert(stwt1+" stwt1")
    }else if(tagdetails.composite == 'yes' ){
          //$scope.userit[0].stval = 1000;
           //alert(" taxValCal $scope.userit[0].stval "+$scope.userit[0].stval)
                   
               //4 because length is already 4 by default
               totalChgWeight =  stwt1 ;
               totaltaxVal = stval0;
               console.log("before "+totaltaxVal)
               for(let a = 1;a< 4;a++){
                 // alert(" $scope.userit[a].gwt "+$scope.userit[a].gwt )
                  if($scope.userit[a].gwt != undefined){
                    // console.log($scope.userit[a].chgunt);
                       //  alert(" $scope.userit.length "+ $scope.userit.length+"$scope.userit[a].gwt "+$scope.userit[a].gwt+" a "+a)
                         // $scope.userit[a].ntwt=(parseFloat($scope.userit[a].gwt)-parseFloat($scope.userit[a].stwt)).toFixed(fixdec);
                         totalChgWeight = totalChgWeight+ parseFloat ($scope.userit[a].chgunt) ;
                           //console.log(totalChgWeight );
                           $scope.userit[0].stwt = (totalChgWeight).toFixed(fixdec);
                           $scope.userit[0].stwt = parseFloat($scope.userit[0].stwt);
                            //console.log( $scope.userit[0].stwt);
                           
                             $scope.userit[0].ntwt=(parseFloat($scope.userit[0].gwt)-parseFloat($scope.userit[0].stwt)).toFixed(fixdec);

                             $scope.userit[0].chgunt=($scope.userit[0].ntwt);
                    

                            $scope.userit[0].taxval=($scope.userit[0].chgunt*$scope.userit[0].rate).toFixed($scope.rupeesDecimalPoints);
                            //

                            if( $scope.userit[0].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas(0,$scope.userit[0].pctcal)
                                    
                               }
                            if( $scope.userit[0].labcal!= undefined){
                                 $scope.newlab(0,$scope.userit[0].labcal)
                            } 
                            if( $scope.userit[0].stonecal!= undefined){
                               $scope.newstchg(0,$scope.userit[0].stonecal)
                            } 
                            console.log("totaltaxVal "+totaltaxVal);

                             console.log("$scope.userit[a].taxval "+$scope.userit[a].taxval);
                            if($scope.userit[a].taxval == "NaN"){
                              // alert("$scope.userit[a].taxval "+$scope.userit[a].taxval);
                              $scope.userit[a].taxval = 0;
                              console.log($scope.userit[a].taxval)
                             // totaltaxVal = parseFloat(totaltaxVal);
                              totaltaxVal = parseFloat($scope.userit[0].labval);
                  
                  
                            }else{
                               console.log($scope.userit[a].taxval)
                               totaltaxVal = parseFloat(totaltaxVal)+ parseFloat($scope.userit[a].taxval) ;
                               //alert("else totaltaxVal "+totaltaxVal)
                            }
                         // alert("totaltaxVal "+totaltaxVal)
                         // alert("stval2 "+stval2)
                         $scope.userit[0].stval = (totaltaxVal);
                         $scope.userit[0].stval = ($scope.userit[0].stval).toFixed($scope.rupeesDecimalPoints);
                          console.log(" $scope.userit[0].stval "+ $scope.userit[0].stval);
                        $scope.userit[0].taxval =  (parseFloat($scope.userit[a].taxval) +parseFloat(taxval2)).toFixed(fixdec);
                           // $scope.userit[0].taxval =  parseFloat(taxval2).toFixed(fixdec);
                         
                             console.log("taxval2 first"+taxval2); 
                           // alert("$scope.userit[0].taxval "+$scope.userit[0].taxval+" taxval2 "+taxval2); 
                           
                            // console.log( $scope.userit[a].chgunt); 
                            


                   }
                  
               }
             }
}

var reuseMethods = function($index){
                  if( $scope.userit[$index].pctcal!= undefined){
                          $scope.newwas($index,$scope.userit[$index].pctcal)
                      } 
                    if( $scope.userit[$index].labcal!= undefined){
                          $scope.newlab($index,$scope.userit[$index].labcal)
                      } 
                    if( $scope.userit[$index].stonecal!= undefined){
                          $scope.newstchg($index,$scope.userit[$index].stonecal)
                      }
}
var reuseMethodsForLabStone = function($index){
                  
                    if( $scope.userit[$index].labcal!= undefined){
                          $scope.newlab($index,$scope.userit[$index].labcal)
                      } 
                    if( $scope.userit[$index].stonecal!= undefined){
                          $scope.newstchg($index,$scope.userit[$index].stonecal)
                      }
}
$scope.uomConversion=function($index,uom){
  
  if(uom == "Carats"){
   //alert(uom)
    if($scope.userit[$index].stwt == undefined){
      //$scope.userit[$index].ntwt = 
      $scope.userit[$index].ntwt =  ($scope.userit[$index].gwt*0.2 ).toFixed(fixdec);
      $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
      $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
      reuseMethods($index)             
    }else{

       $scope.userit[$index].ntwt =  (($scope.userit[$index].gwt - $scope.userit[$index].stwt) *0.2).toFixed(fixdec);
         $scope.userit[$index].chgunt =  $scope.userit[$index].ntwt;
       $scope.userit[$index].chgunt = parseFloat(  $scope.userit[$index].chgunt).toFixed(fixdec) ;
       $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
         reuseMethods($index)   
    }
     
  }else{
    if($scope.userit[$index].stwt == undefined){
      //$scope.userit[$index].ntwt = 
      $scope.userit[$index].ntwt =  $scope.userit[$index].gwt ;
      $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
      $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
       reuseMethods($index)   
    }else{

       $scope.userit[$index].ntwt =  ($scope.userit[$index].gwt - $scope.userit[$index].stwt)  ;
       $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
       $scope.userit[$index].taxval=(parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate)).toFixed($scope.rupeesDecimalPoints);
        reuseMethods($index)   
    }

  }
}
 $scope.newTaxVal=function(index){
  //alert($scope.userit[index].taxval)
   console.log($scope.userit[index].taxval)  
  if($scope.userit[index].taxval!= ""){
    if( $scope.userit[0].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas(0,$scope.userit[0].pctcal)
                                    
                               }
                            if( $scope.userit[0].labcal!= undefined){
                                 $scope.newlab(0,$scope.userit[0].labcal)
                            } 
                            if( $scope.userit[0].stonecal!= undefined){
                               $scope.newstchg(0,$scope.userit[0].stonecal)
                            } 
    taxValCal(index)
  }


 }
 $scope.newlab=function($index,labval2)
 {
    //alert($scope.userit[$index].labamt);
      $scope.userit[$index].labamt =( $scope.userit[$index].labamt).toFixed(fixdec);
     $scope.userit[$index].labamt = parseFloat ($scope.userit[$index].labamt) ;
   
     if($scope.userit[$index].stval == undefined){
            $scope.userit[$index].stval = 0;
        }
        // if($scope.userit[$index].labamt == null){
        //     $scope.userit[$index].labval = 0;
            

        // }

    //var lab= window.sessionStorage.getItem("taxv");
    //alert(lab);
    if($scope.userit[$index].labamt=="")
    {
  //alert("labamt null")
  //alert(lab)
   //$scope.userit[$index].labamt = 0;
   $scope.userit[$index].labval = 0;
   // $scope.userit[$index].taxval1=lab;
   // $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
   //       //alert($scope.userit[$index].taxval)

    }
     else if($scope.userit[$index].labamt==undefined)
     {
        //$scope.userit[$index].labamt = 0;
        $scope.userit[$index].labval = 0;
        /*alert("null value")
        alert($scope.userit[$index].chgunt)*/
         // $scope.userit[$index].taxval1=lab;
         // $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
         //alert($scope.userit[$index].taxval)
    }

   if(labval2=="Percent")
    {
        //alert(labval)
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
        if($scope.userit[$index].labamt != null){
        var labval1=(addlab*$scope.userit[$index].labamt)/100;
        $scope.userit[$index].labval= labval1.toFixed($scope.rupeesDecimalPoints);
            }
        $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
        $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
      //   $scope.userit[$index].labval=$scope.userit[$index].labamt;   
         
      // //  addlab =  addlab +parseFloat($scope.userit[$index].stval)
      //   $scope.userit[$index].taxval1=parseFloat($scope.userit[$index].taxval)+parseFloat(addlab);
      //   $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
      //   //alert($scope.userit[$index].taxval);
      //   $scope.userit[$index].labval1=addlab;
      //   $scope.userit[$index].labval=$scope.userit[$index].labval1.toFixed(fixdec);
      taxValCal($index)
    }
    else if(labval2=="PerUnit")
    {
        //alert(labval);
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].labamt != null){
        var addlab1=$scope.userit[$index].chgunt*$scope.userit[$index].labamt;        
            $scope.userit[$index].labval=(parseFloat(addlab1)).toFixed($scope.rupeesDecimalPoints)
         }
        $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
        $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);

        taxValCal($index)
        // $scope.userit[$index].taxval1=parseFloat($scope.userit[$index].taxval)+$scope.userit[$index].labval
        // $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
        // //alert($scope.userit[$index].taxval);
        // $scope.userit[$index].labval=addlab;
    }
    else if(labval2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        if($scope.userit[$index].labamt != null){
        $scope.userit[$index].labval=($scope.userit[$index].labamt).toFixed($scope.rupeesDecimalPoints);
        }
        $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
        $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
        taxValCal($index)

    }
    
   
    } 
 
$scope.rateChange=function($index){
  //alert(" iam rate change "+ $scope.userit[$index].rate)
                       if( $scope.userit[0].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas(0,$scope.userit[0].pctcal)
                                    
                               }
                            if( $scope.userit[0].labcal!= undefined){
                                 $scope.newlab(0,$scope.userit[0].labcal)
                            } 
                            if( $scope.userit[0].stonecal!= undefined){
                               $scope.newstchg(0,$scope.userit[0].stonecal)
                            } 
                            if( $scope.userit[$index].pctcal== undefined){
                             // alert($scope.userit[0].pctcal)
                             $scope.newstwt($index)      
                              }
    

}

 //composite stval 0
var stval0 = 0;
 $scope.newstchg=function($index,stonecal2)
 {
     
    $scope.userit[$index].stchg =( $scope.userit[$index].stchg).toFixed(fixdec);
    $scope.userit[$index].stchg = parseFloat ($scope.userit[$index].stchg) ;
   
    if($scope.userit[$index].labamt==null)
    {
       $scope.userit[$index].labval=0;
    }
    

    if($scope.userit[$index].stchg==null)
    {
     $scope.userit[$index].stval = 0;
  
    }
     else if($scope.userit[$index].stchg==undefined)
     {
         $scope.userit[$index].stval = 0;
        /*alert("null value")
        alert($scope.userit[$index].chgunt)*/
         // $scope.userit[$index].taxval1=lab;
         // $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(fixdec);
         // //alert($scope.userit[$index].taxval)
    }
     if(stonecal2=="Percent")
    {
         //
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
       // alert(addstone);
       
       if($scope.userit[$index].stchg != null){
        var stval1=(addstone*$scope.userit[$index].stchg)/100;
        $scope.userit[$index].stval= stval1.toFixed($scope.rupeesDecimalPoints);
        stval0 = stval1.toFixed(fixdec);
        console.log(" stval0 "+ stval0)
       // alert("$scope.userit[$index].stval "+$scope.userit[$index].stval);
       
            }
         
             $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
              //alert("else labour")
            console.log("in stval stval")
             taxValCal($index)
        
    }
    else if(stonecal2=="PerUnit")
    {
       
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].stchg != null){
        var addstone1=$scope.userit[$index].chgunt*$scope.userit[$index].stchg;        
            $scope.userit[$index].stval=(parseFloat(addstone1)).toFixed($scope.rupeesDecimalPoints);
                stval0 = (parseFloat(addstone1)).toFixed(fixdec);
               taxValCal($index)

         }
        $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
              //alert("else labour")
            console.log("in stval stval")
             taxValCal($index)
    }
    else if(stonecal2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        
        if($scope.userit[$index].stchg != null){
        $scope.userit[$index].stval=($scope.userit[$index].stchg).toFixed($scope.rupeesDecimalPoints);
              stval0 = ($scope.userit[$index].stchg).toFixed(fixdec);
             

           $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
           $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
             taxValCal($index)
         
        }
        
     }

      
  
 }

}]);

//for item controller
// myApp.controller('ItemCntrl',['$scope','$http','$window',
// function($scope,$http,$window){
//   //alert("well come to ItemCntrl")

//   $http.get('/getinventorygroupmaster').success(function(response){
//        console.log(response);
//        $scope.inventorygroupmaster1 = response
        
//     })

//   $http.get('/getitemtype').success(function(response){
//         console.log(response);
//           $scope.itemtype1 = response
//     })

//   $http.get('/getsalescategorymaster').success(function(response){
//         console.log(response);
//         $scope.salescategorymaster1 = response
//     })

//   $http.get('/gettaxrate').success(function(response){
//         console.log(response);
//          $scope.taxrate1 = response
//     })

// }]);

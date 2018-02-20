var myApp=angular.module('myApp',[]);
  myApp.controller('FirstCntrl',['$scope','$http','$window','$timeout','$filter','$q',"ControllerService",
function($scope,$http,$window,$filter,$timeout,$q,ControllerService){
    $scope.ordmat="";
    $scope.schmat="";
    $scope.totmat="";
    var fixdec= null;
    // $scope.Cash=0;
    // $scope.Card=0;
    // $scope.Credit=0;
    $scope.receiptprint=0;
    // $scope.paymode="Cash";
        //for default name
    $scope.transaction = 'Regular Sale';
     $scope.billtype="Credit";
     // $scope.pay1 = "#myModal1";
    /*$scope.bill=$scope.billtype;
    alert($scope.bill);*/

   /* $scope.adjqty= parseFloat($scope.ordmat)+parseFloat($scope.schmat)
    alert($scope.adjqty);*/
    $scope.userit=[];
    $scope.useritbill=[];
    $scope.useritsplit=[];
    $scope.radiowithinstate = "withinstate";
    $scope.rpamt=[];
        //edit in list page
    var voucherNoGet = null;
    //handling pay button
    $scope.payButtonDIsplay = "false";
    //party details
 var details  = window.sessionStorage.getItem("name");

// <<<<<<< HEAD
 // $scope.transdate=new Date();
 // var fromdate  = new Date(((new Date($scope.transdate).toISOString().slice(0, 23))+"-05:30")).toISOString();
 // console.log(fromdate);
// =======
//  $scope.date=new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6
//  //alert(details)
 //var detailsChange =
// <<<<<<< HEAD
   //default finalcal headings
    // $scope.finalCalTax = "Tax";
    // $scope.finalCalTaxable ="Taxable";
    // $scope.finalCalDiscount = "Discount";
    // $scope.finalCalLabourvalue = "Labourvalue";
    // $scope.finalCalLabourtax = "Labourtax";
    // $scope.finalCalSubtotal = "Subtotal";
    // $scope.finalCalCharges = "Charges";
    // $scope.finalCalAdjustments = "Adjustments";
    // $scope.finalCalInvoiceValue ="Invoice Value";
    // $scope.finalCalNettAmt = "Nett Amt";
// =======
   // //default finalcal headings
   //  $scope.finalCalTax = "Tax";
   //  $scope.finalCalTaxable ="Taxable";
   //  $scope.finalCalDiscount = "Discount";
   //  $scope.finalCalLabourvalue = "Labourvalue";
   //  $scope.finalCalLabourtax = "Labourtax";
   //  $scope.finalCalSubtotal = "Subtotal";
   //  $scope.finalCalCharges = "Charges";
   //  $scope.finalCalAdjustments = "Adjustments";
   //  $scope.finalCalInvoiceValue ="Invoice Value";
   //  $scope.finalCalNettAmt = "Nett Amt";
// >>>>>>> a25409012b1309fe419457fc4b541af21c008ad0
    //  $scope.finalCalTax = "TaxAmount2";
    // $scope.finalCalTaxable ="Taxable2";
    // $scope.finalCalDiscount = "Discount2";
    // $scope.finalCalLabourvalue = "Labourvalue2";
    // $scope.finalCalLabourtax = "Labourtax2";
    // $scope.finalCalSubtotal = "Subtotal2";
    // $scope.finalCalCharges = "Charges2";
    // $scope.finalCalAdjustments = "Adjustments2";
    // $scope.finalCalInvoiceValue ="Invoice Value2";
    // $scope.finalCalNettAmt = "Nett Amt2";
 
$http.get('/getTranDetails').success(function(response){
  // alert("cccccc")
        console.log(response);
        $scope.partynames=response;
   })

// 
    //$scope.payButton = "false" ;
    //alert($scope.payButton);
      //change save to update and pay to print
   $scope.edituseritButton = null;
    
   var indexvalue = 0; //this is for making index global value
    //for radio default
    $scope.radio = {
        state:'with in state'  
      };
//for tax interest values
      var interest1 = 0;
        var interest2 = 0;
         var interest3 = 0;
         var labourTaxInterest = 0;
         var lastdate = null;
         //for labour tax validation
          $scope.LabourTax = null;
          //for weight tolerance in gwt
           $scope.WeightTolerance = null;
          var saleInvoceEditId = null;
          var editedInvoice = null;
      // $scope.item =[]
      // $scope.item.withinstatecgst = 1000
//for radio button with in state and out of state column generation

//validation purpose
// if($scope.bitem.date == undefined ||$scope.bitem.ItemName == undefined ||$scope.bitem.stockin == undefined || $scope.bitem.stockout == undefined ||$scope.bitem.wt == undefined || $scope.bitem.pcs == undefined || $scope.bitem.titems == undefined){
   


//    }
          $scope.usernamedetails = window.sessionStorage.getItem("username")
          $scope.usersalesperson = true;
          $scope.desgination = window.sessionStorage.getItem("desgination")

  $scope.stockPtCall=function($index,barcodeNumber){

if (barcodeNumber!=undefined) {
  
    
        $http.get('/batchBarcode'+barcodeNumber).success(function(response){ 
$scope.userit[$index].stockPoint=response[0].stockPoint;


})
      

}

  //alert($index +stockPoint+barcodeNumber)

}   




/////// partynames/////////////////////
//for date validation
$scope.change=function(date){
  // alert("hai"+date);
  var selectedDate= new Date(((new Date(date).toISOString().slice(0, 23))+"-05:30")).toISOString();
       // alert(selectedDate+"selectedDate");
       $scope.selectedDate=selectedDate;
        if($scope.transaction=="Regular Sale"||$scope.transaction=="Sale Return"||$scope.transaction=="Urd Purchase"){
               $http.get('/getdate'+$scope.transaction).success(function(response){
                      console.log(response);
                      var lastdate=response[0].date;
                      lastdate=lastdate.slice(0,10);
                      lastdate=lastdate+"T00:00:00.000Z";
                      $scope.ldate=lastdate;
                       // var ldate=(lastdata|date:'dd/mm/yyyy');
                        // alert($scope.ldate+"$scope.ldate"+",,,,"+$scope.selectedDate+"$scope.selectedDate");
               
                   if($scope.selectedDate<$scope.ldate){
                    alert("please select date greater than previous transacation date "+" "+$scope.ldate);
                    $scope.date="";
                   }
               });
        }

}

   


$scope.radiobutton=function(){
        //alert(indexvalue)
        
        if($scope.radio.state == "with in state"){
           $scope.radiowithinstate = "withinstate";
              //get tax value in index page

              ControllerService.getTaxwithinState().then(
                 function(response){
                 // console.log(response);
                   var duplicat = [];
                   if(response != null && response.data != null && response.data.length > 0){
                    // alert(" call in controller from factory "+response.data.length);
                     for (var i = response.data.length - 1; i >= 0; i--) {
                      // Things[i]
                      // alert(" call in controller from factory "+response.data[i]);
                        //console.log(response.data[i]);
                        duplicat.push({
              'aliasname':response.data[i].aliasname,
              'taxname':response.data[i].taxname
            });
                       // console.log(duplicat)

                     }//for
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
     // console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      //console.log(uniqueStandards)
      //console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
                  
                    }
                   //rowData = getRowDataFromArray(response);
                    //ctrl.gridOptions.api.setRowData(rowData);
                }, 
                // function(response){
                    
                // }
            );
             
           // $http.get('/gettaxwithinstate').success(function(response){
           //                  interest1 = response[0].Rate
           //                  interest2 = response[1].Rate
              
           // });

        }else{

                 $scope.radiowithinstate = "outofstate";
                  ControllerService.getTaxOutState().then(function(response){
                        //console.log(response);
                            var duplicat = [];
                   if(response != null && response.data != null && response.data.length > 0){
                    // alert(" call in controller from factory "+response.data.length);
                     for (var i = response.data.length - 1; i >= 0; i--) {
                      // Things[i]
                      // alert(" call in controller from factory "+response.data[i]);
                        //console.log(response.data[i]);
                        duplicat.push({
              'aliasname':response.data[i].aliasname,
              'taxname':response.data[i].taxname
            });
                        //console.log(duplicat)

                     }//for
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
      //console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      //console.log(uniqueStandards)
      //console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
                  
                    }
                  })
                     //get tax value in index page
                 // $http.get('/gettaxoutofstate').success(function(response){
                 //          // $scope.outofstateigst = response[0].Rate
                 //          interest3 = response[0].Rate
                 // });
             }
     

}  
$scope.radiobutton();
//for default tax caluculation


//defaultTax(0);




//get sales person names
$http.get('/getSalesPerson').success(function(response){
        $scope.salesperson=response;
     
});
//to clear all the display data
$scope.clearDisplay = function(type){
//function clearDisplay() {
    //alert("got call ")
    //$scope.userit[index].mrp = null;
    if (type == "partyName") {
            $scope.getPartyDetailsNames(); 
            $scope.edituseritButton = null; 
            voucherNoGet = null;
            $scope.getDetails();

    }else if(type == "TransactionName"){
            partyNamesDisplay(); 
            $scope.edituseritButton = null; 
            voucherNoGet = null;
            $scope.getDetails();
    }
   // $scope.finalCal();

}//clearDisplay;

//partynames fetch
function partyNamesDisplay() {
  $scope.partyname = null;
  $scope.mobile = null;
  $scope.place = null;
  $http.get('/userPartyNames',{params:{"transaction":$scope.transaction}}).success(function(response){
        $scope.partyNames=response;
        
  });
}
partyNamesDisplay(); 

//latest date using db
$http.get('/getinventorygroupvaluenotationlast').success(function(response){
                     console.log(response);  
                     console.log(response[0].date);
                      lastdate = response[0].date         
                 });
//tax selection
$scope.taxSelectionCall = function ($index,taxSelection,call) {
 if (taxSelection != undefined) {
      // alert("$index "+$index+" taxSelection "+taxSelection+" call "+call);
  

   $http.get('/taxSelectionWithinstate',{params:{"taxSelection":taxSelection}}).success(function(response){
                      console.log(response);
    
                   
                      if (response[0].withinstate == "yes") {
                         // alert(" tax length "+response.length)
                          interest1 = response[0].Rate;
                          interest2 = response[1].Rate;
                          // alert(" with in "+ interest1);
                      }else if (response[0].withinstate == "no") {
                           interest3 = response[0].Rate;
                           //alert(" with in out of  "+ interest3);
                      }

                            
                        //    alert( interest1 +" "+ interest2);
                        indexvalue = $index;
                     //  if(call != "taxamtcal"){
                       taxamtcal(indexvalue);
                        
                        // $scope.getTotTaxVal();
                         // $scope.getTotTaxAmt();
                         // $scope.getTotTaxValDynamic();
                         // $scope.getFinalVal();
                         // $scope.getTotNetAmt();  
                         //saleInvoiceCalculations(true);
                  //   }//if call  
           });

  }//if taxa
}
//for tax amount calculation
var taxamtcal = function($index){
       //   $scope.taxSelectionCall($index,$scope.userit[$index].taxSelection,call = "taxamtcal") 
         console.log($scope.userit[$index])
       
       // alert(" entered taxamtca  $scope.userit[$index].gwt "+$scope.userit[$index].gwt +"$index "+$index);
        
   // const timeoutSendResponse = setTimeout(() => {
                     
                                  //res.json(report2)
     
                                 
        if($scope.userit[$index].labval== undefined || $scope.userit[$index].labval==""){
               $scope.userit[$index].labval = 0 
         }

         if($scope.userit[$index].stval == undefined ||$scope.userit[$index].stval == ""){
               $scope.userit[$index].stval = 0 
         }

         
    
                 
         //labour tax reason
          if($scope.LabourTax == "Yes"){
             if ($scope.userit[$index].mrpCheck == true) {
                   
                          var calcu = ($scope.userit[$index].mrp * $scope.userit[$index].gpcs).toFixed($scope.rupeesDecimalPoints);
                         
                    }else{
                           var calcu = (($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseInt ($scope.userit[$index].stval)).toFixed($scope.rupeesDecimalPoints)
                       }
         }else{  
                 
                    if ($scope.userit[$index].mrp != undefined) {
                   
                          var calcu = ($scope.userit[$index].mrp).toFixed($scope.rupeesDecimalPoints);
                         
                    }else{
                       
                         var calcu = (($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseInt ($scope.userit[$index].labval)+parseInt ($scope.userit[$index].stval)).toFixed($scope.rupeesDecimalPoints);
                         
                         if (calcu == NaN) {
                              calcu = 0;
                              alert(calcu)
                         };

                       }
               }
           // if($scope.transaction == "Regular Sale" ||$scope.transaction == "RD Purchase" ){
               if($scope.transaction != "Urd Purchase" ){
            
                if($scope.radiowithinstate == "withinstate"){
                   // alert(" withinstate call ")
                   //var cgst1 = parseFloat((calcu*interest1)/100).toFixed(fixdec)
                     
                    $scope.userit[$index].withinstatecgst = parseFloat((calcu*interest1)/100).toFixed($scope.rupeesDecimalPoints)
                 
                    $scope.userit[$index].withinstatesgst =parseFloat((calcu*interest2)/100).toFixed($scope.rupeesDecimalPoints)
                   
                    $scope.userit[$index].taxamt = parseFloat($scope.userit[$index].withinstatecgst) +parseFloat($scope.userit[$index].withinstatesgst)
                    $scope.userit[$index].taxamt = ($scope.userit[$index].taxamt).toFixed($scope.rupeesDecimalPoints)
                    // alert("$scope.userit[$index].taxamt "+$scope.userit[$index].taxamt)
                    $scope.userit[$index].final = (parseFloat($scope.userit[$index].taxamt) + parseFloat(calcu)).toFixed($scope.rupeesDecimalPoints)
                    saleInvoiceCalculations(true);
              
                }else{
         
                     $scope.userit[$index].outofstateigst =((calcu*interest3)/100).toFixed($scope.rupeesDecimalPoints);
                     $scope.userit[$index].taxamt =  parseFloat($scope.userit[$index].outofstateigst);
                     $scope.userit[$index].taxamt = ($scope.userit[$index].taxamt).toFixed($scope.rupeesDecimalPoints);
                      $scope.userit[$index].final = (parseFloat($scope.userit[$index].taxamt) + parseFloat(calcu)).toFixed($scope.rupeesDecimalPoints)
                      saleInvoiceCalculations(true);
                    }
           }else if($scope.transaction == "Urd Purchase"){
                    $scope.userit[$index].taxamt = 0;
                    $scope.userit[$index].final = calcu;
                    saleInvoiceCalculations(true);
                    //alert( $scope.userit[$index].final);
                   }
        // }, 10);//const
}

// use to call final cal all at once to reduce the code
function saleInvoiceCalculations(changeCall) {
// alert("jai ganesh jai ganesh");
if($scope.transaction!="Sale Return" && $scope.transaction!="Purchase Return"
  && $scope.transaction!="Approval Sale"&& $scope.transaction!="Issue Voucher"
  &&$scope.transaction!="Receipt Voucher"&&$scope.transaction!="Approval Out"){
                  if (changeCall != true) {
                         $scope.getTotTaxVal();
                         $scope.getTotTaxAmt();
                       //  $scope.getTotTaxValDynamic();
                         $scope.getFinalVal();
                         $scope.getTotNetAmt(); 
                  }else{
                        // alert(" true call check it")
                         //$scope.getTotTaxVal();
                         $scope.getTotTaxAmt();
                         $scope.getTotTaxValDynamic();
                         $scope.getFinalVal();
                         $scope.getTotNetAmt(); 
                  }   
                } 
}//saleInvoiceCalculations

// $scope.bar=function()
// {
//    // alert("hi")
// }
// $scope.billtype='Credit';
$scope.billType=function(){

    $scope.billt=$scope.billtype;
    //alert($scope.bill);
    console.log( $scope.billt)
     // window.sessionStorage.setItem("Billtype",$scope.billt);
}
//for validation
$scope.reqColor = function() {
    
      if($scope.transaction !='Opening Stock'){
          if ($scope.transaction && $scope.partyname != undefined){
            return false; 
           // $scope.all = true;
          } else{
            return true;
          }
       }
  }
// validation of print
// $scope.printButton = function() {

// }
//for validation
$scope.reqColorPay = function() {
   // alert("reqColorPay")
    if ($scope.transaction && $scope.partyname != undefined){
      console.log("reqColorPay")
      if($scope.transaction == "Urd Purchase"){
        return true; 
       
      }else if($scope.payButtonDIsplay == "false"){
         return true; 
        $scope.payButtonDIsplay = "true";
      }else{
       return false; 
      }
      
     // $scope.all = true;
    } else{
      // if($scope.transaction == "Urd Purchase"){
      //   return false;
      // }else{
      console.log("true else")
        return true;
     // }
      
    }
    
  }

// for disabling final calculation until checkbox activation
// $scope.checkFinal=function(){
//   if($scope.transaction=="Sale Return"||$scope.transaction=="Purchase Return"
//     ||$scope.transaction=="Approval Sale"){
//     if($scope.indexSelected.length==0){
//       return false;
//     }
//     else{
//       return true;
//     }
//   }
//   else{
//     return true;
//   }
// }
$scope.itemSelect = function(itemname,in1,id) {
      // var idEdit = id;
     // if (in1 != undefined  &&  $scope.edituseritButton != null ) {

     //      $scope.userit[in1] = "";
     //     alert("$scope.edituser "+id)
      
     //     console.log($scope.userit[in1])
     //     $scope.userit[in1].itemName =itemname ;
     //     $scope.userit[in1]._id = id;
     //       alert("$scope.afterEdit "+$scope.userit[in1]._id)
      

     // }else
     if(in1 != undefined ){
        // alert("in1 != undefined "+$scope.userit[in1]._id)
      
      
           // $scope.edituseritButton = null
          $scope.userit[in1] = "";
  
         console.log($scope.userit[in1])
         $scope.userit[in1].itemName =itemname 
         // alert("inside loop look")
      }
      $scope.userit[in1]  =JSON.parse(window.sessionStorage.getItem("Str41"));
      console.log($scope.userit[in1])
      $scope.userit[in1].itemName =itemname ;
      if (in1 != undefined  &&  $scope.edituseritButton != null ) {
              $scope.userit[in1]._id = id;
          // alert("$scope.afterEdit "+$scope.userit[in1]._id)
       
      }
       $scope.userit[in1].salesPerson =$scope.usernamedetails ;    

      for(let a=0;a<$scope.items.length;a++){
       
          if (itemname == $scope.items[a].Name){
                 // alert("$scope.items[i].Name "+$scope.items[i].Name)
                    console.log($scope.items[a].InvGroupName)
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                            console.log(response);
                      $scope.userit[in1].InvGroupName = $scope.items[a].InvGroupName ;
                     $scope.userit[in1].SaleCategory = $scope.items[a].SaleCategory ;
               
                            //  "InvGroupName" : "Diamond",
                              //if()
                             // alert("response[0]."+response[0].InvGroupName)
                              if(response[0].InvGroupName =="Diamond" ){
                                $scope.userit[in1].uom = "Carats";
                              }else{
                                 $scope.userit[in1].uom = "Gms";
                              }
                           
                            if($scope.transaction =="Urd Purchase" ||$scope.transaction == "RD Purchase"){
                            //if($scope.transaction =="Urd Purchase"){
                              //alert("urd")
                               $scope.userit[in1].accNumbers = response[0].PurchaseAcc; 
                                 console.log(response[0].PurchaseAcc);
                                  $scope.Acc = response[0].PurchaseAcc;
                                  $scope.userit[in1].AccNo = $scope.Acc[0].AccNo ;
                         
                             }else if($scope.transaction =="Regular Sale" ||$scope.transaction == "Valuation" ){
                                //alert("regegeg")
                                $scope.userit[in1].accNumbers = response[0].SalesAcc;
                                console.log( $scope.userit[in1].accNumbers);
                                
                               $scope.Acc = response[0].SalesAcc;

                                 $scope.userit[in1].AccNo = $scope.Acc[0].AccNo ;
                             }
                           
                           

                            console.log(lastdate)
                           // alert(lastdate)
                            var itempuritydata = response[0].InvGroupID +","+lastdate;
                           $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                              console.log(response)
                             $scope.irate=response; 
                             // $scope.userit[in1].irate = response
                              $scope.userit[in1].irate = response
                            }) 
                           // alert("change call");
                            //tax making null
                            if($scope.radiowithinstate == "withinstate"){
                                   interest1 = 0;
                                   interest2 = 0;  
                            }else if( $scope.radiowithinstate = "outofstate"){
                                    interest3 = 0; 
                            }
                            saleInvoiceCalculations();
                    })
              break;
          }    
       
       }

  
}


// for history selection
$scope.row1 = function(tag){
   // console.log("this is row id"+id);
  console.log("u clicked on row 1");
  console.log(tag.barcodeNumber)
  $scope.idSelectedVote = tag;
  console.log($scope.idSelectedVote)
  $http.get('/history',{params:{"barcode":tag.barcodeNumber}}).success(function(response)
        { 
            console.log(response)
            $scope.userit = response;

        })
  const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $scope.finalCal();
                         }, 100);
   

  }

   //$scope.amt.adj = null//18/4
   var  saleinvsubtol =null;
   var cal = 0;
   $scope.adjqty = null; 
   // var irateresult = null;
    // var index4 = 0;
    // var promises = [];
   var arrcon = []; 

   //urd ids
   // var urdids = function(urdids){
   //   if($scope.transaction == "Urd Purchase"){
   //          //alert("Urd and ");
   //          //this for sending ids to print in invoice
   //          if(arrurdid.indexOf(urdids) == -1) {
   //           // alert("entered to remove duplicates ")
   //             arrurdid.push(urdids);
   //           //  window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
     
   //             console.log(arrurdid)
   //            // alert(arrcon)
   //            }
   //          }

   //             window.sessionStorage.setItem("userids",JSON.stringify(arrurdid));
     
   // }

$scope.updateEditTransaction = function(){
 // alert("updateEditTransaction call")
  for(let i=0;i<=$scope.userit.length-1;i++) {  
              
                   if($scope.userit[i].itemName == null || $scope.userit[i].itemName == undefined || $scope.userit[i].itemName =="" )
                   {
                      alert("Please Select Item");
                     
                       return;
                   }

                   // if( $scope.disableMrp[i] ==true ){
                   //   if($scope.userit[i].mrp == null || $scope.userit[i].mrp == undefined || $scope.userit[i].mrp =="")
                   //     {
                   //         alert("Please enter the value of mrp")
                   //         return;
                   //      }
                   // }

                 // if( $scope.disableMrp[i] !=true ){

                      if($scope.userit[i].purity == null || $scope.userit[i].purity == undefined || $scope.userit[i].purity =="")
                       {
                        alert("Please Select Purity");
                        
                        return;
                       }
                       var gwt5=parseFloat($scope.userit[i].gwt)
                     if($scope.userit[i].gwt == null || $scope.userit[i].gwt == undefined || $scope.userit[i].gwt =="" || gwt5 == NaN)
                       {
                         alert("Please Select Proper Gross Weight");
                         
                         return;
                      }
                // }


                if($scope.userit[i].gpcs == null || $scope.userit[i].gpcs == undefined || $scope.userit[i].gpcs =="" )
                  {
                      alert("Please Select Proper Gpcs");
                      return;
                      
                   }
                 if($scope.userit[i].uom == undefined  )
                  {
                     $scope.userit[i].uom = "Gms"; 
                     return;
                   }
                if($scope.userit[i].salesPerson == null || $scope.userit[i].salesPerson == undefined || $scope.userit[i].salesPerson =="" )
                  {
                      alert("Please Select Sales person");
                      return;
                      
                   }
                if($scope.userit[i].AccNo == null || $scope.userit[i].AccNo == undefined || $scope.userit[i].AccNo =="" )
                  {
                      alert("Please Select Acc No");
                      return;
                      
                   }
                   if(i == $scope.userit.length-1 ){
                     validationClearCall();

                   // $scope.getDetails();
                 }  
                  

              }
  function validationClearCall() {
               
                          
 console.log($scope.userit);
  //$scope.payButtonDIsplay = "true" ;
 console.log($scope.userit.length);
 var lengthuserit = $scope.userit.length ;
 for(let i =0;i<lengthuserit ; i++){
  console.log($scope.userit[i]);
  //alert($scope.userit[i]._id);
    var data = $scope.transaction+","+$scope.userit[i].barcodeNumber+","+$scope.userit[i].chgunt+","+$scope.userit[i].date+","+$scope.userit[i].desc+","
                     +$scope.userit[i].final+","+$scope.userit[i].gpcs+","+$scope.userit[i].gwt+","+$scope.userit[i].itemName+","+$scope.userit[i].ntwt+","+$scope.partyname+","
                     +$scope.userit[i].size+","+$scope.userit[i].taxval+","+$scope.userit[i].taxamt+","+$scope.userit[i].stwt+","+$scope.userit[i].wastage+","+$scope.userit[i].stval+","
                     +$scope.userit[i].labval+","+$scope.userit[i].rate +","+ $scope.userit[i]._id +","+$scope.userit[i].StockFrom+","+$scope.userit[i].StockTo+","
                     +$scope.userit[i].withinstatecgst+","+$scope.userit[i].withinstatesgst +","+ $scope.userit[i].outofstateigst;
              
   var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward+","+$scope.userit[i].Hsc+
                               ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+
                               ","+$scope.userit[i].stonecal+","+$scope.userit[i].salesPerson +","+$scope.userit[i].AccNo +","+$scope.userit[i].labourTaxValue+
                               ","+$scope.userit[i].labamt+","+$scope.userit[i].urdAdjustment+","+$scope.userit[i].stchg +","+$scope.userit[i].comboItem +","+$scope.userit[i].mrp +
                                ","+ $scope.userit[i].billType+","+$scope.userit[i].taxSelection+","+$scope.userit[i].refId+","+$scope.userit[i].InvGroupName +
                                ","+ $scope.userit[i].SaleCategory+","+$scope.userit[i]._id+","+$scope.userit[i].barcode+","+$scope.userit[i].orderStatus; 
                                
  $http.put('/editSavedData/'+data1).success(function(response)
       {
                                             
           console.log(response[0]);
           // $scope.getDetails();
            console.log(arrcon)
           
       })
}
               $scope.saleinv[0].partyname=$scope.partyname;
               var saleInvoiceStatus = "completed";
                // var update=saleInvoceEditId+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                // +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+saleInvoiceStatus;
                // console.log(update)

                 var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                            +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
                            +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals+","+$scope.transaction+","+$scope.discount+","+$scope.ccamt+","+$scope.ccamt1;
                      console.log(update);   

                $http.put('/saleinvoicedata12/'+update).success(function(response)
                     {
                     // alert("jjjjjjjjjjjj")
                          //$scope.result = response;
                        //  console.log(response);
                         // alert("enterd into not null saleinv")
                     window.sessionStorage.setItem("saleinvoicedata_id",saleInvoceEditId);
                      window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
                     window.sessionStorage.setItem("transact", $scope.transaction);
                    // window.sessionStorage.setItem("editedInvoice", editedInvoice);
                      window.location.reload();
                     });
               // $scope.edituseritButton = false;
                alert("updated successfully");
              }//validation clear call

}
var editrow3 = null;
$scope.row3 = function(rowno){
   console.log("this is row id"+rowno);
   // alert("this is row id"+rowno);
  console.log("u clicked on row"+rowno);
  $scope.idSelectedVote = rowno;
   console.log(rowno);
   editrow3 = rowno;
}
$scope.getPartyDetailsNames =function(){
          //for urd credit clearance
          $scope.urd = '';
          $scope.urdAdjustmentTotal = '';
      $http.get('/getpartydetails'+ $scope.partyname ).success(function(response){
            console.log(response);
          if (response.length!=0) {
            $scope.mobile = response[0].data.mobile;
            $scope.place = response[0].data.address1;
            $scope.partyname= response[0].subscriber;
             // $scope.billtype="";
          }else{
             $scope.mobile = "";
            $scope.place = "";
            // $scope.billtype = "";
            $scope.discount = "";
             $scope.discount1 = "";
             $scope.ccamt = "";
             $scope.ccamt1 = "";
             $scope.decimals = "";
             $scope.refId= "";
          }
          $scope.datex="";
          // if($scope.partyname==''||$scope,partyname==null||$scope.partyname=="undefined"||$scope.patyname==undefined){
          // $scope.billtype="";
          // $scope.billt="";
          // }
      })
      if($scope.transaction == "Regular Sale" ||$scope.transaction ==  "Urd Purchase" ){
         var update=$scope.partyname+","+"Urd Purchase";
         console.log(update)
         $http.get('/transdetails/'+update).success(function(response){ 
            console.log(response);
            //alert(response[0].voucherNo)
            $scope.urd = response;
           // alert($scope.urd.length);
            var urdAdjustmentLength = $scope.urd.length;
            $scope.urdAdjustmentTotal = 0;
           // console.log(response[0].date)
            for(let p =0;p<urdAdjustmentLength;p++){
                      $scope.urdAdjustmentTotal =( parseFloat($scope.urdAdjustmentTotal)+ parseFloat(response[p].urdAdjustment)).toFixed($scope.rupeesDecimalPoints);
                      
            }//for
         })//transdetails/

     }// if($scope.transaction == "Regular Sale"

}//getPartyDetailsNames

if(details != "null"){
    // alert("edit item details call "+details);
    $scope.partyname = details;
     $http.get('/getpartydetails'+ $scope.partyname ).success(function(response){
      
    //$http.get('/getPartyDetailsNumber',{params:{"partyname":$scope.partyNameDetails}}).success(function(response){
            console.log(response);
            //alert(response[0].data.mobile)
           // if (response.length !=0) {
            window.sessionStorage.setItem("name","null");
            var detailch  = window.sessionStorage.getItem("name");
            //
            // alert(detailch + "  detailch");
            $scope.mobile = response[0].data.mobile;
            $scope.place = response[0].data.address1;
            $scope.partyname= response[0].subscriber;
            details = null;
            $scope.getDetails();
         // }

    })
  
 }//details
//this for sending ids to print in invoice
$scope.invoiceDisplay=0;
 $scope.taxableval=0;
 $scope.tax=0;
 $scope.subtol=0;
 
     var voucherid=[];
     //for adding values of checked items into finalCalculation
// <<<<<<< HEAD
$scope.checklength=0;
  var h=0;
  // $scope.mycheck=function(vvalue,vname){
  //           // alert($scope.indexSelected.length+"indexselected length");
  //                                             console.log(vvalue);
  //                                              var j=vvalue;
  //                                             if($scope.indexSelected.indexOf(vvalue)==-1){
  //                                               $scope.indexselected.push(vvalue);
  //                                             }
  //                                             // alert(vvalue+"Checkbox index");
  //                                             console.log($scope.indexSelected.length);
  //                                             $scope.checklength=$scope.indexSelected.length;
  //                                            // alert($scope.checklength+"sal sal sal sal");
  //                                            window.sessionStorage.setItem('salecheck','sal');
  //                                            // $scope.voucherid=[];
  //                                            if($scope.transaction=="Sale Return"||$scope.transaction=="Purchase Return"
  //                                             ||$scope.transaction=="Approval Sale" && $scope.indexSelected.length !=0){
                                              
  //                                                   var taxable1=0;
  //                                                   var tax1=0;
  //                                                   var subtol1=0;
  //                                                   var invoice1=0;
  //                                                   var netamt1=0;
  //                                                   var fixdec=3;
  //                                                   var discount2=0;
  //                                                   if(vname==1){
  //                                                   for(var i=$scope.indexSelected.length-1;i>=0;i--){
  //                                                            // if(vname==1){ 
  //                                                             var object5={};
  //                                                             $scope.iid=$scope.userit[j]._id;
  //                                                             // alert($scope.iid+"selected id");
                                                             
  //                                                             object5["id"]=$scope.iid;
  //                                                             // alert(object5);
  //                                                              // if(voucherid.indexOf(object5)==-1){
  //                                                               // alert("if");
  //                                                                voucherid.push(object5);
  // //                                                                
  //                                                             var newArr = [];
  //                                                             angular.forEach(voucherid, function(value, key) {
  //                                                               var exists = false;
  //                                                               angular.forEach(newArr, function(val2, key) {
  //                                                                 if(angular.equals(value.id, val2.id)){ exists = true }; 
  //                                                               });
  //                                                               if(exists == false && value.id != "") { newArr.push(value); }
  //                                                             });
  //                                                             // return newArr;
  //                                                               // }
  //                                                               voucherid=newArr;
  //                                                               $scope.voucherid=voucherid;
  //                                                             console.log($scope.voucherid);
  //                                                            console.log($scope.voucherid.length);
                                                            
  //                                                             taxable1 =parseFloat($scope.userit[j].taxval);
                                                             
  //                                                             tax1 =parseFloat($scope.userit[j].taxamt);
                                                              
  //                                                             subtol1 =parseFloat($scope.userit[j].final);
                                                              
  //                                                             invoice1 =parseFloat($scope.userit[j].final);
                                                             
  //                                                             netamt1 = parseFloat($scope.userit[j].final);
                                                              
  //                                                             discount2=parseInt($scope.userit[j].discount);
  //                                                             $scope.taxableval += taxable1;
  //                                                             $scope.saleinv[0].taxableval = $scope.taxableval;
                                                              
  //                                                             $scope.tax += tax1;
  //                                                             $scope.saleinv[0].tax = $scope.tax;
                                                              
  //                                                             $scope.subtol += subtol1;
  //                                                             $scope.saleinv[0].subtol = $scope.subtol;
                                                               
  //                                                                $scope.invoiceDisplay =$scope.invoiceDisplay+invoice1;
                                                                 
  //                                                                $scope.saleinv[0].invoiceValue = $scope.invoiceDisplay;
                                                                
  //                                                                $scope.finalNetAmount( $scope.saleinv[0].invoiceValue) ;
                                                        
  //                                                              }//end of if(vname)
  //                                                            }//for
  //                                                              // var h=0;
  //                                                            if(vname==0){ 
  //                                                             // alert($scope.indexSelected.length+"len");
  //                                                            for(var k=0; k<=$scope.indexSelected.length-1;k++){
  //                                                              // if(vname==0){
                                                                
  //                                                                   // alert("inside if when vname is 0..."+vname);
  //                                                             taxable1 =parseFloat($scope.userit[j].taxval);
                                                             
  //                                                             tax1 =parseFloat($scope.userit[j].taxamt);
                                                              
  //                                                             subtol1 =parseFloat($scope.userit[j].final);
                                                              
  //                                                             invoice1 =parseFloat($scope.userit[j].subtol1);
                                                             
  //                                                             netamt1 = parseFloat($scope.userit[j].subtol1);
                                                              
  //                                                             // discount2=parseInt($scope.userit[j].discount);
  //                                                             $scope.taxableval -= taxable1;
  //                                                             $scope.saleinv[0].taxableval = $scope.taxableval;
                                                              
  //                                                             $scope.tax -= tax1;
  //                                                             $scope.saleinv[0].tax = $scope.tax;
                                                              
  //                                                             $scope.subtol -= subtol1;
  //                                                             $scope.saleinv[0].subtol = $scope.subtol;
                                                               
  //                                                                // $scope.invoiceDisplay =$scope.invoiceDisplay+invoice1;
                                                                 
  //                                                                $scope.saleinv[0].invoiceValue = $scope.subtol;
                                                                
  //                                                                $scope.finalNetAmount( $scope.saleinv[0].invoiceValue) ;
  //                                                                 // alert("id to be delete"+voucherid[i].id);
  //                                                                 // console.log(arrcon[i].id+"index"); 
  //                                                                   alert($scope.userit[j]._id+   "  userit");
  //                                                                   // alert($scope.voucherid[i].id+"voucherid");
  //                                                                   alert($scope.voucherid[h].length+"before");
                                                                   
  //                                                                      console.log(arrcon.length); 
  //                                                                      var reqid=arrcon.indexOf($scope.userit[j]._id);
  //                                                                      var reqidd=$scope.voucherid.indexOf($scope.userit[h]._id);  
  //                                                                        alert(reqid+"index id id");
  //                                                                        // alert(reqidd+"voucherid index");
  //                                                                        if (reqid > -1) {
  //                                                                           arrcon.splice(reqid, 1);
  //                                                                            $scope.voucherid.splice(reqid,1);
  //                                                                            alert($scope.voucherid.length);                                  }                      
  //                                                                        // console.log(arrcon.length+"........"+$scope.voucherid.length);                         
  //                                                                          $scope.printId($scope.userit[h]._id);
  //                                                                            // $scope.voucherid=$scope.voucherid.length-1;                                     
  //                                                                      h++;    
  //                                                                      // alert(h+"hhhhhhhhhhh");
  //                                                                      // alert($scope.voucherid[h].id+"else");
  //                                                                      if($scope.voucherid.length==0){
  //                                                                       alert("length is 0");
  //                                                                        $scope.checklength=0;
  //                                                                        $scope.voucherid=[];
  //                                                                        alert($scope.checklength+"in else");                 
  //                                                                      }
  //                                                                      else{
  //                                                                       alert("else else else else else"+$scope.voucherid.length);
  //                                                                           $scope.checklength= $scope.voucherid.length;                                     
  //                                                                      }
  //                                                              }//if
                                                              
  //                                                           } //end of for
  //                                              $scope.indexSelected=[];
                                             
  //                                             } //if
  //                                             $scope.saleinv[0].taxableval=parseFloat($scope.saleinv[0].taxableval).toFixed($scope.rupeesDecimalPoints);
  //                                             $scope.saleinv[0].tax=parseFloat($scope.saleinv[0].tax).toFixed($scope.rupeesDecimalPoints);
  //                                             $scope.saleinv[0].subtol=parseFloat($scope.saleinv[0].subtol).toFixed($scope.rupeesDecimalPoints);
  //                                             $scope.saleinv[0].invoiceValue=parseFloat($scope.saleinv[0].invoiceValue).toFixed($scope.rupeesDecimalPoints);
  //                                             $scope.saleinv[0].netamt=parseFloat($scope.saleinv[0].netamt).toFixed($scope.rupeesDecimalPoints);
  //                                 }//mycheck

$scope.mycheck=function(vvalue,vname){
            // alert($scope.indexSelected.length+"indexselected length");
                                              console.log(vvalue);
                                               var j=vvalue;
                                              if($scope.indexSelected.indexOf(vvalue)==-1){
                                                $scope.indexselected.push(vvalue);
                                              }
                                              // alert(vvalue+"Checkbox index");
                                              console.log($scope.indexSelected.length);
                                               $scope.checklength=$scope.indexSelected.length;
                                              // alert($scope.checklength+"sal sal sal sal");
                                             window.sessionStorage.setItem('salecheck','sal');
                                             // $scope.voucherid=[];
                                             if($scope.transaction=="Sale Return"||$scope.transaction=="Purchase Return"
                                              ||$scope.transaction=="Approval Sale" && $scope.indexSelected.length !=0){
                                              
                                                    var taxable1=0;
                                                    var tax1=0;
                                                    var subtol1=0;
                                                    var invoice1=0;
                                                    var netamt1=0;
                                                    var fixdec=3;
                                                    var discount2=0;
                                                    $scope.invoiceDisplay =0;
                                                    $scope.saleinv[0].taxableval=0;
                                                    $scope.saleinv[0].tax=0;
                                                    $scope.saleinv[0].subtot=0;
                                                    
                                                    if(vname==1){
                                                    for(var i=$scope.indexSelected.length-1;i>=0;i--){
                                                             // if(vname==1){ 
                                                              var object5={};
                                                              $scope.iid=$scope.userit[j]._id;
                                                              // alert($scope.iid+"selected id");
                                                             
                                                              object5["id"]=$scope.iid;
                                                             
                                                                 voucherid.push(object5);
  //                                                                
                                                              var newArr = [];
                                                              angular.forEach(voucherid, function(value, key) {
                                                                var exists = false;
                                                                angular.forEach(newArr, function(val2, key) {
                                                                  if(angular.equals(value.id, val2.id)){ exists = true }; 
                                                                });
                                                                if(exists == false && value.id != "") { newArr.push(value); }
                                                              });
                                                              // return newArr;
                                                                // }
                                                                voucherid=newArr;
                                                                $scope.voucherid=voucherid;
                                                              console.log($scope.voucherid);
                                                             console.log($scope.voucherid.length);
                                                              
                                                              taxable1 =parseFloat($scope.userit[j].taxval);
                                                             
                                                              tax1 =parseFloat($scope.userit[j].taxamt);
                                                              
                                                              subtol1 =parseFloat($scope.userit[j].final);
                                                              
                                                              invoice1 =parseFloat($scope.userit[j].final);
                                                             
                                                              netamt1 = parseFloat($scope.userit[j].final);
                                                              
                                                              discount2=parseInt($scope.userit[j].discount);
                                                              $scope.taxableval += taxable1;
                                                              $scope.saleinv[0].taxableval = $scope.taxableval;
                                                              
                                                              $scope.tax += tax1;
                                                              $scope.saleinv[0].tax = $scope.tax;
                                                              
                                                              $scope.subtol += subtol1;
                                                              $scope.saleinv[0].subtol = $scope.subtol;
                                                               
                                                                 $scope.invoiceDisplay =$scope.invoiceDisplay+invoice1;
                                                                 
                                                                 $scope.saleinv[0].invoiceValue =$scope.saleinv[0].subtol;
                                                                
                                                                 $scope.finalNetAmount( $scope.saleinv[0].subtol) ;
                                                        
                                                               }//end of if(vname)
                                                             }//for
                                                                var h=0;
                                                             if(vname==0){ 
                                                             for(var k=0; k<=$scope.indexSelected.length-1;k++){
                                                              taxable1 =parseFloat($scope.userit[j].taxval);
                                                             
                                                              tax1 =parseFloat($scope.userit[j].taxamt);
                                                              
                                                              subtol1 =parseFloat($scope.userit[j].final);
                                                              
                                                              invoice1 =parseFloat($scope.userit[j].subtol1);
                                                             
                                                              netamt1 = parseFloat($scope.userit[j].subtol1);
                                                              
                                                              // discount2=parseInt($scope.userit[j].discount);
                                                              $scope.taxableval -= taxable1;
                                                              $scope.saleinv[0].taxableval = $scope.taxableval;
                                                              
                                                              $scope.tax -= tax1;
                                                              $scope.saleinv[0].tax = $scope.tax;
                                                              
                                                              $scope.subtol -= subtol1;
                                                              $scope.saleinv[0].subtol = $scope.subtol;
                                                               
                                                                 // $scope.invoiceDisplay =$scope.invoiceDisplay+invoice1;
                                                                 
                                                                 $scope.saleinv[0].invoiceValue = $scope.subtol;
                                                                
                                                                 $scope.finalNetAmount( $scope.saleinv[0].invoiceValue) ;
                                                                  
                                                                       var sid=$scope.userit[j]._id;
                                                                       // alert(sid+"sid sid sid sid");
                                                                       console.log(arrcon.length); 
                                                                       var reqid=arrcon.indexOf($scope.userit[j]._id);
                                                                      
                                                                         if (reqid > -1) {
                                                                            arrcon.splice(reqid, 1);
                                                                             // $scope.voucherid.splice(sid,1);
                                                                             // delete($scope.voucherid[sid]);
                                                                              // alert($scope.voucherid.splice(sid,1)+"asasasasas");
                                                                             console.log($scope.voucherid.length);                                  }                      
                                                                         // console.log(arrcon.length+"........"+$scope.voucherid.length);                         
                                                                            $scope.printId($scope.userit[j]._id);
                                                                              // $scope.voucherid=$scope.voucherid.length-1;                                     
                                                                       h++;   
                                                                       
                                                                       if($scope.voucherid.length==0){
                                                                        // alert("length is 00000000000000000000000000");
                                                                         $scope.checklength=0;
                                                                         $scope.voucherid=[];
                                                                         // alert($scope.checklength+"in else");                 
                                                                       }
                                                                       
                                                               }//if
                                                               
                                                            } //end of for
                                               $scope.indexSelected=[];
                                             
                                              } //if
                                              $scope.saleinv[0].taxableval=parseFloat($scope.saleinv[0].taxableval).toFixed($scope.rupeesDecimalPoints);
                                              $scope.saleinv[0].tax=parseFloat($scope.saleinv[0].tax).toFixed($scope.rupeesDecimalPoints);
                                              $scope.saleinv[0].subtol=parseFloat($scope.saleinv[0].subtol).toFixed($scope.rupeesDecimalPoints);
                                              $scope.saleinv[0].invoiceValue=parseFloat($scope.saleinv[0].invoiceValue).toFixed($scope.rupeesDecimalPoints);
                                              $scope.saleinv[0].netamt=parseFloat($scope.saleinv[0].netamt).toFixed($scope.rupeesDecimalPoints);
                                  }//mycheck
$scope.idUpadtesCall = function(_id){
  // body...

         if(arrcon.indexOf(_id) == -1) {
             // alert("entered to remove duplicates "+_id)
             arrcon.push(_id);
             window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
     
            console.log(arrcon)
              //alert(arrcon)
       }
       // else{
       //  // alert("else");
       //  for(var f=0;f<=arrcon.length-1;f++){
       //    // alert(f+"f ffff");
       //    alert(arrcon[f]+"    arrcon[f]._id"+" "+_id);

       //    if(arrcon[f] == _id){
       //      alert("id matched"+_id);
       //      // delete arrcon[f];
       //      arrcon=arrcon.filter((id)=>id ==_id);
       //      console.log(arrcon);

       //    }
       //  }
       // }
}//$scope.idUpadtesCall$scope.idUpadtesCa
// <<<<<<< HEAD

//for deleting
$scope.printId=function(ids){
  console.log(ids);
            // alert(ids+"ids ids ids ids ids ids ids")
            console.log($scope.voucherid)
            // var s=1;
          for(var f=0;f<=$scope.voucherid.length-1;f++){
            // alert(f+"f ffff"+$scope.voucherid[f].id);
           // alert($scope.voucherid[f].id+"  $scope.voucherid[f].id  "+" "+ids);
           if ( $scope.voucherid[f].id === ids) $scope.voucherid.splice(f, 1);
               console.log($scope.voucherid);
                }
          
}//end of printId

//for getting all partyname based details
function accountAndPurityCall(index,itemName) {
   $http.get('/itemnamedetails'+itemName).success(function(response){
                               
                            
                       $http.get('/itemdetails'+response[0].InvGroupName).success(function(response){
                             console.log(response);
                            console.log(response[0].PurchaseAcc);
                             if($scope.transaction =="Urd Purchase" ||$scope.transaction == "RD Purchase"){
                               $scope.userit[index].accNumbers = response[0].PurchaseAcc; 

                             }else if($scope.transaction =="Regular Sale" ||$scope.transaction == "Valuation" ){
                             
                                $scope.userit[index].accNumbers = response[0].SalesAcc;
                             }
                           
                           var itempuritydata = response[0].InvGroupID +","+lastdate;
                       $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                           
                         //   console.log(index4)
                               $scope.userit[index].irate = response
                               
                               console.log($scope.userit[index].irate)
                             
                              
                            })   
            
                        })
                   }) 
}//accountAndPurityCall

// <<<<<<< HEAD
// <<<<<<< HEAD
// =======

// $scope.getDetails=function(rvalue,voucherNo){
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6



// //new function for getting voucher based on partyname
// $scope.getVouchers=function(party){
//   alert(party+"partyname");
//   var pname=party;
//   $http.get('/getvoucherids'+pname).success(function(response){
//     console.log(response);
//     $scope.details=response;
//   })
// }


//get details starts here
$scope.getDetails=function(rvalue,voucherNo){
  // alert("getdetails");
  // if($scope.transaction=='Issue Voucher'){
  //   // $scope.getDetails()
  // }

  $scope.voucherNo=voucherNo;
      window.sessionStorage.setItem("vin",$scope.voucherNo);
      // alert($scope.voucherNo+"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
      // $scope.date=date;
      if($scope.transaction == "Sale Return" || $scope.transaction == "Purchase Return" && $scope.partyname!=null){
        $scope.spdata=$scope.partyname+","+$scope.transaction;
        console.log($scope.spdata);
        checklength=0;
                  $http.get('/iateapple'+$scope.spdata).success(function(response){

                    console.log(response[0]._id.voucherNo);

                    $scope.name=$scope.partyname;
                    
                    // $scope.date=response.date;
                    $scope.datex=response;
                    // $scope.voucherNo=$scope.datex._id.voucherNo;
                    console.log($scope.datex);
                  });
                   $scope.indexSelected=[];
      }
      if($scope.transaction == "Approval Sale"||$scope.transaction == 'Approval Return' && $scope.partyname != null){
        // $scope.app=$scope.partyname+","+$scope.transaction;
        $http.get('/appouts'+$scope.partyname).success(function(response){
          console.log(response);
          // $scope.voucherNo=response.voucherNo;
          // $scope.date=response.date;
          $scope.datex=response;
           $scope.voucherNo=$scope.datex._id.voucherNo;
        });
      }
     

      // if($scope.transaction != "Receipt Voucher"){
     var url = null ; 
    
      if(voucherNoGet != null){
       $scope.voucherNo=voucherNoGet;
         url = '/voucherNoGetDetails' ;
        // alert("'/voucherNoGetDetails'")
     }else{
          url =  '/getSavedDetails' ; 
     }
   // }
      // $http.get('/voucherNoGetDetails/'+voucherNoGet)
     // alert("$scope.partyname "+$scope.partyname+" $scope.transaction "+$scope.transaction)
    $http.get(url,{params:{"partyname":$scope.partyname,"Transaction":$scope.transaction,"voucherNo":$scope.voucherNo}}).success(function(response){
    // voucherNoGet = null;
     console.log(response);
     $scope.userit=response;
    // alert($scope.userit[0].uom)
     console.log(response.length);
     
     // if($scope.transaction=="Approval Return"){
     //  for(var v=0;v<response.length;v++){
     //    var newapp={};
     //    $scope.appret=response[v]._id;
     //    newapp["id"]=$scope.appret;
     //  arrcon.push(newapp);
     //  console.log(arrcon);
     //  }
     // }
    if($scope.transaction=="Approval Sale" && rvalue=="true"){
      // alert("TH row is 2");
      saleInvoiceCalculations();
    }
      
      for (var k in $scope.userit) {
          //console.log(jsObjects);
        if ($scope.userit[k].billType != undefined ) {
            // alert($scope.userit[k].billType);
            $scope.billtype = response[0].billType ;
        }
        if($scope.transaction =="RD Purchase" ){
                //alert($scope.userit[k].RefId);
             if ($scope.userit[k].RefId != undefined ) {
                // alert($scope.userit[k].billType);
                $scope.refId = response[0].RefId;
             }
        }
        
      }//for
      // if(response[0].billType != undefined){
           // $scope.billtype = response[0].billType ;
      // }
 // $scope.finalCal();
   
     var arrlength =response.length ;
        //  var datastore = response;
        //  index4 = 0 ;
       // alert("get details call");
         console.log(response);
// <<<<<<< HEAD
          // if($scope.transaction != 'Issue Voucher' && $scope.transaction != 'Receipt Voucher'&& 
          //   $scope.transaction != 'Approval Out' && $scope.transaction != 'Approval Return'){
              // alert("finalcal when Issue and Receipt");
           if($scope.transaction!='Issue Voucher'&&$scope.transaction!='Receipt Voucher'&&$scope.transaction!="Approval Out"){
           if($scope.transaction=='Regular Sale'||$scope.transaction=='RD Purchase'||$scope.transaction=='Approval Sale'
            ||$scope.transaction=='Sale Return'||$scope.transaction=='Purchase Return'||$scope.transaction=='Urd Purchase'||$scope.transaction=='Valuation'){
           
                   if($scope.transaction=='Approval Sale'){

                      if($scope.indexSelected.length!=null){
                      finalCalAfterRemove(rvalue,response.length);
                      }
                   }
                   else{

                     // alert("else else else else");
                      if(voucherNoGet == null){
// <<<<<<< HEAD
//                          // alert("else else else else");
// =======
//                         // alert("else else else else");
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6

                      finalCalAfterRemove(rvalue,response.length);
                       }
                    }
                  }
            }

         window.sessionStorage.setItem("Party",$scope.partyname);
       
// voucherNoGet = null;
  (async function loop() {
        for (let i = 0; i <= arrlength-1; i++) {
                await new Promise(resolve => setTimeout(resolve,
              
                     $http.get('/itemnamedetails'+$scope.userit[i].itemName).success(function(response){
                             $http.get('/itemdetails'+response[0].InvGroupName).success(function(response){
                                   console.log(response);
                                   console.log(response[0].PurchaseAcc);
                                   if($scope.transaction =="Urd Purchase" ||$scope.transaction == "RD Purchase"||$scope.transaction=="Purchase Return"){
                                     $scope.userit[i].accNumbers = response[0].PurchaseAcc; 

                                   }else if($scope.transaction =="Regular Sale" ||$scope.transaction == "Valuation"
                                    ||$scope.transaction=="Sale Return" ||$scope.transaction=="Approval Sale" ){
                                   
                                      $scope.userit[i].accNumbers = response[0].SalesAcc;
                                   }
                                 
                                   var itempuritydata = response[0].InvGroupID +","+lastdate;
                                   $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                                           $scope.userit[i].irate = response
                                           
                                           console.log($scope.userit[i].irate)
                                          
                                   })   
                          
                              })
                      })  
                 ));

        console.log(i);
        //only regular sale
         // if($scope.transaction == "Regular Sale" ||$scope.transaction == "Urd Purchase" ){
           
                 console.log(i);
                if($scope.transaction != null ){

                        if ($scope.userit[i].mrp != undefined) {
                                $scope.indexValueDisable = i;
                                //alert("mrp")
                                 $scope.userit[i].mrpCheck =true;
                                // $scope.disableMrp =true;
                                // alert("response[0].mrp "+$scope.user[$index].mrp)

                        } 
                
                        if(arrcon.indexOf($scope.userit[i]._id) == -1) {
                         // alert("entered to remove duplicates ")
                            arrcon.push($scope.userit[i]._id);
                             // alert(arrcon+"arrcon+++++++++++++++++++++++++++");

                            window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
                 
                           console.log(arrcon)
                            // alert(arrcon+"11111111111111111")
                        }
                }

                    // window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
           

       }//for loop
  })(); //awiyt

})


//trial ends
 }
  //finalCalAfterRemove(rvalue,response.length);
function finalCalAfterRemove(rvalue,length) {
// <<<<<<< HEAD
  // alert(rvalue+"i am in final");
// =======
//alert("i am in final");
// >>>>>>> 61946425920cfde23eb0ef81e1ccb2a84ae6baa2
  // alert($scope.edituseritButton);
  // alert(rvalue+"rvalue");
  // alert("remove through new method");
  //alert("finalCalAfterRemove "+$scope.edituseritButton)
    if(rvalue!=true||$scope.edituseritButton == null || $scope.edituseritButton == false ){
          // alert(rvalue+"  rvalue "+length+"  length1");
          // if (rvalue != true ) {
          // alert("edit final calllll");
             
              if (rvalue == undefined) {
                //   $scope.finalCal();
                   const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $scope.finalCal();

                         }, 100);
              }
              else if(length !=0 && rvalue == true){
                // alert("1st");
                  indexvalue=0;
                   //  $scope.getTotTaxVal();
                   // $scope.getTotTaxAmt();
                   // $scope.getFinalVal();
                   // $scope.getTotNetAmt();
                   saleInvoiceCalculations();
              }else{
                    // alert("2nd");
                console.log("$scope.saleinv.length==0")
          
                 $scope.saleinv[0].taxableval = 0;
                 $scope.saleinv[0].netamt = 0;
                 $scope.saleinv[0].invoiceValue = 0;
                 $scope.saleinv[0].tax=0;
                 $scope.saleinv[0].subtol = 0;
                  $scope.saleinv[0].adj = 0;
                 $scope.saleinv[0].dis = 0;
                 $scope.saleinv[0].char = 0;
                 $scope.discount1 = 0;
                  $scope.discount = 0;
                  $scope.ccamt1 = 0;
                   $scope.ccamt = 0;

                  var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                            +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
                            +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals+","+$scope.transaction+","+$scope.discount+","+$scope.ccamt+","+$scope.ccamt1;
                      console.log(update);   
                 $http.put('/saleinvoicedata12/'+update).success(function(response){
                            //alert("sale invoice");


                  })

              }
            //}
     } else if($scope.edituseritButton == true||rvalue==true){
              // alert("edit final not  calllll");
            if (length !=0 && rvalue == undefined ) {
                   
                    return
            }
            else if(length !=0 && rvalue != undefined){
              // alert("finalCalAfterRemove1");
               indexvalue=0;
                   //  $scope.getTotTaxVal();
                   // $scope.getTotTaxAmt();
                   // $scope.getFinalVal();
                   // $scope.getTotNetAmt();
                   saleInvoiceCalculations();
            }
              else{
                // alert("finalCalAfterRemove2");
                      //       alert("try to marrejfasdjhfbjhm nullll ");
                  console.log("$scope.saleinv.length==0")
          
                 $scope.saleinv[0].taxableval = 0;
                 $scope.saleinv[0].netamt = 0;
                 $scope.saleinv[0].invoiceValue = 0;
                 $scope.saleinv[0].tax=0;
                 $scope.saleinv[0].subtol = 0;
                  $scope.saleinv[0].adj = 0;
                 $scope.saleinv[0].dis = 0;
                 $scope.saleinv[0].char = 0;
                 $scope.discount1 = 0;
                  $scope.discount = 0;
                  $scope.ccamt1 = 0;
                   $scope.ccamt = 0;
                  var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                            +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
                            +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals+","+$scope.transaction+","+$scope.discount+","+$scope.ccamt+","+$scope.ccamt1;
                      console.log(update);   
                 $http.put('/saleinvoicedata12/'+update).success(function(response){
                            //alert("sale invoice");


                  })
                
               }
                 

      }//else $scope.edituseritButton == true

}//function close


//for edit item to get 
 
  var edituserit=JSON.parse(window.sessionStorage.getItem("Str3"));
  if(edituserit!=null){
      $scope.transaction = edituserit.Transaction;
      voucherNoGet = window.sessionStorage.getItem("voucherNo");
      editedInvoice = voucherNoGet;
      $http.get('/voucherNoGetDetailsSaleInvoice/'+voucherNoGet).success(function(response){ 
            console.log(response);
            $scope.saleinv = response;
                 $scope.discount = parseFloat (response[0].discount);
            $scope.discount1 = response[0].discount
            $scope.ccamt = parseFloat (response[0].cardCharges);
            $scope.ccamt1 =  response[0].char
            $scope.decimals =  response[0].roundOffValue;
           
           
            // $scope.discount = parseFloat (response[0].discount);
            // $scope.discount1 =parseFloat (response[0].discount);
            // $scope.ccamt =  parseFloat (response[0].cardCharges);
            //  $scope.ccamt1 = parseFloat( response[0].char);
            // $scope.decimals = parseFloat( response[0].roundOffValue);
            // //alert(" $scope.decimals "+$scope.decimals+" response[0].decimals "+response[0].decimals);
            if(response[0].roundOffValue == undefined || response[0].roundOffValue == 'undefined' || response[0].roundOffValue == ""||  response[0].roundOffValue == NaN ||  response[0].roundOffValue == "NaN"){
                         // alert("un "+$scope.decimals);
                          //alert("decimals "+$scope.decimals);
                          $scope.decimals = 0;
            }
             saleInvoceEditId = response[0]._id ;
      })


            // $scope.getDetails();
    
      $http.get('/getpartydetails'+ edituserit.partyname ).success(function(response){
      
            
            window.sessionStorage.setItem("name","null");
            window.sessionStorage.setItem("Str3","null");
            var detailch  = window.sessionStorage.getItem("name");
            //
            // alert(detailch + "  detailch");
            $scope.mobile = response[0].data.mobile;
            $scope.place = response[0].data.address1;
            $scope.partyname= response[0].subscriber;
            $scope.getDetails();
            //$scope.getDetails(r);
            $scope.edituseritButton = true;
           

      })
      $scope.transaction = edituserit.Transaction; 
      $scope.billtype = edituserit.billtype;  
      
}//if(edituserit!=null)
$scope.finalCal=function(){
  // saleInvoiceCalculations();
  //alert("finalcal");
     console.log($scope.partyname)
      console.log($scope.transaction)
       
 $http.get('/getsaleinv',{params:{"name":$scope.partyname,"Transaction":$scope.transaction}}).success(function(response){
           
        // thhis displaayed in confirm page also

       
         $scope.saleinv=[];
         var saleInvoiceLength = response.length;
          // alert("len "+saleInvoiceLength)
        // if($scope.saleinv.length!=0 && $scope.userit.length !=0){
         // if(saleInvoiceLength!=0 && $scope.userit.length !=0){
          
         if(saleInvoiceLength!=0 && $scope.userit.length !=0){
           window.sessionStorage.setItem("saleinvoicedata_id",response[0]._id);

             //alert("finalCalTax "+$scope.saleinv[0].tax);
            // alert(" saleInvoiceLength!=0 && $scope.userit.length !=0 "+saleInvoiceLength)
                        // $scope.discount = parseFloat (response[0].dis);
                        // $scope.discount1 =parseFloat (response[0].dis);
                        // $scope.ccamt =  parseFloat (response[0].char);
                        // $scope.ccamt1 = parseFloat( response[0].char);
                        // $scope.decimals = parseFloat( response[0].decimals);

                         $scope.discount = parseFloat (response[0].discount);
            $scope.discount1 = response[0].discount
            $scope.ccamt = parseFloat (response[0].cardCharges);
            $scope.ccamt1 =  response[0].char
            $scope.decimals =  response[0].roundOffValue;
           
            // $scope.discount = parseFloat (response[0].discount);
            // $scope.discount1 = parseFloat (response[0].discount);
            // $scope.ccamt =  parseFloat (response[0].cardCharges);
            // $scope.ccamt1 = parseFloat( response[0].char).toFixed($scope.rupeesDecimalPoints);
            // $scope.decimals = parseFloat( response[0].roundOffValue);
            // //alert(" $scope.decimals "+$scope.decimals+" response[0].decimals "+response[0].decimals);
           


                        // alert($scope.decimals)
                        $scope.saleinv=response;
                        // console.log( response[0].decimals)
                        //   console.log($scope.decimals)
                         if(response[0].roundOffValue == undefined || response[0].roundOffValue == 'undefined' || response[0].roundOffValue == ""||  response[0].roundOffValue == NaN ||  response[0].roundOffValue == "NaN"){
                         // alert("un "+$scope.decimals);
                          //alert("decimals "+$scope.decimals);
                          $scope.decimals = 0;
            }
          }
          else if(saleInvoiceLength!=0 && $scope.userit.length == 0){//$scope.saleinv.length!=0

            // alert(" else saleInvoiceLength!=0 && $scope.userit.length !=0 "+saleInvoiceLength)
             
                    $scope.saleinv.push({
                      'taxableval':0,
                      'tax':0,
                      'dis':0,
                      'char':0,
                      'subtol':0,
                      'adj':0,
                      'netamt':0,
                      'status':""
                  })

          }
       
        // console.log($scope.saleinv)
        // console.log($scope.saleinv.length)
        
       else if(saleInvoiceLength == 0 ) {
       // if(response.length==0 ) {
      //  alert(" saleInvoiceLength == 0 "+saleInvoiceLength)
          // $scope.saleinv=response;
         console.log("$scope.saleinv.length==0")
         ///alert("finalCalTax zero ");
            $scope.saleinv.push({
                'taxableval':0,
                'tax':0,
                'dis':0,
                'char':0,
                'subtol':0,
                'adj':0,
                'netamt':0,
                'status':""
            })
           if ($scope.userit.length>0) { 
                 saleInvoiceCalculations();
           }
        }
         // window.sessionStorage.setItem("saleinvoicedata_id",response[0]._id);

    })
   
}
//  $scope.finalCal=function(){
//   // saleInvoiceCalculations();

//      console.log($scope.partyname)
//       console.log($scope.transaction)
       
//  $http.get('/getsaleinv',{params:{"name":$scope.partyname,"Transaction":$scope.transaction}}).success(function(response){
           
//         // thhis displaayed in confirm page also

       
//          $scope.saleinv=[];
//          var saleInvoiceLength = response.length;
//           // alert("len "+saleInvoiceLength)
//         // if($scope.saleinv.length!=0 && $scope.userit.length !=0){
//          // if(saleInvoiceLength!=0 && $scope.userit.length !=0){
          
//          if(saleInvoiceLength!=0 && $scope.userit.length !=0){
//            window.sessionStorage.setItem("saleinvoicedata_id",response[0]._id);

//              //alert("finalCalTax "+$scope.saleinv[0].tax);
//             // alert(" saleInvoiceLength!=0 && $scope.userit.length !=0 "+saleInvoiceLength)
//                         $scope.discount = parseFloat (response[0].dis);
//                         $scope.discount1 =parseFloat (response[0].dis);
//                         $scope.ccamt =  parseFloat (response[0].char);
//                         $scope.ccamt1 = parseFloat( response[0].char);
//                         $scope.decimals = parseFloat( response[0].decimals);
//                         // alert($scope.decimals)
//                         $scope.saleinv=response;
//                         // console.log( response[0].decimals)
//                         //   console.log($scope.decimals)
//                         if(response[0].decimals == undefined || response[0].decimals == ""|| response[0].decimals == NaN){
//                          // alert("un "+$scope.decimals);
//                           $scope.decimals = 0;
//                         }
//           }

//           else if(saleInvoiceLength!=0 && $scope.userit.length == 0){//$scope.saleinv.length!=0


//           //   // alert(" else saleInvoiceLength!=0 && $scope.userit.length !=0 "+saleInvoiceLength)
             
//           //           $scope.saleinv.push({
//           //             'taxableval':0,
//           //             'tax':0,
//           //             'dis':0,
//           //             'char':0,
//           //             'subtol':0,
//           //             'adj':0,
//           //             'netamt':0,
//           //             'status':""
//           //         })

//           // }
       
//         // console.log($scope.saleinv)
//         // console.log($scope.saleinv.length)
        
//        else if(saleInvoiceLength == 0 ) {
//        // if(response.length==0 ) {
//       //  alert(" saleInvoiceLength == 0 "+saleInvoiceLength)
//           // $scope.saleinv=response;
//          console.log("$scope.saleinv.length==0")
//          ///alert("finalCalTax zero ");
//             $scope.saleinv.push({
//                 'taxableval':0,
//                 'tax':0,
//                 'dis':0,
//                 'char':0,
//                 'subtol':0,
//                 'adj':0,
//                 'netamt':0,
//                 'status':""
//             })
//            if ($scope.userit.length>0) { 
//                  saleInvoiceCalculations();
//            }
//         }
//          // window.sessionStorage.setItem("saleinvoicedata_id",response[0]._id);

//     })
   
// }
        
         
     var adjbal="";
     $scope.rate="";
     $scope.totalTaxableVal="";
     $scope.totalTaxVal="";
     $scope.subTotVal="";
     $scope.gwtarr=[];
     $scope.netwtarr=[];
     console.log("hi"+$scope.netwtarr);
     $scope.chararr=[];
     $scope.wasarr=[];
     $scope.taxablearr=[0];
     $scope.taxarr=[0];
     $scope.totvalarr=[0];
     $scope.stwt=[];
     //25/5  $scope.partyname="";
     // $scope.partyname="";
     $scope.irate=[];
     $scope.rate=[];
     $scope.ftaxable="";

    //var refresh = function() {
     /*$http.get('/userit').success(function(response){
        $scope.userit=response;
    })*/
$http.get('/itemrate').success(function(response){
        $scope.irate=response;
        //alert($scope.irate[0].rate);
    })

// $scope.taxvalchange = function(){
//     alert("change call ")
// }
// $scope.$watch('taxval', function(newvalue,oldvalue) {
//     alert("change call ")
//             });
//"purityCal($index,item.purity,item.itemName)"
$scope.purityCal1=function(val,purity,itemname){
//function itemRatesCall(itemname,val) {
  for(let a=0;a<$scope.items.length;a++){
       
          if (itemname == $scope.items[a].Name){
                 // alert("$scope.items[i].Name "+$scope.items[a].Name)
                    console.log($scope.items[a].InvGroupName)
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                        

                            console.log(lastdate)
                           // alert(lastdate)
                            var itempuritydata = response[0].InvGroupID +","+lastdate;
                           $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                              console.log(response)
                             $scope.irate=response; 
                            // alert( $scope.irate.length)
                             // $scope.userit[in1].irate = response
                              $scope.userit[val].irate = response
                              $scope.purityCal(val,purity)
                            }) 
                           
                            
            
                    })
              break;
          }    
       
       }

}//itemRatesCall(itemname,val)

$scope.purityCal=function(val,purity){
       // $scope.itemSelect ($scope.userit[val].itemName,val)
       //alert("purity calculation function called"+purity.Rate+purity)
       //alert($scope.userit[val].gwt);
//alert($scope.userit[val].itemName);
//itemRatesCall($scope.userit[val].itemName,val);

       for(i=0;i<$scope.irate.length;i++)
       {
          if (purity == $scope.irate[i].ValueNotation)
          {
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

    if($scope.userit[val].gwt=="" || $scope.userit[val].gwt == "NaN" || $scope.userit[val].gwt==undefined)
    {
       // alert("null value")
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
   
    $scope.userit[val].ntwt=$scope.userit[val].gwt;
    if($scope.userit[val].stwt!=null)
    {
      $scope.userit[val].ntwt=$scope.userit[val].ntwt-parseFloat($scope.userit[val].stwt);
    }
    $scope.userit[val].chgunt=$scope.userit[val].ntwt;
    //alert("here is index"+$scope.userit[$index].chgunt)
    //
    //$scope.newwas($index,pctcal);
 
    $scope.userit[val].taxval=parseFloat($scope.userit[val].chgunt*$scope.userit[val].rate).toFixed($scope.rupeesDecimalPoints)
   
    console.log( $scope.userit[val].taxval);
   // alert( $scope.userit[val].taxval);
    // if($scope.userit[val].taxval == "NaN"){
    //  // alert("inside a string"+ $scope.userit[val].taxval);
    //   $scope.userit[val].taxval = 0;
    // }
    // $scope.userit[val].taxamt=$scope.userit[val].taxval/100;
    // $scope.userit[val].final=parseFloat($scope.userit[val].taxval)+parseFloat($scope.userit[val].taxamt)
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    saleInvoiceCalculations();

}//else
} //main close


 //decimal validations gpcs
 $scope.gpcsDecimals = function($index){
   $scope.userit[$index].gpcs  = (parseFloat($scope.userit[$index].gpcs)).toFixed(0);
   $scope.userit[$index].gpcs = parseFloat($scope.userit[$index].gpcs)
   // alert($scope.userit[$index].itemName);
   // if ( $scope.disableMrp[$index] == true) {
   //      $scope.mrpCal($index, $scope.userit[$index].mrp);
   //  }
   
 }
 //mainy combo items
// var comboCheck = function(){

// }
 
 $scope.gpcsLimit = function($index){
 //for(let j=0;j<$scope.items.length;j++){
                //  if ($scope.userit[$index].itemName == $scope.items[j].Name)
                   // { 
                            //alert($scope.items[j])
                           // console.log($scope.items[j])
                            // alert("Hsc in  items matched"+$scope.items[j].Hsc)
                            //$scope.userit[i].Hsc=$scope.items[j].Hsc;
                           // console.log($scope.userit[i].Hsc)
                           // if ( $scope.items[j].comboItem == 'yes'){
                           //      $scope.userit[$index].comboItem = "yes";
                           //    // alert("iam combo machha"+$scope.userit[$index].comboItem );
                               // alert($scope.userit[$index].barcodeNumber)
                              // alert("gpcs call blur")
                        if( $scope.userit[$index].comboItem == "yes"){
                                                       $http.get('/getbar'+$scope.userit[$index].barcodeNumber).success(function(response)
                                                             {
                                                               console.log(response[0].gpcs)
                                                               var gpcsCheck = response[0].gpcs ;
                                                               var gwtCheck = response[0].gwt ; 
                                                               if($scope.userit[$index].gpcs > gpcsCheck ){
                                                                    alert("please enter with in limit gpcs "+ gpcsCheck);
                                                                    $scope.userit[$index].gpcs = gpcsCheck;
                                                                    $scope.newgwt($index)
                                                                }else if($scope.userit[$index].gwt> gwtCheck){
                                                                       alert("please enter with in limit gwt"+ gwtCheck);
                                                                        $scope.userit[$index].gwt = gwtCheck;
                                                                         $scope.newgwt($index)
                                                                }
                                                             })
                                                     }
                          // }
                           //  alert("i got Hsc "+$scope.userit[i].Hsc)
                           // break;
                   // }
      // }
 }
$scope.findWeightTolerence =function($index){

     console.log($scope.userit)
     
     if($scope.userit[$index].comboItem == 'yes'){
      
       
           $http.get('/getComboBarcode'+$scope.userit[$index].barcodeNumber).success(function(response){
                          console.log(response);
                          var ComboBarcodeGwt = response[0].gwt;
                          var ComboBarcodeGpcs = response[0].gpcs;
                          console.log(ComboBarcodeGwt);
                          console.log(ComboBarcodeGpcs);
                          //$scope.userit[$index].orderStatus = "available";
                          if($scope.userit[$index].gwt > ComboBarcodeGwt ){
                                 $scope.userit[$index].gwt = response[0].gwt;
                                 // $scope.item.gwt = 100;
                                 // alert($scope.userit[$index].gwt);
                                 alert("the weight is greater then the limit");
                      
                                 $scope.newgwt($index);
                          }
                           if($scope.userit[$index].gpcs > ComboBarcodeGpcs ){
                                 $scope.userit[$index].gpcs = response[0].gpcs;
                                 // $scope.item.gwt = 100;
                                 // alert($scope.userit[$index].gwt);
                                 alert("the Gpcs is greater then the limit");
                      
                                 $scope.newgwt($index);
                          }
                          //alert("res")
                   }) 
        }

       else if($scope.userit[$index].split == 'yes'){
        //alert("hiii")
         $http.get('/getsplitBarcode'+$scope.userit[$index].barcodeNumber).success(function(response){
                          //alert(response);
                          var splitcodeGwt = response[0].gwt;
                          var splitcodeGpcs = response[0].gpcs;
                          // console.log(ComboBarcodeGwt);
                          // console.log(ComboBarcodeGpcs);
                          //$scope.userit[$index].orderStatus = "available";
                          //alert($scope.userit[$index].gwt)
                          if($scope.userit[$index].gwt > splitcodeGwt ){
                                 $scope.userit[$index].gwt = response[0].gwt;
                                 // $scope.item.gwt = 100;
                                 // alert($scope.userit[$index].gwt);
                                 alert("the weight is greater then the limit");
                      
                                 $scope.newgwt($index);
                          }
                           if($scope.userit[$index].gpcs > splitcodeGpcs ){
                                 $scope.userit[$index].gpcs = response[0].gpcs;
                                 // $scope.item.gwt = 100;
                                 // alert($scope.userit[$index].gwt);
                                 alert("the Gpcs is greater then the limit");
                      
                                 $scope.newgwt($index);
                          }
                          //alert("res")
        

       })
       }
        else
        {
             $http.get('/getbar'+$scope.userit[$index].barcodeNumber).success(function(response)
              { 
                 //$scope.item = [];
                 console.log(response[0].gwt)
                 console.log(response[0])
                 //alert(response[0].barcode) 
                 var upperlimit = ((response[0].gwt)*((100+$scope.WeightTolerance)/100));
                 var lowerlimit = ((response[0].gwt)*((100-$scope.WeightTolerance)/100));
                 console.log(upperlimit);
                 console.log(lowerlimit);
                 if($scope.userit[$index].gwt <= lowerlimit || $scope.userit[$index].gwt >= upperlimit){
                      $scope.userit[$index].gwt = response[0].gwt;
                     // $scope.item.gwt = 100;
                     // alert($scope.userit[$index].gwt);
                     alert("the weight is not in tolerance limit");
                      
                      $scope.newgwt($index);
                    }
              })
                  
             }
        $scope.gpcsLimit($index)
}


 $scope.stoneTolerence = function($index) {
  //alert($scope.userit[$index].stwt+" "+$scope.userit[$index].gwt)
  if($scope.userit[$index].stwt >$scope.userit[$index].gwt){
    alert("Stone wt cannot be greater the Gross wt");
    $scope.userit[$index].stwt = 0;
    $scope.newstwt($index);
  } 
}
//var wttolerance = null;
$scope.newgwt=function($index,pctcal)
{  
    //for index specifing
    //  alert(wttolerance) calMrpValue($index)
    indexvalue = $index
    $scope.uomConversion($index,$scope.userit[$index].uom)
    console.log("i got call")
  
    //console.log($scope.userit[0].gwt)

    //alert($scope.userit[$index].gwt)
    //decimal point validation
   
    
    if($scope.userit[$index].labamt==null){
         $scope.userit[$index].labval=0;
        }

        if($scope.userit[$index].stchg==null){
         $scope.userit[$index].stval=0;
        }

    if($scope.userit[$index].gwt=="")
    {
        //alert("null value")
        $scope.userit[$index].chgunt=0;
        $scope.userit[$index].ntwt=0;
        $scope.userit[$index].taxval=0;
        $scope.userit[$index].taxamt=0;
        $scope.userit[$index].final=0;
        $scope.newwas($index,pctcal);
         $scope.dropDownCalls($index,"gwt");
    }
   
    else 
    {
       
      console.log($scope.userit[$index].gwt)//added 26/4
        if ($scope.userit[$index].gwt == null) {
        $scope.userit[$index].gwt = 0;
        //alert($scope.userit[$index].gwt);
       }
        $scope.userit[$index].gwt  = (parseFloat($scope.userit[$index].gwt)).toFixed(fixdec);
        $scope.userit[$index].gwt  = parseFloat($scope.userit[$index].gwt)
  
   $scope.userit[$index].stwt = 0;
     $scope.userit[$index].ntwt=((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
       
      if($scope.userit[$index].stwt!=null)
    {
      
       $scope.userit[$index].ntwt=((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
     }
    $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
    $scope.userit[$index].taxval=($scope.userit[$index].chgunt*$scope.userit[$index].rate).toFixed(2);
  
    //
    // if( $scope.userit[$index].pctcal!= undefined){
    //       $scope.newwas($index,$scope.userit[$index].pctcal)
    //   } 
    // if( $scope.userit[$index].labcal!= undefined){
    //       $scope.newlab($index,$scope.userit[$index].labcal)
    //   } 
    // if( $scope.userit[$index].stonecal!= undefined){
    //       $scope.newstchg($index,$scope.userit[$index].stonecal)
    //   }
    //
    saleInvoiceCalculations();
    $scope.dropDownCalls($index,"gwt");


}

/*else {
    
}*/
}
var checkRepeat = false
$scope.newstwt=function($index)
{
   //alert(($scope.userit[$index].stwt))
    indexvalue = $index;
    if(checkRepeat == false){
      $scope.uomConversion($index,$scope.userit[$index].uom) 
    }
   
   console.log($scope.userit[$index].stwt)
  
    // if($scope.userit[$index].stwt == undefined ||$scope.userit[$index].stwt ==  NaN||$scope.userit[$index].stwt == null){
    //   parseFloat($scope.userit[$index].stwt) = 0;
    //   alert("Nan or undefined");
       
    // }
    if($scope.userit[$index].stwt == undefined){
      // ($scope.userit[$index].stwt) = "";
      // if($scope.userit[$index].stwt ==""){
       // alert("$scope.userit[$index].stwt == undefined")
      // }
      // $scope.userit[$index].stwt = 0 
       $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
       $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
        $scope.dropDownCalls($index,"stwt");
        // $scope.userit[$index].chgunt=$scope.userit[$index].chgunt.toFixed(fixdec)
       
        //alert("Null or undefined"+$scope.userit[$index].chgunt);
    }else{
      $scope.userit[$index].stwt =( $scope.userit[$index].stwt).toFixed(fixdec);
      $scope.userit[$index].stwt = parseFloat ($scope.userit[$index].stwt) ;
   
       $scope.userit[$index].ntwt=(((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue))).toFixed(fixdec);
         $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
    }
   // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
   // $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);
        
    $scope.userit[$index].taxval1 = parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate);
    $scope.userit[$index].taxval = parseFloat($scope.userit[$index].taxval1).toFixed(2);
    
    saleInvoiceCalculations();
    $scope.dropDownCalls($index,"stwt");

 }



 $scope.uomConversion=function($index,uom){
 // alert("uom call"+uom)

  if(uom == "Carats"){
    checkRepeat = true;
    $scope.userit[$index].uomValue = 0.2;


    // alert("carata"+typeof( $scope.userit[$index].uom) )
  }else if(uom == "Gms" || uom == undefined){
   // alert("gms")
  checkRepeat = true;
   $scope.userit[$index].uomValue = 1;
   //alert("$scope.uomConversion "+parseFloat($scope.userit[$index].uomValue));


  }

if(checkRepeat == true){
  $scope.newstwt($index)
}

   if( $scope.userit[$index].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas($index,$scope.userit[$index].pctcal)
                                    
                               }
                            if( $scope.userit[$index].labcal!= undefined){
                                 $scope.newlab($index,$scope.userit[$index].labcal)
                            } 
                            if( $scope.userit[$index].stonecal!= undefined){
                               $scope.newstchg($index,$scope.userit[$index].stonecal)
                            } 
                             
  // if(uom == "Carats"){
  //  //alert(uom)
  //   if($scope.userit[$index].stwt == undefined){
  //     //$scope.userit[$index].ntwt = 
  //     $scope.userit[$index].ntwt =  $scope.userit[$index].gwt*0.2 ;
  //     $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
  //     //$scope.newgwt($index);
  //   }else{

  //      $scope.userit[$index].ntwt =  (($scope.userit[$index].gwt - $scope.userit[$index].stwt) *0.2).toFixed(fixdec);
  //      //  alert( $scope.userit[$index].ntwt)
  //        $scope.userit[$index].chgunt =  $scope.userit[$index].ntwt;
  //      $scope.userit[$index].chgunt = parseFloat(  $scope.userit[$index].chgunt).toFixed(fixdec) ;
  //      //$scope.newstwt($index);
  //    }
     
  // }else{
  //   if($scope.userit[$index].stwt == undefined){
  //     //$scope.userit[$index].ntwt = 
  //     $scope.userit[$index].ntwt =  $scope.userit[$index].gwt ;
  //     $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
  //      $scope.getTotTaxVal();
  //   $scope.getTotTaxAmt();
  //   $scope.getFinalVal();
  //   $scope.getTotNetAmt();
     
  //   }else{

  //      $scope.userit[$index].ntwt =  ($scope.userit[$index].gwt - $scope.userit[$index].stwt)  ;
  //      $scope.userit[$index].chgunt = $scope.userit[$index].ntwt ;
  //       $scope.getTotTaxVal();
  //   $scope.getTotTaxAmt();
  //   $scope.getFinalVal();
  //   $scope.getTotNetAmt();
     
  //   }

  // }
}

$scope.stoneTolerence = function($index) {
  //alert($scope.userit[$index].stwt+" "+$scope.userit[$index].gwt)
  if($scope.userit[$index].stwt >$scope.userit[$index].gwt){
    alert("Stone wt cannot be greater the Gross wt");
    $scope.userit[$index].stwt = 0;
    $scope.newstwt($index);
  } 
}//
$scope.newwas=function($index,pctcal){
   indexvalue = $index ;
  if(pctcal == undefined ||pctcal == "undefined" || pctcal == null || pctcal == ''){
   // alert("Please select pct");
     $scope.userit[$index].wastage = 0;
  }else{
  // alert(pctcal)
    if($scope.userit[$index].wastage==null || $scope.userit[$index].wastage=="" || $scope.userit[$index].wastage== undefined){
        
      
        // var ntwtFixed =  ($scope.userit[$index].ntwt).toFixed(fixdec);
         $scope.userit[$index].chgunt= ($scope.userit[$index].ntwt) ;
         //  alert("wasragerer "+  $scope.userit[$index].chgunt);
    }
    //  else {
    //      // alert("else "+$scope.userit[$index].wastage);
    //    $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
    //    $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
    // }

  else  if(pctcal=="AddPercent")
    {
        //alert(pctcal);
        $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
        var wastage=(($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100).toFixed(fixdec);
        //alert($scope.userit[$index].wastage);
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        //alert($scope.userit[$index].chgunt);
        $scope.dropDownCalls($index,"pctcal");
    }
    else if(pctcal=="Add Units")
    {
        $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
        var wastage=$scope.userit[$index].wastage;
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        $scope.dropDownCalls($index,"pctcal");
    }
    else if(pctcal=="SubPercent")
    {
      $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   

       var wastage=($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100;
        //alert($scope.userit[$index].wastage);
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
       $scope.dropDownCalls($index,"pctcal");
    }
    else
    {
       var wastage=$scope.userit[$index].wastage;
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
      $scope.dropDownCalls($index,"pctcal");
    }
    //alert($scope.totmat);
     
     //alert($scope.userit[$index].chgunt);
     if($scope.userit[$index].chgunt<0)
     {
        //alert("less than 0");
        $scope.userit[$index].chgunt=0;
        $scope.userit[$index].matadj=parseFloat($scope.userit[$index].ntwt)+parseFloat($scope.userit[$index].wastage);
        $scope.totmat=$scope.totmat-$scope.userit[$index].matadj;

        $scope.userit[$index].taxval1=$scope.userit[$index].chgunt*$scope.userit[$index].rate;
        $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        //alert($scope.userit[$index].taxval)
        window.sessionStorage.setItem("taxv",$scope.userit[$index].taxval)
        
         saleInvoiceCalculations();

     }
     //alert($scope.userit[$index].chgunt);
    //alert($scope.userit[$index].chgunt); 
     else
      {
        //alert("else")
        //alert($scope.userit[$index].chgunt);
        //alert($scope.userit[$index].rate)
         $scope.totmat=0;
         $scope.userit[$index].matadj=0;
     
        /*This holds the adjustment material balance*/
         $scope.userit[$index].taxval=$scope.userit[$index].chgunt*$scope.userit[$index].rate;
         $scope.userit[$index].taxval=$scope.userit[$index].taxval.toFixed(2);
         //alert($scope.userit[$index].taxval);
          window.sessionStorage.setItem("taxv",$scope.userit[$index].taxval)
         
         saleInvoiceCalculations();
 }
}
}
$scope.rateChange=function($index){
  //alert(" iam rate change "+ $scope.userit[$index].rate)
                        
                       if( $scope.userit[$index].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas($index,$scope.userit[$index].pctcal)
                                    
                               }
                            if( $scope.userit[$index].labcal!= undefined){
                                 $scope.newlab($index,$scope.userit[$index].labcal)
                            } 
                            if( $scope.userit[$index].stonecal!= undefined){
                               $scope.newstchg($index,$scope.userit[$index].stonecal)
                            } 
                             if( $scope.userit[$index].pctcal== undefined){
                             // alert($scope.userit[0].pctcal)
                             $scope.newstwt($index)      
                              }
                           

    

}

// $scope.disableMrp = [];
// $scope.disableMrp1 = function($index){
//  if($scope.disableMrp[$index] ==true){
//    return true;
//  }else{
//   return false;
//  }

// }
$scope.calMrpValue = function(index){ 
  // alert(" $scope.userit[index].mrpCheck "+$scope.userit[index].mrpCheck)
    if ($scope.userit[index].mrpCheck == true) {
           // alert(" my caall ") 
      // if ($scope.userit[index].mrp != null) {
    
          $scope.userit[index].taxval=($scope.userit[index].mrp).toFixed($scope.rupeesDecimalPoints);
          saleInvoiceCalculations();
      // }
    }  
   //$scope.mrpCal(index);
}//$scope.calMrpValue
$scope.mrpCal=function($index)
{
  //alert( "mrp "+$scope.userit[$index].mrp)
    //alert("hi mrp");
    //alert($scope.userit[$index].mrp)
    indexvalue = $index ;
      $scope.indexValueDisable = $index;
    // $scope.disableMrp[$index] =true;
   $scope.userit[$index].mrpCheck =true;
  // $scope.userit[$index].purity ="";
  // $scope.userit[$index].stwt ="";
  // $scope.userit[$index].uom ="";
  // $scope.userit[$index].ntwt ="";
  // $scope.userit[$index].pctcal ="";
  // $scope.userit[$index].wastage ="";
  // $scope.userit[$index].matadj ="";
  // $scope.userit[$index].chgunt ="";
  // $scope.userit[$index].labcal ="";
  // $scope.userit[$index].labamt ="";
  // $scope.userit[$index].labval ="";
  // $scope.userit[$index].stonecal ="";
  // $scope.userit[$index].stchg ="";
  // $scope.userit[$index].stval="";
  // $scope.userit[$index].rate = "";

//alert("Please Select GrossPcs "+);
 //  if ($scope.userit[$index].gpcs == undefined) {
 //  // alert("$scope.userit[index].gpcs "+$scope.userit[index].gpcs);
 //   alert("Please Select GrossPcs ");
 //   $scope.userit[$index].mrp = "";
 // }else{

    if ($scope.userit[$index].mrp == undefined || $scope.userit[$index].mrp == ''|| $scope.userit[$index].mrp == null) {
         
          $scope.indexValueDisable = 100;
           $scope.newgwt($index);
           $scope.newstwt($index);
            if( $scope.userit[$index].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
            $scope.newwas($index,$scope.userit[$index].pctcal)
                  
             }
          if( $scope.userit[$index].labcal!= undefined){
               $scope.newlab($index,$scope.userit[$index].labcal)
          } 
          if( $scope.userit[$index].stonecal!= undefined){
             $scope.newstchg($index,$scope.userit[$index].stonecal)
          }
            saleInvoiceCalculations();
           // saleInvoiceCalculations(true);
        }else{
     $scope.userit[$index].taxval=$scope.userit[$index].mrp;
    $scope.userit[$index].taxval=$scope.userit[$index].taxval.toFixed(2);
   // alert( $scope.userit[$index].taxval)
    $scope.labourTax();
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    saleInvoiceCalculations();

 }
  


  
}
 $scope.newlab = function($index,labval2)
 {
    // alert( $scope.LabourTax );
       indexvalue = $index;
    
     if($scope.userit[$index].stchg == "" ||$scope.userit[$index].stchg == null ||$scope.userit[$index].stchg==undefined ){
            $scope.userit[$index].stval = 0;
        }
     
     if($scope.userit[$index].labamt=="" || $scope.userit[$index].labamt==undefined  || $scope.userit[$index].labamt== null) {
          // alert("space")
           $scope.userit[$index].labval = 0;
       }
     else {
        //alert("==undefined")
        // $scope.userit[$index].labval = 0;
         $scope.userit[$index].labamt = Number( $scope.userit[$index].labamt).toFixed($scope.rupeesDecimalPoints);
        $scope.userit[$index].labamt = parseFloat ($scope.userit[$index].labamt) ;
   
       
       }

   if(labval2=="Percent")
    {
        //alert(labval)
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
        if($scope.userit[$index].labamt != null){
               var labval1=(addlab*$scope.userit[$index].labamt)/100;
               $scope.userit[$index].labval= labval1.toFixed($scope.rupeesDecimalPoints);
            }
         if($scope.LabourTax == "No"){   
                 $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
            }else{
                 $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
            }

    }
    else if(labval2=="PerUnit")
    {
        //alert(labval);
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].labamt != null){
        var addlab1=$scope.userit[$index].chgunt*$scope.userit[$index].labamt;        
            $scope.userit[$index].labval=(parseFloat(addlab1)).toFixed($scope.rupeesDecimalPoints)
         }
         if($scope.LabourTax == "No"){
                 $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
         }else{
            $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
         
         }
    }
    else if(labval2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        if($scope.userit[$index].labamt != null){
        $scope.userit[$index].labval=($scope.userit[$index].labamt).toFixed($scope.rupeesDecimalPoints);
        }
        if($scope.LabourTax == "No"){
                $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
        }else{
           $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
         
        }

    }
    $scope.labourTax();
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    // alert("sale return 2 row hhhhh");
    saleInvoiceCalculations();
    
} 
 
//var taxg =null;
 $scope.newstchg=function($index,stonecal2)
 {
     indexvalue = $index ;
    // alert("$scope.userit[$index].stchg "+$scope.userit[$index].stchg)
   if($scope.userit[$index].labamt=="" || $scope.userit[$index].labamt==undefined  || $scope.userit[$index].labamt== null) {
      
       $scope.userit[$index].labval=0;
    }
    

    if($scope.userit[$index].stchg == "" ||$scope.userit[$index].stchg == null ||$scope.userit[$index].stchg==undefined ){
        $scope.userit[$index].stval = 0;
  
    }
     else 
     {
        // $scope.userit[$index].stval = 0;

    $scope.userit[$index].stchg =( $scope.userit[$index].stchg).toFixed(fixdec);
    $scope.userit[$index].stchg = parseFloat ($scope.userit[$index].stchg) ;
    
        
    }
     if(stonecal2=="Percent")
    {
         //
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
       // alert(addstone);
       
       if($scope.userit[$index].stchg != null){
        var stval1=(addstone*$scope.userit[$index].stchg)/100;
        $scope.userit[$index].stval= stval1.toFixed($scope.rupeesDecimalPoints);
            }
         
        if($scope.LabourTax == "No"){

             $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        
         }else{
                   
             $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        
         }
    }
    else if(stonecal2=="PerUnit")
    {
       
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].stchg != null){
        var addstone1=$scope.userit[$index].chgunt*$scope.userit[$index].stchg;        
            $scope.userit[$index].stval=(parseFloat(addstone1)).toFixed($scope.rupeesDecimalPoints);
         }
        if($scope.LabourTax == "No"){
            $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
            $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
         
         }else{
            $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval);
            $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
         
         }
    }
    else if(stonecal2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        
        if($scope.userit[$index].stchg != null){
        $scope.userit[$index].stval=($scope.userit[$index].stchg).toFixed($scope.rupeesDecimalPoints);
        }
        if($scope.LabourTax == "No"){
           $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
           $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
        
         }else{

                 $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);   
         }
     }

       
        saleInvoiceCalculations();
  
 }
$scope.dropDownCalls =function($index,values){
  if (values == "stwt" || values == "gwt") {
         if( $scope.userit[$index].pctcal!= undefined){
              $scope.newwas($index,$scope.userit[$index].pctcal)
          } 
        if( $scope.userit[$index].labcal!= undefined){
              $scope.newlab($index,$scope.userit[$index].labcal)
          } 
        if( $scope.userit[$index].stonecal!= undefined){
              $scope.newstchg($index,$scope.userit[$index].stonecal)
          }  
    }else if(values == "pctcal"){
      //alert(" pct cal")
          if( $scope.userit[$index].labcal!= undefined){
            $scope.newlab($index,$scope.userit[$index].labcal)
          } 
          if( $scope.userit[$index].stonecal!= undefined){
            $scope.newstchg($index,$scope.userit[$index].stonecal)
          }
    }

    //saleInvoiceCalculations();
}//dropDownCalls

$scope.getTotTaxVal=function(){
  // alert("sale getTotTaxVal")
    //taxamtcal(indexvalue) ;
      $scope.taxSelectionCall(indexvalue,$scope.userit[indexvalue].taxSelection) 
         

    $scope.saleinv[0].taxableval= 0;
    
    for(i=0;i<=$scope.userit.length-1;i++) {
       
       if ($scope.userit[i].taxval != undefined) {
      // alert($scope.userit[i].taxval)
       $scope.saleinv[0].taxableval1=parseFloat($scope.saleinv[0].taxableval)+parseFloat($scope.userit[i].taxval);
       $scope.saleinv[0].taxableval=$scope.saleinv[0].taxableval1.toFixed($scope.rupeesDecimalPoints);
       };
      }
    }
//used mainy to avoid repetative function call // dynamic tax calculation
$scope.getTotTaxValDynamic=function(){
   

    $scope.saleinv[0].taxableval= 0;
    
    for(i=0;i<=$scope.userit.length-1;i++) {
       
        if ($scope.userit[i].taxval != undefined) {
            // alert($scope.userit[i].taxval)
             $scope.saleinv[0].taxableval1=parseFloat($scope.saleinv[0].taxableval)+parseFloat($scope.userit[i].taxval);
             $scope.saleinv[0].taxableval=$scope.saleinv[0].taxableval1.toFixed($scope.rupeesDecimalPoints);
       };
      }
}

$scope.getTotTaxAmt=function(){
     //alert("entered totalTaxableVal")
    $scope.saleinv[0].tax=0;
    for(i=0;i<=$scope.userit.length-1;i++){
       // console.log($scope.saleinv[0].tax)
       var taxamt = 0;
      if (($scope.userit[i].taxamt) == undefined) {
          console.log(" $scope.userit[i].taxamt) == undefined ")
          taxamt = 0;
      }else{
         taxamt = parseFloat($scope.userit[i].taxamt)
      }

      

        $scope.saleinv[0].tax1=parseFloat($scope.saleinv[0].tax)+ taxamt ;
      
     //  $scope.saleinv[0].tax1=parseFloat($scope.saleinv[0].tax)+parseFloat($scope.userit[i].taxamt);
       $scope.saleinv[0].tax=$scope.saleinv[0].tax1.toFixed($scope.rupeesDecimalPoints);
       console.log("parseFloat($scope.userit[i].taxamt) "+parseFloat($scope.userit[i].taxamt))
       console.log($scope.saleinv[0].taxamt)
       console.log($scope.saleinv[0].tax);

    }
    //alert("Total tax amount");
    //alert($scope.saleinv[0].tax);
}
$scope.labourTax = function (){
   // alert("sale labourTax")
      $scope.saleinv[0].labourtax=0;
       $scope.saleinv[0].labourValue = 0;
    for(i=0;i<=$scope.userit.length-1;i++)
      {
         $scope.saleinv[0].labourValue = (parseFloat($scope.saleinv[0].labourValue)+parseFloat($scope.userit[i].labval)).toFixed($scope.rupeesDecimalPoints);
    
       $scope.saleinv[0].labourtax = (parseFloat($scope.saleinv[0].labourtax)+parseFloat($scope.userit[i].labourTaxValue)).toFixed($scope.rupeesDecimalPoints);
      console.log($scope.saleinv[0].labourValue)
       console.log($scope.saleinv[0].labourtax)
     }
}
$scope.getFinalVal=function(){
 // alert("sale getFinalVal")
    //alert($scope.saleinv[0].subtol)
    //alert($scope.userit[i].final)
   // alert("entered totalTaxableVal")

    $scope.saleinv[0].subtol=0;
    for(i=0;i<=$scope.userit.length-1;i++)
    {

       var final = 0;
      if (($scope.userit[i].final) == undefined) {
          console.log(" $scope.userit[i].final) == undefined ")
          final = 0;
      }else{
         final = parseFloat($scope.userit[i].final)
      }


        if($scope.LabourTax == "Yes"){
           //  $scope.saleinv[0].labourValue = (parseFloat($scope.saleinv[0].labourValue)+parseFloat($scope.userit[i].labval)).toFixed(fixdec);
    
            if($scope.userit[i].labourTaxValue == undefined || $scope.userit[i].labval == undefined ){
               $scope.userit[i].labourTaxValue = 0;
                $scope.userit[i].labval = 0;
               console.log("inside loop")
            }
            console.log("labourValue"+$scope.userit[i].labval);
            console.log(" labourtax"+$scope.userit[i].labourTaxValue);
             console.log("final "+$scope.userit[i].final);
              console.log("subtol "+$scope.saleinv[0].subtol);
              console.log("subtol1 "+$scope.saleinv[0].subtol1);          
             if( $scope.transaction != "Urd Purchase" ){
                   $scope.saleinv[0].subtol1 = parseFloat($scope.saleinv[0].subtol)+parseFloat($scope.userit[i].final)+ parseFloat( $scope.userit[i].labourTaxValue)+ parseFloat( $scope.userit[i].labval);
                    console.log($scope.saleinv[0].subtol1)
                    $scope.saleinv[0].subtol=$scope.saleinv[0].subtol1.toFixed($scope.rupeesDecimalPoints);
                       $scope.finalNetAmount($scope.saleinv[0].subtol);
             
             }else{
                   if ($scope.userit[i].taxval != undefined) {
                     $scope.saleinv[0].subtol1 = parseFloat($scope.saleinv[0].subtol)+parseFloat($scope.userit[i].taxval)+ parseFloat( $scope.userit[i].labourTaxValue)+ parseFloat( $scope.userit[i].labval);
                       $scope.finalNetAmount($scope.saleinv[0].subtol1);
                   }
                  }

         }else{

                if( $scope.transaction != "Urd Purchase" ){
                        $scope.saleinv[0].subtol1=parseFloat($scope.saleinv[0].subtol)+final;
                        // alert($scope.saleinv[0].subtol1+"$scope.saleinv[0].subtol1");
                        $scope.saleinv[0].subtol=$scope.saleinv[0].subtol1.toFixed($scope.rupeesDecimalPoints);
                        // alert($scope.saleinv[0].subtol+"$scope.saleinv[0].subtol");
                         $scope.finalNetAmount($scope.saleinv[0].subtol);
                 }else{
                          $scope.userit[indexvalue].final = ($scope.userit[indexvalue].taxval);
                           if ($scope.userit[i].taxval != undefined) {
                          $scope.saleinv[0].subtol1=parseFloat($scope.saleinv[0].subtol)+parseFloat($scope.userit[i].taxval);
                           $scope.saleinv[0].subtol=$scope.saleinv[0].subtol1.toFixed($scope.rupeesDecimalPoints);
                             $scope.finalNetAmount($scope.saleinv[0].subtol);
                          }
                      }
           }

    }
}
var urdvalue = null;
$scope.getTotNetAmt=function(){
   // alert("sale getTotNetAmt")
     console.log("iam getTotNetAmt see me")
    //$scope.saleinv[0].adj = 100
     // $scope.saleinv[0].invoiceValue =0;
    for(i=0;i<=$scope.userit.length-1;i++){
             console.log($scope.adjqty)
             $scope.saleinv[0].adj =  $scope.adjqty //21/4
             // if ($scope.adjqty != null) {
             //  alert(" $scope.adjqty "+$scope.adjqty);
             // }
             console.log($scope.transaction)
              $scope.saleinv[0].Transaction = $scope.transaction;//25/4
              if( $scope.transaction == "Urd Purchase" ){
                       console.log($scope.saleinv[0].adj)//$scope.saleinv[0].subtol
                       $scope.saleinv[0].invoiceValue1 =$scope.saleinv[0].subtol1;   
                       // alert($scope.saleinv[0].invoiceValue1+"invoice");
                       //changed to 18/4  $scope.saleinv[0].netamt1=$scope
                       $scope.saleinv[0].invoiceValue = $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
                       //026 urdvalue = $scope.saleinv[0].netamt;
                        console.log( "$scope.saleinv[0].netamt")
                        console.log(  $scope.saleinv[0].invoiceValue)
                        // $scope.finalNetAmount( $scope.saleinv[0].invoiceValue)
               }else{ 
                 // alert("dsale");
                      console.log(" with regular sale")
                          console.log($scope.saleinv[0].adj)
                       $scope.saleinv[0].invoiceValue1 =$scope.saleinv[0].invoiceValue-$scope.saleinv[0].adj;
                        // alert($scope.saleinv[0].invoiceValue1+"$scope.saleinv[0].invoiceValue1")
                       // $scope.saleinv[0].invoiceValue= $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
                       $scope.saleinv[0].netamt= $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
                       // alert($scope.saleinv[0].invoiceValue+"$scope.saleinv[0].invoiceValue")
                      console.log( "$scope.saleinv[0].netamt")
                      // $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
                      console.log( $scope.saleinv[0].netamt)
                       // $scope.finalNetAmount( $scope.saleinv[0].invoiceValue)

                    }
    }//for
}//$scope.getTotNetAmt
// final nett amount 
$scope.finalNetAmount = function (value){
         // alert("hhhhhhhh"+value);
         // alert("got call for me"+$scope.discount);
    //  $scope.saleinv[0].netamt = value;
    // /$scope.addCca();
      // alert($scope.saleinv[0].invoiceValue+"invoice value");
      console.log($scope.roundOffMethod);
      console.log( $scope.roundOffValue);
      if($scope.roundOffValue !=0){
      //var value = 11.99;
      var n = 0;
      var roundoff = $scope.roundOffValue ;
      var modulus = value %  roundoff;
      // alert(modulus+"modulus");
      
      if( $scope.roundOffMethod == "Nearest"){
          if( modulus > ( roundoff/2)){
             n= Math.ceil(value/roundoff) *  roundoff;
             // alert(n+"11111111");
           }else{
             n= Math.floor(value/roundoff) *  roundoff;
             // alert(n+"222222222");
           }
      }else if($scope.roundOffMethod == "Lower"){
           n= Math.floor(value/ roundoff) *  roundoff;
           // alert(n+"lower");

      }else if($scope.roundOffMethod == "Upper"){
         n= Math.ceil(value/ roundoff) *  roundoff;
         // alert(n+"upper");
      }
   
     if(n > value){
       // alert("n > value n > value")
        $scope.decimals = Math.abs(modulus);
        console.log($scope.decimals)
        // alert($scope.decimals+"$scope.decimals");
         $scope.ccamt1=($scope.ccamt1-$scope.decimals).toFixed($scope.rupeesDecimalPoints);
        console.log($scope.ccamt1+"total");
        // alert($scope.ccamt1+"total");
        // alert($scope.decimals+"zzzzzzzzzzzz")
        // alert( $scope.decimals +" $scope.decimals ")
        // $scope.decimals = parseFloat ($scope.decimals).toFixed($scope.rupeesDecimalPoints);
        $scope.saleinv[0].subtol1 = parseFloat (n).toFixed($scope.rupeesDecimalPoints);
        
         // $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
         if($scope.discount==undefined && $scope.ccamt1==undefined){
      // alert("no no no no no no"+$scope.saleinv[0].subtol);
          $scope.saleinv[0].invoiceValue=$scope.saleinv[0].subtol;
          $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
         }else{
           $scope.saleinv[0].char = parseFloat ($scope.ccamt1).toFixed($scope.rupeesDecimalPoints);
       
          $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
         }

      }else if(n < value){
         // alert("n < value n < value n < value ")
        // $scope.decimals = modulus -roundoff;
        // alert(value+"value");
         $scope.decimals = n - value ;
         console.log($scope.decimals);
          $scope.ccamt1=($scope.ccamt1-$scope.decimals).toFixed($scope.rupeesDecimalPoints);
          // $scope.charge1=$scope.ccamt-$scope.saleinv[0].dis;
         // alert( $scope.decimals +"2 $scope.decimals ");
         // $scope.decimals = parseFloat ($scope.decimals).toFixed($scope.rupeesDecimalPoints);
        
          // $scope.saleinv[0].subtoll =n+$scope.decimals;
          $scope.saleinv[0].subtoll =n;
          console.log($scope.saleinv[0].subtoll);
           $scope.saleinv[0].invoiceValue1 = parseFloat ($scope.saleinv[0].subtoll);
            $scope.saleinv[0].invoiceValue = parseFloat ($scope.saleinv[0].invoiceValue1).toFixed($scope.rupeesDecimalPoints);
            $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
            if($scope.discount==undefined && $scope.ccamt1==undefined){
      //alert("no no no no no no"+$scope.saleinv[0].subtol);
              $scope.saleinv[0].invoiceValue=$scope.saleinv[0].subtol;
              $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
            }else{
              $scope.saleinv[0].char = parseFloat ($scope.ccamt1).toFixed($scope.rupeesDecimalPoints);
       
              $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
             }
            // $scope.minusinvoice=$scope.saleinv[0].subtol1;
      }else if(n == value){
         // alert("n == value n == value n == value ")
        $scope.decimals = 0;
        // $scope.saleinv[0].subtoll =n+$scope.decimals;
        $scope.saleinv[0].subtoll =n;
        console.log($scope.saleinv[0].subtoll);
        $scope.saleinv[0].invoiceValue1= parseFloat ($scope.saleinv[0].subtoll) ;
         $scope.saleinv[0].invoiceValue =  parseFloat ($scope.saleinv[0].invoiceValue1).toFixed($scope.rupeesDecimalPoints);
         $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
         if($scope.discount==undefined && $scope.ccamt1==undefined){
            // alert("no no no no no no"+$scope.saleinv[0].subtol);
            $scope.saleinv[0].invoiceValue=$scope.saleinv[0].subtol;
            $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
          }else{
          $scope.saleinv[0].char = parseFloat ($scope.ccamt1).toFixed($scope.rupeesDecimalPoints);
       
          $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
         }
        // $scope.minusinvoice=$scope.saleinv[0].subtol1; 
        // console.log($scope.minusinvoice);
      }

    }else{
         $scope.saleinv[0].netamt = value;
   // alert($scope.saleinv[0].subtol1+"end end end end end end");

    }
      
    
}
//old finalNetAmount
// $scope.finalNetAmount = function (value){
//       // alert("got call for me");
//     //  $scope.saleinv[0].netamt = value;
//       console.log($scope.roundOffMethod);
//       console.log( $scope.roundOffValue);
//       if($scope.roundOffValue !=0){
//       //var value = 11.99;
//       var n = 0;
//       var roundoff = $scope.roundOffValue ;
//       var modulus = value %  roundoff;
      
//       if( $scope.roundOffMethod == "Nearest"){
//           if( modulus > ( roundoff/2)){
//              n= Math.ceil(value/roundoff) *  roundoff;
//            }else{
//              n= Math.floor(value/roundoff) *  roundoff;
//            }
//       }else if($scope.roundOffMethod == "Lower"){
//            n= Math.floor(value/ roundoff) *  roundoff;

//       }else if($scope.roundOffMethod == "Upper"){
//          n= Math.ceil(value/ roundoff) *  roundoff;
//       }
   
//      if(n > value){
//         $scope.decimals = Math.abs(modulus -roundoff);
//         console.log($scope.decimals)
//         // $scope.decimals = parseFloat ($scope.decimals).toFixed($scope.rupeesDecimalPoints);
//         $scope.saleinv[0].netamt = parseFloat (n).toFixed($scope.rupeesDecimalPoints);
//       }else if(n < value){
//         // $scope.decimals = modulus -roundoff;
//          $scope.decimals = n - value ;
//          console.log($scope.decimals);
//          // $scope.decimals = parseFloat ($scope.decimals).toFixed($scope.rupeesDecimalPoints);
//          $scope.saleinv[0].netamt = parseFloat (n).toFixed($scope.rupeesDecimalPoints);
   
//       }else if(n == value){
//         $scope.decimals = 0;
//         $scope.saleinv[0].netamt = parseFloat (n).toFixed($scope.rupeesDecimalPoints);
   
//       }

//     }else{
//          $scope.saleinv[0].netamt = value;
   

//     }
      
    
// }
// $scope.ccamt = 0;
// $scope.discount = 0;
var addcredit = 0;
// $scope.addDis=function(){
//         alert("addDis"+$scope.ccamt+"hhhh"+$scope.decimals);
//        if($scope.discount==NaN && $scope.ccamt != null){
//         $scope.addCca();
//        }
//     console.log($scope.discount)
//    // $scope.ccamt1=$scope.discount;
//     if($scope.discount == null||$scope.discount==undefined||$scope.discount=='undefined'||$scope.discount==" "){
//       // $scope.saleinv[0].dis= 0;
//       // $scope.discount1 = 0;
//     // $scope.ccamt1=0;
    
//        }else{
//             // alert("dis field"+$scope.decimals);
//            // $scope.discount1=$scope.discount;
//                $scope.discount1 = parseFloat($scope.discount).toFixed($scope.rupeesDecimalPoints)
//                 // alert("dis field"+$scope.discount1);
//                $scope.saleinv[0].dis=parseFloat($scope.discount).toFixed($scope.rupeesDecimalPoints);
//                  $scope.ccamt1=parseFloat($scope.discount1)+parseFloat($scope.decimals);

//                  // alert($scope.ccamt1+"discount77777777777777777777777");
//             }
//             $scope.ccamt1=parseFloat($scope.discount1)+parseFloat($scope.decimals);
//       $scope.discount  = (parseFloat($scope.discount)).toFixed($scope.rupeesDecimalPoints);
//       $scope.discount1 = parseFloat($scope.discount);


//       if($scope.saleinv[0].labourtax == undefined || $scope.saleinv[0].labourtax == "NaN" || $scope.saleinv[0].labourtax == NaN){
//                  $scope.saleinv[0].labourtax = 0;
//                 // alert("$scope.saleinv[0].labourtax "+$scope.saleinv[0].labourtax)
//       }
//       if($scope.saleinv[0].labourValue == undefined || $scope.saleinv[0].labourValue == NaN ||  $scope.saleinv[0].labourValue == "NaN"){
//               $scope.saleinv[0].labourValue = 0;
//       }
//       console.log($scope.saleinv[0])
//      var totalDiscount=parseFloat($scope.saleinv[0].taxableval)+parseFloat($scope.saleinv[0].tax)+ parseFloat( $scope.saleinv[0].labourtax)+ parseFloat( $scope.saleinv[0].labourValue);
//      console.log("totalDiscount "+totalDiscount)
//     // alert("totalDiscount "+totalDiscount)
//      // $scope.saleinv[0].subtol1= 0 -$scope.saleinv[0].dis;
     
//      // $scope.saleinv[0].subtol1=totalDiscount-$scope.saleinv[0].dis;
//       $scope.saleinv[0].subtol1=totalDiscount;
//      console.log("$scope.saleinv[0].subtol1 "+$scope.saleinv[0].subtol1)
//      $scope.saleinv[0].subtol=$scope.saleinv[0].subtol1.toFixed($scope.rupeesDecimalPoints);
//       // alert($scope.saleinv[0].subtol+"$scope.saleinv[0].subtol");
//      console.log("$scope.saleinv[0].subtol "+$scope.saleinv[0].subtol)
//      if($scope.discount != "NaN"||$scope.discount != null){
//         // alert("in 11111111111111111111111ifaaaaaaaaaaaaaaaaa"+$scope.discount);
//       // $scope.ccamt1=$scope.discount1;
//       // $scope.discount1=$scope.discount;
//        console.log($scope.ccamt+"bbbbbbbbbb"+$scope.ccamt);
//       $scope.chargetotal=$scope.ccamt-$scope.discount;
//       $scope.charge1=$scope.ccamt;
//       console.log($scope.charge1);
//       $scope.ccamt1=$scope.discount;
//       // $scope.discount1=$scope.ccamt1;
//      console.log(typeof($scope.discount));
//      console.log($scope.discount+"sssssssssssssssss");
//      $scope.saleinv[0].invoiceValue1 =parseFloat($scope.saleinv[0].subtol)-parseFloat($scope.discount)-parseFloat($scope.decimals);
//      console.log(addcredit);
//      $scope.saleinv[0].invoiceValue = $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
//       console.log($scope.saleinv[0].invoiceValue);
//       // alert($scope.saleinv[0].invoiceValue+"invoicevalue");
//       $scope.finalNetAmount($scope.saleinv[0].invoiceValue);
//       // $scope.saleinv[0].netamt = $scope.saleinv[0].invoiceValue;
//         // $scope.saleinv[0]
//    }
//    else{
//      // alert("else222222222222222"+$scope.discount)
//       if($scope.saleinv[0].subtol != 0){
//       $scope.saleinv[0].invoiceValue1=$scope.saleinv[0].subtol;
//       }
//       else{
//         $scope.saleinv[0].invoiceValue1=0;
//       }
//     // alert("else"+$scope.saleinv[0].subtol);
//      // $scope.discount1=0;
//     // $scope.ccamt1=0;

//     // $scope.saleinv[0].invoiceValue1=$scope.saleinv[0].subtol;
//     if($scope.discount=="NaN"){
//       // $scope.discount1=0;
//       // $scope.decimals=0;
//       // $scope.ccamt1=0;
//       // $scope.chargetotal=$scope.ccamt-$scope.discount;
//       // $scope.chargetotal=$scope.decimals;
//       // $scope.charge1=$scope.decimals;
//       // console.log($scope.charge1);
//       // alert("null88888888888"+$scope.decimals)
//     // $scope.saleinv[0].subtol3= $scope.saleinv[0].subtol-parseFloat($scope.decimals);
//     $scope.saleinv[0].invoiceValue = $scope.saleinv[0].subtol;
//       // alert($scope.saleinv[0].invoiceValue+"inv000000");

//        $scope.saleinv[0].netamt= $scope.saleinv[0].invoiceValue;
//    }

//          // $scope.saleinv[0].netamt1=parseFloat($scope.saleinv[0].subtol) ;
//      // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
//      //  console.log($scope.saleinv[0].invoiceValue);
//       // setTimeout($scope.addCca(), 2000);
//        // $scope.finalNetAmount( $scope.saleinv[0].invoiceValue);
//      // $scope.isdisabled=1;
// }
// }
// // $scope.isdisabled=0;
// $scope.addCca=function(){
//   alert("cerdit cerdit cerdit cerditcerdit cerditcerditcerdit cerditcerdit cerditcerdit")
//    // if($scope.discount==null||$scope.discount>0){
//    //  $scope.addDis();
//    // }
//      // alert("dis dis dis"+$scope.ccamt);
//    // console.log($scope.ccamt);
//    // alert($scope.ccamt);
//  // $scope.discount=$scope.discount1;
//   // alert("hji");
//     // if($scope.discount == null){
//     //   $scope.discount = 0;
//     // }
//        // $scope.isdisabled=1;

//         if($scope.saleinv[0].labourtax == undefined){
//       $scope.saleinv[0].labourtax = 0;
//     }
//     if($scope.saleinv[0].labourValue == undefined){
//        $scope.saleinv[0].labourValue = 0;
//     }

//     if($scope.discount==null||$scope.discount==undefined)
//     {
//       //$scope.discount =0;
//       // alert(" if loop")
//       // $scope.ccamt1 = 0;
//       // $scope.discount1=0;
//         $scope.decimals=0;
//       // $scope.saleinv[0].char = 0;
     
//          $scope.saleinv[0].invoiceValue1 = parseFloat($scope.saleinv[0].subtol);
//           $scope.saleinv[0].invoiceValue =     $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
//       //console.log($scope.saleinv[0].netamt )
//       $scope.finalNetAmount( $scope.saleinv[0].invoiceValue)

//     }
//     else
//     {
//       if($scope.decimals==0||$scope.decimals==undefined)
//       {
//         $scope.decimals=0;
//       }
//      // alert(" else loop")
//       // alert($scope.discount+"discount");
//       // alert($scope.decimals+"decimals");
//       // if($scope.discount==null){
//       //   $scope.discount=0;
//       // }
//       // else{
//       //   $scope.discount=$scope.discount1;
//       // }
//       // alert($scope.decimals+"$scope.decimals999999999999999");
//      // $scope.charge1=$scope.ccamt-$scope.discount;
//        // alert($scope.charge1+"Charge111111111111111111111111");
//      console.log("discount"+$scope.decimals);
//      console.log($scope.ccamt);

//      if($scope.ccamt !=null){
//       // $scope.discount=0;
//       $scope.discount1=0;
//          alert("ifffffff"+$scope.ccamt+"rrrrrrrrrrrr"+$scope.discount);
//       console.log($scope.ccamt+"bbbbbbbbbb"+$scope.ccamt);
//       $scope.chargetotal=$scope.ccamt-$scope.discount;
//       $scope.charge1=$scope.ccamt;
//       console.log($scope.charge1);
//       $scope.ccamt1 = $scope.chargetotal;
//       $scope.ccamt1=$scope.ccamt;
//       $scope.discount=$scope.discount1;
//        // if($scope.discount=="NaN"){
//          // alert("null55555555555"+$scope.decimals)
//       // $scope.discount1=0;
//       // $scope.decimals=0;
//       // $scope.ccamt1=0;
//       // alert("subtol99999999999999"+$scope.saleinv[0].subtol)
//       // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].subtol;
//       // alert($scope.saleinv[0].invoiceValue+"ccccccccccccccccccc");
//       // $scope.chargetotal=$scope.ccamt-$scope.discount;
//       // $scope.chargetotal=$scope.decimals;
//       // $scope.charge1=$scope.ccamt;
//       // console.log($scope.charge1);
//       // alert("null55555555555"+$scope.decimals)
//     // $scope.saleinv[0].subtol3= $scope.saleinv[0].subtol-parseFloat($scope.decimals);
//     // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].subtol.toFixed($scope.rupeesDecimalPoints);
//       console.log($scope.saleinv[0].invoiceValue);
//       $scope.saleinv[0].netamt= $scope.saleinv[0].invoiceValue;
//      $scope.finalNetAmount($scope.saleinv[0].invoiceValue);

//        // }
      
//     }
//     else{
//           // alert("else"+$scope.ccamt);
//           // if($scope.discount!='NaN'){
//           //   $scope.addDis();
//           // }
//       console.log($scope.ccamt)
//        $scope.discount=$scope.discount1;
//       // $scope.ccamt=0;
//       // alert($scope.decimals+"decimals");
//       $scope.ccamt1=$scope.discount+parseFloat($scope.decimals)+parseFloat($scope.ccamt);
//       $scope.saleinv[0].invoiceValue1=parseFloat($scope.saleinv[0].subtol)+parseFloat($scope.chargetotal);
//       // alert($scope.saleinv[0].invoiceValue1+"subtol");
//       $scope.saleinv[0].invoiceValue=$scope.saleinv[0].invoiceValue1;
//       // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
//       //$scope.saleinv[0].subtol-=$scope.dis;
      
//       $scope.finalNetAmount( $scope.saleinv[0].invoiceValue)
//     }
//         alert($scope.chargetotal+"dddddddddddd");
//        // $scope.saleinv[0].char=$scope.chargetotal;
//         // alert($scope.chargetotal+"ccamt");
//         $scope.ccamt1=$scope.chargetotal;
//         // alert($scope.ccamt1+"ccamt1");
//       // $scope.ccamt1 = parseFloat($scope.ccamt).toFixed($scope.rupeesDecimalPoints);
//        // $scope.ccamt1 = parseFloat($scope.charge1).toFixed($scope.rupeesDecimalPoints);
//       // addcredit =  $scope.ccamt1;
//       $scope.saleinv[0].char=parseFloat($scope.ccamt).toFixed($scope.rupeesDecimalPoints);
//       $scope.saleinv[0].invoiceValue1=parseFloat($scope.saleinv[0].subtol)+parseFloat($scope.chargetotal);
//       // alert($scope.saleinv[0].invoiceValue1+"subtol");
//       $scope.saleinv[0].invoiceValue=$scope.saleinv[0].invoiceValue1;
//       // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].invoiceValue1.toFixed($scope.rupeesDecimalPoints);
//       //$scope.saleinv[0].subtol-=$scope.dis;
      
//       $scope.finalNetAmount( $scope.saleinv[0].invoiceValue)
//     }
//     if($scope.discount=="NaN"){
//           // alert("null55555555555"+$scope.decimals)
//       // $scope.discount1=0;
//       // $scope.decimals=0;
//       // $scope.ccamt1=0;
//       // alert("subtol99999999999999"+$scope.saleinv[0].subtol)
//       $scope.saleinv[0].invoiceValue = $scope.saleinv[0].subtol;
//       // alert($scope.saleinv[0].invoiceValue+"ccccccccccccccccccc");
//       // $scope.chargetotal=$scope.ccamt-$scope.discount;
//       // $scope.chargetotal=$scope.decimals;
//       // $scope.charge1=$scope.ccamt;
//       // console.log($scope.charge1);
//       // alert("null55555555555"+$scope.decimals)
//     // $scope.saleinv[0].subtol3= $scope.saleinv[0].subtol-parseFloat($scope.decimals);
//     // $scope.saleinv[0].invoiceValue = $scope.saleinv[0].subtol.toFixed($scope.rupeesDecimalPoints);
//       console.log($scope.saleinv[0].invoiceValue);
//       $scope.saleinv[0].netamt= $scope.saleinv[0].invoiceValue;
//       $scope.finalNetAmount($scope.saleinv[0].invoiceValue);

//       }
//     $scope.ccamt  = (parseFloat($scope.ccamt)).toFixed($scope.rupeesDecimalPoints);
//         $scope.ccamt = parseFloat($scope.ccamt)
// }
// $scope.roundOff=function()
// {
//     $scope.saleinv[0].netamt=Math.round($scope.saleinv[0].netamt);
// }

/*$scope.calTaxVal=function(taxable)
{

    alert($scope.item);
alert(taxable);
}*/

    // $scope.useritem=[];
    // console.log($scope.useritem.length);
    // $scope.tableSelection = {};
    // $scope.personalDetails = [
    //     {
    //         'fname':'Muhammed',
    //         'lname':'Shanid',
    //         'email':'shanid@shanid.com'
    //     },
    //     {
    //         'fname':'John',
    //         'lname':'Abraham',
    //         'email':'john@john.com'
    //     },
    //     {
    //         'fname':'Roy',
    //         'lname':'Mathew',
    //         'email':'roy@roy.com'
    //     }];
// $scope.savedata=function(partyname,gwt,rate,total,$index)
// {
//     //alert("save data is called"+gwt+rate+total+" "+$index)
//     $scope.userit.splice($index, 1,({
//              'partyname':partyname,
//                'gwt': $scope.item.gwt, 
//                 'rate': $scope.item.rate,
//                 'total': $scope.item.total,
//                 'taxval':$scope.item.taxval,
//     }))
//     console.log($scope.userit);
//     window.sessionStorage.setItem("ItemData",$scope.userit);
// }
// $scope.totamt="";


//new function
$scope.newCharges=function(){
  // alert("ifffffff"+$scope.ccamt+"rrrrrrrrrrrr"+$scope.discount);
  // alert("ifffffff"+typeof($scope.ccamt)+"rrrrrrrrrrrr"+typeof($scope.discount));
   // alert("h"+$scope.ccamt);
  // $scope.ccamt1=0;
 // if($scope.discount!=NaN ){
 //  alert("sssssss"+ $scope.discount);
 //        $scope.addDis(); 
 // }
 //    // alert("heelo")
 //       // $scope.addDis();
 //    // }
 //    // else{
 //     if($scope.ccamt != null && $scope.discount != null){
 //      alert($scope.discount+"dis"+"vvvvvv"+$scope.ccamt+"ccamt")
 //      $scope.addCca();
 //     }
 // $scope.ccamt=12;
 // alert($scope.discount+"111"+$scope.ccamt);
    // }
  // $scope.finalNetAmount();
  // if($scope.discount==null||$scope.discount==NaN||$scope.discount=='NaN'||
  //   $scope.ccamt==null||$scope.ccamt==NaN||$scope.ccamt=='NaN'||$scope.ccamt==undefined){
   // alert("hi");
 //   if($scope.discount==null||$scope.ccamt==null){
 // if($scope.discount==null){
 //   $scope.discount1=0;
 // }
 // else{
 //    $scope.ccamt=0;
 //  }
 //  }
    if($scope.ccamt==null || $scope.ccamt==" "){

      $scope.discount1=$scope.discount;
        $scope.ccamt1=$scope.discount1;
      $scope.invoice=$scope.saleinv[0].subtol-$scope.ccamt1;
      // $scope.saleinv[0].dis = $scope.discount;
               
      $scope.finalNetAmount($scope.invoice);
    }
    else if($scope.discount==null || $scope.discount==" "){
      $scope.ccamt1=$scope.ccamt;
     // $scope.saleinv[0].char = $scope.ccamt;
      $scope.invoice=$scope.saleinv[0].subtol-$scope.ccamt1;
      $scope.finalNetAmount($scope.invoice);
    }
   else{
  // alert("charges1111111"+$scope.ccamt);
  $scope.discount1=$scope.discount;
   $scope.ccamt=$scope.ccamt;
  // $scope.saleinv[0].dis = $scope.discount;
   
  // alert("ccamtsssssssssssssss"+$scope.ccamt2);
  $scope.finalNetAmount($scope.invoice);
  $scope.ccamt1=$scope.discount1-parseInt($scope.ccamt);
  //$scope.saleinv[0].char = $scope.ccamt1;
  // alert("chargesssss"+$scope.ccamt1);
  // alert("hi"+$scope.saleinv[0].subtol);
  $scope.invoice=$scope.saleinv[0].subtol-$scope.ccamt1;
  $scope.finalNetAmount($scope.invoice);
  // alert("invoice"+$scope.invoice)
   }
}




$scope.cal=function()
{
    
    var gwt=$scope.item.gwt;
    
    var rate=$scope.item.rate;
    $scope.item.totamt=gwt*rate;

}
 $scope.addNew = function(){
   
    console.log($scope.userit)
    // alert($scope.userit)
     window.sessionStorage.setItem("Str41",JSON.stringify($scope.userit));
          
    //alert($scope.userit.length);
    //alert($scope.totmat);
    //alert($scope.netwtarr.length);
    var csfdata="party";
    
     $scope.userit.push({ 

          'name':$scope.partyname,
               'purity' : "",
               'gwt': "", 
                'rate': "",
                'total': "",
                'taxval':"",
                'salesPerson':$scope.usernamedetails
                // 'matadj':$scope.totmat ,
                // 'irate':[]              
            });
//$scope.item.gwt=0;
//alert($scope.item.gwt);
  //$scope.stwt[$scope.userit.length-1]=0;
  $scope.netwtarr[$scope.userit.length-1]=0;
  $scope.chararr[$scope.userit.length-1]=0;
  $scope.wasarr[$scope.userit.length-1]=0;
  $scope.taxablearr[$scope.userit.length-1]=[0];
  $scope.taxarr[$scope.userit.length-1]=[0];
  $scope.totvalarr[$scope.userit.length-1]=[0];
 //$scope.userit[$index].matadj=$scope.totmat;

    //$scope.netwtarr[$scope.userit.length]=0;
     //alert($scope.userit.length);
     console.log($scope.userit);
   /* $http.put('/users/'+csfdata).success(function(response)
        {
        $scope.result=response;
        console.log($scope.result);
        refresh();*/
        //})
            // $scope.personalDetails.push({ 
            //     'fname': "", 
            //     'lname': "",
            //     'email': "",
            // });
        };

  //  var usercsf="party";
     /*$http.get('/userit', {params:{"name":usercsf}}).success(function(response){
        $scope.useritem=response.items;
        var count=$scope.useritem.length();
        console.log(count);
        console.log("the useritemlist are"+$scope.res);
    })*/
//removing id from arrcon array
var removeidarrcon = function(id){

//alert("removeidarrcon removeidarrcon")
          //removing arrcon value id 
          var index = arrcon.indexOf(id);

          if (index > -1) {
               arrcon.splice(index, 1);
            }
          console.log(arrcon)

}
$http.get('/Treasure').success(function(response){
 
       console.log(response)
        $scope.stock=response;
//$scope.userit.stock=response;
        //alert($scope.irate[0].rate);
    }) 
// $scope.checkBox = function (item)
// {
//     if (item.selected === true) {
//         alert( "item selected");
//     } else {
//         alert( "item not selected");
//     }
// }
$scope.indexSelected=[];
$scope.check=0;
$scope.indexFunctionCall=function(index,vname) {

    $scope.j=index;
     // alert(index+"index");
     //  alert(vname+"vname");
           if ($scope.indexSelected.indexOf(index) == -1){
                $scope.indexSelected.push(index);
                // alert(index+"pushed index");
            }
                     if($scope.transaction == "Sale Return" || $scope.transaction == "Purchase Return"
                      ||$scope.transaction == 'Approval Sale'||$scope.transaction=='Approval Return'){
                  
                           $scope.mycheck(index,vname);
                      }
         console.log($scope.indexSelected)
}
$scope.removeChecked = function(index,vname) {
 // alert("clicked on checkbox"+$scope.checkbox);
  // var k=0;
  if(vname==1){
   // alert("checkbox checked"+index); 
  $scope.userit[index].index = index;
  // alert("clicked on checkbox"+$scope.checkbox);
  // alert(" $scope.userit[index].index "+ $scope.userit[index].index);
  }//if
 
    else{
      console.log($scope.userit);
         for(var i=0;i<=$scope.indexSelected.length-1;i++){
          // alert("checkbox is unchecked"+index);
              if (  $scope.userit[i].index === index) {
                // alert("within if");
                delete $scope.userit[i].index;
                // $scope.checkbox=$scope.checkbox-1;
                delete($scope.indexSelected[i]);
                console.log($scope.indexSelected);
                console.log($scope.userit)
               
              }  //if
       
          }//for
    }//else
}//removeChecked//removeChecked
//history functionality
$scope.partyHistory=function(){
   // alert("clicked on history button");
  $window.location.href = "Phistory.html";
  // $http.get('/getTranDetails').success(function(response){
  //       console.log(response);
  // })
}
//partynames
// $scope.partyNames=function(){
//   alert("party");
  // $http.get('/getPartyDetailsNumber',$scope.partyname).success(function(response){
  //             console.log(response);
  //             $scope.partyNames=response[0].subscriber;
  // });
 // $http.get('/getTranDetails').success(function(response){
 //        console.log(response);
 //   })
// }
$scope.removeSelectedRows = function() {
  var a =0;
   $scope.userit1 = [];
    if (0 == $scope.userit.length) {
                       // do stuff
        alert("Please Fill Necessary Details");
        return;
      }
      else if($scope.indexSelected=="" ||$scope.indexSelected==undefined||$scope.indexSelected==null){
        alert("Please Select Checkbox")

      }
      else{

    var r = confirm("Are you sure you want to delete this ?")
            if (r==true) {
                
  // alert(" got call  $scope.userit.length "+ $scope.userit.length);
           for(let i=0;i<=$scope.userit.length-1;i++){ 
              //Things[i]
               // alert("in for");
              
               // alert(" $scope.userit[index] "+$scope.userit[i].index);
              if ($scope.userit[i].index != undefined) {
                         // alert(" iam hsdfsdf undefine unsaved "+ $scope.userit[i].index);
                      console.log($scope.userit[i]);
                      var udelete=$scope.userit[i]._id;
                       if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"
                        &&$scope.transaction!="Approval Out"){
                      $http.delete('/userit/'+udelete).success(function(response)
                        {
                          console.log(response);
                        });
                       }
                    
              }else{
                         // alert("saved");
                       console.log($scope.userit[i]);
                 
                       saleInvoiceCalculations();
                       $scope.userit1[a] = $scope.userit[i];
                       a++;
                        console.log($scope.userit1);
              }
              if (($scope.userit.length-1) == i) {
                      $scope.userit = $scope.userit1
              }
              if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"&&$scope.transaction!="Approval Out"){
               if($scope.userit.length != 0){
                // alert("in if");
                // alert(r);
                          indexvalue=0;
                          saleInvoiceCalculations();
                $scope.saleinv[0].status="In Progress"
                $scope.saleinv[0].partyname=$scope.partyname;
        
             
                  var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                            +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
                            +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals+","+$scope.transaction+","+$scope.discount+","+$scope.ccamt+","+$scope.ccamt1;
                      console.log(update);      
                 $http.put('/saleinvoicedata12/'+update).success(function(response){
                  // alert("sale invoice");
                  console.log(response);
                  // $scope.getDetails(r);
                         })
                        }
                        else{
                                // alert("else");
                                $scope.saleinv[0].taxableval = 0;
                                $scope.saleinv[0].netamt = 0;
                                $scope.saleinv[0].invoiceValue = 0;
                                $scope.saleinv[0].tax=0;
                                $scope.saleinv[0].subtol = 0;
                                 if($scope.saleinv[0]._id != null){
                                  // alert("after save"+$scope.saleinv[0]._id);
                                  $http.delete('/deleteinprogress'+$scope.saleinv[0]._id ).success(function(response){
                                    console.log(response);
                                  })
                                 }
                                // $scope.getDetails(r);
                           }
                         }
            }//for
          }//if(r==true);
          
        }//else
}//trial
$scope.removeSelectedRowsCheck = function() {
   // alert("remove++++++++++++++++++++");
  if ($scope.edituseritButton == true) {
 // alert("in delete  scope.userit.length "+$scope.userit.length+"  $scope.indexSelected.length  "+$scope.indexSelected.length);
    var lengthIndex = $scope.indexSelected.length;
    if($scope.userit.length<= lengthIndex){
      alert(" Cannot delete complete items!");
       console.log(arrcon);
      $scope.indexSelected=[];
       $scope.checkbox = false;

    }else{
           //alert("u can delete the items ");
           $scope.removeSelectedRows ()
         }
       }
}
$scope.dupli=function(){
  //alert($scope.partyname)
   $http.get('/getPartyName'+$scope.partyname).success(function(response)
              {
                console.log(response)
                //alert(response.length);
                if (response.length==0) {
                  alert("PartName is Invalid !!!");
                  $scope.partyname = "";
                }
              //}
            })

}

// $scope.removeSelectedRows = function() {
//         var labval;
//          console.log($scope.indexSelected.length);
//                     // $scope.indexSelected = index;
//             arrcon[$scope.indexSelected];
//              console.log(arrcon);
          
//    var partyname=$scope.saleinv[0].partyname;
//     //var length=$scope.userit.length;
//     console.log($scope.userit.length);

//      if (0 == $scope.userit.length) {
//                        // do stuff
//         alert("Please Fill Necessary Details");
//         return;
//       }
//       else if($scope.indexSelected=="" ||$scope.indexSelected==undefined||$scope.indexSelected==null){
//         alert("Please Select Checkbox")

//       }
//       else{

//     var r = confirm("Are you sure you want to delete this ?")
//             if (r==true) {
                
//     console.log($scope.indexSelected);
//     //alert(r);
//     var lengthIndex = $scope.indexSelected.length;
//      console.log($scope.indexSelected.length);
//      var k=0;
//      for (var i=0; i<lengthIndex;i++) {
//       // var j=i;
   
//         console.log($scope.indexSelected.length);
        
//         if($scope.userit[i]._id==null)
//         {
//           console.log(i)
          
//          // if( i == j )
//          // {
//             // alert("$scope.userit[i]._id==null");
//             console.log(i);
//         //delete row from data
//               console.log($scope.userit[i].itemName);
//               console.log($scope.userit[i]);
//         // removeidarrcon($scope.userit[i]._id)
//          $scope.userit.splice(i, 1);
//          if($scope.userit.length != 0){
//         indexvalue=0;
//         // console.log(indexvalue);
//          // rowCountUi+=1;
//         // $scope.getDetails();
//         // $scope.getTotTaxVal();
//         // $scope.getTotTaxAmt();
//         // $scope.getFinalVal();
//         // $scope.getTotNetAmt();
//          saleInvoiceCalculations();
//       }
//       else{

//             $scope.saleinv[0].taxableval = 0;
//             $scope.saleinv[0].netamt = 0;
//             $scope.saleinv[0].invoiceValue = 0;
//             $scope.saleinv[0].tax=0;
//             $scope.saleinv[0].subtol = 0;
//       }
//         //alert(i);
//      // }
//   }
//     else
//     {
//        // alert("entered into else loop delete remove");


//      // alert("$scope.userit[i]._id is not null");

//          console.log(arrcon);
//          var udelete=arrcon[$scope.indexSelected[i]];
//          console.log(udelete);
//             console.log(udelete);
//             k=0;
//         $http.delete('/userit/'+udelete).success(function(response)
//             {
//                k++;
//                // alert(r);
//               console.log(udelete);
//               // alert("inside"+udelete);
             
//               console.log($scope.userit.length);
//               console.log(arrcon);
//               console.log(i);
              
//                    if(k==lengthIndex){
//                    // alert("getdetails");
//                   arrcon=[] ;
//                    $scope.indexSelected=[];
                    
//                    $scope.saleinv[0].status="In Progress"
//                 $scope.saleinv[0].partyname=$scope.partyname;
        
//          var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
//                +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
//                 +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals;
//                  console.log(update);
//          $http.put('/saleinvoicedata12/'+update).success(function(response){
//           // alert("sale invoice");


//                          })
//                      $scope.getDetails(r);
                
               
//               }
              

//                 console.log($scope.indexSelected.length);
            
         
//         });


       
//                   }
           
//  }
 
// }//for llop close

    
//    }//validation loop
//   $scope.saleinv[0]= 0
//   }
$http.get('/uom').success(function(response){
  //alert(response[1].name)
        $scope.uom=response;
    })

// $http.get('/pct').success(function(response){
//         $scope.pct=response;
//     })

$http.get('/labcal').success(function(response){
        $scope.labcal=response;
    })

$scope.val="hi welcome";
var num=20.41;
var mat=Math.round(num * 100) / 100;
//alert(mat);
var numb = 123.23454;
numb = numb.toFixed(2);
    
    $scope.staff=  [
     
    ];
     
     $scope.export = function(){
        html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            }
        });
     }
$scope.barcodeValidation= function(barcode, $index){
 var barcodenum = barcode.toString();
  var len = barcodenum.toString().length;
  //console.log(barcodenum.toString().length);
  if ((len!= 0) && (len < 8 ||len > 8)){
     alert(" Barcode is Invalid !!");
     $scope.userit[$index] = '';
      $scope.userit[$index]  =JSON.parse(window.sessionStorage.getItem("Str41"));
     
  
  }
  // else if (len == 8) {
  //     alert(" Barcode is valid !!");
  // };
}//barcodeValidation
var use =null
 $scope.barcode=false;
 $scope.barcodeScan = function(barcode, $index){
  //this is for index value
  //alert(barcode);
  indexvalue = $index
  //console.log("iam changing");
  var check = null;
  console.log( $scope.userit[$index].barcodeNumber);
  //console.log( $scope.$index.barcode);
  var barcodenum = barcode.toString();
  
  console.log(barcodenum);
  console.log(barcodenum.toString());
  var len = barcodenum.toString().length;
  if (len == 8 ){
    // $http.get('/getbar'+barcodenum).success(function(response)
      // alert(" barcodenum "+barcodenum)
      $http.get('/batchBarcodeNumber'+barcodenum).success(function(response){    
              use=response[0];
              console.log(use)
              //response.length == 0 ||
              //alert(response.length);
             if (response.length == 0) {
                  alert("Barcode is "+"Invalid");
                   
                      $scope.userit[$index]="";
                   
                    $scope.userit[$index]  =JSON.parse(window.sessionStorage.getItem("Str41"));
     
             }
             else if((response[0].comboItem !='yes') && (response[0].orderStatus == "Inprogress" || response[0].orderStatus == "completed"|| response[0].orderStatus == undefined|| response[0].orderStatus == 'undefined')){
                    if (response[0].orderStatus == "completed") {
                         alert("Barcode is "+"soldout");
                   
                    }else{
                       alert("Barcode is "+response[0].orderStatus)
                   
                    }
                    $scope.userit[$index]="";
                   
                    $scope.userit[$index]  =JSON.parse(window.sessionStorage.getItem("Str41"));
     


               }
               else{
                     $scope.user[$index]=response[0];
                     $scope.userit[$index]=$scope.user[$index];

                     if($scope.user[$index].split == "yes")
                    {
                           window.sessionStorage.setItem("splitgwt"+$index,$scope.user[$index].gwt)
                           window.sessionStorage.setItem("splitgpcs"+$index,$scope.user[$index].gpcs)
                           window.sessionStorage.setItem("splitbarcodeid"+$index,$scope.user[$index]._id)
                           window.sessionStorage.setItem("Str4",JSON.stringify($scope.user[$index]))
                           var Str5 = window.sessionStorage.getItem("Str4");
                           var temp1=JSON.parse(window.sessionStorage.getItem("Str4"));
                        }

                        
         
                         $scope.userit[$index]=$scope.user[$index];
                         if ($scope.user[$index].mrp != undefined) {
                                $scope.indexValueDisable = $index;
                                 $scope.userit[$index].mrpCheck =true;
                                // $scope.disableMrp =true;
                                // alert("response[0].mrp "+$scope.user[$index].mrp)

                        } 
                         $scope.limit = $index;
                         $scope.userit[$index].salesPerson =$scope.usernamedetails ; 
                         //alert($scope.user[$index].purity)
                         console.log($scope.userit[$index])
                       // $scope.item.purity = 0;
                        console.log($scope.userit[$index].itemName)
                //       $sco($scope.userit[$index].itemName,$index)
                       // $scope.userit[$index].irate = use.purity;
                        $scope.userit[$index].barcodeNumber = use.barcode 
                       // combocheck
                       if($scope.user[$index].comboItem == "yes"){
                          $scope.userit[$index].barcodeNumber =  use.comboBarcode;
                          $scope.userit[$index].orderStatus = "available";
                           $scope.userit[$index].barcode = use.comboBarcode;
                          delete $scope.userit[$index].comboBarcode
                         // alert($scope.userit[$index].barcodeNumber)
                       }

                                 //purity issue
         for(let a=0;a<$scope.items.length;a++){
       
          if ($scope.userit[$index].itemName == $scope.items[a].Name){
                  // alert("$scope.items[i].Name "+$scope.items[i].Name)
                    console.log($scope.items[a].InvGroupName)
                    // if ( $scope.items[a].comboItem == 'yes'){
                    //     $scope.userit[$index].comboItem = "yes";
                    //      $http.get('/getComboBarcode'+$scope.userit[$index].barcodeNumber).success(function(response){
                    //         $scope.userit[$index].gwt = response[0].gwt;
                    //         $scope.userit[$index].gpcs = response[0].gpcs;
                    //         if($scope.userit[$index].gwt == 0 || $scope.userit[$index].gpcs == 0 ){
                    //           $scope.userit[$index]="";
                    //         }
                            
                    //      })
                    //    // alert("change comboitem in change"+$scope.userit[$index].comboItem)
                    //    }
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                            console.log(response)
                            console.log(response[0].PurchaseAcc);
                             if($scope.transaction =="Urd Purchase" ||$scope.transaction == "RD Purchase"){
                            
                               $scope.userit[$index].accNumbers = response[0].PurchaseAcc; 
                                 console.log(response[0].PurchaseAcc);
                                  $scope.Acc = response[0].PurchaseAcc;
                                  $scope.userit[$index].AccNo = $scope.Acc[0].AccNo ;
                         
                             }else if($scope.transaction =="Regular Sale" ||$scope.transaction == "Valuation" ){
                                //alert("regegeg")
                                $scope.userit[$index].accNumbers = response[0].SalesAcc;
                                console.log( $scope.userit[$index].accNumbers);
                                
                               $scope.Acc = response[0].SalesAcc;

                                 $scope.userit[$index].AccNo = $scope.Acc[0].AccNo ;
                             }
                          var itempuritydata = response[0].InvGroupID +","+lastdate;
                       $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                                 console.log(response)
                             $scope.irate=response; 
                             // $scope.userit[in1].irate = response
                              $scope.userit[$index].irate = response
                            })   
            
                    })
                   // if($scope.radiowithinstate == "withinstate"){
                   //                 interest1 = 0;
                   //                 interest2 = 0;  
                   //          }else if( $scope.radiowithinstate = "outofstate"){
                   //                  interest3 = 0; 
                   //          }
              break;
            }    
       
       }
   $scope.userit[$index].irate = use.purity;
                    // console.log(check)

                     $scope.getTotTaxVal();
                    // $scope.getTotTaxAmt();
                    // $scope.getFinalVal();
                    // $scope.getTotNetAmt();
                  //  saleInvoiceCalculations();
                 }//else ends here
        
        
        })

  }
    
}







// for history
$scope.history = function( ){
  // alert("history");
    console.log($scope.partyname) 
     var update=$scope.partyname;
     $http.get('/historyfetch/'+update).success(function(response)
        { 
            console.log(response)
            $scope.user = response;
        })
}
//for urd selection
var diff = 0;
var subtol = 0;
var total = 0;
var pushid = [];
$scope.myClick = function(myChkModel,item){
    // console.log(myChkModel);
    // console.log(item);
   console.log(item._id)
   console.log(item)
   if(myChkModel == true){
          console.log($scope.saleinv[0].invoiceValue);
          subtol = $scope.saleinv[0].invoiceValue;
          total += parseFloat(item.final);
          console.log(total);
          console.log(pushid); 
          console.log($scope.adjqty);
           if( total >  subtol){

                if($scope.saleinv[0].netamt == 0){
                  // alert("Net Amount is already zero you cannot add extra amount")
                  //myChkModel = false
                  
                }else{// urd amount greater then the net amt
                        $scope.adjqty = subtol
                        console.log($scope.adjqty);
                        diff = total - subtol
                        pushid.push(item._id)
                        //alert("Diff Value:"+diff)
                        console.log( diff);
                        $scope.saleinv[0].netamt = 0;
                        $scope.getTotNetAmt();
                        urdinvoice(total,diff)
                       
                     }
               
           }else{ //if if( total >  subtol
               
               alert("on selecting urd");
                   $scope.adjqty = total
                 
                   console.log(total)
                   pushid.push(item._id)
                   console.log($scope.adjqty)
                   $scope.getTotNetAmt();

                    urdinvoice(total,diff)
                 }//else  if( total >  subtol

    }else{ 
                  alert("on unselecting");
              console.log(item.final+"item.final");
              console.log(total+"total");

            total = parseInt(total) - parseInt(item.final)
            //console.log(total)
            $scope.adjqty = total
            console.log($scope.adjqty)
           // alert($scope.adjqty)
             // $scope.getTotNetAmt();
              $scope.saleinv[0].invoiceValue=parseFloat($scope.saleinv[0].subtol)-parseFloat($scope.ccamt1);
              console.log($scope.saleinv[0].invoiceValue);
              $scope.finalNetAmount($scope.saleinv[0].invoiceValue);
              $scope.saleinv[0].netamt=$scope.saleinv[0].invoiceValue;
             urdinvoice(total,diff)

        }  //else   if(myChkModel == true){
}//$scope.myClick

// urd to display invoice
var urdinvoice = function(total,diff){
     // alert("urdinvoice"+diff);
     window.sessionStorage.setItem("urdIds", JSON.stringify(pushid));
     
     window.sessionStorage.setItem("URD_ADJUSTED",total);
     window.sessionStorage.setItem("URD_BALANCE",diff);
      window.sessionStorage.setItem("URD_Total",$scope.urdAdjustmentTotal);
}
//to make window zero when not called
if(diff == 0 && subtol == 0){
 urdinvoice(0,0) 
}
// //for final adj
// $scope.adjustment = function( ){
//     alert($scope.adjqty)
// }
//var replay =null;
$scope.urd= {}

$scope.TransactionDetails = function( ){
   //for urd credit clearance
          $scope.urd = '';
          $scope.urdAdjustmentTotal = '';
    // for partynames call
     partyNamesDisplay(); 
     //clearDisplay();
    //sale and purchase
    // if($scope.transaction=='Issue Voucher'){
    //  $scope.getDetails();
    // }
    if($scope.transaction == "Urd Purchase"){
        var type = "Purchase";
         //hiding the pay button
        $scope.desgination = "Billing Person1"
        $http.get('/pct'+type).success(function(response){
             $scope.pct=response;
        })
    }else if($scope.transaction == "Regular Sale" ||$scope.transaction ==  "Valuation"){
      $scope.desgination1 = window.sessionStorage.getItem("desgination");
      $scope.desgination = $scope.desgination1;
             var type = "Sale";
             $http.get('/pct'+type).success(function(response){
                   $scope.pct=response;
                  // console.log($scope.pct[0])

             })
    }else if($scope.transaction == "RD Purchase"){
            $scope.desgination1 = window.sessionStorage.getItem("desgination");
            $scope.desgination = $scope.desgination1;
            var type = "Purchase";
          $http.get('/pct'+type).success(function(response){
               $scope.pct=response;
          })
    }
    window.sessionStorage.setItem("transact", $scope.transaction);
 
   
    
    
      //make discount and credit charges to zero when changes
      $scope.discount = null;
      $scope.ccamt = null;
      $scope.discount1 =null;
      $scope.ccamt1 = null;
      $scope.date=null;  
      $scope.idSelectedVote=null;
      $scope.datex=null; 
}//end trans
//$http.put('/saleinvoicedata12/'+update)
//orderStatus call update in batch
function updateBatch(barcode,orderStatus) {
 // alert(barcode+","+orderStatus);
  // $scope.obj= {}
  // $scope.obj[0].barcode = barcode;
  // $scope.obj[0].orderStatus = orderStatus;
  // alert($scope.obj[0].orderStatus)
   var batch = barcode+","+orderStatus;
    $http.put('/updateBatchTransaction/'+batch).success(function(response){  
               
           // $scope.useramt= parseFloat(response[0].taxval)    
     })
}//updateBatch
$scope.TransactionDetails();
$scope.user = [];
$scope.resu ;
 var flag = 0;
 //187var arrcon = [];
  // var flagCall1 = function(){
  //   alert("call me dude")
  // }
   var flagCall = function(){
    // alert("hi");
            if(flag == 0){
              $scope.payButtonDIsplay = "true";
                arrcon =[];
             // alert(" validations are clear")

        console.log( $scope.partyname)   
        $scope.user = $scope.userit;
        console.log($scope.user)

   //   var requestCallPrint  = $scope.userit.length-1;

        for(let i=0;i<=$scope.userit.length-1;i++){ 
            
               console.log($scope.userit[i])
             
               for(let j=0;j<$scope.items.length;j++){
                       //alert("inside loop Name "+$scope.items[j].Name)
                       console.log($scope.items[j])
                     if ($scope.userit[i].itemName == $scope.items[j].Name){ 
                            //alert($scope.items[j])
                            console.log($scope.items[j])
                            // alert("Hsc in  items matched"+$scope.items[j].Hsc)
                            $scope.userit[i].Hsc=$scope.items[j].Hsc;
                             $scope.userit[i].InvGroupName = $scope.items[j].InvGroupName;
                            $scope.userit[i].SaleCategory = $scope.items[j].SaleCategory;
                           
                            console.log($scope.userit[i].Hsc)
                          
                            break;
                          }
                  }//for(let j=0;j<$scope.items.length;j++){



                  // for transaction  types
                 $scope.userit[i].remarks = $scope.remarks
                 console.log($scope.userit[i].remarks)
           
                 console.log($scope.userit[i].date)
                 console.log($scope.userit[i].Transaction)
                 $scope.userit[i].Transaction = $scope.transaction
                 console.log($scope.userit[i].Transaction)
                 if($scope.userit[i].date == undefined){
                     //  $scope.userit[i].date = "2017-04-24T12:20:18.920Z"
                     $scope.userit[i].date = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
                     $scope.userit[i].Transaction = $scope.transaction
                 }
                  // $scope.userit[i].Gwt =parseFloat($scope.userit[i].gwt)
                  //            alert($scope.userit[i].Gwt)
                  //defining fields

                 var data = $scope.transaction+","+$scope.userit[i].barcodeNumber+","+$scope.userit[i].chgunt+","+$scope.userit[i].date+","+$scope.userit[i].desc+","
                     +$scope.userit[i].final+","+$scope.userit[i].gpcs+","+$scope.userit[i].gwt+","+$scope.userit[i].itemName+","+$scope.userit[i].ntwt+","+$scope.partyname+","
                     +$scope.userit[i].size+","+$scope.userit[i].taxval+","+$scope.userit[i].taxamt+","+$scope.userit[i].stwt+","+$scope.userit[i].wastage+","+$scope.userit[i].stval+","
                     +$scope.userit[i].labval+","+$scope.userit[i].rate +","+ $scope.userit[i]._id +","+$scope.userit[i].StockFrom+","+$scope.userit[i].StockTo+","
                     +$scope.userit[i].withinstatecgst+","+$scope.userit[i].withinstatesgst +","+ $scope.userit[i].outofstateigst;
                 console.log(data)
                 console.log($scope.userit[i])
                 console.log($scope.transaction)
       
       
                  if($scope.userit[i]._id!=null){  
                      // alert("id is not null")
                      // alert("save entered $scope.userit[i]._id!=null "+$scope.userit[i]._id)
                      // console.log("$scope.userit[i]._id!=null");
                       //console.log($scope.userit[i])
                       var ordstatus = $scope.userit[i].orderStatus
                       //console.log($scope.userit[i].orderstatus)
                       //console.log($scope.userit[i]._id)
                        // $scope.userit[i]._id = null;
                       // console.log($scope.userit[i]._id)
                       if($scope.userit[i].orderStatus == "available"){
                        // if($scope.transaction!="Approval Out"){
                           // alert("entered into orderstatus available")
                             $scope.userit[i]._id = null;
                             
                             $scope.userit[i].partyname=$scope.partyname;
                               // $scope.userit[i].stockPoint ="URD treasure"
                             $scope.userit[i].stockInward = "no" ;
                              if($scope.transaction!='Approval Out'&& $scope.transaction!='Opening Stock'){
                                      $scope.userit[i].orderStatus = "Inprogress";
                                     
                               }
                               // else if($scope.transaction=="Urd Purchase"){
                               //  $scope.userit[i].orderStatus = "completed";
                               //  $scope.userit[i].stockInward='yes';
                               // }
                               else{
                                 // alert("change barcode");
                                  $scope.userit[i].orderStatus = "completed";
                                  $scope.userit[i].stockInward='no';
                                  updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                               }
                                      $scope.userit[i].billType =  $scope.billtype;
                             
                                  // }
                             if($scope.transaction!="Approval Out"){
                             $http.post('/insertUseritDetails',$scope.userit[i]).success(function(response){
                                    // alert(response)
                                        updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus); 
                                        console.log(response)
                                        // if($scope.transaction=="Approval Out"){

                                        
                                    // }
                                         $scope.userit[i]._id = response._id;
                                         console.log($scope.userit[i]._id );
                                      if($scope.transaction!="Sale Return"&&$scope.transaction!="Purchase return"){
                                      $scope.idUpadtesCall(response._id);
                                          }
                                    // accountAndPurityCall(i,response.itemName)
                                  $scope.userit[i]._id = response._id;
                                 // $scope.id1= response._id ;
                                    //  arrcon.push(response._id)
                                      console.log(arrcon);
                                     // alert(arrcon)
                                       var update=$scope.partyname+","+$scope.transaction;
                                       // $http.get('/transdetails/'+update).success(function(response)
                                       //       { 
                                       //          console.log(response)
                                       //           //$scope.userit[i] = response;
                                       //          $scope.user=$scope.userit;
                                    
                                       //        })

                                   })
                                }
                                else{
                                  $http.post('/insertUseritDetails',$scope.userit[i]).success(function(response){

                                       console.log(response)
                                        arrcon.push(response._id);
                                      console.log(arrcon); 
                                      window.sessionStorage.setItem("userids",JSON.stringify(arrcon)); 
                                        });

                                }
                                   // if($scope.transaction == 'Approval Out'){
                                  //   for(var p=0;p<arrcon.length;p++){
                                  //   alert("aproval in");
                                  //   var id1=arrcon[p];
                                  //   // $scope.appdata=$scope.transaction+","+$scope.partyname;
                                  //   alert(id1);
                                  //   $http.put('/approvalupdate'+id1).success(function(response){
                                  //     console.log(response);
                                  //   })
                                  //   $http.put('/updateUseritCall',$scope.userit[i]).success(function(response)
                                  //     {
                             
                                  //              console.log(response);
                                  //               updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                                  //           $scope.idUpadtesCall($scope.userit[i]._id);
                                  //     })
                                  // }
                                  // }
                                // }
                                // else{
                                //   alert("Approval out");
                                //     $http.post('/approvalinsert',$scope.userit[i]).success(function(response){
                                //       console.log(response);
                                //     })
                                // }

                        }else if($scope.userit[i].orderStatus == "Inprogress"){
                                 //  alert("entered into orderstatus Inprogress")

                                    $scope.userit[i].billType =  $scope.billtype;
                             
                                  $scope.userit[i].partyname= $scope.partyname;
                                    //if()
                                if($scope.transaction =="RD Purchase"){
                                    // $scope.userit[i].refidRD = $scope.refId;
                                    $scope.userit[i].orderStatus="completed";
                                  }
                                  $scope.userit[i]._id = $scope.userit[i]._id;
                                  var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward+","+$scope.userit[i].Hsc+
                               ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+
                               ","+$scope.userit[i].stonecal+","+$scope.userit[i].salesPerson +","+$scope.userit[i].AccNo +","+$scope.userit[i].labourTaxValue+
                               ","+$scope.userit[i].labamt+","+$scope.userit[i].urdAdjustment+","+$scope.userit[i].stchg +","+$scope.userit[i].comboItem +","+$scope.userit[i].mrp +
                                ","+ $scope.userit[i].billType+","+$scope.userit[i].taxSelection+","+$scope.userit[i].refId+","+$scope.userit[i].InvGroupName +
                                ","+ $scope.userit[i].SaleCategory+","+$scope.userit[i]._id+","+$scope.userit[i].barcode+","+$scope.userit[i].orderStatus; 
                                 console.log(data1)
                               //$http.post('/savedata1/'+data1)
                                // $http.put('/updateUseritCall',$scope.userit[i]).success(function(response)
                                

                                 $http.put('/updateSaveData/'+data1).success(function(response)
                                      {
                                              //   alert("Inprogress "+$scope.userit[i]._id);
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
                                                console.log(response);
                                                updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                                                $scope.idUpadtesCall($scope.userit[i]._id);
                                      })

                         }else if($scope.userit[i].orderStatus == "completed"){
                                        //alert("completed");
                                   //console.log("completed then update ")
                                   //console.log( $scope.userit[i].barcode)
                                      // if($scope.userit[i].barcode == undefined){
                                   //     console.log("this is non barcode item")
                                    // }
                                  // var new1 = data+","+$scope.userit[i].orderStatus;
                                    $scope.userit[i].billType =  $scope.billtype;
                                    // if($scope.transaction =="RD Purchase"){
                                    //        $scope.userit[i].refidRD = $scope.refId;
                                    //  }
                                    if($scope.transaction == "Sale Return"||$scope.transaction=="Purchase Return"||$scope.transaction=="Approval Out") {
                                         console.log($scope.userit[i]);
                                         // alert("sale return")
                                        arrcon=[];
                                       // alert(arrcon.length+"   length outside");
                                         if($scope.transaction == "Sale Return"){
                                          $scope.userit[i].stockInward='yes';
                                         }
                                         else{
                                          $scope.userit[i].stockInward='no';
                                         }
                                         for(var g=0;g<$scope.voucherid.length;g++){
                                          // alert("entered for");
                                                     if($scope.voucherid[g].id==$scope.userit[i]._id){
                                                           // alert(arrcon.length+"  length inside");

                                                           // alert("i am in flagcall"+g);           
                                                         updateBatch($scope.userit[i].barcode,"available");
                                                                    $http.put('/insertNewUseritDetails',$scope.userit[i]).success(function(response){
                                                                   // alert("sale return");
                                                                    console.log(response+"new row");
                                                                    // if(arrcon.indexOf(_id)==-1){
                                                                      // alert("arrcon");

                                                                              // $scope.printId();
                                                                        arrcon.push(response._id)
                                                                      // alert(arrcon.length+"  length inside");
                                                                     console.log(arrcon);
                                                                      // }
                                                                         window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
// =======
//                                                                      arrcon.push(response._id)
//                                                                       // alert(arrcon.length+"  length inside");
//                                                                      console.log(arrcon);
//                                                                       // }
//                                                                       window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6
                                                                     // alert(arrcon+"1");
                                                                    });
                                                          console.log($scope.voucherid[g].id);
                                                          $scope.namess=$scope.voucherid[g].id;
                                                      
                                                                    $http.put('/changeOrderStatus'+$scope.namess).success(function(response){
                                                                      console.log(response);
                                                                    });
                                                       }
                                          }//for closer
                                                   
                                      }


                                                       else{
                                                        if($scope.transaction=="Approval Return"){
                                                          $scope.userit[i].stockInward="yes";
                                                        }
                                                                $http.put('/updateUseritCall',$scope.userit[i]).success(function(response){ 
                                                                  console.log(response);
                                                                 // alert(arrcon+"222222222222");
                                                                // $scope.idUpadtesCall($scope.userit[i]._id);
                                                                 })
                                                           }
                                                
                                         
                                        }
                       
                                      }else{
                                        // alert("else");
                          // console.log("this is main else loop");
                          // alert("$scope.userit[i]._id else =null");
                         console.log($scope.userit[i]);
       //                     $scope.urdPurchaseStockPoint = response[0].urdPurchaseStockPoint ;
       // $scope.rdPurchaseStockPoint = response[0].rdPurchaseStockPoint ;
     
                         $scope.userit[i].partyname=$scope.partyname;
                         if($scope.transaction == "Urd Purchase"){
                             // $scope.userit[i].orderStatus = $scope.urdPurchaseStockPoint ;
                               $scope.userit[i].stockInward = "yes";
                               $scope.userit[i].urdAdjustment = $scope.userit[i].final ;
                           }
                          // }else if($scope.transaction=='Sale Return'){
                          //   $scope.userit[i].stockInward="yes";
                          // }
                          // else if($scope.transaction=='Purchase Return'){
                          //   $scope.userit[i].stockInward="no";
                          // }
                          else if($scope.transaction =='Issue Voucher'){
                            $scope.userit[i].stockInward = "no";
                            $scope.userit[i].orderStatus = "completed";
                          }else if($scope.transaction == "RD Purchase"){
                                // $scope.userit[i].stockPoint = $scope.rdPurchaseStockPoint ;
                                 $scope.userit[i].stockInward = "yes";
                                 $scope.userit[i].refId=$scope.refId;
                               }else if($scope.transaction == 'Receipt Voucher'||$scope.transaction == 'Opening Stock'){
                                // console.log($scope.refId+"$scope.refId");
                                //   $scope.userit[i].refId=$scope.refId;
                                  // alert($scope.userit[i].refId);
                                  $scope.userit[i].stockInward = "yes";
                                  $scope.userit[i].orderStatus = "completed";
                               }
                               else if($scope.transaction == 'Approval Out'||$scope.transaction=='Approval Sale'){
                                $scope.userit[i].orderStatus="completed";
                                $scope.userit[i].stockInward="no";
                               }
                               else if($scope.transaction=='Approval Return'){
                                $scope.userit[i].stockInward="yes";
                               }
                               else{
                                // $scope.userit[i].stockPoint = $scope.regularSaleStockPoint ;
                                 $scope.userit[i].stockInward = "no";
                               }
                 
                              // if($scope.transaction =="Urd Purchase"){
                              //   $scope.userit[i].urdAdjustment = $scope.userit[i].final ;
                              //  }
                                $scope.userit[i].billType =  $scope.billtype;
                             
                               console.log(data)
                               //alert("hscc "+$scope.userit[i].Hsc)
                               var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward+","+$scope.userit[i].Hsc+
                               ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+
                               ","+$scope.userit[i].stonecal+","+$scope.userit[i].salesPerson +","+$scope.userit[i].AccNo +","+$scope.userit[i].labourTaxValue+
                               ","+$scope.userit[i].labamt+","+$scope.userit[i].urdAdjustment+","+$scope.userit[i].stchg +","+$scope.userit[i].comboItem +","+$scope.userit[i].mrp +
                                ","+ $scope.userit[i].billType+","+$scope.userit[i].taxSelection+","+$scope.userit[i].refId+","+$scope.userit[i].InvGroupName +","+ $scope.userit[i].SaleCategory+","+$scope.userit[i]._id; 
                                 console.log(data1)
                               //  var date3 = new Date()
                                 $http.post('/savedata1/'+data1).success(function(response){
                         
                                 console.log(response);

                                  // $scope.userit[i]._id = response._id;
                                 // alert("save "+$scope.userit[i]._id);
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
                                   if($scope.transaction=="Regular Sale"){
                                     $scope.userit[i].orderStatus = "Inprogress";
                                   }
                                 $scope.idUpadtesCall(response._id);
// <<<<<<< HEAD
                                 if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"
                                  &&$scope.transaction!='Approval Out'&&$scope.transaction !='Approval Return'){
                                  $scope.userit[i]._id = response._id;
                                }

                                // if($scope.transaction=='Approval Out'){

                                //   console.log(arrcon);
                                //   window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
                                // }
                                // if($scope.transaction == 'Approval Return'){
                                //   arron.push(response._id);
                                //   window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
                                //     alert(arrcon+"approval return");
                                // }

                                 // console.log(response._id);
                                 console.log(response);

                                  if($scope.transaction =="Urd Purchase"){
                                       var update=$scope.partyname+","+"Urd Purchase";
                                       console.log(update)
                                       $http.get('/transdetails/'+update).success(function(response)
                                           { 
                                             console.log(response)
                                             $scope.urd = response;
                                             //$scope.urd = response;
                                             var urdAdjustmentLength = $scope.urd.length;
                                             $scope.urdAdjustmentTotal = 0;
                                             console.log(response[0].date)
                                             for(let p =0;p<urdAdjustmentLength;p++){
                                                 $scope.urdAdjustmentTotal =( parseFloat($scope.urdAdjustmentTotal)+ parseFloat(response[p].urdAdjustment)).toFixed($scope.rupeesDecimalPoints);
                     
                                               }
                                                                                       }) 
                                           } 

                                         
                                 // $scope.getDetails();
                                    


                          }); 

                                 
                         
                       }

                  
                       console.log("i           "+i);
                        $scope.dataTargetCall = "#myModal1" ;

          //for print call
          if(i == $scope.userit.length-1 ){
                   
                         if ($scope.transaction == "Valuation"||$scope.transaction == 'Opening Stock') {
                              // alert("if in if");
                            $scope.valuationPrint();
                             // flagCall();
                          }
                         // flagCall();
                           if($scope.transaction == "Receipt Voucher"||$scope.transaction == "Sale Return"||$scope.transaction == "Purchase Return"

                            ||$scope.transaction == "Issue Voucher"||$scope.transaction=="Approval Out"

                            ||$scope.transaction=='Approval Return'){
                            
                           // alert("through approval");
                             $scope.inoviceNumberGeneration();

                             setTimeout($scope.valuationPrint(), 1000);


                            }
          
                   }
         }//for loop closer

       


        if($scope.transaction != 'Issue Voucher' && $scope.transaction != 'Receipt Voucher'
          &&$scope.transaction!='Approval Out'&&$scope.transaction !='Approval Return'&&
          $scope.transaction!='Opening Stock'){
             saleInoviceDataCall();
        }


          if (payAlert != true) {
              // if($scope.transaction !="Valuation"&&$scope.transaction != 'Receipt Voucher'&&$scope.transaction !='Approval Return'&&
              //   $scope.transaction != 'Issue Voucher'&&$scope.transaction != 'Receipt Voucher'&&$scope.transaction != 'Sale Return'&& $scope.transaction != 'RD Purchase'){
              //     alert("Order Saved Successfully");
              //  }
               // if($scope.transaction !="Valuation"&&$scope.transaction != 'Receipt Voucher'&&$scope.transaction !='Approval Return'&&
               //  $scope.transaction != 'Issue Voucher'&&$scope.transaction != 'Receipt Voucher'&&$scope.transaction != 'Sale Return'&& $scope.transaction != 'RD Purchase'){
               //    alert("Order Saved Successfully");
               // }
                if($scope.transaction =="Regular Sale" || $scope.transaction == 'Approval Sale'){
                  alert("Order Saved Successfully");
                }
          }
 
           
     }
     // else{
     //           // alert(" validations issues please check")
     //          }

   }

   function saleInoviceDataCall() {
    // alert("sale invoice Data call");
   //if($scope.transaction != "Issue Voucher"){

                 if($scope.saleinv[0]._id == null){
                          // regular sale
                       if($scope.transaction!="Sale Return"&& $scope.transaction != "Purchase Return" && $scope.transaction != 'Issue Voucher'){
                              // alert("if within if 7777755555555555588888");
                            console.log("enterd into null saleinv")   
                            $scope.saleinv[0].partyname=$scope.partyname;
                            $scope.saleinv[0].status="In Progress";
                            $scope.saleinv[0].date = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
                            //$scope.saleinv[0].decimals = $scope.decimals ;
                            $scope.saleinv[0].roundOffValue = $scope.decimals ;
                            //$scope.saleinv[0].dis = $scope.discount ;
                            $scope.saleinv[0].discount = $scope.discount ;
                            $scope.saleinv[0].cardCharges = $scope.ccamt ;
                            $scope.saleinv[0].charges = $scope.ccamt1 ;

                            console.log($scope.saleinv);
                               //alert("id null "+$scope.saleinv);
                            $scope.saleinv[0].billtype = $scope.billtype;
                              //alert(" new $scope.saleinv[0].billtype "+$scope.saleinv[0].billtype);

                            $http.post('/saleinvoicedata',$scope.saleinv).success(function(response){
                                  // alert("saved successfully $scope.saleinv[0]._id==null");
                                console.log(response);
                                console.log(response[0]._id);
                                $scope.saleinv[0]._id = response[0]._id;
                                window.sessionStorage.setItem("saleinvoicedata_id",response[0]._id);
                                 // if($scope.transaction =="RD Purchase"){
                                 //   // alert("RD when id is"+response[0]._id);
                                 //     setTimeout($scope.inoviceNumberGeneration(),3000);
                                 //      // setTimeout($scope.valuationPrint(),1000);
                                 //   }
                                   if($scope.transaction=="Urd Purchase"){
                                    $scope.inoviceNumberGeneration();
                                   }
                                // window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
                            }); // $http.
                        } //if($scope.transaction!="Sale Return"&& $scope.transaction != "Purchase Return" && $scope.transaction != 'Issue Voucher'){
                    
                          else{
                                     // alert("else within if");
                                  $scope.voucher=window.sessionStorage.getItem("vin");
                                  $scope.needs=$scope.voucher+","+$scope.partyname;
                                  $http.get('/myneeded/'+$scope.needs).success(function(response){
                                         console.log(response);
                                        console.log(response[0].taxableval);
                                        console.log(response[0].tax);
                                        console.log(response[0].dis);
                                        console.log(response[0].subtol);
                                        console.log(response[0].char);
                                        console.log(response[0].adj);
                                        console.log(response[0].invoiceValue);
                                        console.log(response[0].netamt);
                                        var taxable=$scope.saleinv[0].taxableval;
                                        var tax=$scope.saleinv[0].tax;
                                        var sub=$scope.saleinv[0].subtol;
                                        var invoice=$scope.saleinv[0].invoiceValue;
                                        $scope.taxable1=(response[0].taxableval- taxable);
                                        console.log($scope.taxable1);
                                        $scope.tax1=(response[0].tax-tax);
                                         console.log($scope.tax1);
                                        $scope.subtol1=(response[0].subtol-sub);
                                         console.log($scope.subtol1);
                                        $scope.invoice=(response[0].invoiceValue-invoice);
                                         console.log($scope.invoice);
                                        $scope.net=(response[0].netamt-invoice);
                                          console.log($scope.update2);
                                         var mynewvalues=$scope.taxable1+","+$scope.tax1+","+$scope.subtol1+","+$scope.invoice+","+$scope.net+","+$scope.partyname+","+$scope.voucher;
                                         console.log(mynewvalues);
                                         $http.put('/salesnew/'+mynewvalues).success(function(response){
                                                   console.log(response);
                                                  // console.log("aaaaaaaaaaaaaaaaaaaaa");
                                         });
                  
                                 });
                               
                              }//else

                }//id == null
                        //  }
                  else{

                            console.log("enterd into not null saleinv")
                            // alert("enterd into not null saleinv")
                           // if($scope.transaction=="RD Purchase"){
                           //    $scope.saleinv[0].status="completed";
                           //  }
                            // else{
                           $scope.saleinv[0].status="In Progress"
                         // }
                            $scope.saleinv[0].partyname=$scope.partyname;
                            var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
                            +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
                            +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals+","+$scope.transaction+","+$scope.discount+","+$scope.ccamt+","+$scope.ccamt1;
                            console.log(update)

                              //alert(" tdeydddchjdchuj reurfrru n")
                            //$scope.saleinv[0].roundOffValue = $scope.decimals ;
                            //$scope.saleinv[0].dis = $scope.discount ;
                            // $scope.saleinv[0].discount = $scope.discount ;
                            // $scope.saleinv[0].cardCharges = $scope.ccamt ;
                            // $scope.saleinv[0].charges = $scope.ccamt1 ;

                            // alert(" update update .saleinv[0].billtype "+$scope.saleinv[0].billtype);

                           // alert($scope.saleinv[0].char);
                           console.log($scope.saleinv[0]._id);
                             window.sessionStorage.setItem("saleinvoicedata_id",$scope.saleinv[0]._id);
                                $scope.saleids=$scope.saleinv[0]._id;
                                window.sessionStorage.setItem("siid",JSON.stringify($scope.saleids));
                            $http.put('/saleinvoicedata12/'+update).success(function(response){
                                      
                            })
                  }//if else closer($scope.saleinv[0]._id == null)
     
   }// saleInoviceDataCall closer

var payAlert = null;

//date validation
$scope.dateValid=function(){
  // alert("date")
   if($scope.transaction=='Regular Sale'){
                    // alert("regular")
                    $scope.transdate=new Date();
                var fromdate  = new Date(((new Date($scope.transdate).toISOString().slice(0, 23))+"-05:30")).toISOString();

                   // $scope.person=$scope.transaction+","+$scope.partyname;
                    $http.get('/getdate'+$scope.transaction).success(function(response){
                      console.log(response);
                      var lastdata=response[0].date;
                       $scope.ldata=lastdata;
                       alert(Date.parse(lastdata)+"last"+",,,,"+Date.parse(fromdate)+"selected");
                    });
                    if((Date.parse(fromdate)>=Date.parse($scope.ldata))){
                      // alert("please select greater date then previous date");
                        // break;
                        $scope.save();
                    }
                    else{
                      alert("please select greater date then previous date");
                    }
                  }
                    else{
                      // alert("else");
                            $scope.transdate=new Date();
                var fromdate  = new Date(((new Date($scope.transdate).toISOString().slice(0, 23))+"-05:30")).toISOString();

                    }
                   
}//end of function
//for calender
// $scope.showcalendar = function ($event) {
//                 $scope.showdp = true;
//             };
            // $scope.showdp = false;
  $scope.save=function(pay){

    arrcon = []
    flag = 0 ;
    $scope.dataTargetCall = "";

    if (pay == true) {
        payAlert = true;
      //alert(" true")
    }else{
        payAlert = false;
    }
        //alert($scope.item.barcode);$scope.partyname
        window.sessionStorage.setItem("remarks",$scope.remarks);
       //  $scope.userit[0].partyname = $scope.partyname;
        console.log($scope.userit);

        console.log($scope.userit.length);
        //validation purpose
        // alert($scope.userit.length);
        if(flag == 0){

          if (0 == $scope.userit.length) {
                       // do stuff
                       alert("Please Select Mandatory Fields");
                       return;
                   }
                 
             for(let i=0;i<=$scope.userit.length-1;i++) {  
              // if($scope.transaction!="Approval Sale"){
                    $scope.userit[i].billtype = $scope.billtype;
                    if ($scope.userit[i].billtype == '') {
                      $scope.userit[i].billtype ="Credit";
                    };
                  // }
                   if($scope.userit[i].itemName == null || $scope.userit[i].itemName == undefined || $scope.userit[i].itemName =="" )
                   {
                      alert("Please Select Item");
                      flag = 1;
                       return;
                   }
                   if($scope.transaction!="Valuation"){
                       if( $scope.userit[i].stockPoint ==null||$scope.userit[i].stockPoint==undefined||$scope.userit[i].stockPoint =="" ){
                       
                             alert("Please Select Stock Pt")
                             flag = 1;
                             return;
                         
                         }
                      }
                        if($scope.transaction!='Opening Stock'){
                     if( $scope.partyname ==null||$scope.partyname ==undefined||$scope.partyname =="" ){
                     
                           alert("Please Select Partyname")
                           flag = 1;
                                  //return;
                       
                        }
                      }
                        if($scope.transaction=="Sale Return" || $scope.transaction=="Purchase Return"
                    ||$scope.transaction=="Approval Sale"){
                             //alert($scope.checklength+"in save");
                            if($scope.checklength==0){
                              alert("please select the checkbox");
                              flag=1;
                              return;
                            }


                    }
                   //for matching date
                  
                      if($scope.date==null||$scope.date==undefined||$scope.date==" "){
                        alert("please select date");
                        flag=1;
                      }
                 
                      if($scope.userit[i].purity == null || $scope.userit[i].purity == undefined || $scope.userit[i].purity =="")
                       {
                        alert("Please Select Purity");
                        flag = 1;
                        return;
                       }
                       var gwt5=parseFloat($scope.userit[i].gwt)
                     if($scope.userit[i].gwt == null || $scope.userit[i].gwt == undefined || $scope.userit[i].gwt =="" || gwt5 == NaN)
                       {
                         alert("Please Select Proper Gross Weight");
                         flag = 1;
                         return;
                      }
               //  }
               

                if($scope.userit[i].gpcs == null || $scope.userit[i].gpcs == undefined || $scope.userit[i].gpcs =="" )
                  {
                      alert("Please Select Proper Gpcs");
                      flag = 1;
                      return;
                   }
                 if($scope.userit[i].uom == undefined  )
                   {
                     $scope.userit[i].uom = "Gms"; 
                   }
                   if($scope.userit[i].taxSelection == null || $scope.userit[i].taxSelection == undefined || $scope.userit[i].taxSelection =="" )
                  {  
                      if ($scope.transaction != "Urd Purchase") {
                              alert("Please Select Tax");
                            flag = 1;
                            return;
                      }
                      

                   }

                   // var checkv;
                   // if($scope.transaction=="Sale Return" || $scope.transaction=="Purchase Return"
                   //  ||$scope.transaction=="Approval Sale"){
                   //           alert($scope.checklength+"in save");
                   //          if($scope.checklength==0){
                   //            alert("please select the checkbox");
                   //            flag=1;
                   //            return;
                   //          }


                   //  }
                if($scope.userit[i].salesPerson == null || $scope.userit[i].salesPerson == undefined || $scope.userit[i].salesPerson =="" )
                  {
                      alert("Please Select Sales person");
                      flag = 1;
                      return;
                   }

                   // if($scope.transaction !='Issue Voucher' && $scope.transaction !='Receipt Voucher'&&
                   //  $scope.transaction !='Approval Out' && $scope.transaction != 'Approval Return'){
                       if($scope.transaction=="Approval Sale"){

                                // alert("AS")
                                if($scope.userit[i].AccNo == null || $scope.userit[i].AccNo == "undefined"||$scope.userit[i].AccNo == undefined || $scope.userit[i].AccNo =="" )
                                  {
                               // if($scope.transaction=="Approval Sale"){
                                // alert("ASinner")
                                alert("Please Select Acc No");
                                flag = 1;
                                return;
                               }
                        }
                   if($scope.refId == null || $scope.refId == undefined || $scope.refId =="" ){  

                      if ($scope.transaction == "RD Purchase") {
                        alert("Please Select Refid");
                      flag = 1;
                      return;
                      }

                      
                   }
             
                 if(i == $scope.userit.length-1 ){
                   
                //          if ($scope.transaction == "Valuation") {
                //               // alert("if in if");
                //             $scope.valuationPrint();
                //              // flagCall();
                //           }\
                           flagCall();
                //            if($scope.transaction == "Receipt Voucher"||$scope.transaction == "Sale Return"||$scope.transaction == "Purchase Return"

                //             ||$scope.transaction == "Issue Voucher"||$scope.transaction=="Approval Out"

                //             ||$scope.transaction=='Approval Return'){
                            
                //            // alert("through approval");
                //              $scope.inoviceNumberGeneration();
                //                  setTimeout($scope.valuationPrint(), 1000);

                //             }
          
                    } 
                  
                                 if($scope.transaction=="Approval Sale" && $scope.indexSelected.length!=null){
                                
                                     console.log($scope.userit.length);
                                     console.log($scope.voucherid.length);
                                   $scope.availableGroups = (function () {
                                    var assignedGroupsIds = {};
                                    var groupsIds = {};
                                    var result = [];
                                      console.log("available");
                                    $scope.userit.forEach(function (el, i) {
                                      console.log("userit");
                                      assignedGroupsIds[el._id] = $scope.userit[i];
                                       console.log(assignedGroupsIds);
                                    });

                                    $scope.voucherid.forEach(function (el, i) {
                                      console.log("voucherid"+$scope.voucherid[i]);
                                      groupsIds[el.id] = $scope.voucherid[i];
                                      console.log(groupsIds);
                                    });

                                    for (var i in groupsIds) {
                                        if (assignedGroupsIds.hasOwnProperty(i)) {
                                          console.log("hi");
                                            result.push(assignedGroupsIds[i]);
                                            console.log(result);
                                             window.sessionStorage.setItem('myapp',JSON.stringify('result'));
                                        }
                                    }
                                      console.log("end"+result);
                                  return result;    
                                }());
                                   console.log($scope.availableGroups);
                                    $scope.userit=$scope.availableGroups;
                                    // if($scope.transaction!="Sale Return"&&$scope.transaction!="Purchase Return"){
                                     if($scope.transaction=="Approval Sale"){
                                      // alert("in save appsale");
                                      arrcon=[];
                                      for(j=0;j<$scope.availableGroups.length;j++){
                                        
                                         $scope.idUpadtesCall($scope.availableGroups[j]._id);
                                      }
                                     // }
                                     }    
                                              flagCall();
                                          
                                 }

              }
        }
        
     } //save function closer
      //only for transaction valuation
       $scope.valuationPrint = function(){
            // alert("vadskjdrfjk");
             const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $window.location.href = "pdf.html"; 
                         }, 500);
       }
    //for confirm the page
        $scope.inoviceNumberUrd= function(){
          if($scope.transaction == "Urd Purchase"){
                $window.location.href = "pdf.html"; 
            }
        }
        $scope.inoviceNumberGeneration= function(){
            // alert(arrcon);
            // alert("invoice number generation")
          var customerDetails = $scope.transaction+","+$scope.partyname;

          var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");

         if($scope.transaction == "Issue Voucher" || $scope.transaction == "Receipt Voucher"||$scope.transaction=="Approval Return"
              ||$scope.transaction == "Sale Return"|| $scope.transaction == "Purchase Return"||$scope.transaction=="Approval Out"){
                             // alert("hi");
                              // var appro=window.sessionStorage.getItem("userids");
                              // console.log(appro);
                              if($scope.transaction=="Approval Return"){
                                arrcon=JSON.parse(window.sessionStorage.getItem("userids"));
                               var arrcon1=JSON.parse(window.sessionStorage.getItem("userids"));
                               console.log(arrcon.length);
                               console.log(arrcon1.length);
                              }
                               // alert("issue voucher no"+appro);
                         //    $http.get('/trCollectionCreation',{params:{"salesIds":saleinvoice_id,"userIds":user1,"trail":"yes"}}).success(function(response){  
                         // })    
                $http.get('/getprefix',{params:{transaction:$scope.transaction,invoiceVoucher:$scope.inVoiceSeries}}).success(function(response){
                  console.log(response);
                   $scope.invoice = response;
                                         // $scope.invoice = response.prefix+response.typeno;  
                                                            console.log($scope.invoice);
                                                            // alert(arrcon+"while assign");
                                                   console.log(arrcon+"myids myids myids myidsmyids");
                                                      
                                                       console.log(arrcon.length);
// <<<<<<< HEAD

                                                         // if($scope.transaction!='Approval Sale'){
                                                               // alert("not sale");                   
                                                         for(var j=0;j<arrcon.length;j++){
                                                         // user1 = window.sessionStorage.getItem("userids2[o]");
                                                         console.log(arrcon[j]);
                                                       user1=arrcon[j];

                                                       var usecase = user1 +","+$scope.invoice; 
                                                            console.log(usecase);
                                                            $http.post('/user12/'+usecase).success(function(response){
                                                                       console.log(response);
                                                                       //alert(response)
                                                            }) ;
                                                        }
                });
                          $scope.userit=[];
        }

          else{
// <<<<<<< HEAD
                // alert("else zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
           var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");
            //alert("else");JSON.parse(window.sessionStorage.getItem("userids"));
           // var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");
                           // if($scope.transaction=='RD Purchase'){
                           //  alert("when RD");
                           //    setTimeout(function(){
                           //                  console.log("THIS IS");
                           //              }, 5000);
                                // function sleep(ms) {
                                //   return new Promise(resolve => setTimeout(resolve, ms));
                                // }

                                // async function demo() {
                                //   console.log('Taking a break...');
                                //   await sleep(2000);
                                //   console.log('Two second later');
                                // }

                                // demo();
                            // }
                                console.log(saleinvoice_id )
                                // var saleInvoiceData = saleinvoice_id +","+$scope.invoice;+","+$scope.invoice
                                var saleInvoiceData = saleinvoice_id ;     
                                // alert(saleInvoiceData+"saleInvoiceData");    
                                $http.get('/getSaleInvoicedata/'+saleInvoiceData ).success(function(response){
                                        // $scope.mylinkPdf = "pdf.html";
                                        console.log(response);
                                        var latestVoucherNo = response[0];
                                        // alert("latestVoucherNo"+latestVoucherNo);
                                       if (response.length == 0) {
                                          
                                          // $http.get('/getinvoice'+$scope.transaction).success(function(response){
                                           
                                            $http.get('/getprefix',{params:{transaction:$scope.transaction,invoiceVoucher:$scope.inVoiceSeries}}).success(function(response){
                                                      console.log(response);
                                                     // alert(" response "+response)          // invoice =response[0];
                                                     // console.log( response[0])
                                                     // prefix = invoice.TransactionPrefix;
                                                     // typeno = invoice.StartingTransactionTypeNo;

                                                     // console.log( invoice.TransactionPrefix)
                                                     // console.log( invoice.StartingTransactionTypeNo)
                                                     // var updat = invoice.TransactionPrefix+","+invoice.StartingTransactionTypeNo;
                                     
                                                    // $http.get('/transactionsto/'+updat).success(function(response){ 
                                                      
                                                           //  console.log("i got replay")
                                                           //  console.log(response);
                                                           // // alert(response+"response");
                                                           //  var num = response+1;
                                                           // // alert(num+'num');
                                                           //  var updat =invoice.TransactionPrefix+","+num;
                                                           //  // $http.post('/transactionstoc/'+updat).success(function(response){ 
                                                             
                                                            //         console.log("i got replay")
                                                            //         console.log(response);
                                                            //         console.log(response.prefix);
                                                            //         console.log(response.typeno);
                                                                    $scope.invoice = response;
                                                                      // alert("invoice"+$scope.invoice);
                                                                    console.log($scope.invoice);
                                                                    // if( editedInvoiceCheck == "true"){
                                                                    //     $scope.invoice = editedInvoice ;
                                                                    // } 

                                                                    var user1 = JSON.parse(window.sessionStorage.getItem("userids"));
                                                                        // alert(" generate new "+ user1 + user1.length)
                                                                    var usecase = user1 +","+$scope.invoice; 
                                                                    // alert(usecase+"voucherNo");
                                                                    console.log(user1)
                                                                    $http.post('/user12/'+usecase).success(function(response){
                                                                               console.log(response);
                                                                               //alert(response)
                                                                    }) 
                                                                    var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");
                                                                    console.log(saleinvoice_id )
                                                                    var saleInvoiceData = saleinvoice_id +","+$scope.invoice;       
                                                                    $http.post('/saleInvoiceInvoice/'+saleInvoiceData ).success(function(response){
                                                                            // $scope.mylinkPdf = "pdf.html";
                                                                           // alert("updated sale voucher number");
                                                                            if($scope.transaction == "Urd Purchase"){
                                                                             $window.location.href = "pdf.html"; 
                                                                            }
                                                                             console.log($scope.mylinkPdf)
                                                                             console.log(response);

                                                                    }) 

                                                           // })                   
                                                    // }) 
                                                })//getinvoice closer
                                               if($scope.transaction=='Regular Sale'||$scope.transaction == 'RD Purchase'){
                                                // alert($scope.billtype+"  sssssssss   "+$scope.partyname+"  zzzzz   "+$scope.invoice);
                                                    setTimeout($scope.confirmOrder1($scope.billtype,$scope.partyname,$scope.transaction),6000);
                                                 }
                                        }else{
                                         
                                         // $scope.invoice = latestVoucherNo.voucherNo ;
                                              // alert("  else  "+latestVoucherNo.voucherNo);
                                           var user1 = JSON.parse(window.sessionStorage.getItem("userids"));
    
                                          var usecase = user1 +","+latestVoucherNo.voucherNo; 
                                          console.log(user1);
                                       //   alert(" update existing "+"user1 "+user1.length)
// <<<<<<< HEAD
                                $http.post('/user12/'+usecase).success(function(response){
                                           console.log(response);
                                           //alert(response)
                                }) 
                                        }
                                       
                                         console.log($scope.mylinkPdf)
                                         console.log(response);

                                })
            }//else open
                  
                              
    }//main closer
   

$scope.user = {};
var tpcs = null;
 var twgt =null;
  var gwt = null;
  var gpcs = null;
 
  $scope.invoices=function()
  {
    console.log($scope.user);
   
               var defer=$q.defer();
          if($scope.userit[0].salesPerson!=null)
          {
         
           console.log("clicked on confirm");
       console.log($scope.user);
       window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
        
       var update=$scope.partyname+","+$scope.transaction;
       //  alert("party")
       $http.put('/saleinvoicedataconfirm/'+update).success(function(response){
                // $scope.result=response;
                 console.log($scope.result);
             })    
       console.log($scope.user.gpcs);
  
       console.log($scope.transaction);
       console.log($scope.user.length);
      
          
          defer.resolve();
        }
        
        
        return defer.promise;
          }

  $scope.groupItem = function(){
        //alert("combo");
        var defer1=$q.defer();
          // console.log($scope.user[0].itemName);
          
        for(let i=0;i<=$scope.user.length-1;i++) {  
               // alert("in for loop groupItem")
          $scope.comboPack=function(){ 
                 // alert("comboPack call "+$scope.user[i].itemname);
                // alert("combo "+$scope.user[i].comboItem)
              if($scope.user[i].comboItem == "yes") { 
                        // if($scope.user[i].comboItem == "yes"){
               
                         // $http.get('/getComboBarcode'+$scope.user[i].barcodeNumber).success(function(response){
                         //    console.log(response[0].gwt);
                         //    console.log(response[0].gpcs);
                         //    $scope.user[i].gwt = response[0].gwt -$scope.user[i].gwt;
                         //    $scope.user[i].gpcs = response[0].gpcs - $scope.user[i].gpcs;
                         //    console.log($scope.user[i].gwt);
                         //    console.log($scope.user[i].gpcs);
                         //               // if ($scope.user[i].gwt == 0 && $scope.user[i].gpcs == 0) {
                                         
                         //                if ($scope.user[i].gwt == 0 || $scope.user[i].gpcs == 0) {
                         //                         updateBatch($scope.user[i].barcode,"completed"); 
                                             
                         //                }else{
                         //                         updateBatch($scope.user[i].barcode,"available"); 
                                             
                         //                }
                        
                                        $http.put('/getComboBarcodeUpdate',$scope.user[i]).success(function(response) { 
                                        
                                                 console.log(response);
                                                    // alert("updated values in comboItem")
                                                defer1.resolve("combo1");
                                         })  // /getComboBarcodeUpdate                              
                        //  })///getComboBarcode
                   
                    //   }//$scope.user[i].comboItem 
                
                    //  defer1.resolve("combo1");
              } //$scope.user[i].comboItem
                else{
                      defer1.reject("no combo item ");
                    }
           
                   return defer1.promise;
          }// $scope.comboPa

          $scope.rios=function(){
             
                if($scope.user[i].split == "yes"){
                    

                    // alert("entered into split yes");
                     console.log( $scope.user[i].barcode)
                     console.log( $scope.user[i].gpcs)
                     console.log( $scope.user[i])
                     window.sessionStorage.setItem("Str4",JSON.stringify($scope.user[i]));
              
                     var bcode =$scope.user[i].barcode;
                     var stw = $scope.user[i].stwt ;
                     console.log(stw)
            
                     if(stw == undefined){
                        var gwt = $scope.user[i].gwt
                      }else{
                             var gwt = $scope.user[i].gwt - stw;
                            }
                      gwt = parseInt(gwt)
                      console.log(gwt);
                      var gpcs = $scope.user[i].gpcs
                      gpcs= parseInt(gpcs)
                      console.log(gpcs)
                      console.log($scope.user[i].count)
                      var count = $scope.user[i].count
                      console.log(count)
                      //working for $q

                     $scope.getcount = function(count){
                         var q = $q.defer()

                         // $http.get('/count1/'+count).success(function(response){ 
                         $http.get('/getSplitBarcode'+$scope.user[i].barcodeNumber).success(function(response){
                              console.log(response);
                              //alert("entered into split  getSplitBarcode yes");
                         

                             console.log(response);
                             q.resolve(response);
                         }).error(function(response){
                            q.reject(response)
                         });
                         return q.promise;
                    }//get count

                   $scope.promise = $scope.getcount(count)   

                   $scope.promise.then(function(response){
                        console.log(response)
                        console.log("i printing the response")

                           // $scope.reverse=response[0];
                            console.log(response);
                             tpcs =  response[0].gpcs
                             tpcs = parseInt(tpcs)//26/5
                            console.log(tpcs);
                             twgt =  response[0].gwt
                            twgt = parseInt(twgt)//26/5
                            console.log(twgt);
                             $scope.getif();
                          
                  },//promise
                    function(err){
                     console.log(err)   
                 })//function(err)
                  
                $scope.getif = function(){
                      console.log(" $scope.getif")

                     if ( (gwt != twgt) || ( gpcs != tpcs) ){
                             
                    //                     var editt=JSON.parse(window.sessionStorage.getItem("Str4"));
                    // console.log( editt.stwt)
                    //  console.log( editt)
                                 // $scope.user[i] = {};
                              $scope.user[i]  =JSON.parse(window.sessionStorage.getItem("Str4"));
           
                                  console.log("entered into the split loop")
                                  var dgwt = twgt - gwt;
                                  var dgpcs = tpcs - gpcs; 
                                 // var latest = dgwt+","+dgpcs+","+bcode;
                                  console.log(dgpcs)
                                  // $scope.user[i].gpcs = null;
                                  $scope.user[i].gpcs = dgpcs
                                  console.log( $scope.user[i].gpcs)
                                  $scope.user[i].gwt =  dgwt
                                  console.log( $scope.user[i].gwt)
                                  $scope.user[i].Transaction = "Split return"
                                  $scope.user[i].StockInward = "yes"
                                 // $scope.user[i]. = "yes"
                                  $scope.user[i].refid = $scope.user[i].barcode 
                                  $scope.user[i].barcode = ""
                                   $scope.user[i].orderStatus ="completed" 
                                  $scope.user[i].StockPoint = "Split Treasure"
                                  $http.post('/splitreturn',$scope.user[i]).success(function(response) {
                                         
                                             console.log("i got from split")
                                           // $scope.latest1=response;
                                            console.log(response);
                                  })
                                   
                          }//  (gwt != twgt)
                    }//get if
                    defer1.reject("split1");
             }//split
         }//rios close    
              // else{



             $scope.nextSplit=function(){
                //  alert("nextSplit in else ,2 in for");
                  if($scope.userit[0].salesPerson!=null)  {
                     
                      console.log($scope.user);
                      $scope.user[i].orderstatus = "completed"
                   
                           //    $scope.user[i].StockInward = "no"
            
                      var data = null;
                      if($scope.user[i]._id == undefined){
           
                           var data = arrcon[i]+","+$scope.user[i].orderstatus+","+ $scope.user[i].barcode;
       
                     }else{
                           var data =$scope.user[i]._id+","+$scope.user[i].orderstatus+","+ $scope.user[i].barcode;
          
                           }
                
                     console.log(data)
                     console.log('$scope.user[i].comboItem ') 
                     if ($scope.user[i].comboItem != 'yes') {
                         updateBatch($scope.user[i].barcode,"completed"); 
                     
                     }
                    $http.post('/confirmtransaction/'+data).success(function(response) { 
        
                              console.log("i got replay form confirm")
                             
                      })
                         
                      // }
                       defer1.resolve("next to split");
                   
                  }//if
                   else{
                      defer1.reject("no combo item ");
                    }
           
                   return defer1.promise;
                        // alert(defer1.promise);
                 // return defer1.promise;

                                
             } //else closer //fu nextSplit

     

        $scope.comboPack()
        .then(
           $scope.rios()
        )
         .then(
           $scope.nextSplit()
        )
      
        
        // .then(function(){
        //   return $scope.nextSplit()
        // })
      
    }
  }

  $scope.afterConfirm=function(){
            var defer2=$q.defer();
            //alert("3rd outer promise");
            if($scope.user[0].itemName!=null){
        
                 // alert("before confirm urd" + pushid.length);
              //  pushid=[]
               console.log( pushid)
               console.log( pushid.length)
               for(let i=0;i<pushid.length;i++){
                  console.log( pushid[i])
                
                   //this is for handling urd extra amount

                  if( i == pushid.length-1 ){
                       //urd adjustment
                       // alert("i == pushid.length-1")
                      if( total >  subtol){

                           // alert("total >  subtol")

                           console.log("total2 >  subtol2 total2 >  subtol2")
                           $scope.adjqty = subtol
                           diff = total - subtol
                           console.log( diff)
                           diff = diff.toFixed(fixdec)
                           // $scope.saleinv[0].netamt = 0
                           var data2 = pushid[i]+","+diff;

                       var r = confirm("Do you want to pay cash return "+ parseInt(diff))
                       if (r == true) {
                            var urdRefund = diff;
                            window.sessionStorage.setItem("urdRefund",diff);
                            var urdUpdate = pushid[i]+","+diff+","+urdRefund ;
                            $http.put('/urdstatus/'+ urdUpdate).success(function(response){ 
                              
                                 //   alert("true")
                        

                                 // alert("r == true")
                                 console.log("i got replay form confirm")
                                 console.log(response);
                                 // $scope.resul=response;
                                // console.log($scope.resul);
    
                            })
                            // break;
                         }else{
                                  //  alert(" total >  subtol false")
                                 $http.put('/urdstatus/'+ data2).success(function(response){ 
                                
                                        console.log("i got replay form confirm")
                                        console.log(response);
        
       
                                  })
                                 // break;
                             }
                  }else{

                                           var urdRefund = 0;
                            window.sessionStorage.setItem("urdRefund",diff);
                      

                           $http.put('/urdstatus123/'+ pushid[i]).success(function(response)
                             {  
                                 console.log("i got replay form confirm")
                                 console.log(response);
        
                             })
                        }  
             //here
             }else{
                  //alert("urdstatus123")
                  $http.put('/urdstatus123/'+ pushid[i]).success(function(response) {  
                         console.log("i got replay form confirm")
                         console.log(response);
                         // $scope.resul=response;
                         // console.log($scope.resul);
                  })

                }
             

           }//for loop closer
                 defer2.resolve("last promise");
               }
               // alert(defer2.promise);
             return defer2.promise;

//function close
}
//new function to make call wait

$scope.confirmOrder1=function(bill,pname,trans){
    // alert("waiting for time"+pname);
   // $scope.seleccted=bill;
   $scope.receiptprint=0;
   $scope.saleId=$scope.saleinv[0]._id;
<<<<<<< HEAD
   if($scope.transaction=='Regular Sale'){
      setTimeout($scope.confirmOrder(),7000);
    }
  setTimeout($scope.confirmation(bill,$scope.saleId,pname,trans),7000);
=======
  setTimeout($scope.confirmOrder(),5000);
  setTimeout($scope.confirmation(bill,$scope.saleId,pname),7000);
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419

}

$scope.confirmation=function(bill1,sale,name,tran){
   // alert("waiting for confirmation"+sale);

   var billtype=bill1;
   var id=sale;
   $scope.pname=name;
   $scope.tran=tran;
   $scope.receiptprint=1;
  if(billtype=='Cash'){
    // alert("billtype is cash");
        $scope.Astatus="completed";
        $scope.variables=id+","+$scope.Astatus;
        $http.put("/newAccountstatus"+$scope.variables).success(function(response){
          console.log(response);
        })
        // if(response.length!=0){

          // window.sessionStorage.setItem("voucherNo",JSON.stringify(deleteitem));
            // window.sessionStorage.setItem("voucherNo", voucherNoEdit);
          window.location.href='pdf.html';
        // setTimeout(window.location.href='pdf.html',2000);
        // }
  }
  else{
    var move=confirm("Do you want to pay now");
    if(move==true){
      $scope.partyname=$scope.partyname;
        $scope.Astatus="Inprogress";
        $scope.variables=id+","+$scope.Astatus;
        $http.put("/newAccountstatus"+$scope.variables).success(function(response){
          console.log(response);
        })
        // if(response.length!=0){
          window.sessionStorage.setItem("rprint",$scope.receiptprint);
           // window.sessionStorage.setItem("partyname",JSON.stringify($scope.pname));
          // window.sessionStorage.setItem("partyname",JSON.stringify($scope.pname));
           window.sessionStorage.setItem("partyname",JSON.stringify($scope.pname));
<<<<<<< HEAD
          if($scope.tran == 'Regular Sale'){
            window.location.href='receipts.html';
           }
           else{
            window.location.href = 'payments.html';
           }
=======
          window.location.href='receipts.html';
        // }
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
    }
    else{
      // alert("Your transaction amount is credit to your account");
        $scope.Astatus="Inprogress";
          $scope.variables=id+","+$scope.Astatus;
        $http.put("/newAccountstatus"+ $scope.variables).success(function(response){
          console.log(response);
          if(response.length != 0){
            window.location.href="pdf.html";
          }
        })

    }
  }
}
$scope.confirmOrder = function(){     
 
       edituserit = null;
      $scope.edituseritButton = false;   
  $scope.invoices().then(function (){
          //console.log(groupItem());
           $scope.groupItem()
        })
        .then(function (){
          $scope.afterConfirm();
           // $scope.saleinv[0].netamt =  "Invoice Value";
        })
 }//confirm

        $http.get('/cash').success(function(response){
          console.log(response);
        $scope.modes=response;
        //alert($scope.items);
    });
        $http.get('/bank').success(function(response){
        $scope.banks=response;
        //alert($scope.items);
    });
        $http.get('/cards').success(function(response){
          $scope.cards=response;
        })

        $http.get('/itemsdata').success(function(response){
            console.log(response)
        $scope.items=response;
    });
    
    //     $http.get('/user').success(function(response){
    //     $scope.res=response;
    // })
        // for transaction details collection in inventory
         $http.get('/transactiondetails').success(function(response){
            console.log(response)
        $scope.transactions=response;
        //alert($scope.items);
    });

       //configurations for urd weight gross wt or nett wt
   $http.get('/configuration').success(function(response){
       // response;
        $scope.LabourTax = response[0].LabourTax;
        $scope.WeightTolerance = response[0].WeightTolerance;
        fixdec  = response[0].DecimalPoints; 
        labourTaxInterest = response[0].LabourTaxValue;
        $scope.printconfiguration = response[0].printconfiguration;
        $scope.urdPurchaseStockPoint = response[0].urdPurchaseStockPoint ;
        $scope.rdPurchaseStockPoint = response[0].rdPurchaseStockPoint ;
        $scope.regularSaleStockPoint = response[0].regularSaleStockPoint ;
        $scope.rupeesDecimalPoints = response[0].rupeesDecimalPoints ;
        $scope.inVoiceSeries = response[0].inVoiceSeries ;
    
      //  var printconfiguration = withheader;
      //   var printconfiguration = withoutheader;
      // // alert("labourTaxInterest "+labourTaxInterest )
       // console.log(response.UpperLimit)
         console.log($scope.urdweight);
         //alert( $scope.LabourTax )
         // if( $scope.LabourTax == "Yes"){
         //       $http.get('/getLabourTax').success(function(response){
         //                    // interest1 = response[0].Rate
         //                    // interest2 = response[1].Rate
         //                    console.log(response)
         //                    labourTaxInterest = response[0].Rate ;
         //                    console.log(labourTaxInterest);
                     
         //           });

         // }

    })
    // roundoff configurations
    $http.get('/roundOffConfiguration').success(function(response){
      console.log(response);
      $scope.roundOffMethod = response[0].roundOffMethod ;
      $scope.roundOffValue = response[0].roundOffValue ;
      console.log($scope.roundOffMethod);
      console.log( $scope.roundOffValue);
      //alert(" confi here")
    })

    }]);


myApp.controller('PdfCntrl',['$scope','$http','$window',
function($scope,$http,$window){
   // alert("pdf controller called");
   // $scope.Billtype
   var sgsttotal = 0 ;
   var cgsttotal = 0 ;
   var igsttotal = 0;
   var taxvaltotal = 0;
   var subtotal1 = 0;
   var fixdec = 2;
   //used for display array
   $scope.Billtype=null;
   $scope.Mode=null;
   // $scope.Card=0;
   // $scope.Credit=0;
   var l = 0;
   $scope.userdisplay = []; 
   //var 
   // $scope.billtype="Credit";
    $scope.billType=window.sessionStorage.getItem("Billtype");
     // alert($scope.billType)
    $scope.partyname = window.sessionStorage.getItem("Party");
  
    // $scope.billType=window.sessionStorage.getItem("Billtype");//25/4
    $scope.trans = window.sessionStorage.getItem("transact"); //24/4
   // $scope.urd_value = window.sessionStorage.getItem("URD_VALUE");
    var urdparty = window.sessionStorage.getItem("URD_PARTY");
    var  barcode = window.sessionStorage.getItem("valu");//12/5
    var remarks = window.sessionStorage.getItem("remarks");
    var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");
    var editedInvoice = window.sessionStorage.getItem("editedInvoice");
    var urdIdsValue =  JSON.parse(window.sessionStorage.getItem("urdIds"));
    $scope.billnum=window.sessionStorage.getItem("billnumber");
<<<<<<< HEAD
     $scope.printreceipt=window.sessionStorage.getItem("rprint");
=======
    $scope.usernamedetails = window.sessionStorage.getItem("username")
 
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
    // $scope.billt=window.sessionStorage.getItem("typebill");
     // alert("bill bill  "+$scope.billt);
     // $scope.billType=$scope.billt;
     if ($scope.billnum == 'Credit') {
      alert(" credit")
     }else if ($scope.billnum == 'Cash') {
       alert(" cash ")
     }



   if($scope.trans=="Approval Sale"){
     // alert("saleuser")
    var user1 =window.sessionStorage.getItem("selectedId");
     console.log(user1);
   }
else{
  // alert("approval out");
   // var user1 = JSON.parse(window.sessionStorage.getItem("userids"));
  // alert(user1+"user1");
  }
$scope.Cash=0;
$scope.Card=0;
$scope.Credit=0;
<<<<<<< HEAD
// alert($scope.billnum+"bill555555555");
=======
//alert($scope.billnum+"bill");
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
  if($scope.billnum != undefined||$scope.billnum != undefined||$scope.billnum != null){
    if($scope.billnum == null) {
      $scope.Billtype = null;
    };
<<<<<<< HEAD
    }
    if($scope.trans == 'Regular Sale'){

=======
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
    $http.get('/getbilldata'+$scope.billnum).success(function(response){
      console.log(response);
      // alert(response.length);
      if (response.length == 0) {
        // alert("false");
        $scope.printReceipt = false;
      }
      else{
        $scope.printReceipt = true;
<<<<<<< HEAD
      }
      $scope.billdata=response;
      $scope.billamount=response[0].PaidAmount.$numberDecimal;
      $scope.bill=response[0].BillNo;
      // alert($scope.billamount+"total bill amount");
=======
        $http.get('/receipetCreation',{params:{"BillNo":$scope.billnum,"voucherNo": response[0].voucherNo,"userId":$scope.usernamedetails}}).success(function(response){
        })
      }
      $scope.billdata=response;
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
      window.sessionStorage.setItem("billnumber",null);

    })
  
    }//if(tran=="RS")
    else if($scope.trans == 'RD Purchase'){
      // alert("rd rd d dr dr");
      // alert($scope.billnum+"bill555555555");
      $http.get('/getpaymentbilldata'+$scope.billnum).success(function(response){
      console.log(response);
      // alert(response.length);
      if (response.length == 0) {
        // alert("false");
        $scope.printReceipt = false;
      }
      else{
        $scope.printReceipt = true;
      }
      $scope.billdata=response;
      // alert($scope.billdata);
      $scope.billamount=response[0].PaidAmount.$numberDecimal;
      // alert($scope.billamount+"total bill amount");
      $scope.bill=response[0].BillNo;
      // alert($scope.bill+"$scope.bill");
      console.log($scope.billdata);

    })
  // }
  window.sessionStorage.setItem("billnumber",null);
}//else(trans=="RD")
else{
  console.log("Hello");
}
    // console.log(useritdata)
     // alert(urdIdsValue) 
     //check edited invoice or not
     var editedInvoiceCheck = null;
      if(editedInvoice != null ){
       // alert("edited invoice "+editedInvoice) 
       editedInvoiceCheck = "true";

       }
      //else{
      //   alert("not null")
      // }
      console.log(editedInvoice)            
    console.log(" saleinvoice_id "+saleinvoice_id);

    //window.sessionStorage.setItem("userids", $scope.user);
    if($scope.trans!="Approval Sale"){
      var user1 = JSON.parse(window.sessionStorage.getItem("userids"));
    // alert(user1+"user1 nota")
    }
    else{
     var user1 =JSON.parse(window.sessionStorage.getItem("selectedId")); 
     console.log(user1);
    }
     // $scope.user[i]    =JSON.parse(window.sessionStorage.getItem("Str4"));
    console.log(user1)
    

    console.log(remarks);
    console.log(barcode);
    
    console.log(urdparty) 
    $scope.invoice = null;
    var prefix = null;
    var typeno = null;
    var trans = $scope.trans;
    $scope.urdweight = null;
    var usecase = user1; 
    // console.log(usecase);
    // $http.post('/user12/'+usecase).success(function(response){
                                                           
    //trcollection creation
     function trdetailsInsert(billtype) {
         $http.get('/trCollectionCreation/'+usecase,{params:{"salesIds":saleinvoice_id,"userIds":user1,"trail":"yes","Billtype":billtype}}).success(function(response){  
         })       
     }
     //trdetailsInsert();
    
   // $scope.billType=""; 
 window.sessionStorage.setItem("billType","null");
 var printconfiguration=null;
 var printLabour=null;
 var printWastage=null;
 var printChgWt=null;
    //configurations for urd weight gross wt or nett wt
    $http.get('/configuration').success(function(response){
          
          $scope.urdweight = response[0].Urd_Weight;
          $scope.LabourTaxCheck = response[0].LabourTax;
           $scope.printconfiguration = response[0].printconfiguration;
            printconfiguration=  $scope.printconfiguration;
             $scope.printLabour = response[0].printLabour;
             printLabour=  $scope.printLabour;
              $scope.printWastage = response[0].printWastage;
             printWastage = $scope.printWastage;
               $scope.printChgWt = response[0].printChgWt;
             printChgWt = $scope.printChgWt;
            //alert(printWastage)
            
          //alert(response[0].printconfiguration)
          //alert($scope.printconfiguration)
    })
    // merchant details 
    $http.get('/getmerchantdetails').success(function(response){
       //console.log(response);
       $scope.Landmark =response[0].Address[0].Landmark;
       $scope.Street =response[0].Address[1].Street;
       $scope.Place =response[0].Address[2].Place;
       $scope.Phone =response[0].Address[3].Phone;
       $scope.Mobile =response[0].Address[4].Mobile;
       $scope.email =response[0].Address[5].email;

       $scope.ShopName =response[0].ShopName;

    })

     $scope.urd_adj = window.sessionStorage.getItem("URD_ADJUSTED");
     $scope.urd_adj = parseFloat($scope.urd_adj).toFixed(fixdec);
     $scope.urd_bal = window.sessionStorage.getItem("URD_BALANCE");
     $scope.urd_bal = parseFloat($scope.urd_bal).toFixed(fixdec);
     $scope.urdRefund = window.sessionStorage.getItem("urdRefund");
     //  $scope.urdRefund = parseFloat($scope.urdRefund).toFixed(fixdec);
      //console.log(" $scope.urd_adj "+$scope.urd_adj);
      //console.log(" $scope.urd_bal "+$scope.urd_bal);
      $scope.urdTotal = window.sessionStorage.getItem("URD_Total");
      $scope.urdTotal = parseFloat($scope.urdTotal).toFixed(fixdec);
      // alert( "urd total "+$scope.urdTotal);
       // alert( " $scope.urdRefund "+ $scope.urdRefund);
         // $scope.saleinv[0].taxableval = "dfhjdfgj";
                 // $scope.saleinv[0].netamt = "sdh";
                 // $scope.saleinv[0].invoiceValue = "etefhyu";
                 // $scope.saleinv[0].tax="dsfghj";
                 // $scope.saleinv[0].subtol ="qwerty";
        if($scope.urdRefund == null ){
           //alert("nana");
           $scope.urdRefund = 0;
         }else{
                $scope.urdRefund = parseFloat( $scope.urdRefund).toFixed(fixdec);
                $scope.urd_adj = 0;
              }
  
     
         if( $scope.urdRefund != undefined){
              //alert("urd refund "+$scope.urdRefund)
             $scope.urd_bal = 0;
         }
     
        // $http.get('/getsaleinvoice_id'+saleinvoice_id).success(function(response){ 
           $http.get('/getsaleinvoice_id'+saleinvoice_id).success(function(response){ 
           
                console.log(response)
                $scope.Billtype = response[0].billtype;
<<<<<<< HEAD
=======
                //voucherNo
               // alert(" $scope.Billtype "+$scope.Billtype);
                if ($scope.Billtype == "Credit") {
                   //alert(" $scope.Billtype "+$scope.Billtype);
                       $http.get('/getReceivableAmount'+response[0].partyname).success(function(response){
                            $scope.netReceivable = response[0].Due.$numberDecimal;
                       })
                        if ($scope.trans == "Urd Purchase"||$scope.trans == "RD Purchase"||$scope.trans == "Regular Sale") {
                                setTimeout(trdetailsInsert("Credit"), 2000); 
                          };
                        

                 }
                 else if ($scope.Billtype == "Cash") {
                        if ($scope.trans == "Urd Purchase"||$scope.trans == "RD Purchase"||$scope.trans == "Regular Sale") {
                                setTimeout(trdetailsInsert("Cash"), 2000); 
                          };

                       //alert(" $scope.Billtype "+$scope.Billtype);
              
                 };
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
              if($scope.trans == "Valuation"){
           
                 $http.delete('/saleinv/'+response[0]._id)
       
              }
<<<<<<< HEAD
         window.sessionStorage.setItem("Billtype",null);
         window.sessionStorage.setItem("rprint",null);
=======
        // window.sessionStorage.setItem("Billtype",null);
>>>>>>> 9074c479f16d5b6039606c25f14ca1837c12f419
            // console.log(response[0].dis)
         
          $scope.subtotal = response[0].subtol;
          $scope.taxableval = response[0].taxableval;
          $scope.nett = response[0].netamt;
          $scope.payable=$scope.nett-$scope.billamount;
          alert("payable"+$scope.payable);
          // $scope.remaining=$scope.nett-$scope.billamount;
          // alert( $scope.remaining+" $scope.remaining");
          console.log(saleinvoice_id)
          numberwords();
          if( $scope.trans == "Regular Sale"){
              $scope.adj = response[0].adj;
              $scope.discount = response[0].dis;
             // $scope.charge = response[0].char;
             $scope.charge = (parseFloat($scope.subtotal) - parseFloat($scope.nett)).toFixed(2);
          }

         // alert("the value "+$scope.adj)
           if($scope.adj == null||$scope.adj == "null"){
                 $scope.adj = 0;
                 $scope.urdRefund = 0;
            // alert($scope.adj );
           }
          if( $scope.trans == "Urd Purchase"){
              $scope.adj = null;
             
          }
           $scope.urdTotalBalance = (parseFloat($scope.urdTotal)-parseFloat($scope.adj)).toFixed(fixdec);
             // $scope.charge1 = 10;
             // console.log(response[0].char)
              // alert(response[0].char)
          if( $scope.charge != 0){
           if( $scope.charge == undefined){
             // alert($scope.charge)
               $scope.charge1 = 0;
            }else{
                   $scope.charge1 = $scope.charge;
            
                 }
            
          }
          if( $scope.LabourTaxCheck == "Yes"){
            $scope.labourValue = response[0].labourValue;
            $scope.labourtax = response[0].labourtax;
           // alert( $scope.labourValue)
             if($scope.labourtax == undefined ||$scope.trans == "Urd Purchase" ){
                $scope.labourtax = 0;
              //alert( $scope.labourValue)

              }
          }
          //   if( $scope.printLabour == "no"){
          //     document.getElementById("labour").style.display = "none";
          //     //document
          //    // alert($scope.printLabour)
          //  //  $scope.labourValue = response[0].labourValue;
          //  //  $scope.labourtax = response[0].labourtax;
          //  // // alert( $scope.labourValue)
          //  //   if($scope.labourtax == undefined ||$scope.trans == "Urd Purchase" ){
          //  //      $scope.labourtax = 0;
          //  //    //alert( $scope.labourValue)

          //  //    }
          // }
          // //write now charge amount and value are same so using this
          // //if any changes then get charge value using window



        })////getsaleinvoice_id

      $http.get('/getpartydetails'+ $scope.partyname ).success(function(response){

            console.log(response)
            // $scope.partyLicense = response[0].partyLicense;
            // $scope.partyPAN = response[0].PAN;
            $scope.partyLicense = response[0].partyLicense;
            $scope.partyPAN = response[0].PAN;
            $scope.partyname = response[0].subscriber;
            $scope.city = response[0].data.address1;
          //  numberwords();
          })
       $scope.urdDetails =[];
       objUrd = {}
      if(urdIdsValue.length >= 1){
            h = 0;
          for(let m=0;m<=urdIdsValue.length-1;m++)
          { 
             //alert(urdIdsValue.length)
             $http.get('/urdDetails',{params:{"id":urdIdsValue}}).success(function(response){
               console.log(response)
                //  console.log(l)
                // $scope.userdisplay[l] = response[0];
                // $scope.urdVoucherNo = response[0].voucherNo ;
                // $scope.urdDate = response[0].date ;
                 objUrd["urdVoucherNo"] = response[0].voucherNo ;
                 objUrd["urdDate"] = response[0].date ;
                 $scope.urdDetails.push(objUrd);
                 console.log($scope.urdDetails)
                 //if more then 1 then add loop
                 $scope.urdDetails1 = $scope.urdDetails[0] ;
                 //alert($scope.urdVoucherNo,$scope.urdDate)
                 // console.log( $scope.userdisplay[l])
                h++;
              })
          }
    }
    

    if(urdparty ==$scope.partyname){
       $scope.urd_value = window.sessionStorage.getItem("URD_VALUE");
       console.log($scope.urd_value)
    }else{
          $scope.urd_value = 0;
          console.log($scope.urd_value)
         }
   
   

    var date=new Date();
     //25/4$scope.FromDate = ('0' + (date.getDate())).slice(-2)+'-'+date.getMonth()+ 1 +  '-' + (date.getFullYear()); 
      $scope.FromDate =  new Date(); //25/4
console.log( $scope.FromDate)
// $http.get('/userit',{params:{"partyname":$scope.partyname,"Transaction":$scope.trans}}).success(function(response){
//         $scope.userit=response;
//     })

//for urd
// <<<<<<< HEAD
if($scope.trans == "Urd Purchase"||$scope.trans == "Sale Return"||$scope.trans == "Purchase Return"
  ||$scope.trans == "Issue Voucher"||$scope.trans == "Receipt Voucher"||$scope.trans=='Approval Out'
  ||$scope.trans == "Approval Sale"||$scope.trans == 'Approval Return'){
    //for barcode data =

    l = 0; 
    for(let k=0;k<=user1.length-1;k++)
    {
      console.log("in for");
      console.log(user1[k].id);
      if($scope.trans!="Approval Sale"){
       $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
         console.log(response)
       //  console.log(l)
          $scope.userdisplay[l] = response[0];
            $scope.userdisplay[l].Number = k+1 ;
           // $scope.labourValue=response[0].labval;
           $scope.invoice = response[0].voucherNo ;
          console.log( $scope.userdisplay[l])
          l++;
           // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
         // to disapper in pdf
          $scope.LabourTaxCheck = "No"    
          numberwords();
        })
     }
     else{
      $http.get('/getparty',{params:{"id":user1[k].id}}).success(function(response){
        console.log('in else');
         console.log(response)
       //  console.log(l)
          $scope.userdisplay[l] = response[0];
            $scope.userdisplay[l].Number = k+1 ;
           // $scope.labourValue=response[0].labval;
           $scope.invoice = response[0].voucherNo ;
          console.log( $scope.userdisplay[l])
          l++;
           // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
         // to disapper in pdf
          $scope.LabourTaxCheck = "No"    
          numberwords();
        })
     }
      
      }
    // }
}

     // }// if($scope.trans == "Urd Purchase"||$scope.trans == "Issue Voucher"||$scope.trans == "Receipt Voucher"){
// // =======
//       if($scope.trans == "Urd Purchase"||$scope.trans == "Sale Return"||$scope.trans == "Purchase Return"||$scope.trans == "Issue Voucher"||$scope.trans == "Receipt Voucher"){
//           l = 0;
//           for(let k=0;k<=user1.length-1;k++){
//                    $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
//                            console.log(response)
//                          //  console.log(l)
//                             $scope.userdisplay[l] = response[0];
//                             // $scope.labourValue=response[0].labval;
//                              $scope.invoice = response[0].voucherNo ;
//                             console.log( $scope.userdisplay[l])
//                             l++;
//                              // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
//                            // to disapper in pdf
//                             $scope.LabourTaxCheck = "No"    
//                             numberwords();
//                     })
            
//             }//for
//           // }
//       } //closer
// // =======
    // for(let k=0;k<=user1.length-1;k++){
    //       $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
    //           console.log(response)
    //            //  console.log(l)
    //            alert("ertyui")
    //               $scope.userdisplay[l] = response[0];
    //                $scope.userdisplay[l].Number = k+1 ; 
    //               // $scope.labourValue=response[0].labval;
    //                $scope.invoice = response[0].voucherNo ;
    //               console.log( $scope.userdisplay[l])
    //               l++;
    //                // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
    //              // to disapper in pdf
    //               $scope.LabourTaxCheck = "No"    
    //               numberwords();
    //       })
      
    // }//for
 // }// if($scope.trans == "Urd Purchase"||$scope.trans == "Issue Voucher"||$scope.trans == "Receipt Voucher"){
// >>>>>>> a25409012b1309fe419457fc4b541af21c008ad0
 
 $scope.styleFunction = function(condition,Num){
   // console.log("styleFunction "+condition);
    
    // var x = index % 2;
    if (condition != undefined && Num == undefined){
       return "mark"; 
    } else{
      return "mark1";
    }

   
  } 

 if($scope.trans != "Urd Purchase" && $scope.trans!='Sale Return'&&$scope.trans!='Purchase Return'&&
  $scope.trans !='Receipt Voucher' && $scope.trans !='Issue Voucher'&& $scope.trans!='Approval Out'
  && $scope.trans!='Approval Return'){
// &&$scope.trans !='Approval Sale'
        if($scope.trans == "Regular Sale" || $scope.trans == "RD Purchase"){
 
              // trdetailsInsert();
        }

         function incrementCall12(k) {
          
            if (k<=user1.length-1) {
          
            $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
                 console.log(response);
                 //$scope.userdisplay[l] = null;
                 //alert(response.length)
                 $scope.userdisplay[l] = response[0];
                  $scope.userdisplay[l].Number = k+1 ; 
                 console.log( $scope.userdisplay[l]);
                 $scope.invoice = response[0].voucherNo ;
                 numberwords();
                 l++; 

                 if (response[0].compositeRef != undefined) {                         
                        var compositeRef = response[0].compositeRef;
                 
                        function incrementCall(c) {
                        
                            if (c <=3) {
                                 
                                  $http.get('/printCompositeItems',{params:{"compositeRef":compositeRef,"compositenum":c}}).success(function(response,err){
                                       // alert(response.compositenum+" "+response)
                                      if (response != null) {
                                         $scope.userdisplay[l] = response;
                                         incrementCall(c+1)                                     
                                         l++;
                                         if (c==3) {
                                           incrementCall12(k+1)
                                          }
                                      }else{

                                              incrementCall(c+1)
                                              if (c==3) {
                                                  incrementCall12(k+1)
                                              }
                                           }
                                    

                                  })
                                  
                            }// if c 

                         }// incrementCall(c)
                         incrementCall(1)   
          
                  }else{
                          incrementCall12(k+1)
                       }
          
                   if($scope.trans == "Valuation"){
                   
                       $http.delete('/userit/'+response[0]._id);

                  }
                 
                
                 
                 if(response[0].withinstatesgst == undefined||response[0].withinstatesgst == 0){
                      $scope.gst = "igst"
                      $http.get('/gettaxoutofstate').success(function(response){
                                  // $scope.outofstateigst = response[0].Rate
                                  $scope.igst = response[0].Rate
                            });
                  }else{
                          // alert ("withinstatesgst is defined"+response[0].withinstatesgst)

                        $scope.gst = "cgst"
                        $http.get('/gettaxwithinstate').success(function(response){
                                    $scope.cgst = response[0].Rate
                                    $scope.sgst = response[1].Rate
                                  
                               });
                       }

                       //to display  cgst or igst and calculations
                 for(let i=0;i<response.length;i++){
                    if(response[0].withinstatesgst == undefined||response[0].withinstatesgst == 0){
                         // alert("response[0].withinstatesgst == undefined")
                          igsttotal = igsttotal + parseFloat(response[i]. outofstateigst)
                          $scope.igsttax = igsttotal.toFixed(fixdec)
                          taxvaltotal = taxvaltotal + parseFloat(response[i].taxval)
                          $scope.taxvaltotal =taxvaltotal.toFixed(fixdec)
                          $scope.subtotal1 = igsttotal + taxvaltotal
                         // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
                          numberwords()

                    }else{
                          // alert("response[0].withinstatesgst == defined")
                          
                          sgsttotal = sgsttotal + parseFloat(response[i].withinstatesgst)
                          $scope.sgsttax = sgsttotal.toFixed(fixdec)
              
                         cgsttotal = cgsttotal + parseFloat(response[i]. withinstatecgst)
                         $scope.cgsttax = cgsttotal.toFixed(fixdec)
                         taxvaltotal = taxvaltotal + parseFloat(response[i].taxval)
                         $scope.taxvaltotal =taxvaltotal.toFixed(fixdec)
                         $scope.subtotal1 = sgsttotal +cgsttotal + taxvaltotal
                         //  $scope.nett = $scope.subtotal1.toFixed(fixdec)
                         numberwords()

                         

                         }
                
                 
                 }
                
            })
          }//if k<=
        //})(k)
        }//incremental 
    incrementCall12(0)
  //}//for loop
   
} // if regular sale
// >>>>>>> 7a63b63f279a4aae079c032f0654879af6c817a2


//if($scope.trans == "Regular Sale"){
  //if($scope.trans == "Regular Sale" || $scope.trans == "RD Purchase" ){
//   if($scope.trans != "Urd Purchase" && $scope.trans !='Receipt Voucher'&&$scope.trans != "Sale Return"&&$scope.trans != "Purchase Return" && $scope.trans !='Issue Voucher'){
  
// // <<<<<<< HEAD
//     //for barcode data 
//      if($scope.trans == "Regular Sale" || $scope.trans == "RD Purchase" ){
 
//     // trdetailsInsert();
//       }
//    // alert("if");
//     for(let k=0;k<=user1.length-1;k++)
//     {
//    // alert(user1[k])
  
//     $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
//          console.log(response);
//           if($scope.trans == "Valuation"){
//             //alert(response[0]._id);
//         //      var udelete=$scope.userit[i]._id+","+$scope.userit[i].barcodeNumber;
//         // console.log($scope.userit[i]._id)
//         // console.log($scope.userit[i])
//         // console.log($scope.userit[i].barcode)
//         $http.delete('/userit/'+response[0]._id);
// // =======
//          //for barcode data 
//         if($scope.trans == "Regular Sale" || $scope.trans == "RD Purchase"){
 
//               // trdetailsInsert();
//         }

//          function incrementCall12(k) {
          
//             if (k<=user1.length-1) {
          
//             $http.get('/getparty',{params:{"id":user1[k]}}).success(function(response){
//                  console.log(response);
//                  //$scope.userdisplay[l] = null;
                 
//                  $scope.userdisplay[l] = response[0];
//                   $scope.userdisplay[l].Number = k+1 ; 
//                  console.log( $scope.userdisplay[l]);
//                  $scope.invoice = response[0].voucherNo ;
//                  numberwords();
//                  l++; 

//                  if (response[0].compositeRef != undefined) {                         
//                         var compositeRef = response[0].compositeRef;
                 
//                         function incrementCall(c) {
                        
//                             if (c <=3) {
                                 
//                                   $http.get('/printCompositeItems',{params:{"compositeRef":compositeRef,"compositenum":c}}).success(function(response,err){
//                                        // alert(response.compositenum+" "+response)
//                                       if (response != null) {
//                                          $scope.userdisplay[l] = response;
//                                          incrementCall(c+1)                                     
//                                          l++;
//                                          if (c==3) {
//                                            incrementCall12(k+1)
//                                           }
//                                       }else{
// // >>>>>>> 7a63b63f279a4aae079c032f0654879af6c817a2

//                                               incrementCall(c+1)
//                                               if (c==3) {
//                                                   incrementCall12(k+1)
//                                               }
//                                            }
                                    

//                                   })
                                  
//                             }// if c 

//                          }// incrementCall(c)
//                          incrementCall(1)   
          
//                   }else{
//                           incrementCall12(k+1)
//                        }
          
//                    if($scope.trans == "Valuation"){
                   
//                        $http.delete('/userit/'+response[0]._id);

//                   }
                 
                
                 
//                  if(response[0].withinstatesgst == undefined||response[0].withinstatesgst == 0){
//                       $scope.gst = "igst"
//                       $http.get('/gettaxoutofstate').success(function(response){
//                                   // $scope.outofstateigst = response[0].Rate
//                                   $scope.igst = response[0].Rate
//                             });
//                   }else{
//                          // alert ("withinstatesgst is defined"+response[0].withinstatesgst)

//                         $scope.gst = "cgst"
//                         $http.get('/gettaxwithinstate').success(function(response){
//                                     $scope.cgst = response[0].Rate
//                                     $scope.sgst = response[1].Rate
                                  
//                                });
//                        }

//                        //to display  cgst or igst and calculations
//                  for(let i=0;i<response.length;i++){
//                     if(response[0].withinstatesgst == undefined||response[0].withinstatesgst == 0){
//                         // alert("response[0].withinstatesgst == undefined")
//                           igsttotal = igsttotal + parseFloat(response[i]. outofstateigst)
//                           $scope.igsttax = igsttotal.toFixed(fixdec)
//                           taxvaltotal = taxvaltotal + parseFloat(response[i].taxval)
//                           $scope.taxvaltotal =taxvaltotal.toFixed(fixdec)
//                           $scope.subtotal1 = igsttotal + taxvaltotal
//                          // $scope.nett = ($scope.subtotal1).toFixed(fixdec)
//                           numberwords()

//                     }else{
//                          // alert("response[0].withinstatesgst == defined")
                          
//                           sgsttotal = sgsttotal + parseFloat(response[i].withinstatesgst)
//                           $scope.sgsttax = sgsttotal.toFixed(fixdec)
              
//                          cgsttotal = cgsttotal + parseFloat(response[i]. withinstatecgst)
//                          $scope.cgsttax = cgsttotal.toFixed(fixdec)
//                          taxvaltotal = taxvaltotal + parseFloat(response[i].taxval)
//                          $scope.taxvaltotal =taxvaltotal.toFixed(fixdec)
//                          $scope.subtotal1 = sgsttotal +cgsttotal + taxvaltotal
//                          //  $scope.nett = $scope.subtotal1.toFixed(fixdec)
//                          numberwords()

                         

//                          }
                
                 
//                  }
                
//             })
//           }//if k<=
//         //})(k)
//         }//incremental 
//     incrementCall12(0)
//   //}//for loop
   
// } // if regular sale

 //pdf particulars printing

 $scope.sca = 0
 $scope.smca = 0
 $scope.orad = 0
 $scope.ormd = 0
 $scope.v1 = 0
 $scope.v2 = 0
 $scope.charge1 = 0
 $scope.charge2 = 0
 $scope.labour = 0
 $scope.labourValue = 0;

 // for saving of history
 //var printconfiguration="withoutheader";
 $scope.nett = null
 $scope.bill = function(){
   // alert("Bill function called");
   // alert($scope.useritbill.length);
   var bill=null;
   //var printconfiguration="withoutheader";
   if(bill ==null)
   {
    //alert('jjk')
    //alert($scope.printconfiguration)
    if(printconfiguration =='withoutheader')
    {
//alert("hhhh")
 document.getElementById("myDIV").style.display = "none";
    }
    else{
       document.getElementById("myDIV").style.display = "myDIV";
     
      //alert('bbb')
    }

   }
       
    var hist = $scope.FromDate+","+$scope.trans+","+ $scope.invoice+","
    + $scope.nett+","+ remarks+","+$scope.partyname;
     $http.post('/historyupdate/'+hist).success(function(response)
        {  
             console.log("i got replay")
            console.log(response);
    
         })

 }   

var numberwords = function(){ 
//alert("numberwords"+$scope.nett)       
        var amount = $scope.nett;
    console.log(amount)
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    
    console.log(amount)
    
    var atemp = amount.split(".");
    
    console.log(atemp)
    
    var number = atemp[0].split(",").join("");
    
    console.log(number)
    var n_length = number.length;
    
    console.log(n_length)
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
        console.log(words_string)
        $scope.wor = words_string;
    }
  }
    //})
}])//PdfCntrl ends here
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
  // alert(item);
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

           $scope.mylink = "Transaction.html";
           window.sessionStorage.setItem("Str3",JSON.stringify(deleteitem));
          // window.sessionStorage.setItem("voucherNo",JSON.stringify(deleteitem));
            window.sessionStorage.setItem("voucherNo", voucherNoEdit);
                
     }
     
   //  window.sessionStorage.setItem("edit",deleteitem);
    //   window.sessionStorage.setItem("Party",$scope.partyname);
    // })



}
 $scope.usernamedetails = window.sessionStorage.getItem("username")
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


//}//listDelete
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
$scope.delete = function(item){
    console.log("call from delete");
   console.log(deleteitem.barcodeNumber);
   console.log(deleteitem.partyname);
   console.log(deleteitem.Transaction);
   console.log(deleteitem._id);
   var udelete = deleteitem.partyname+","+deleteitem.Transaction;
    console.log(udelete);

    $http.delete('/saleinvoiced/'+udelete).success(function(response)
            {
               //  console.log(response)
            });
    $http.delete('/transactiond/'+udelete).success(function(response)
            {
                // console.log(response)
            });
    $http.delete('/useritemd/'+udelete).success(function(response)
            {
                 //console.log(response)
            });
    //for barcoded one '/history',{params:{"barcode":deleteitem.barcode}}
    $http.delete('/transactiondetaild',{params:{"barcode":deleteitem.barcodeNumber}}).success(function(response)
            {
                 //console.log(response)
            });
    $http.delete('/transactiondetaile',{params:{"barcode":deleteitem.barcodeNumber}}).success(function(response)
            {
//console.log(response)
            });

    }
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
//getting 

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
}]);

myApp.controller('myctrl1',['$scope','$http','$window','$filter',
     function($scope,$http,$window,$filter){
        // $scope.name="vinayak";
         $scope.usernamedetails = window.sessionStorage.getItem("username")
       $http.get('/getTranDetails').success(function(response){
  // alert("cccccc")
        console.log(response);
        $scope.partynames=response;
   })
// $scope.date2=new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
$scope.date2= new Date();
$scope.date1=new Date();
$scope.getAllDetails=function(name,dat1,dat2){
   // alert(name+"hi hi"+dat1+"dat1"+dat2);
      var date1 = new Date(((new Date(dat1).toISOString().slice(0, 23))+"-05:30")).toISOString();
      date1=date1.slice(0,10);
     date1=date1+"T00:00:00.000Z";
     console.log(date1);
     var date2 = new Date(((new Date(dat2).toISOString().slice(0, 23))+"-05:30")).toISOString();
      date2=date2.slice(0,10);
     date2=date2+"T23:59:59.999Z";
     console.log(date2);
      if(date1>date2){
        alert("from date should be less than To date");
      }

   // var date1=dat1;
   // var date2=dat2;
   // var date1= $filter('date')(new Date(dat1), 'dd/MM/yyyy')
   // // alert(date1+"kkkkk");
   // var date2= $filter('date')(new Date(dat2), 'dd/MM/yyyy')
   $scope.pdetails=name+","+date1+","+date2;
   // alert($scope.pdetails);
  $http.get('/AllTransaction/'+$scope.pdetails).success(function(response){
    console.log(response);
    if(response.length==0){
      alert("No matches found");
    }
    var alldata=response;
    window.sessionStorage.setItem('pdetails','alldata');
    $scope.partydetails=response;
  });

}
$scope.historypdf=function(){
    $window.location.href = "historypdf.html";
    // $scope.pdetails=name+","+date1+","+date2;
    // alert($scope.pdetails);
  //   $http.get('/AllTransaction/'+$scope.pdetails).success(function(response){
  //   console.log(response);
  //   // var alldata=response;
  //   $scope.partydetails=response;
  //   window.sessionStorage.setItem('pdetails', $scope.partydetails);
  // });
}

  }]);

// new history pdf
myApp.controller('myctrl2',['$scope','$http','$window',
 function($scope,$http,$window){
   // $scope.name="shivu";
  $scope.partydata=window.sessionStorage.getItem('pdetails');
  // console.log(pdetails);
  // for(var i=0;i<$scope.partydata.length;i++){
    $scope.partydetailall=JSON.parse($scope.partydata)
    console.log($scope.partydetailall);
  // }
}]);

//new controller for receipt pdf
// myApp.controller('billCntrl',['$scope','$http','$window',
//   function($scope,$http,$window){
//  // $scope.name="shivu";
//  $scope.rpamt=[];
//  $scope.paymode='Cash';
//  $scope.dates=new Date();
//  $scope.narrate="Bill No is RP1";
//  // $scope.billNo="RP1";
//  $scope.trans="Receipt";
//  $scope.totals=50000;

//          $http.get('/cash').success(function(response){
//           console.log(response);
//         $scope.modes=response;
//         //alert($scope.items);
//     });
//          $http.get('/partynames').success(function(response){
//           $scope.partynames=response;
//          });
//         $http.get('/bank').success(function(response){
//         $scope.banks=response;
//         //alert($scope.items);
//     });
//         $http.get('/cards').success(function(response){
//           $scope.cards=response;
//         })

// //for generating billno
// $http.get('/getprefixs').success(function(response){
//   console.log(response);
//   console.log(response[0].TransactionPrefix)
//   $scope.prefix1=response[0].TransactionPrefix;
//   $http.get('/gettotalcount').success(function(response){
//     console.log(response);
//     $scope.bno=response+1;
//     $scope.billNo=$scope.prefix1+$scope.bno;
//     $scope.BillNos=$scope.prefix1+","+$scope.bno;
//   // alert($scope.billNo);
//   // $scope.insertReceipt($scope.billNo);
//   })

// })



//   //for adding focus to selected row
//   var editrow3 = null;
// $scope.row3 = function(rowno){
//    console.log("this is row id"+rowno);
//     // alert("this is row id"+rowno);
//   console.log("u clicked on row"+rowno);
//   $scope.idSelectedVote = rowno;
//    console.log(rowno);
//    editrow3 = rowno;
// }
// //function for saving voucherno
// $scope.storeVoucher=function(index,voucher){
//   // alert(index+"bbbbbbbbbb"+voucher);
//   $scope.voucherId=voucher;

// }

//         //new function for getting voucher based on partyname
// $scope.getVouchers=function(party){
//   // alert(party+"partyname");
//   var pname=party;
//   $http.get('/getvoucherids'+pname).success(function(response){
//     console.log(response);
//     $scope.details=response;
//   })
// }

// //mode()
// // $scope.isdisabledd=1;
// // $scope.isdisabled=1;
// // $scope.mode=function(){
// //   // alert("selected mode"+$scope.paymode);
// //   if($scope.paymode=='Cheque'){
// //     alert("cheque");
// //     $scope.cheques();
// //   }
// //   else{
// //     alert("card");
// //     $scope.cardactive();
// //   }

// // }
// // $scope.cheques=function(){
// //   $scope.isdisabledd=0;

// // }
// // $scope.cardactive=function(){
// //   $scope.isdisabled=0;
// // }
//  //clear()
// $scope.clear=function(){
//   // alert("clicked on clear button");
//   // $scope.amount='';
//   // $scope.date=null;
//   // $scope.cardnos1="";
//   // $scope.bank="";
//   // $scope.chequeno="";
//   // $scope.appno="";
//   // $scope.ctype="";
//   // $scope.cardnos="";
//   // $scope.chequeno1=null;
//     $scope.rpamt=[];
//     $scope.totals="";
// }
// //for total amount Calculation
//  $scope.total1=0;
// $scope.totalAmount=function($index){
//   // alert("amount"+index);
// // $scope.total1=0;

//   $scope.total1 += $scope.rpamt[$index].amount;
//   // alert($scope.total1);
//   $scope.totals=$scope.total1;
// }

// $scope.newRow=function(){
//   $scope.rpamt.push({
//     'paymode':"",
//     'amount':"",
//     'bank':"",
//     'chequeno':"",
//     'dates':"",
//     'cardnos':"",
//     'ctype':"",
//     'appno':""
  
//   })
// }
// $scope.billDate=new Date();
//    //for inserting values into collection
//    // $scope.receipt=[];
//    // $scope.dates=new date();
//    //for validation before save
//    $scope.save=function(){
//     // alert($scope.rpamt);
//     console.log($scope.rpamt);
//     var flag=0;
// console.log($scope.paymode+","+$scope.amount+","+$scope.bank+","+$scope.chequeno+","+
//   $scope.date+","+$scope.cardnos+","+$scope.ctype+","+$scope.appno);
//     // alert("tahnks for validating");
//     if(flag==0){
//       if($scope.partyname==undefined){
//         alert("please select partyname")
//         flag=1;
//         return;
//       }
//       if($scope.rpamt.length==0){
//         alert("please click on Addnew and enter Mandatory fileds");
//       }
//       else{
//         for(i=0;i<=$scope.rpamt.length-1;i++){
//           if($scope.rpamt[i].paymode==undefined||$scope.rpamt[i].paymode==""){
//             alert("please select Mode");
//             flag=1;
//             return;
//           }
//           // alert($scope.paymode)
//           if($scope.rpamt[i].amount==undefined||$scope.rpamt[i].amount==""){
//             alert("please enter the amount");
//             flag=1;
//             return;
//           }
//           if($scope.rpamt[i].bank==undefined || $scope.rpamt[i].bank==""){
//             alert("please select the bank");
//             flag=1;
//             return;
//           }
//           if($scope.rpamt[i].paymode=='Cheque'){
//               if($scope.rpamt[i].chequeno==undefined ||$scope.rpamt[i].chequeno==""){
//                 alert("please enter the cheque no");
//                 flag=1;
//                 return;
//               }
//           if($scope.rpamt[i].date==undefined||$scope.rpamt[i].date==""){
//             alert("please enter the date");
//             flag=1;
//             return;
//           }
//          }
//           if($scope.rpamt[i].paymode=='Card'){
//                 if($scope.rpamt[i].cardnos==undefined||$scope.rpamt[i].cardnos==""){
//                   alert("please enter the card no");
//                   flag=1;
//                   return;
//                 }
//                 if($scope.rpamt[i].ctype==undefined||$scope.rpamt[i].ctype==""){
//                   alert("please enter the card type");
//                   flag=1;
//                   return;
//                 }
//                 if($scope.rpamt[i].appno==undefined||$scope.rpamt[i].appno==""){
//                   alert("please enter the approval number");
//                   flag=1;
//                   return;
//                 }
//           }
//           if(i==$scope.rpamt.length-1){
//             $scope.insertReceipt();
//           }
          
//         }//for loop
//       }//else
       
//     }//if 
// console.log($scope.rpamt.paymode+","+$scope.rpamt.amount+","+$scope.rpamt.bank+","+$scope.rpamt.chequeno+","+
//   $scope.rpamt.date+","+$scope.rpamt.cardnos+","+$scope.rpamt.ctype+","+$scope.rpamt.appno+",+");
//    }//main()

//    //for inserting data to db
//    $scope.insertReceipt=function(){
//      // alert("clicked on save"+$scope.billNo);

//       for(i=0;i<=$scope.rpamt.length-1;i++){

//       $scope.rdata=$scope.rpamt[i].paymode+","+$scope.rpamt[i].amount+","+$scope.rpamt[i].bank+","+$scope.rpamt[i].chequeno+","+$scope.rpamt[i].date+","+$scope.rpamt[i].cardnos+","+$scope.rpamt[i].ctype+","+$scope.rpamt[i].appno+","+$scope.partyname+","+$scope.billDate+","+$scope.billNo+","+$scope.narrate+","+$scope.totals+","+$scope.voucherId;
//       // alert($scope.rdata);
//       $http.post('/receiptdata/'+$scope.rdata).success(function(response){
//         // alert("called server");
//         console.log(response);
//         if(response.lenght!=0){
//           // location.reload();
//           alert($scope.BillNos+"dddddddddddddddddd");
//           $http.put('/insertbill'+$scope.BillNos).success(function(response){
//             console.log(response);
//           })
//         }
//       })
//     }
//    }
// //for deletion
// $scope.indexSelected=[];
// $scope.check=0;
// $scope.indexFunctionCall=function(index,vname) {

//     // $scope.j=index;
//      // alert(index+"index");
//      //  alert(vname+"vname");
//            if ($scope.indexSelected.indexOf(index) == -1){
//                 $scope.indexSelected.push(index);
//                 // alert(index+"pushed index");
//             }
//                      // if($scope.transaction == "Sale Return" || $scope.transaction == "Purchase Return"
//        `              //  ||$scope.transaction == 'Approval Sale'||$scope.transaction=='Approval Return'){
//                      //       $scope.mycheck(index,vname);
//                      //  }
//          console.log($scope.indexSelected)
// }
// $scope.removeChecked = function(index,vname) {
//  alert("clicked on checkbox"+$scope.check);
//   // var k=0;

//   if(vname==1){
//    // alert("checkbox checked"+index); 
//   $scope.rpamt[index].index = index;
//   console.log($scope.rpamt);
//   // alert("clicked on checkbox"+$scope.checkbox);
//   // alert(" $scope.userit[index].index "+ $scope.userit[index].index);
//   }//if
 
//     else{
//       console.log($scope.rpamt);
//          for(var i=0;i<=$scope.indexSelected.length-1;i++){
//           // alert("checkbox is unchecked"+index);
//               if (  $scope.rpamt[i].index === index) {
//                 // alert("within if");
//                 delete $scope.rpamt[i].index;
//                 // $scope.checkbox=$scope.checkbox-1;
//                 delete($scope.indexSelected[i]);
//                 console.log($scope.indexSelected);
//                 console.log($scope.rpamt);
               
//               }  //if
       
//           }//for
//     }//else
// }//removeChecked//removeChecked

// $scope.removeSelectedRows = function() {
//   var a =0;
//    $scope.rpamt1 = [];
//     if (0 == $scope.userit.length) {
//                        // do stuff
//         alert("Please Fill Necessary Details");
//         return;
//       }
//       else if($scope.indexSelected=="" ||$scope.indexSelected==undefined||$scope.indexSelected==null){
//         alert("Please Select Checkbox")

//       }
//       else{

//     var r = confirm("Are you sure you want to delete this ?")
//             if (r==true) {
                
//   // alert(" got call  $scope.userit.length "+ $scope.userit.length);
//            for(let i=0;i<=$scope.$scope.rpamt.length-1;i++){ 
//               //Things[i]
//                // alert("in for");
              
//                // alert(" $scope.userit[index] "+$scope.userit[i].index);
//               if ($scope.rpamt[i].index != undefined) {
//                           alert(" iam hsdfsdf undefine unsaved "+ $scope.userit[i].index);
//                       console.log($scope.userit[i]);
//                       // var udelete=$scope.userit[i]._id;
//                       //  if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"
//                       //   &&$scope.transaction!="Approval Out"){
//                       // $http.delete('/userit/'+udelete).success(function(response)
//                       //   {
//                       //     console.log(response);
//                       //   });
//                       //  }
                    
//               }else{
//                          // alert("saved");
//                        console.log($scope.rpamt[i]);
                 
//                        // saleInvoiceCalculations();
//                        $scope.rpamt1[a] = $scope.rpamt[i];
//                        a++;
//                         console.log($scope.rpamt1);
//               }
//               if (($scope.rpamt.length-1) == i) {
//                       $scope.userit = $scope.userit1
//               }
//               // if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"&&$scope.transaction!="Approval Out"){
//               //  if($scope.userit.length != 0){
//               //   // alert("in if");
//               //   // alert(r);
//               //             indexvalue=0;
//               //             saleInvoiceCalculations();
//               //   $scope.saleinv[0].status="In Progress"
//               //   $scope.saleinv[0].partyname=$scope.partyname;
        
//               // var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
//               //    +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
//               //    +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals;
//               //    console.log(update);
//               //    $http.put('/saleinvoicedata12/'+update).success(function(response){
//               //     // alert("sale invoice");
//               //     console.log(response);
//               //     // $scope.getDetails(r);
//               //            })
//               //           }
//               //           else{
//               //                   // alert("else");
//               //                   $scope.saleinv[0].taxableval = 0;
//               //                   $scope.saleinv[0].netamt = 0;
//               //                   $scope.saleinv[0].invoiceValue = 0;
//               //                   $scope.saleinv[0].tax=0;
//               //                   $scope.saleinv[0].subtol = 0;
//               //                    if($scope.saleinv[0]._id != null){
//               //                     // alert("after save"+$scope.saleinv[0]._id);
//               //                     $http.delete('/deleteinprogress'+$scope.saleinv[0]._id ).success(function(response){
//               //                       console.log(response);
//               //                     })
//               //                    }
//               //                   // $scope.getDetails(r);
//               //              }
//               //            }
//             }//for
//           }//if(r==true);
          
//         }//else
// }//trial

//   }]);
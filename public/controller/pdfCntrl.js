var myApp=angular.module('myApp',[]);
myApp.controller('PdfCntrl',['$scope','$http','$window',
function($scope,$http,$window){
   // alert("pdf controller called");
    $scope.usernamedetails = window.sessionStorage.getItem("username")
   var sgsttotal = 0 ;
   var cgsttotal = 0 ;
   var igsttotal = 0;
   var taxvaltotal = 0;
   var subtotal1 = 0;
   var fixdec = 2;
   //used for display array
   var l = 0;
   $scope.userdisplay = []; 
   //var 
    $scope.billType=window.sessionStorage.getItem("Billtype");
    
    $scope.partyname = window.sessionStorage.getItem("Party");
  
    $scope.billType=window.sessionStorage.getItem("Billtype");//25/4
    $scope.trans = window.sessionStorage.getItem("transact"); //24/4
   // $scope.urd_value = window.sessionStorage.getItem("URD_VALUE");
    var urdparty = window.sessionStorage.getItem("URD_PARTY");
    var  barcode = window.sessionStorage.getItem("valu");//12/5
    var remarks = window.sessionStorage.getItem("remarks");
    var saleinvoice_id = window.sessionStorage.getItem("saleinvoicedata_id");
    var editedInvoice = window.sessionStorage.getItem("editedInvoice");
    var urdIdsValue =  JSON.parse(window.sessionStorage.getItem("urdIds"));
   if($scope.trans=="Approval Sale"||$scope.trans=='Approval Return'){
     // alert("saleuser")
    var user1 =window.sessionStorage.getItem("selectedId");
     console.log(user1);
   }
else{
   var user1 = JSON.parse(window.sessionStorage.getItem("userids"));
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
   
    //trcollection creation
     function trdetailsInsert() {
         $http.get('/trCollectionCreation',{params:{"salesIds":saleinvoice_id,"userIds":user1,"trail":"yes"}}).success(function(response){  
         })       
     }
   // trdetailsInsert()

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
           
              //  console.log(response)
              if($scope.trans == "Valuation"){
           
                 $http.delete('/saleinv/'+response[0]._id)
       
              }
         
            // console.log(response[0].dis)
         
          $scope.subtotal = response[0].subtol;
          $scope.taxableval = response[0].taxableval;
          $scope.nett = response[0].netamt;
          console.log(saleinvoice_id)
          numberwords();
          if( $scope.trans == "Regular Sale"){
              $scope.adj = response[0].adj;
              $scope.discount = response[0].dis;
              $scope.charge = response[0].char;
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
  // alert("approval");
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
  &&$scope.trans !='Approval Sale'&& $scope.trans!='Approval Return'){
   // alert("rd and regular");
         //for barcode data 
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
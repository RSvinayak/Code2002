var myApp=angular.module('myApp',[]); 

myApp.controller('reportCntrl',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){

console.log("well come to report controller")

//for radio default
    $scope.radio = {
        "transaction":'regular',
        "barcode":'yes',
        "weight":'ntwt',
        // "report":'itemName',
        "report":'purity',
      };
$scope.bit2 = {
    
      date1: new Date()
    }; 

var fixdec =2;
//radiobutton()
$scope.radiobutton1 = function(){
  console.log("entered into radiobutton1");
   $scope.reportonedate1 = null;
  // if( $scope.radio.report != "itemName" ){
  //     //$scope.reportpurity = "purity";
  //  // alert("it is purity")
  // }
  //alert($scope.radio.transaction);

}

// var myObject = { x:1, y:2, z:3 };
// //for (property in Object) {
//   console.log(Object.getOwnPropertyNames(myObject)[0]);
// //};

// var keys = Object.keys(myObject);
// var len = keys.length;
// console.log(keys[0])

// var values = {name: '1', gender: '2'};
// //var log = [];
// var a = null;
// var b = null;
// angular.forEach(values, function(value, key) {
//   //this.push(key + ': ' + value);
//   console.log(key + ': ' + value)
//   if(value == 1){
//  a = key;
//   }else if(value == 2){
//  b = key;
//   }
//   console.log(a)
//   console.log(b)
//  // console.log(log)
// });
//expect(log).toEqual(['name: misko', 'gender: male']);

$scope.sort1 = "Group";
$scope.sort2 = "Sale Cty";
$scope.sort3 = "Purity";
$scope.sort4 = "Item";
$scope.preview1 = function(){
  if ($scope.sort.Group ==$scope.sort.SaleCty || $scope.sort.SaleCty ==$scope.sort.Purity || $scope.sort.Purity==$scope.sort.Item || $scope.sort.Item==$scope.sort.Group ) {
          alert("duplicates are not allowed")
      $scope.sort.Group=""
      $scope.sort.SaleCty=""
      $scope.sort.Purity=""
      $scope.sort.Item=""
  
    }
    else{
   //   alert('gg')
    
//alert("ppdgfhg");
console.log($scope.sort);
var receivedata = null;
    var issuedata = null;
   // var report1 =[];
    var itemgroup =[]
      var receivedata1 = null;
      //var issuedata1 = null;
      var report1 =[];
      var  printary = [];
      var lengthitemNamesort = null;
      var printfinalary = [];


    var reportdate   = new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
              reportdate= reportdate.slice(0,10);
             reportdate = reportdate+"T23:59:59.999Z";

    console.log(reportdata) 


angular.forEach($scope.sort, function(value, key) {
  //this.push(key + ': ' + value);
  //console.log(key + ': ' + value)
  if(value == 1){
$scope.sort1 = key;
  }else if(value == 2){
 $scope.sort2 = key;
  }else if(value == 3){
 $scope.sort3 = key;
  }else if(value == 4){
 $scope.sort4 = key;
  }
  console.log("1 "+$scope.sort1)
    console.log("2 "+$scope.sort2)
      console.log("3 "+$scope.sort3)
      console.log("4 "+$scope.sort4)
  
});

 var reportdata = $scope.radio.transaction+","+$scope.radio.barcode+","+$scope.radio.weight+","+$scope.radio.report+
                     ","+reportdate +","+$scope.sort1+","+$scope.sort2+","+$scope.sort3+","+$scope.sort4;
   

$http.get('/reportResult/'+reportdata ).success(function(response){
                       // $scope.reportonedate2= response
                      // alert("enetere x")
                       //   console.log("/receiveonedate/")
                          console.log(response);
                          if (response.length == 0) {
                            alert(" No matches are found");
                          }// if (response.length == 0)
                     //     response.sort((a, b) => a.group.localeCompare(b.group))
                         // response.sort((a, b) => a.salesCtg.localeCompare(b.salesCtg))
                         //  $scope.reportonedate1  = response;
                           var report1 = response;
                           var sort1 = null;
        var sort2 = null;
        var sort3 = null;
        var sort4 = null;
        var sort1push = null;
           var  printary = [];
      var lengthitemNamesort = null;
      var printfinalary = [];
      var sortArrayCheck = [];
      var mySet = new Set();
      var mySet11 = new Set();
      var mySet22 = new Set();
      var sort1Check = null;
      var sort2Check = null;
      var sort3Check = null;

var processItems = function(k){
 if( k < report1.length ) {       
                            
  //           if ($scope.sort1 == "Group") {
  //         sort1 = report1[k].group ;
  //         // var obj3 = {};
  //         //  sort1push = obj3["group"] ; salesCtg
  //     } else if($scope.sort1 == "SaleCty"){
  //         sort1 = report1[k].salesCtg;
  //        // alert(" sort1 "+ report1[k].salesCtg)
  //     }else if($scope.sort1 == "Purity"){
  //        sort1 = report1[k].purity;

  //     }else if($scope.sort1 == "Item"){
  //        sort1 = report1[k].item;

  //     }
  // if ($scope.sort2 == "Group") {
  //         sort2 = report1[k].group ;
  //         // var obj3 = {};
  //         //  sort1push = obj3["group"] ;
  //     } else if($scope.sort2 == "SaleCty"){
  //         sort2 = report1[k].salesCtg;
  //     }else if($scope.sort2 == "Purity"){
  //        sort2 = report1[k].purity;

  //     }else if($scope.sort2 == "Item"){
  //        sort2 = report1[k].item;

  //     }
  //      if ($scope.sort3 == "Group") {
  //         sort3 = report1[k].group ;
  //         // var obj3 = {};
  //         //  sort1push = obj3["group"] ;
  //     } else if($scope.sort3 == "SaleCty"){
  //         sort3 = report1[k].salesCtg;
  //     }else if($scope.sort3 == "Purity"){
  //        sort3 = report1[k].purity;

  //     }else if($scope.sort3 == "Item"){
  //        sort3 = report1[k].item;

  //     }

  //      if ($scope.sort4 == "Group") {
  //         sort4 = report1[k].group ;
  //         // var obj3 = {};
  //         //  sort1push = obj3["group"] ;
  //     } else if($scope.sort4 == "SaleCty"){
  //         sort4 = report1[k].salesCtg;
  //     }else if($scope.sort4 == "Purity"){
  //        sort4 = report1[k].purity;

  //     }else if($scope.sort4 == "Item"){
  //        sort4 = report1[k].item;

  //     }
      //validation end
         function  promiseSort1(condition) {
                 
           // console.log("promiseSort1 "+k);
           // report1[k]._id.sort1
            var deferred = $q.defer();
               mySet11.add({
                sort1  : report1[k]._id.sort1 ,
               
              });
              //  console.log("sort 1 "+sort1); 
                
              //  if( printary.indexOf(sort1) == -1) {
                  if( condition == false || condition == null   ) {
                 
                     
                      // var obj3 = {"_id.sort1":report1[k]._id.sort1};
                       var obj3 = {"_id":{sort1:report1[k]._id.sort1}};
                      // report1[k]._id.sort1
                      //  obj3["_id"] = {sort1:report1[k]._id.sort1} ;
                        
                             
                      // if ($scope.sort1 == "Group") {
                      //        obj3["group"]   = sort1;
        
                      //   } else if($scope.sort1 == "SaleCty"){
                      //       //sort1 = report1[k].salesCtg;
                      //       obj3["salesCtg"]  = sort1;
                      //    }else if($scope.sort1 == "Purity"){
                      //          //sort1 = report1[k].purity;
                      //           obj3["purity"]  = sort1;

                      //   }
                       
                         // printary.push(sort1);
                          printfinalary.push(obj3)
                          console.log(printfinalary)
                          console.log(printfinalary[0]._id.sort1)      
                          deferred.resolve( printfinalary);
                              
                         }
                         else{
                                   
                                   deferred.resolve( printfinalary);
                        }
        

        
     
             return deferred.promise;
    
              
           }//// promisesort1Call()
           
           function  promiseSort2(condition) {
            
            // console.log("promiseSort2 call");
             var deferred2 = $q.defer();
             //for always execute
             //if( printary.indexOf(sort2) == -1) {
              mySet22.add({
                sort1  : report1[k]._id.sort1 ,
                sort2  : report1[k]._id.sort2 
              });
               if( condition == false || condition == null   ) {
                 // var obj3 = {"_id.sort1":report1[k]._id.sort1,"_id.sort2":report1[k]._id.sort2};
                 var obj3 = {"_id":{sort2:report1[k]._id.sort2}};     
              //alert(sort2)
                                 // alert("entered to remove duplicates ")
      //                          var obj3 = {};
      //                            if ($scope.sort2 == "Group") {
      //                               obj3["group"]   = sort2;
        
      // } else if($scope.sort2 == "SaleCty"){
      //     //sort1 = report1[k].salesCtg;
      //     obj3["salesCtg"]  = sort2;
      // }else if($scope.sort2 == "Purity"){
      //    //sort1 = report1[k].purity;
      //   obj3["purity"]  = sort2;

      // }
       //                               printary.push(sort2);
                                  printfinalary.push(obj3)
                                 // console.log(printary)
                                  //  alert(arrcon)
                          deferred2.resolve(  printfinalary);
                              
                         }
                         else{
                                   
                                   deferred2.resolve( printfinalary);
                        }
        

        
     
             return deferred2.promise;
           }// promiseSort2
      function  promiseSort3(condition) {
            
            // console.log("promiseSort2 call");
             var deferred2 = $q.defer();
             //for always execute
             //if( printary.indexOf(sort2) == -1) {
              mySet.add({
                sort1  : report1[k]._id.sort1 ,
                sort2  : report1[k]._id.sort2 ,
                sort3  : report1[k]._id.sort3 
              });
                if( condition == false || condition == null   ) {
                // var obj3 = {"_id.sort1":report1[k]._id.sort1,"_id.sort2":report1[k]._id.sort2,"_id.sort3":report1[k]._id.sort3};
                 var obj3 = {"_id":{sort3:report1[k]._id.sort3}};  
              //alert(sort2)
                                 // alert("entered to remove duplicates ")
      //                          var obj3 = {};
      //                            if ($scope.sort2 == "Group") {
      //                               obj3["group"]   = sort2;
        
      // } else if($scope.sort2 == "SaleCty"){
      //     //sort1 = report1[k].salesCtg;
      //     obj3["salesCtg"]  = sort2;
      // }else if($scope.sort2 == "Purity"){
      //    //sort1 = report1[k].purity;
      //   obj3["purity"]  = sort2;

      // }
                           //            printary.push(sort2);
                                  printfinalary.push(obj3)
                                 // console.log(printary)
                                  //  alert(arrcon)
                            deferred2.resolve(  printfinalary);
                              
                         }
                         else{
                                   
                                     deferred2.resolve(  printfinalary);
                        }
        

        
     
             return deferred2.promise;
           }// promiseSort2

     function  checkSort1() {
                 
           // console.log("checkSort3 ");
            
            var deferred11 = $q.defer();
            function logSetElements(value1) {
                         //  console.log(value1);
                   if(value1.sort1  == report1[k]._id.sort1 ){
                        //  console.log("value1");
                        sort1Check = true;
                   }else{
                             sort1Check = false;
                        }
    
             }//logSetElements

             var resultFromIf = mySet11.forEach(logSetElements);
                 deferred11.resolve( sort1Check);
                 return deferred11.promise;

      }//checkSort1
     function  checkSort2() {
                 
           // console.log("checkSort3 ");
            
            var deferred22 = $q.defer();
            function logSetElements(value1) {
                         //  console.log(value1);
                   if(value1.sort1  == report1[k]._id.sort1 && value1.sort2  == report1[k]._id.sort2){
                        //  console.log("value1");
                        sort2Check = true;
                   }else{
                             sort2Check = false;
                        }
    
             }//logSetElements

             var resultFromIf = mySet22.forEach(logSetElements);
                 deferred22.resolve( sort2Check);
                 return deferred22.promise;
      }//checkSort2
    function  checkSort3() {
                 
           // console.log("checkSort3 ");
            
            var deferred4 = $q.defer();
            function logSetElements(value1) {
                         //  console.log(value1);
                   if(value1.sort1  == report1[k]._id.sort1 && value1.sort2  == report1[k]._id.sort2 && value1.sort3  == report1[k]._id.sort3 ){
                        //  console.log("value1");
                        sort3Check = true;
                   }else{
                             sort3Check = false;
                        }
    
             }//logSetElements

             var resultFromIf = mySet.forEach(logSetElements);
                 deferred4.resolve( sort3Check);
                 return deferred4.promise;
      }//checkSort3
           function  promiseSort4(condition) {
              console.log("promiseSort3 "+ condition);
               var deferred3 = $q.defer();
              //  mySet.add({
              //   group  : report1[k].group ,
              //   salesCtg : report1[k].salesCtg,
              //   purity : report1[k].purity,
              //   item : report1[k].item
              // });

               
              // if( printary.indexOf(sort3) == -1) {
                    if( condition == false || condition == null   ) {
                 
                         // alert("entered to remove duplicates ")
                          // var obj3 = {};
                           var obj3 = {"_id":{sort4:report1[k]._id.sort4}};  
            
                           // obj3["purity"] = report1[k].purity;
      //                      if ($scope.sort3 == "Group") {
      //                               obj3["group"]   = sort3;
        
      // } else if($scope.sort3 == "SaleCty"){
      //     //sort1 = report1[k].salesCtg;
      //     obj3["salesCtg"]  = sort3;
      // }else if($scope.sort3 == "Purity"){
      //    //sort1 = report1[k].purity;
      //   obj3["purity"]  = sort3;

      // }
      //                       printary.push(sort3);
                             printfinalary.push(obj3)
                             var obj = {};
                                   obj["item"] = report1[k].item;
                                   obj["opQty"] = report1[k].itemopQty;
                                   obj["opPcs"] = report1[k].itemopPcs;
                                   obj["rcvQty"] = report1[k].rcvQty;
                                   obj["rcvPcs"] = report1[k].rcvPcs;
                                   obj["totQty"] = report1[k].totQty;
                                   obj["totPcs"] = report1[k].totPcs;
                                   obj["issQty"] = report1[k].issQty ;
                                   obj["issPcs"] = report1[k].issPcs;
                                   obj["ciQty"] = report1[k].ciQty;
                                   obj["ciPcs"] = report1[k].ciPcs;
                                  //  obj["salesCtg"] = report1[k].salesCtg;
                    
                                   printfinalary.push(obj)
                          // console.log(printary)
                           //console.log(printfinalary)
                           $scope.reportonedate1 =printfinalary;
                            //console.log(" x4 = yield ");
                             deferred3.resolve( printary);
                           //  alert(arrcon)
                          }
                          //else{
                         //           var obj = {};
                         //           obj["item"] = report1[k].item;
                         //           obj["opQty"] = report1[k].opQty;
                         //           obj["opPcs"] = report1[k].opPcs;
                         //           obj["rcvQty"] = report1[k].rcvQty;
                         //           obj["rcvPcs"] = report1[k].rcvPcs;
                         //           obj["totQty"] = report1[k].totQty;
                         //           obj["totPcs"] = report1[k].totPcs;
                         //           obj["issQty"] = report1[k].issQty ;
                         //           obj["issPcs"] = report1[k].issPcs;
                         //           obj["ciQty"] = report1[k].ciQty;
                         //           obj["ciPcs"] = report1[k].ciPcs;
                         //          // obj["salesCtg"] = report1[k].salesCtg;
                    
                         //           printfinalary.push(obj)
                         //           //console.log(printfinalary)
                         //            deferred3.resolve( printary);
                         //            $scope.reportonedate1 =printfinalary;
                         //             // console.log(" x4 = yield ");

                         //      }
               return deferred3.promise;
           }//promiseSort3



           function  promiseCalls() {
           // console.log("promiseCalls "+k);
             // promiseSort1();
              checkSort1()
              .then(function (checkSort1) {
               // console.log("sec replay")
                // $scope.reportonedate1  = printfinalary;
                //  processItems(k+1);
                 return   promiseSort1(checkSort1);
                    
               })
              .then(function () {
               // console.log("sec replay")
                // $scope.reportonedate1  = printfinalary;
                //  processItems(k+1);
                 return   checkSort2()
                    
               })
              .then(function (checkSort2) {
                // console.log("fir replay")
                    // alert("promisesort1Call replay "+ printary.length);
                   //  $scope.reportonedate1  = printfinalary;
                  // console.log(" openingBalanceData "+openingBalanceData.length);
                   return   promiseSort2(checkSort2)
               })
              .then(function () {
               // console.log("sec replay")
                // $scope.reportonedate1  = printfinalary;
                //  processItems(k+1);
                 return   checkSort3()
                    
               })
              .then(function (checkSort3) {
               // console.log("checkSort3 checkSort3 checkSort3 value is "+checkSort3)
                // $scope.reportonedate1  = printfinalary;
                //  processItems(k+1);
                 return   promiseSort3(checkSort3)
                    
               })
              .then(function () {
               // console.log("sec replay")
                // $scope.reportonedate1  = printfinalary;
                //  processItems(k+1);
                // return   checkSort4()
                 return promiseSort4(false)
                    
               })
              // .then(function (checkSort4) {
              //  // console.log("checkSort3 checkSort3 checkSort3 value is "+checkSort3)
              //   // $scope.reportonedate1  = printfinalary;
              //   //  processItems(k+1);
              //    return   promiseSort4(checkSort4)
                    
              //  })
              .then(function () {
                //console.log("sort3 replay")
                //$scope.reportonedate1  = printfinalary;
                 processItems(k+1);
                
                    
               })
                 
            //console.log("promiseCall "+k);
    
              // promisesort1Call()
           }//
           promiseCalls();
           
                             
            }//if con irssr
       }//k
       processItems(0);



  });///reportResult
}//else ends
}
//preview function
//$scope.reportpurity ='purity';
// $scope.preview = function(){
//     var receivedata = null;
//     var issuedata = null;
//     var report1 =[];
//     var reportdate   = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
   

//     var reportdata = $scope.radio.transaction+","+$scope.radio.barcode+","+$scope.radio.weight+","+$scope.radio.report+","+reportdate ;
//     console.log(reportdata) 
//     //var nietos = [];
//     if($scope.radio.report =='itemName'){
//         //alert("itemname")
//       genWrap1( function* (){
//         //function* gen(){
  
//         var x = yield $http.get('/receiveonedate/'+reportdata ).success(function(response){
//                        // $scope.reportonedate2= response
//                       // alert("enetere x")
//                        //   console.log("/receiveonedate/")
//                           console.log(response)
//                           receivedata = response; 

//                 });
//           //console.log(x)
//         var y = yield $http.get('/issueonedate/'+reportdata ).success(function(response){
//                        // $scope.reportonedate2= response
//                      //   alert("enetere x")
//                         //  console.log("/issueonedate/")
//                           console.log(response)
//                           issuedata = response;
//                          // console.log(issuedata )
//                          // console.log(receivedata)
//                          // console.log(receivedata[0]._id)
//                          // console.log(issuedata.length )
//                          // console.log(receivedata.length)
//                           for(let m = 0; m<issuedata.length ; m++){
//                              // console.log("loop m "+m)
//                              // alert("loopm "+m)
//                              for(let n = 0; n<receivedata.length ; n++){
//                                 // console.log("loop m "+m+" n loop "+n)
//                                   // alert("loopmn "+n)
//                                  // console.log(issuedata[m]._id)
//                                   // console.log(receivedata[n]._id)
//                                   if(issuedata[m]._id == receivedata[n]._id ){
//                                    // console.log("if if if loop")

//                                     // alert("loopmif loop "+m)
//                                     var opQty = 0;
//                                     var opPcs = 0;
//                                     var totQty = 0;
//                                     var totPcs = 0;
//                                     var ciQty = 0;
//                                     var ciPcs = 0;
//                                      // console.log(issuedata[m])
//                                     //console.log(receivedata[n])
//                                     // totQty = opQty + issuedata[m].weight;
//                                     // totPcs = opPcs + issuedata[m].gpcs;
//                                     totQty =( opQty + receivedata[n].weight).toFixed(fixdec) ;
//                                     totPcs = (opPcs + receivedata[n].gpcs).toFixed(fixdec);

//                                     ciQty = (totQty -issuedata[m].weight).toFixed(fixdec) ;
//                                     ciPcs = (totPcs - issuedata[m].gpcs ).toFixed(fixdec);
//                                      //   console.log("m "+m+" n "+n + "totQty "+totQty + " totPcs "+totPcs);
//                                      console.log("receivedata[n].weight "+receivedata[n].weight+"receivedata[n].gpcs "+receivedata[n].gpcs); 
                                    
//                                      console.log("issuedata[m].weight "+issuedata[m].weight+"issuedata[m].gpcs "+issuedata[m].gpcs); 
//                                      console.log("opQty "+opQty +"opPcs "+opPcs + "totQty "+totQty + " totPcs "+totPcs);
//                                      if(issuedata[m].gpcs == null){
//                                       issuedata[m].gpcs = 0;
//                                      }
//                                      if(issuedata[m].weight == null){
//                                       issuedata[m].weight = 0;
//                                      }
//                                      if(receivedata[n].gpcs == null){
//                                       receivedata[n].gpcs = 0;
//                                      }
//                                      if(receivedata[n].weight == null){
//                                       receivedata[n].weight = 0;
//                                      }
                         
//                                    var obj = {};
//                                    obj["item"] = issuedata[m]._id;
//                                    obj["opQty"] = (opQty).toFixed(fixdec);
//                                    obj["opPcs"] = (opPcs).toFixed(fixdec);
//                                    obj["rcvQty"] = (receivedata[n].weight).toFixed(fixdec);
//                                    obj["rcvPcs"] = (receivedata[n].gpcs).toFixed(fixdec);
//                                    obj["totQty"] = totQty;
//                                    obj["totPcs"] = totPcs;
//                                    obj["issQty"] = (issuedata[m].weight).toFixed(fixdec);
//                                    obj["issPcs"] = (issuedata[m].gpcs).toFixed(fixdec);
//                                    obj["ciQty"] = ciQty;
//                                    obj["ciPcs"] = ciPcs;
//                                    report1.push(obj);
//                                     // report1.push([issuedata[m]._id,opQty,opPcs,receivedata[n].weight,
//                                     // receivedata[n].gpcs,totQty,totPcs,issuedata[m].weight,issuedata[m].gpcs,ciQty,ciPcs]);
//                                      // console.log(report1[n])
//                                      // console.log(report1)
//                                      // console.log(nietos)
//                                     //  $scope.reportonedate1 = report1;
//                                       // console.log($scope.reportonedate1)
//                                       // var p = $q.defer()
//                                       //  p = $q.all(report1[n]).then(function (res) {
//                                       //     //return for chaining
//                                       //      return res[1];
//                                       //   });
//                                        //push promise to list
//                                      //  report1.push(obj);
//                                   } //if

//                                   //consolidate promises    
//                                   $scope.reportonedate1 = report1;
                                     
//                              }//let n


//                           } //let m

//                          // console.log("tyriuriri")

//            });
        


//       })//gen


//         function genWrap1(generator){

//           var gen = generator();

//           function handle(yielded){
//         if(!yielded.done){
//            console.log(yielded)
//             yielded.value.then(function(data){
//             return handle(gen.next())
//           })
//         }
//       }
//       return handle(gen.next())
//       }


//     }//itemname

//     if($scope.radio.report =='purity'){
//       //alert("puritytyty")

//       var itemgroup =[]
//       var receivedata1 = null;
//       //var issuedata1 = null;
//       var report1 =[];
//       var  printary = [];
//       var lengthitemNamesort = null;
//       var printfinalary = []
//       // var purity2 = function(){

//       genWrap( function* (){
//           var reportdate   = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
//           var reportdata = $scope.radio.transaction+","+$scope.radio.barcode+","+$scope.radio.weight+","+$scope.radio.report+","+reportdate ;
//          // console.log(reportdata)
//           var x1 = yield $http.get('/receiveonedate/'+reportdata ).success(function(response){
//                        // $scope.reportonedate2= response
//                           //console.log("/receiveonedate/")
//                          console.log(response)
//                           receivedata1 = response; 
//                          // console.log(" x1 = yield ")
//                 });

//           var x2 = yield $http.get('/itemreport2').success(function(response){
  
//                  var itemNamesort = response; 
//                   //  console.log(itemNamesort.length)
//                  lengthitemNamesort = itemNamesort.length
//                  for(let t = 0;t<lengthitemNamesort;t++){
    
//                        $http.get('/itemnamedetails'+itemNamesort[t]._id.itemName).success(function(response){

//                              itemgroup1 = {};
//                              itemgroup1["itemName"] = response[0].Name;
//                              itemgroup1["Group"] = response[0].InvGroupName
//                              itemgroup1["issQty"] = itemNamesort[t].ntwt;
//                              // itemgroup1["issQty"] = itemNamesort[t].weight;
//                              itemgroup1["issPcs"] = itemNamesort[t].gpcs;
//                              itemgroup1["purity"] = itemNamesort[t]._id.purity;
                                   

//                              itemgroup.push(itemgroup1);
//                             // console.log(itemgroup1)
            
//                          })
//                   }
//                  console.log(" x2 = yield ")
//                 }) //'/itemreport2'
//           //yield not working for loop so $http.get written
//           var x3 = yield $http.get('/itemreport2').success(function(response){
//                    //console.log("loop "+itemgroup.length)
//                   //  console.log("entereefnnn loop "+receivedata1.length)
                
//                      for(let m = 0; m<receivedata1.length  ; m++){
//                              // console.log(receivedata1)
//                              // console.log("loop "+lengthitemNamesort)
//                              for(let n = 0; n<itemgroup.length ; n++){
//                              // console.log("loop m "+m+" n loop "+n)
                                  
//                                 if(receivedata1[m]._id.itemName == itemgroup[n].itemName && receivedata1[m]._id.purity == itemgroup[n].purity ){
//                                  console.log(" inside loop m "+m+" n loop "+n)
//                                     // console.log(receivedata1[m]._id.itemName+itemgroup[n].itemName )
//                                     // console.log(receivedata1[m]._id.purity+itemgroup[n].purity )
                                    
//                                     var opQty = 0;
//                                     var opPcs = 0;
//                                     var totQty = 0;
//                                     var totPcs = 0;
//                                     var ciQty = 0;
//                                     var ciPcs = 0;
//                                    //  if(issuedata[m] == null){
//                                    //    issuedata[m] = 0;
//                                    //  }
//                                    // console.log(issuedata[n])
                                   
//                                     if(receivedata1[m].gpcs == null){
//                                       receivedata1[m].gpcs = 0;
//                                       //alert("null gpcs");
//                                     }
//                                     if(receivedata1[m].weight == null){
//                                       receivedata1[m].weight = 0;
//                                       //alert("null weight");
//                                     }

//                                     if(itemgroup[n].issPcs== null){
//                                       itemgroup[n].issPcs = 0;
//                                      // alert("null gpcs");
//                                     }
//                                     if(itemgroup[n].issQty == null){
//                                       itemgroup[n].issQty = 0;
//                                      // alert("null weight");
//                                     }
//                                      console.log(receivedata1[m])
//                                     totQty = (opQty + receivedata1[m].weight).toFixed(fixdec);
//                                     totPcs = (opPcs + receivedata1[m].gpcs).toFixed(fixdec);
//                                     ciQty = (totQty-itemgroup[n].issQty).toFixed(fixdec);
//                                     ciPcs =  (totPcs-itemgroup[n].issPcs).toFixed(fixdec);
//                                      console.log(" after loop m "+m+" n loop "+n);
                                  
//                                     // totQty = (opQty + receivedata1[m].weight);
//                                     // totPcs = (opPcs + receivedata1[m].gpcs);
//                                     // ciQty = (totQty-itemgroup[n].issQty);
//                                     // ciPcs =  (totPcs-itemgroup[n].issPcs);
                                     
                                     
//                                     //  totQty =( opQty + receivedata[n].weight).toFixed(fixdec) ;
//                                     // totPcs = (opPcs + receivedata[n].gpcs).toFixed(fixdec);

//                                     // ciQty = (totQty -issuedata[m].weight).toFixed(fixdec) ;
//                                     // ciPcs = (totPcs - issuedata[m].gpcs ).toFixed(fixdec);
                                     

//                                    var obj = {};
//                                    obj["item"] = itemgroup[n].itemName;
//                                    obj["opQty"] = opQty;
//                                    obj["opPcs"] = opPcs;
//                                    obj["rcvQty"] = (receivedata1[m].weight).toFixed(fixdec);
//                                    obj["rcvPcs"] = (receivedata1[m].gpcs).toFixed(fixdec);
//                                    obj["totQty"] = totQty;
//                                    obj["totPcs"] = totPcs;
//                                    obj["issQty"] = (itemgroup[n].issQty).toFixed(fixdec);
//                                    obj["issPcs"] = (itemgroup[n].issPcs).toFixed(fixdec);
//                                    obj["ciQty"] = (ciQty);
//                                    obj["ciPcs"] = (ciPcs);
//                                    obj["group"] = itemgroup[n].Group;
//                                    obj["purity"] = itemgroup[n].purity;
//                                    report1.push(obj);
//                                     // report1.push([issuedata[m]._id,opQty,opPcs,receivedata[n].weight,
//                                     // receivedata[n].gpcs,totQty,totPcs,issuedata[m].weight,issuedata[m].gpcs,ciQty,ciPcs]);
//                                       // console.log(report1[n])
//                                      // console.log(report1)
//                                     //  $scope.reportonedate1 = report1;
//                                      // console.log(nietos)
//                                    //  console.log(report1.length)
//                                    //  $scope.reportonedate1 = report1;
//                                       // console.log($scope.reportonedate1)
//                                   }

//                              }


//                       } 


//                       console.log(" x3 = yield ");

//                  }) //item2
//                             //direct for loop not working so using this
//             var x4 = yield $http.get('/itemreport2').success(function(response){
//                       for(let k = 0;k< report1.length;k++){
//                          //console.log(report1[k])
//                         // console.log(report1[k].group)
//                         // console.log(report1[k].purity)
//                          //console.log(report1[k].item)
//                           if( printary.indexOf(report1[k].group) == -1) {
//                                  // alert("entered to remove duplicates ")
//                                var obj3 = {};
//                                 obj3["group"] = report1[k].group;
                            
                                 
                                   
//                                  printary.push(report1[k].group);
//                                   printfinalary.push(obj3)
//                                  // console.log(printary)
//                                   //  alert(arrcon)
//                          }
//                          if( printary.indexOf(report1[k].purity) == -1) {
//                          // alert("entered to remove duplicates ")
//                            var obj3 = {};
                           
//                             obj3["purity"] = report1[k].purity;
//                             printary.push(report1[k].purity);
//                              printfinalary.push(obj3)
//                              var obj = {};
//                                    obj["item"] = report1[k].item;
//                                    obj["opQty"] = report1[k].itemopQty;
//                                    obj["opPcs"] = report1[k].itemopPcs;
//                                    obj["rcvQty"] = report1[k].rcvQty;
//                                    obj["rcvPcs"] = report1[k].rcvPcs;
//                                    obj["totQty"] = report1[k].totQty;
//                                    obj["totPcs"] = report1[k].totPcs;
//                                    obj["issQty"] = report1[k].issQty ;
//                                    obj["issPcs"] = report1[k].issPcs;
//                                    obj["ciQty"] = report1[k].ciQty;
//                                    obj["ciPcs"] = report1[k].ciPcs;
//                                    printfinalary.push(obj)
//                           // console.log(printary)
//                            $scope.reportonedate1 =printfinalary;
//                             console.log(" x4 = yield ");
//                            //  alert(arrcon)
//                          }else{
//                                    var obj = {};
//                                    obj["item"] = report1[k].item;
//                                    obj["opQty"] = report1[k].opQty;
//                                    obj["opPcs"] = report1[k].opPcs;
//                                    obj["rcvQty"] = report1[k].rcvQty;
//                                    obj["rcvPcs"] = report1[k].rcvPcs;
//                                    obj["totQty"] = report1[k].totQty;
//                                    obj["totPcs"] = report1[k].totPcs;
//                                    obj["issQty"] = report1[k].issQty ;
//                                    obj["issPcs"] = report1[k].issPcs;
//                                    obj["ciQty"] = report1[k].ciQty;
//                                    obj["ciPcs"] = report1[k].ciPcs;
//                                    printfinalary.push(obj)
//                                     //   console.log(printary)
//                                      $scope.reportonedate1 =printfinalary;
//                                      // console.log(" x4 = yield ");

//                               }
                     
//                        }//for loop
               

//                  })//4

//         });//gen2

// function genWrap(generator){

//   var gen = generator();

//   function handle(yielded){
//     if(!yielded.done){
//       console.log(yielded)
//       yielded.value.then(function(data){
//       return handle(gen.next())
//       })
//     }
//   }
//   return handle(gen.next())
// }


// }//purity



// }//preview


}]);
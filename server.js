/* using the express library for requests for mongodb database */
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var mongoose       = require('mongoose');
var db=mongojs('inventory',['user','tags','transaction','saleinvoice','mode','transactiondetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barcodesumm','stockpointmaster','configurations','inventorygroupmaster','salescategorymaster','itemtype','taxrate',
  'items','tax','taxation','inventoryGroupAccMaster','inventorygroupvaluenotationdaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails']);


var bodyParser=require('body-parser');


//var app            = express();
//var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bson = require('bson');
var Promise = require('es6-promise').Promise;


app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/countdata',function(req,res)
{
  // console.log("countdata countdata countdata countdata")
 //db.barcodesumm.count(function(err,doc){
    db.barcodesumm.find({}).sort({_id:-1}).limit(1,function(err,doc)
    {
        res.json(doc);
        //console.log(doc);
    })
  // db.barcodesumm.find({}.sort({_id:-1}).limit(1),(function(err,doc){
  //     // console.log("the count is "+doc);
  //     if(err){
  //       console.log(err)
  //     }
  //       res.json(doc);
  //       console.log(doc)
  //    }))
  })
console.log("data is today update")
//for tags count
app.get('/gettags',function(req,res)
{
  //console.log("gettags gettags gettags gettags gettags gettags gettags gettags");
  var a=req.query.count

  var b =parseInt(a)
 

  db.tags.count({count:b,status:"Inprogress"},(function(err,doc){
       //console.log("the count is "+doc);
        res.json(doc);
        
     }))
  })
//for update of color in batch
app.put('/colorupdate/:list',function(req,res)
{ //'/status/:update'
  console.log(" colorupdate colorupdate colorupdate colorupdate colorupdate colorupdate colorupdate colorupdate colorupdate");
    var str=req.params.list;
   // console.log(str);
    var str_array=str.split(",");
    var a =str_array[0];
    //console.log("status is"+status);
    var color=str_array[1]
    //var bar =parseInt(code1);
  //var a=req.query.count
 // var barcode=req.query.barcode;
 // console.log(req.query.count);

 //  var barcode=req.query.barcode;
  var b =parseInt(a)
  console.log(b);
  // var color = req.query.color
   console.log(color)
   //db.batch.update({"barcode":code1},{"$set":{"stats":status,
  db.batch.update({barcode:b},{"$set":{"color":color, "stats" : "completed"}},(function(err,doc){
       //console.log("the count is "+doc);
        res.json(doc);
        
     }))
  
 })
//for batch compare count
app.get('/batchcount',function(req,res){

  var a=req.query.count
  
  var b =parseInt(a)
 

  db.batch.find({count:b,"stats" : "Inprogress"},(function(err,doc){
    //   console.log("the count is "+doc);
        res.json(doc);
        
     }))
})
//for batch grey color incomplete
app.get('/greycolor',function(req,res)
{
  

  db.batch.find({"color":"grey"},(function(err,doc){
    //   console.log("the count is "+doc);
        res.json(doc);
        
     }))
  })
app.get('/bardata',function(req,res)
{
    //console.log("i received a get request from index");
    db.barcodesumm.find({status:"Inprogress"},function(err,doc){
        //console.log(doc); db.barcodesumm.find({status:"completed"})
        res.json(doc);
})

     })



// prn file generation

// app.post('/prn',function(req,res)
// {
//   //console.log("prn function prn function")
//   var ItemName =req.body.itemName;
//   if(ItemName == "Big Chain"){
//     var path = 'sample/prntext.txt';
//     var path1 = 'sample/prnfile.prn';
//   } else if(ItemName == "Bangales"){
//     var path = 'sample/prnbangalestext.txt';
//     var path1 = 'sample/prnbangalesfile.prn';
//   }else if(ItemName == "Gold Ring"){
//     var path = 'sample/prngoldringtext.txt';
//     var path1 = 'sample/prngoldringfile.prn';
//   }
  

//   var http = require('http');
//   fs = require('fs')
//   fs.readFile(path, 'utf8', function (err,data) {
//       if (err) {
//          return console.log(err);
//       }
//     var ItemName =req.body.itemName;
//     var barcode = req.body.barcode;
//     var result = data.replace(/Item NameOrCategory/g, ItemName);
//     var result1 =result.replace(/12345678/g, barcode);
    
//       fs.writeFile(path1, result1, 'utf8', function (err) {
//            if (err) return console.log(err);

//      //this for batch file and print command
//               require('child_process').exec(__dirname + "/batchfile.bat", function (err, stdout, stderr) {
  
//                    if (err) {
//                      return console.log(err);
//                     }

//                   //  console.log(stdout);
//              });
//       });
//   });
// });
// app.post('/print',function(req,res)
// {
// var http = require('http');
// fs = require('fs')
// fs.readFile('sample/BC_Silver - Copy.txt', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
    
//    }
//    else
//    {
//     console.log("File reading successful----------------")
//     console.log(data)
//    }

//    var Printer = require('node-printer');
//    console.log(Printer.list());
   

//  // console.log(data);
  
//   //console.log(req.body.chgunt);
//   //console.log(req.body.barcode);
//   //console.log(req.body.iname);
//   // var ItemName =req.body.iname;
//   // var barcode = req.body.barcode;
//   // var Charge1Total =req.body.taxval1;
//   // var GrossQty =req.body.gwt;
//   // var ChargableUnits =req.body.chgunt;

//   //  var result = data.replace(/batch.ItemName/g, ItemName);
//   //  var result1 =result.replace(/batch.Barcode/g, barcode);
//   //  var result2 = result1.replace(/StockBookDetail.Charge1Total/g, Charge1Total);
//   //  var result3 = result2.replace(/StockBookDetail.GrossQty/g, GrossQty );
//   //  var result4 = result3.replace(/StockBookDetail.ChargeableUnits/g, ChargableUnits);
//   //   var result5 =result4.replace(/StockBookDetail.Barcode/g, barcode);
    
//   // fs.writeFile('sample/sample.prn', result5, 'utf8', function (err) {
//   //    if (err) return console.log(err);
//   // });
// });
// });
//getting tax value in index page
// app.get('/gettaxvalue',function(req,res)
// {
//     db.itemrate.find(function(err,doc){
//         res.json(doc);
// })
// })


// 916 rs 2999 data 
app.get('/itemrate',function(req,res)
{
    //console.log("i received a get request from index");
    db.itemrate.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
// configuration details
app.get('/configuration',function(req,res)
{
    //console.log("i received a get request from index");
    db.configurations.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

//roundOffConfiguration
app.get('/roundOffConfiguration',function(req,res)
{
    db.configurations.find(function(err,doc){
        res.json(doc);
})
})
// for getting treasure name in barcode summary
app.get('/Treasure',function(req,res)
{
   // console.log("i received a get request from index");
    db.stockpointmaster.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

app.get('/purity',function(req,res){
   // console.log("i received a get request from index");
    db.purity.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
app.get('/uom',function(req,res)
{
   // console.log("i received a get request from index");
    db.uom.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
app.get('/labcal',function(req,res)
{
    //console.log("i received a get request from index");
    db.labcal.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
app.get('/pct:type',function(req,res)
{
  
    var type = req.params.type;
    //console.log("pct pct pct pct pct pct pct pct "+type);
    db.pct.find({"type":type},function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
//for list search
app.get('/list',function(req,res)
{
   // console.log("i received a get request from index");
   //22/6 db.barcodesumm.find({status:"Inprogress"},function(err,doc){
        //console.log(doc);
         db.barcodesumm.find({status:"Inprogress"},function(err,doc){
   
        res.json(doc);
})
})
app.get('/listdata:list',function(req,res)
{
   // console.log("i list is exicuted list1 list1");
    var tax = req.params.list;
   var tax1=parseInt(tax);
    //console.log("here the replay is "+tax);

   db.tags.find({"count": tax1},function(err,doc){
      //  console.log(doc);
      //  db.tags.find({"count": tax1,"status":"Inprogress"},function(err,doc){
   
        res.json(doc);
})
})
// barcode data
app.get('/batchBarcode:barcodenum',function(req,res){
   // var tax = req.params.barcodenum;
   console.log("batchBarcode:barcodenum ")
   // var tax1=parseInt(tax);
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.batch.find({"barcode": Number(req.params.barcodenum),"orderStatus" : "available"},function(err,doc){     
      console.log(doc.length)
       // res.json(doc);
       if (doc.length != 0) {
           db.transactiondetail.find({"barcode": Number(req.params.barcodenum),"Transaction" : "Barcoding"},function(err,doc){     
      
                res.json(doc);
           })
       }//if
         else{
          res.json(doc);
         }
      });
});
app.get('/getbar:barcodenum',function(req,res)
{
   // console.log("i received a get request from count");
    var tax = req.params.barcodenum;
   var tax1=parseInt(tax);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.transactiondetail.find({"barcode": tax1},function(err,doc){     
      
        res.json(doc);
 //         console.log("i am combo "+doc[0].barcode);
 // // "comboItem" : "yes"
 //         if (doc[0].comboItem == "yes"  ) {
 //          console.log(" comno true    true   ytrrr "+ doc[0].comboItemCheck)
 //         }
        //  db.transactiondetail.find({comboBarcode:barcode},function(err,doc)
      
        // {
        //     res.json(doc);
        
        // }); 
})
})

app.get('/codeDetails:barcodenum',function(req,res)
{
    console.log("i received a get request from count");
    var barcoded = req.params.barcodenum;
   barcoded=parseInt(barcoded);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.transactiondetail.find({"barcode": barcoded, "orderStatus" : "completed","Transaction" : "Regular Sale"},function(err,doc){     
      
        res.json(doc);
})
})
//combo
  // db.transactiondetail.find({"comboBarcode":21462851},function(err,doc){ 
  //        console.log("transactiondetail")
  //       // console.log(doc[0]);
  //        //console.log(doc.gwt);
  //       console.log(doc[0].gwt);
  //      // console.log(doc[0].gpcs);
  // })    

// barcode data
app.get('/getComboitem:barcodenum',function(req,res)
{
   // console.log("i received a get request from count");
    var tax = req.params.barcodenum;
   var tax1=parseInt(tax);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.transactiondetail.find({ "comboBarcode" : tax1},function(err,doc){     
      
        res.json(doc);
})
})
app.get('/getComboBarcode:barcodenum',function(req,res){

    console.log("i received a get request from count getComboBarcode getComboBarcode getComboBarcode getComboBarcode");
    var tax = req.params.barcodenum;
   var tax1=parseInt(tax);
  
    db.transactiondetail.find({"comboBarcode": tax1},function(err,doc){     
        console.log("getComboBarcode")
        res.json(doc);
      })
})
app.get('/newTrailComboBarcode',function(req,res){ 

   // console.log("entered into new  trans data");
    console.log("newTrailComboBarcode newTrailComboBarcode newTrailComboBarcode newTrailComboBarcode newTrailComboBarcode newTrailComboBarcode");
    //res.json("100");
    // {params:{"barcodeNumber":$scope.user[i].barcodeNumber,"gwt":$scope.user[i].gwt,"gpcs":$scope.user[i].gpcs,"user":$scope.user[i]}}).success(function(response){  
    console.log(req.query.gwt);
     console.log(req.query.barcodeNumber);
      console.log(req.query.gpcs);
    
    //console.log("details here "+req.query.barcodeNumber+" " +req.query.gwt+" "+req.query.gpcs);
     //console.log("details here "+req.params.barcodeNumber+" " +req.params.gwt+" "+req.params.gpcs);
    
    var barcodeNumber=req.query.barcodeNumber;
    var gwt = req.query.gwt;
    var gpcs = req.query.gpcs;
    var user =user;
     db.transactiondetail.find({"comboBarcode":barcodeNumber},function(err,doc){     
        console.log("  gpcs "+ gpcs+"  gwt "+gwt);
      //  console.log(doc[0]);
        // console.log(doc);
        console.log(doc[0].gwt);
        console.log(doc[0].gpcs);

        gwt = doc[0].gwt -gwt;
       gpcs = doc[0].gpcs - gpcs;
       console.log("getComboBarcode "+doc[0].gwt+" doc[0].gwt "+" doc[0].gpcs "+doc[0].gpcs);
       // res.json(doc);
       
        db.transactiondetail.update({comboBarcode:barcodeNumber},{$set:{
         "gpcs":gpcs,"gwt":gwt}},function(err,doc){
           console.log(" update call update call update call getComboBarcode");
           // res.json(doc);
        
        }); 
      })
  })
// app.get('/newTrailComboBarcode:barcodenum',function(req,res){

//     console.log("i received a get request from count getComboBarcode getComboBarcode getComboBarcode getComboBarcode");
//     var tax = req.params.barcodenum;
//    var tax1=parseInt(tax);
  
//     db.transactiondetail.find({"comboBarcode": tax1},function(err,doc){     
//         console.log("getComboBarcode");
//         useritArrayData.gwt = doc[0].gwt -gwt;
//         useritArrayData.gpcs = doc[0].gpcs - gpcs;
//         res.json(doc);
//       })
// })

app.get('/getInvAccNo:invGroupName',function(req,res){
   //console.log("i getInvAccNo getInvAccNo getInvAccNo getInvAccNo getInvAccNo");
    var invGroupName = req.params.invGroupName;
    console.log(invGroupName)
   
    db.inventoryGroupAccMaster.find({"InvGroupName": invGroupName},function(err,doc){     
        console.log(doc);
        res.json(doc);
})
})

// app.get('/tags',function(req,res)
// {
//     //console.log("i received a get request from index");
//     db.tags.find(function(err,doc){
//         //console.log(doc);
//         res.json(doc);
// })
// })
// iam working here                 eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
app.get('/batchdata',function(req,res)
{
  //console.log("gettags gettags gettags gettags gettags gettags gettags gettags");
  var count=req.query.count;

  count = parseInt(count)
  var tags = req.query.tags;
  tags = parseInt(tags)
   db.batch.find({count:count}).sort({_id:-1}).limit(tags,function(err,doc)
    {
        res.json(doc);
    })
   // db.batch.find({count:count,"stats" : "Inprogress"}).sort({_id:-1}).limit(1,function(err,doc)
   //  {
   //      res.json(doc);
   //      //console.log(doc);
   //  })
})

// app.get('/batchdata/:update',function(req,res)
// {
//   var count = req.params.update;
  
//     count = parseInt(count)
//      db.batch.find({count:count}).sort({_id:-1},function(err,doc)
//     {
//         res.json(doc);
//     })
// })
// for batch records
app.get('/batchrecords/:update',function(req,res)
{ 
     var str = req.params.update;
   console.log(" in list batchrecords exicuted");
    var str_array=str.split(",");
    var count=str_array[0];
    count = parseInt(count)
    // console.log("status is"+status);
    // var code1=str_array[1]
   //console.log("the last record is")
   //console.log(count)
    db.batch.find({count:count,"stats" : "Inprogress"},function(err,doc)
    {
        res.json(doc);
        //console.log(doc);
    })
})
//for barcode identity
// app.get('/getbarcode',function(req,res)
// {
//     console.log("the batch no is")
//    // db.batch.find(function(err,doc)
//     db.transactiondetail.find({partyname:partyname},function(err,doc){
//         res.json(doc);
//         console.log(doc);
//     });
// });
app.post('/tags',function(req,res)
{
    console.log("tags insert call");
    db.tags.insert(req.body,function(err,doc)
    {
   res.json(doc);
    })

})
// edit update
app.put('/tagsupdate',function(req,res)
{
  console.log("tagsupdate tagsupdate tagsupdate tagsupdate ")
    db.tags.update(req.body,function(err,doc)
    {
   res.json(doc);
    })

})
// for last record in barcode generation
app.get('/lastrec/:update',function(req,res)
{ 
     var str=req.params.update;
  //  console.log(str);
    var str_array=str.split(",");
    var count=str_array[0];
    count = parseInt(count)
    // console.log("status is"+status);
    // var code1=str_array[1]
   //console.log("the last record is")
   //console.log(count)
   //db.transactiondetail.find({count:count}).sort({_id:-1}).limit(1
    db.batch.find({count:count,"stats" : "Inprogress"}).sort({_id:-1}).limit(1,function(err,doc)
    {
        res.json(doc);
        //console.log(doc);
    })
})
// history details
app.get('/history',function(req,res)
{       
   // console.log("entered into new  trans data");
    var barcode=req.query.barcode;
    db.batch.find({barcode:barcode},function(err,doc){ 
     
        res.json(doc);
       
    });
});
//for barcode generation
app.get('/barcode',function(req,res)
{       
   
    var barcode=req.query.barcode;
    

    db.transactiondetail.find({barcode:barcode},function(err,doc){ 
     // console.log(" in new history")
        res.json(doc);
       // console.log(doc);
    });
});

//for color change
app.get('/batchbarcode',function(req,res)
{       
   
    var barcode=req.query.barcode;
    barcode = parseInt(barcode)

    db.batch.find({barcode:barcode},function(err,doc){ 
     // console.log(" in new history")
        res.json(doc);
       // console.log(doc);
    });
});
// app.get('/barcode1',function(req,res)
// {       
//     console.log("entered into new  trans data");
//     var barcode=req.query.barcode;
//     console.log(barcode)
//     // console.log(str);
//     // var str_array=str.split(",");
//     // var partyname=str_array[0];
//     // console.log(partyname);

//     db.transactiondetail.find({barcode:barcode},function(err,doc){ 
//       console.log(" in new history")
//         res.json(doc);
//         console.log(doc);
//     });
// });
//for getting dates and voucherNo
app.get('/iateapple:partyname',function(req,res){
  console.log("voucher no and dates");
  var pname=req.params.partyname;
  db.saleinvoice.find({"partyname":pname},function(err,doc){
    res.json(doc);
    console.log(doc+"voucher No and dates");
  });
});
//for getting issue voucherNo
// app.get('/receiptdetails:partyname',function(req,res){
//   console.log("Issue Voucher Issue Voucher Issue Voucher Issue Voucher Issue Voucher Issue Voucher");
//   var pname=req.params.partyname;
//   var trans="Issue Voucher";
//   db.transactiondetail.find({"partyname":pname,"Transaction":trans},function(err,doc){
//     res.json(doc);
//     console.log(doc+"Issue No and dates");
//   });
// });
//previous
app.post('/userdata/:updat',function(req,res){
    //console.log("igot order requestttttttttttttttttttttt");
 var str=req.params.updat;
    //console.log(str);
    var str_array=str.split(",");
    var tran=str_array[0];
    //console.log("status is"+status);
    var code1=str_array[1]
    var bar =parseInt(code1);
  //  console.log("code1"+code1)
    var chgunt=str_array[2]
    var date=str_array[3]
    var desc=str_array[4]
    var final=str_array[5]
    var gpcs=str_array[6]
    var gwt=str_array[7]
    var iname=str_array[8]
    var ntwt=str_array[9]
    var partyname=str_array[10]
    var size=str_array[11]
    var taxval1=str_array[12]
    var taxamt1=str_array[13]
   var wt=str_array[14]

    var wastage=str_array[15]
    var stval=str_array[16]
    var labval=str_array[17]
    var rate=str_array[18]
    var stock=str_array[19]
    //console.log(partyname)
    console.log("finished")
    //db.useritem.insert
     db.useritem.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
        "name":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"StockInward":stock,"wastage":wastage,"stval":stval,"labval":labval},function(err,doc){
     
    //var document={name:name,city:city,no:no,email:email,street:street};
   // db.useritem.insert(req.body,function(err,doc){
        res.json(doc);
      //  console.log(doc);
    
})
})
app.get('/compos:barcodenum',function(req,res) {
  var barcoded = req.params.barcodenum;
   barcoded=parseInt(barcoded);
db.transactiondetail.find({"StockInward":{$ne: "no"},"compositeRef":barcoded},function(err,doc){
res.json(doc);
})
})

//  app.get('/transdetails/:update',function(req,res)
// {       
//     console.log("entered into new  trans data");
//     var str=req.params.update;
//     console.log(str);
//     var str_array=str.split(",");
//     var partyname=str_array[0];
//     console.log(partyname);
// for urd rd normal transaction
app.post('/savedata1/:update',function(req,res){
  console.log("save data save data  save data  save data save data save data ")
 // console.log(req.body.date)

//   console.log(req.body.gwt)
// console.log(req.body.rate)
// $scope.transaction+"1,"+$scope.userit[i].barcodeNumber+"2,"+$scope.userit[i].chgunt+"3,"+$scope.userit[i].date+"4,"+$scope.userit[i].desc+"5,"
//                      +$scope.userit[i].final+"6,"+$scope.userit[i].gpcs+"7,"+$scope.userit[i].gwt+"8,"+$scope.userit[i].itemName+",9"+$scope.userit[i].ntwt+"10,"+$scope.partyname+"11,"
//                      +$scope.userit[i].size+"12,"+$scope.userit[i].taxval+"13,"+$scope.userit[i].taxamt+"14,"+$scope.userit[i].stwt+"15,"+$scope.userit[i].wastage+"16,"+$scope.userit[i].stval+"17,"
//                      +$scope.userit[i].labval+"18,"+$scope.userit[i].rate +"19,"+ $scope.userit[i]._id +"20,"+$scope.userit[i].StockFrom+"21,"+$scope.userit[i].StockTo+"22,"
//                      +$scope.userit[i].withinstatecgst+"23,"+$scope.userit[i].withinstatesgst +"24,"+ $scope.userit[i].outofstateigst 25  
//  ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+","+$scope.userit[i].stonecal;
                               
                 
 var str=req.params.update;
    console.log(str);
   // console.log(req.body.date3)
    //var str=req.params.updat;
   // console.log(str);
    var str_array=str.split(",");
    var tran=str_array[0];
    //console.log("status is"+status);
    var code1=str_array[1]
    var bar =parseInt(code1);
    // console.log(code1)
    // console.log("code"+code1)
    // console.log("bar"+bar)
    //console.log("code1 the code is lok here eeeeeeeeeeeeeeeeeeeeeeeeeeeee "+code1)

    var chgunt=str_array[2]
    var date=str_array[3]
    var desc=str_array[4]
    var final=str_array[5]
    var gpcs=str_array[6]
    
    if( gpcs == "undefined"){
           gpcs = 0
        }else{
          gpcs = parseFloat(gpcs)
        }
    var gwt=str_array[7]
    gwt = parseFloat(gwt)
    var iname=str_array[8]
    var ntwt=str_array[9]
    ntwt = parseFloat(ntwt)
    var partyname=str_array[10]
    var size=str_array[11]
    var taxval1=str_array[12]
    taxval1 = parseInt(taxval1);
    var taxamt1=str_array[13]
    var wt=str_array[14]
    console.log("stwt stwt wt wtw wt"+wt);
    if( wt == "undefined"){
           wt =null
        }
        wt = parseFloat(wt)
    var wastage=str_array[15] //
      console.log("wastage wastage wastage wtw wt"+wastage);
    
    var stval=str_array[16] //
      console.log("stval stval wastage wtw wt"+stval);
    
    var labval=str_array[17] //
    var rate=str_array[18]
  
  // var id=str_array[19]
  //stockPoint
    //console.log("here is iddddddddddddddddd   "+id)
     var stockin=str_array[20]
   // console.log("here is idddddddddstockin"+stockin)
      var stockout=str_array[21]
     // console.log("here is idddddddddstockout"+stockout)
      //var order = "Inprogress"
       // var order =str_array[22]

      
         var withinstatecgst =str_array[22]
         var withinstatesgst  =str_array[23]
         var outofstateigst =str_array[24]    
// var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward;
          var stockPoint  =str_array[25]
         var stockInward =str_array[26]                //       console.log(data1)
         var Hsc  =str_array[27]
        // console.log(" Hsc   Hsc  Hsc  Hsc  Hsc  Hsc  Hsc  Hsc "+Hsc )
//  ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+","+$scope.userit[i].stonecal;
   
          var purity  =str_array[28]
          var pctcal  =str_array[29]                     
          var labcal  =str_array[30]
          var uom  =str_array[31]
          var stonecal  =str_array[32]
          var salesPerson = str_array[33] 
           var AccNo = str_array[34]
           var labourTaxValue = str_array[35]
          var labamt  =str_array[36]
          var urdAdjustment = str_array[37]
          var stchg = str_array[38]
          var comboItem = str_array[39]
           var mrp = str_array[40]
           var billType = str_array[41]
            var taxSelection = str_array[42]
             var refid = str_array[43]
            var InvGroupName = str_array[44]
            var SaleCategory = str_array[45]
          //  mrp = parseFloat(mrp)
          console.log("mrp mrp mrp mrp mrp mrp mrp mrp mrp mrp mrp mrp "+str_array[44])
       
        if( mrp == "undefined"){
            mrp = null;
        }else{
          mrp = parseFloat(mrp)
         }
        if(stchg == "undefined"){
          stchg = null;
        }
        if( withinstatecgst == "undefined"){
          withinstatecgst =null
          withinstatesgst =null
        }
        if( outofstateigst == "undefined"){
          outofstateigst =null
        }
        if( wastage == "undefined"){
            wastage =null
        }
        if( stval == "undefined"){
           stval =null
        }
        if( labval == "undefined"){
          labval =null
        }
        if( labcal == "undefined"){
          labcal =null
        }
        if( labamt == "undefined"){
          labamt =null
        }
        if( desc == "undefined"){
          desc =null
        }
        if( size == "undefined"){
          size =null
        }
        if( labourTaxValue == "undefined"){
          labourTaxValue =null
        }


  // console.log("db.transactiondetail.insert db.transactiondetail.insert db.transactiondetail.insert db.transactiondetail.insert")
  //    db.transactiondetail.insert(req.body,function(err,doc){
  //       res.json(doc);
  //     })
 // db.transactiondetail.insert({"partyname":partyname,"Transaction":"train",orderStatus:"Inprogress"},function(err,doc){ 
            
 //        res.json(doc);
 //    });
  if( wt == "undefined" || wt ==  0){
           wt =null
        }
        wt = parseFloat(wt)
        if(tran == "Regular Sale"){
         db.transactiondetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"Inprogress","withinstatecgst":withinstatecgst,"withinstatesgst":withinstatesgst,
                "outofstateigst":outofstateigst,"stockInward":stockInward,"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,
                voucherNo:null,"billType":billType,"taxSelection":taxSelection,"InvGroupName":InvGroupName,"SaleCategory":SaleCategory,"stockPoint":stockPoint},function(err,doc){
                res.json(doc);
                 //console.log("Regular Sale insert when id is null look here")
                // console.log(doc);    
        })
       }else{
        if(tran == "Issue Voucher"||tran == "Receipt Voucher"){
          console.log("cccccccccccccccccccc");
          db.transactiondetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"completed","StockInward":stockInward,"withinstatecgst":withinstatecgst,"withinstatesgst":withinstatesgst,
                "outofstateigst":outofstateigst,"stockInward":stockInward,"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,"RefId":refid,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,"urdAdjustment":urdAdjustment,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,"billType":billType,"taxSelection":taxSelection},function(err,doc){
                res.json(doc);
                 console.log("else insert when id is null look here")
                 console.log(doc);   
        })
          
        }
       else{
         db.transactiondetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"Inprogress","withinstatecgst":withinstatecgst,"withinstatesgst":withinstatesgst,
                "outofstateigst":outofstateigst,"stockInward":stockInward,"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,"urdAdjustment":urdAdjustment,'stchg':stchg,
                'comboItem':comboItem,'mrp':mrp,"RefId":refid,"billType":billType,"taxSelection":taxSelection,"InvGroupName":InvGroupName,"SaleCategory":SaleCategory,"stockPoint":stockPoint},function(err,doc){
                res.json(doc);
                 //console.log("else insert when id is null look here")
                // console.log(doc);   
        })
       }
     }

})


app.post('/batchdata1',function(req,res){
   
     delete( req.body.irate);
     req.body.orderStatus = "available";
     // req.body.date = req.body.barcode 

    //var document={name:name,city:city,no:no,email:email,street:street};
    db.batch.insert(req.body,function(err,doc){
        res.json(doc);
       
})
})
// for composite
// app.post('/icomposite',function(req,res){
//     console.log("igot order requesttt");
    
//     console.log(req.body);
//     var name=req.body;
//     console.log("batchdata");
    
//     //var document={name:name,city:city,no:no,email:email,street:street};
//     db.icomposite.insert(req.body,function(err,doc){
//         res.json(doc);
//         //console.log(doc);
//     //})
// })
// })
app.post('/saleinvoicedata',function(req,res){
    
    //var document={name:name,city:city,no:no,email:email,street:street};
    db.saleinvoice.insert(req.body,function(err,doc){
        res.json(doc);
      
})
})
app.post('/bardata',function(req,res){
    console.log("date bardata "+req.body.date);
    console.log(req.body)
    //var document={name:name,city:city,no:no,email:email,street:street};
    db.barcodesumm.insert(req.body,function(err,doc){
        res.json(doc);
        console.log(doc)
})
})
// for date check
app.post('/datef:date',function(req,res){
    var str=req.params.date;

    var str_array=str.split(",");
    var fdate=str_array[0];
   
    //console.log(frdate)
    var tdate=str_array[1];
   


     db.date2.find({
    date: {
        $gte:(fdate),
     $lt:(tdate)
    }
},function(err,doc){

res.json(doc);
console.log(doc)



})
})

app.get('/dateBatchFind/:date',function(req,res)
{
  //  console.log("i got the date")
    var str=req.params.date;
    //console.log(str);
    var str_array=str.split(",");
    var fdate=str_array[0];
  //  var frdate=new Date(fdate)
    //console.log(frdate)
    var tdate=str_array[1];
    //var todate=new Date(tdate)
    //console.log(todate);
   
    db.batch.find({date: { $gt:(fdate), $lt: (tdate) }},function(err,doc){
     //console.log(doc);
      res.json(doc);

    })
})

 
// barcode serach in barcodechange html
 app.get('/barcodeBatchFind',function(req,res)
{
  
    var Barcode=req.query.Barcode;
    
   console.log(" barcode                            "+Barcode)
    db.batch.find({"barcode" : Number(Barcode)},function(err,doc){
     //console.log(doc);
      res.json(doc);

    })
})
app.get('/itemsdata',function(req,res)
{
   // console.log("i received a get request from index");
    db.items.find(function(err,doc){
     //   console.log(doc);
        res.json(doc);
})
})
//hsc fetch during change barcode fetch
app.get('/itemsdatachange:itemName',function(req,res)
{
   console.log("itemsdatachange itemsdatachange itemsdatachange itemsdatachange");
  // console.log(req.body.itemName)
   var itemname=req.params.itemName;
   console.log(itemname)
    db.items.find({Name:itemname},function(err,doc){
     //   console.log(doc);
        res.json(doc);
     //      db.inventorygroupmaster.find({InvGroupName:itemname},function(err,doc){
     // //   console.log(doc);
     //    res.json(doc);
})
})

app.get('/itemdetails:itemname',function(req,res)
{
   // console.log("i received a get request from index");
    var itemname=req.params.itemname;


    // console.log("Item details function called+++++++++"+itemname)
    // console.log(itemname)
    db.inventorygroupmaster.find({InvGroupName:itemname},function(err,doc){
       //console.log(doc);
        res.json(doc);
})
})

app.get('/itemnamedetails:itemname',function(req,res)
{
   // console.log("i received a get request from index");
    var name=req.params.itemname;

   // console.log("Item details function called+++++++++"+itemname)
  
    db.items.find({Name:name},function(err,doc){
     //console.log(doc.Name);
        res.json(doc);
})
})

app.get('/itemPurityDetails:inGrpId',function(req,res)
{
   // console.log("i received a get request from index");
    var str=req.params.inGrpId;
    var str_array=str.split(",");
    var itemgroupid=str_array[0];
    var currentdate =str_array[1];
    // console.log("Item purity details function called-----"+itemgroupid)
    // var currentdate = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
    //  currentdate =currentdate.slice(0, 10);
    //   console.log("curreenenen "+currentdate)
  //name changed+current date
   // db.inventorygroupvaluenotation.find({InvGroupID:itemgroupid},function(err,doc){
      db.inventorygroupvaluenotationdaily.find({InvGroupID:itemgroupid,date:currentdate},function(err,doc){
    //console.log("purity call")
     //   console.log(doc);
        res.json(doc);
})
})
//insert
app.post('/transactionstoc/:updat',function(req,res)
{
    //console.log("iam updating here is this kkkkkkkk");
   
    var str=req.params.updat;
    //console.log(str);
    var str_array=str.split(",");
    var pre=str_array[0];
    var type=str_array[1];
  
     db.transactionInvoice.insert({"prefix":pre,"typeno":type},function(err,doc){
        //res.json(doc);
      //   console.log(doc);
        res.json(doc);
      });
})
// find
app.get('/transactionsto/:updat',function(req,res)
{//transactionsto
   // console.log("iam updating here is this kkkkkkkk");
   
    var str=req.params.updat;
    //console.log(str);
    var str_array=str.split(",");
    var pre=str_array[0];
    var type=str_array[1];
  
     db.transactionInvoice.count({"prefix":pre},function(err,doc){
        //res.json(doc);
        // console.log(doc);
        res.json(doc);
      });
})
// for transaction details collection in barcode generation
// app.put('/transactionstock',function(req,res){
//     console.log("igot barcode data connection establisheddddddddddddddddddddddddddddddddddddddddddddddddd");
//     //console.log(req.body.partyname);
//     var barcode=req.body;
//     console.log("bar code details");
//     console.log(barcode);
    
//     //var document={name:name,city:city,no:no,email:email,street:street};
//    // db.transactiondetails.insert({barcode:"barcode",Transaction:"Barcoding",StockInward:"yes"},function(err,doc){
//      db.transactiondetails.insert(req.body,function(err,doc){
        
//         res.json(doc);
// })
// })
//app.post('/transactionstock/:update',function(req,res)
app.post('/transactionstock',function(req,res)
{
    delete(req.body.Batch)
    delete(req.body.stats)
    delete(req.body.tags)
    delete(req.body.wt)
    delete(req.body.color)
     delete( req.body.irate)
     delete(req.body.accNumbers);
       delete( req.body.stockPoint1 );

 db.transactiondetail.insert(req.body,function(err,doc){
     
        res.json(doc);
     //   console.log(doc);
    
})
})
// for transaction details for barcoding parallel in and out
app.post('/transactionstockInward',function(req,res)
{
     // delete(req.body.Transaction)
      req.body.refid = req.body.compositeRef;
       delete(req.body.orderStatus)
        req.body.StockInward = "no"
        req.body.stockPoint =  req.body.stockPoint1 
        req.body.refid = req.body.barcode 
       delete( req.body.stockPoint1 )
       delete( req.body.orderstatus)
        req.body.barcode = ""
       delete( req.body.voucherClass)
       delete( req.body.irate)
       delete(req.body.accNumbers);
              delete( req.body.voucherClassId) 
              delete( req.body.transactionTypeId )
               delete( req.body.invGroupName )
               delete( req.body.invGroupAccNo )
              delete( req.body.voucherDate)
               delete( req.body.voucherTime )
            req.body.ntwt  = parseFloat(req.body.ntwt)
            req.body.gwt  = parseFloat(req.body.gwt)
            req.body.gpcs  = parseFloat(req.body.gpcs)
      db.transactiondetail.insert(req.body,function(err,doc){
       res.json(doc);    
})
})

app.post('/transactionComboItemInsert',function(req,res)
{
        // delete(req.body.Transaction)
        delete(req.body.orderStatus)
        req.body.StockInward = "no";
        req.body.refid = req.body.barcode ;
        delete( req.body.orderstatus)
        req.body.comboBarcode = req.body.barcode ;
         //req.body.barcode = ""
         delete( req.body.barcode)
        delete( req.body.voucherClass)
        delete( req.body.irate)
        delete(req.body.accNumbers);
        delete( req.body.voucherClassId) 
        delete( req.body.transactionTypeId )
        delete( req.body.invGroupName )
        delete( req.body.invGroupAccNo )
        delete( req.body.voucherDate)
        delete( req.body.voucherTime )
        req.body.ntwt  = parseFloat(req.body.ntwt)
        req.body.gwt  = parseFloat(req.body.gwt)
        req.body.gpcs  = parseFloat(req.body.gpcs)
      db.transactiondetail.insert(req.body,function(err,doc){
       res.json(doc);    
})
})
// for transaction details collection in inventory
app.get('/transactiondetails',function(req,res)
{
    //console.log("i received a get request from index");
    //
  db.transactionSeriesInvoice.find(function(err,doc){
      //  console.log(doc);
        res.json(doc);
})
})

app.get('/groupWisePurchaseTransactions',function(req,res){
    //console.log("i received a get request from index");
    //
  db.transactionSeriesInvoice.find({  "TransactionClass" : "Purchase"},function(err,doc){
      //  console.log(doc);
        res.json(doc);
  })
})
app.get('/groupWiseSalesTransactions',function(req,res)
{
    //console.log("i received a get request from index");
    //
  db.transactionSeriesInvoice.find({"TransactionClass" : "Sale"},function(err,doc){
      //  console.log(doc);
        res.json(doc);
})
})

app.get('/cash',function(req,res)
{
   // console.log("i received a get request from index");
    db.mode.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

app.get('/bank',function(req,res)
{
    console.log("i received a get request from index");
    db.bank.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})


app.get('/userPartyNames',function(req,res){
    var transaction = req.query.transaction;
    var party_type_id = null;
    if (transaction == "RD Purchase" || transaction == "Purchase Return"|| transaction == "Issue Voucher"||transaction == "Receipt Voucher") {
      
       party_type_id = "4";
    }else{
       party_type_id = "3";
    }
    console.log("i received a get request from user");
   // db.user.find(function(err,doc){
    db.subscribers.find({"data.party_type.id":party_type_id},function(err,doc){
        //console.log(doc);
        res.json(doc);
    })
})

//get sales person names
app.get('/getSalesPerson',function(req,res)
{
    console.log("i received a get request from user");
    db.salesPerson.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
// Transaction urd
app.post('/Transaction',function(req,res)
{ 
    console.log("from transaction");
    console.log(req.body);
   
    db.transaction.insert(req.body,function(err,doc){
        res.json(doc);
        console.log(doc);

})
})
// for urd status update
app.put('/urdstatus123/:data',function(req,res)
{ 
  var str=req.params.data;
    console.log(str);

    var str_array=str.split(",");
    var id=str_array[0];
      var orderstatus = "completed"
  db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus}},function(err,doc)
        {
        res.json(doc);
        console.log(doc)
       });

 })
app.put('/urdstatus/:data',function(req,res)
{ 
  
    var str=req.params.data;
    console.log(str);

    var str_array=str.split(",");
    var id=str_array[0];
    console.log(id);
    var diff = str_array[1];
    var urdRefund = str_array[2];
     console.log("diff  console.log(diff);  console.log(diff);  console.log(diff);  console.log(diff);");
    console.log(diff);
    console.log("urdRefund "+urdRefund );
    if(urdRefund == undefined){
       console.log("urdRefund == undefined "+urdRefund );
      var orderstatus = "Inprogress"
      db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus, "urdAdjustment" :diff}},function(err,doc)
        {
        res.json(doc);
        console.log(doc)
       });

    }else{
      console.log("urdRefund == defined "+urdRefund );
    var orderstatus = "completed"
  db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus, "urdAdjustment":diff, "urdRefund":diff }},function(err,doc)
        {
        res.json(doc);
        console.log(doc)
       });
}
})
// Transaction rd
app.put('/RD',function(req,res)
{ 
    console.log("from rd");
    console.log(req.body);
    var name=req.body;
    db.transaction.insert(req.body,function(err,doc){
        res.json(doc);
})
})
// Transaction regularsale
app.put('/RegularSale',function(req,res)
{ 
    console.log("from regularsale");
    console.log(req.body);
    var name=req.body;
    db.transaction.insert(req.body,function(err,doc){
        res.json(doc);
})
})
app.get('/trans',function(req,res){
  //console.log("I received a new username request for login and document");
  var partyname=req.query.partyname;
  
  db.transaction.find({partyname:partyname},function(err,doc){
        res.json(doc);
       // console.log(doc);
    });
});

app.put('/status/:update',function(req,res)
{
    console.log("iam updating here is this kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
   
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var status=str_array[0];
    console.log("status is"+status);
    var code1=str_array[1]
  //  var barcode =parseInt(code1);
    console.log("code1"+code1)
    var partyname=str_array[2]
    console.log(partyname)

     var trans=str_array[3]
    console.log(trans)
    console.log("finished")
     db.batch.update({"barcode":code1},{"$set":{"stats":status,"Transaction":trans,"partyname":partyname}},function(err,doc){
        //res.json(doc);
        if(err)
        {
            console.log(err)
        }

        console.log("noerror, the updated data is ")
         console.log(doc);
        res.json(doc);
      });
})
// for transaction details
app.post('/transactiondetail/:updat',function(req,res)
{
    console.log("iam updating here is this kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
   
    var str=req.params.updat;
    console.log(str);
    var str_array=str.split(",");
    var tran=str_array[0];
    //console.log("status is"+status);
    // var code1=str_array[1]
    // var bar =parseInt(code1);
    var bar = str_array[1];
  //  console.log("code1"+code1)
    var chgunt=str_array[2]
    var date=str_array[3]
    var desc=str_array[4]
    var final=str_array[5]
    var gpcs=str_array[6]
    var gwt=str_array[7]
    var iname=str_array[8]
    var ntwt=str_array[9]
    var partyname=str_array[10]
    var size=str_array[11]
    var taxval1=str_array[12]
    var taxamt1=str_array[13]
    var wt=str_array[14]

    var wastage=str_array[15]
    var stval=str_array[16]
    var labval=str_array[17]
    var rate=str_array[18]

    var stock=str_array[19]
    //console.log(partyname)
    console.log("finished")
    db.transactiondetail.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
        "name":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"StockInward":stock,
        "wastage":wastage,"stval":stval,"labval":labval},function(err,doc){
        //res.json(doc);
        if(err)
        {
            console.log(err)
        }

        console.log("noerror, the updated data is ")
         console.log(doc);
        res.json(doc);
      });
})
// sale return update
app.post('/salereturn/:updat',function(req,res)
{
    console.log("iam updating here is this kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
   
    var str=req.params.updat;
    console.log(str);
    var str_array=str.split(",");
    var tran=str_array[0];
    //console.log("status is"+status);
    // var code1=str_array[1]
    // var bar =parseInt(code1);
    var bar = str_array[1]
  var chgunt=str_array[2]
    var date=str_array[3]
    var desc=str_array[4]
    var final=str_array[5]
    var gpcs=str_array[6]
    var gwt=str_array[7]
    var iname=str_array[8]
    var ntwt=str_array[9]
    var partyname=str_array[10]
    var size=str_array[11]
    var taxval1=str_array[12]
    var taxamt1=str_array[13]
    var wt=str_array[14]

    var wastage=str_array[15]
    var stval=str_array[16]
    var labval=str_array[17]
    var rate=str_array[18]

    var stock=str_array[19]
    //console.log(partyname)
    console.log("finished")
     db.transactiondetail.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
        "name":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"StockInward":stock,"wastage":wastage,"stval":stval,"labval":labval},function(err,doc){
        //res.json(doc);
        if(err)
        {
            console.log(err)
        }

        console.log("noerror, the updated data is ")
         console.log(doc);
        res.json(doc);
      });
})
//history 
app.post('/historyupdate/:updat',function(req,res){
    console.log("igot order requestttttttttttttttttttttt");
 var str=req.params.updat;
    console.log(str);
    var str_array=str.split(",");
    var date=str_array[0];
    //console.log("status is"+status);
    var tran=str_array[1]
   
    var voucher=str_array[2]
    var value=str_array[3]
    var remarks=str_array[4]
    var party=str_array[5]   
    console.log(party) 
     db.history.insert({Date:date,TransactionType:tran,Value:value,VoucherNo:voucher,Remarks:remarks,partyname:party},function(err,doc){
     
    //var document={name:name,city:city,no:no,email:email,street:street};
   // db.useritem.insert(req.body,function(err,doc){
        res.json(doc);
        console.log(doc);
    
})
});

//for getting transaction prefix
app.get('/getPrefix:prefix',function(req,res){
  console.log("getting transactionseries invoice");
  var myprefix=req.params.prefix;
  db.transactionSeriesInvoice.find({"TransactionType":myprefix},function(err,doc){
    res.json(doc);
    console.log(doc);
  })
});
// for pdf data generation using barcode
app.get('/getparty',function(req,res)
{    
   // console.log("iam pdf ppppppppppppppppppppppppppppppppaaaaaaaa");
    // var partyname=req.query.name;
var id =req.query.id;
     //  console.log(partyname);
     // var trans=req.query.Transaction;
     // console.log(trans);
    //db.transactiondetail.find({"partyname":partyname,"Transaction":trans},function(err,doc){
      db.transactiondetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
        
        res.json(doc);
        console.log(doc);
    });
})
app.get('/urdDetails',function(req,res)
{   
var id =req.query.id;
      db.transactiondetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
        
        res.json(doc);
        console.log(doc);
    });
})
app.put('/confirm/:update',function(req,res)
{
    console.log("iam updating here is this confirm button");
   
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var status=str_array[0];
    console.log("status is"+status);
    var code1=str_array[1]
    var barcode =parseInt(code1);
    console.log("code1"+code1)

    console.log("finished")
     db.batch.update({"barcode":barcode},{"$set":{"stats":status}},function(err,doc){
        res.json(doc);
        if(err)
        {
            console.log(err)
        }

        console.log("noerror")
      });
})
//transaction confirmation 
app.post('/confirmtransaction/:data',function(req,res){
    var str=req.params.data;
    console.log("Order confirmation function called----------");
    console.log(str);

    var str_array=str.split(",");
    var id=str_array[0];
    var status =str_array[1];
    var bar =str_array[2];
    bar = Number(bar);
    // bar = 25692825 ;
      var soldOutDate  = new Date(((new Date().toISOString().slice(0, 23))+"-05:30")).toISOString();
     
     console.log(id)
    console.log(status)
     console.log("barcodeb here "+bar)

     db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":status}},function(err,doc)
        {
        res.json(doc);
       });
    // db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":status}});
     db.transactiondetail.update({refid:  bar},{$set:{"stats":status,"soldOutDate":soldOutDate}});



})

app.get('/count1/:count',function(req,res)
{
   // console.log("iam finding count ");
   
    var str=req.params.count;
    
    var count1 =parseInt(str);
   // console.log("count"+count1)

    //console.log("finished")
     db.barcodesumm.find({"count":count1},function(err,doc){
        //res.json(doc);db.barcodesumm.find({"count":1})
        if(err)
        {
            console.log(err)
        }

        //console.log("noerror")
        res.json(doc);
      });
})
// for split result
app.post('/splitreturn',function(req,res)
{
 // console.log("iam inserting in the split table ");
   //console.log(req.body)
     db.transactiondetail.insert(req.body,function(err,doc){
       // console.log("noerror")
        res.json(doc);
      });
})

// for combo new barcode
app.post('/combotransactiondetail',function(req,res)
{
 // console.log("iam inserting in the split table ");
   //console.log(req.body)
     db.transactiondetail.insert(req.body,function(err,doc){
       // console.log("noerror")
        res.json(doc);
      });
})


app.get('/useritfind/:update',function(req,res)
{ 
    var str=req.params.update;
   // console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
     db.transactiondetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
    if(err)
        {
            console.log(err)
        }
       
        res.json(doc);
      
      })

})

app.get('/useritInvoice/:customerDetails',function(req,res)
{ 
    var str=req.params.customerDetails;
   // console.log(str);
    var str_array=str.split(",");
    var transaction=str_array[0];
    var party=str_array[1];
     db.transactiondetail.find({"Transaction":transaction,"partyname" : party,"orderStatus" : "Inprogress" },function(err,doc){
    if(err)
        {
            console.log(err)
        }
       
        res.json(doc);
      
      })

})

app.get('/useritInvoiceValue/:customerDetails',function(req,res)
{ 
    var str=req.params.customerDetails;
   // console.log(str);
    var str_array=str.split(",");
    var transaction=str_array[0];
    var party=str_array[1];
     db.transactiondetail.find({"Transaction":transaction,"partyname" : party,"orderStatus" : "Inprogress","voucherNo" : { $exists: true }  },function(err,doc){
    if(err)
        {
            console.log(err)
        }
       
        res.json(doc);
      
      })

})


app.get('/editsummarycount',function(req,res)
{ 
    var count1=req.query.count;
    count1 = parseInt(count1)

      db.tags.find({count:count1},function(err,doc){
  if(err)
        {
            console.log(err)
        }
       // console.log("findOne");
        res.json(doc);
        //console.log(doc);
      })

})
//for updaet of edited editsummarycountupdate
app.put('/editsummarycountupdate/:update',function(req,res)
{ 
  
var str=req.params.update;
    console.log(str);
    //var str=req.params.updat;
   // console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
    //console.log("status is"+status);
    var count=str_array[1]
   // =parseInt(code1);
    
    //console.log("code1 the code is lok here eeeeeeeeeeeeeeeeeeeeeeeeeeeee "+code1)

     var date=str_array[2];
     date = 
new Date(((new Date(str_array[2]).toISOString().slice(0, 23))+"-05:30")).toISOString();
    var ItemName=str_array[3]
    var wt=str_array[4]
    var pcs=str_array[5]
    var titems=str_array[6]
    var remark=str_array[7]
    
    var stockin=str_array[8]
    var stockout=str_array[9]
    var composite=str_array[10]
    var splittable=str_array[11]
    
  console.log("date edit "+date)
     

 // db.barcodesumm.update({_id:mongojs.ObjectId(id)},
 //  update:{$set:{itemname: req.body.itemname, stockfrom: req.body.stockfrom ,totalpcs:req.body.totalpcs,totalweight:req.body.totalweight,totaltags:req.body.totaltags}},new :true},function(err,doc){
  
  db.barcodesumm.update({_id:mongojs.ObjectId(id)},{$set:{"itemname":ItemName,"stockfrom":stockout,"stockto":stockin,"totalpcs":pcs,"totalweight":wt,"totaltags":titems,"count":count,
        "date":date,"composite":composite,"split":splittable,"remarks":remark}},function(err,doc){
   
      
     if(err)
        {
            console.log(err)
        }
        res.json(doc);
        console.log(doc);
      })
});
//for inserting receipt voucher data
app.post('/insertreceiptUseritDetails',function(req,res){
   console.log(req.body+"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  db.transactiondetail.insert({"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
         "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"RefId":req.body.refID,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,
       "taxSelection":req.body.taxSelection},function(err,doc){
    console.log("receipt voucher details inserted");
    res.json(doc);
  });
})
//for inseriting new row
app.put('/insertNewUseritDetails',function(req,res){
  var transac=req.body.Transaction;
  console.log(transac+"#@################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  req.body.gpcs =  parseFloat(req.body.gpcs);
       req.body.gwt = parseFloat(req.body.gwt);
        req.body.taxval = parseFloat(req.body.taxval);
         req.body.voucherNo = null; 
         req.body.barcodeNumber;
         delete(req.body._id);
         delete(req.body.irate);
         var cat=req.body;
         var bat=req.body;
         console.log(req.body.barcodeNumber+"barcodeNumber");
         console.log(req.body)
          var reference="Sale Return";
           req.body.RefTransaction=reference;
           // req.body.Transaction="Sale Return";
           req.body.orderStatus="completed";
           db.transactiondetail.insert({"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
         "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"taxSelection":req.body.taxSelection},function(err,doc)
      
        {
            console.log("updated the data in save during sale return "+doc.length)
            res.json(doc);
        
        });  
  console.log("inserted the data in save when id not null")
            
       });

app.post('/insertUseritDetails',function(req,res)
{
  //console.log(req.body);
  //  console.log("entered into put request $scope.userit[i]._id!=null +++++++=====+++++");
     //  console.log(req.body.gwt);
      //  console.log(req.body.gpcs);
      req.body.gpcs =  parseFloat(req.body.gpcs);
       req.body.gwt = parseFloat(req.body.gwt);
       req.body.ntwt = parseFloat(req.body.ntwt);
        req.body.taxval = parseFloat(req.body.taxval);
         req.body.voucherNo = null; 
         delete(req.body.irate);
         delete(req.body.accNumbers);

   db.transactiondetail.insert(req.body,function(err,doc){
   
     if(err)
        {
            console.log(err)
        }
         console.log("inserted the data in save when id not null")
            
        res.json(doc);
        //console.log(doc);
      })
   if(req.body.barcode == undefined || req.body.barcode == null||  req.body.split == "yes"){
          console.log(" barcode is null ");
      }else{
          console.log(" barcode is here look  "+req.body.barcode);
          //for updated in refid data  "barcode":req.body.barcode,
        db.transactiondetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,"stockPoint":req.body.stockPoint}},function(err,doc)
        {
           // res.json(doc);
        
        }); 
      }
        

   // var id = req.body._id
   //     console.log(req.body)
   //     console.log(req.body.barcode)
  
     // db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
     //     "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
     //     "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.order,"StockInward":"no",
     //    "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
     //   "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,}},function(err,doc)
      
     //    {
     //        res.json(doc);
        
     //    });  
});
//for changing the orderStatus
app.put('/changeOrderStatus:changing',function(req,res){
  console.log("for changing orderStatus to null");
  var str=req.params.changing;
  console.log(str);
  var str_array=str.split(",");
  var pid=str_array[0];
  console.log(pid);
  var voucher="null";
  db.transactiondetail.update({_id:mongojs.ObjectId(pid)},{$set:{"voucherNo":voucher}},function(err,doc){
    res.json(doc);
    console.log(doc);
  });
});

// for update of userit
app.put('/updateUseritCall',function(req,res)
{
   
    var id = req.body._id;
     req.body.ntwt = parseFloat(req.body.ntwt);
       // console.log(req.body)
       // console.log(req.body.barcode)
  
     db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
         "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"taxSelection":req.body.taxSelection,
      "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,
     "withinstatecgst":req.body.withinstatecgst,"withinstatesgst":req.body.withinstatesgst,
                "outofstateigst":req.body.outofstateigst,"InvGroupName":req.body.InvGroupName ,"SaleCategory":req.body.SaleCategory}},function(err,doc){
            //console.log("updated the data in save when id not null")
            res.json(doc);
        
        }); 

     //
      if(req.body.barcode == undefined || req.body.barcode == null ||  req.body.split == "yes"){
          console.log(" barcode is null ");
      }else{
          console.log(" barcode is here look  "+req.body.barcode);
            //for updated in refid data  "barcode":req.body.barcode,
        db.transactiondetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
        {
           // res.json(doc);
        
        }); 
  
      }
        
});
//for getting sale data
app.get('/myneeded/:str1',function(req,res){
  console.log("for getting the invoice updated");
  var argument=req.params.str1;
  console.log(argument);
  var str3_array=argument.split(",");
  var voucherNo=str3_array[0];
  console.log(voucherNo);
  var pname=str3_array[1];
  console.log(pname);
  db.saleinvoice.find({"voucherNo":voucherNo,"partyname":pname},function(err,doc){
    res.json(doc);
    console.log(doc+"ssssssssssssssssssssssssssssssssssssssss");
  });
});
//for updating saleinvoice
app.put('/salesnew/:apple',function(req,res){
   // console.log(saledata+"dddddddddddddd");
   // console.log("updating saleinvoice after  return");
    // console.log(req.params.shivu);
  var sal=req.params.apple;
  console.log(sal);
  console.log("updating saleinvoice after  return");
  var sal_array=sal.split(",");
  var taxableval2=sal_array[0];
  console.log(taxableval2);
  var tax2=sal_array[1];
  console.log(tax2);
  var subtol2=sal_array[2];
  console.log(subtol2);
  var invoice2=sal_array[3];
  console.log(invoice2);
  var net2=sal_array[4];
  console.log(net2);
  var pname=sal_array[5];
  console.log(pname);
  var voucher=sal_array[6];
  console.log(voucher);
  // var trans=sal_array[7];
  // console.log(trans);
  var pid=null;
   db.saleinvoice.update({"partyname":pname,"voucherNo":voucher},{$set:{"taxableval":taxableval2,
     "tax":tax2,"subtol":subtol2,"invoiceValue":invoice2,"netamt":invoice2}},function(err,doc){
      
    //     db.saleinvoice.insert({_id:mongojs.ObjectId(pid),"taxableval":taxableval2,
    // "tax":tax2,"subtol":subtol2,"invoiceValue":invoice2,"netamt":invoice2,"Transaction":trans}},function(err,doc){
      


      res.json(doc);
      console.log(doc);
      // console.log(doc[0].taxableval);
      // console.log(doc[0].tax);
    });
});

// for update of userit
app.put('/getComboBarcodeUpdate',function(req,res)
{
   console.log("getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate"+req.body.barcode);
    var barcode = req.body.barcode;
      //  console.log(req.body)
        console.log(req.body.barcode)
  
     db.transactiondetail.update({comboBarcode:barcode},{$set:{
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName}},function(err,doc)
      
        {
           res.json(doc);
        
        });  
  
});
app.put('/saleinvoicedata12/:update',function(req,res)
{
    console.log("entered into put request for saleinvoicedata saleinvoicedata update ");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
    console.log(id);
    var partyname=str_array[1];
    console.log(partyname);
    var taxableval=str_array[2];
   // console.log(name);
    var tax=str_array[3];
    var subtol=str_array[4];
    var adj=str_array[5];
    var labourValue=str_array[6];
    
    if(labourValue == "undefined"){
      labourValue = 0;
    }
    console.log(labourValue)
    var labourtax=str_array[7];
    if(labourtax == "undefined"){
      labourtax = 0;
    }
    console.log(labourtax)
    var saleInvoiceStatus = str_array[8];
        if(saleInvoiceStatus == "completed"){
           var status = "completed"; 
        }else{
           var status = "In Progress";
        }
var dis = str_array[9];
    var char = str_array[10];
    console.log("char"+char);
     console.log(" char char Charge1Total char char char char char Charge1Total char char");
        if(dis == "undefined"){
      dis = 0;
    }
    if(char == "undefined"){
      char = 0;
    }
    var netamt = str_array[11];
     var invoiceValue = str_array[12];
      var decimals = str_array[13];
      var transaction = str_array[14];
      //console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      if(transaction == "RegularSale"){
          db.saleinvoice.update({_id:mongojs.ObjectId(id)},{$set:{"partyname":partyname,"taxableval":taxableval,"tax":tax,"subtol":subtol,"adj":adj,
            "status":status,"labourtax":labourtax,"labourValue":labourValue,"dis":dis,"char":char,"netamt":netamt,"decimals":decimals,"invoiceValue":invoiceValue}},function(err,doc){
              res.json(doc);
              console.log(doc);
          })
        }else{
          db.saleinvoice.update({_id:mongojs.ObjectId(id)},{$set:{"partyname":partyname,"taxableval":taxableval,"tax":tax,"subtol":subtol,"adj":adj,
            "labourtax":labourtax,"labourValue":labourValue,"dis":dis,"char":char,"netamt":netamt,"decimals":decimals,"invoiceValue":invoiceValue}},function(err,doc){
              res.json(doc);
              console.log(doc);
          })

        }
         
})

//confirm
app.put('/saleinvoicedataconfirm/:update',function(req,res)
{
    console.log("saleinvoicedataconfirm call");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    // var id=str_array[0];
    // console.log(id);
    var partyname=str_array[0];
    console.log(partyname);
    var transaction=str_array[1];
    console.log(transaction);
    db.saleinvoice.update({"partyname":partyname,"status":"In Progress", "Transaction" :transaction },{$set:{"status":"completed"}},function(err,doc){
  
        res.json(doc);
        //console.log("here is resulrs")
       // console.log(doc);
    });
    // res.json(doc);
    //     console.log(doc);
});
app.put('/useritupdate',function(req,res)
{
   
    var id = req.body._id
       // console.log(req.body)
       // console.log(req.body.barcode)
  
     db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
         "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no",
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"labcal":req.body.labcal}},function(err,doc)
      
        {
            res.json(doc);
        
        });  
  
});

app.get('/getsaleinvoice_id:id1',function(req,res){
 // console.log("getsaleinvoice_id getsaleinvoice_id getsaleinvoice_id ");

  var id=req.params.id1;
  //var trans=req.query.Transaction;
  // console.log(id);
   // "_id" : ObjectId("597f10802fec641cfc8ec970"),
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.saleinvoice.find({_id:mongojs.ObjectId(id)},function(err,doc){
  
        res.json(doc);
        //console.log("here is resulrs")
       // console.log(doc);
    });
});

app.get('/menu',function(req,res){
  console.log("I received a menu request");
  var pr=req.query.price;

  db.menu.findOne({name:pr},function(err,doc){
        res.json(doc);
      })
});
// app.get('/itemlist',function(req,res){
//   console.log("I received a username request for login");
//   var ph=req.query.mobile;
//   console.log(ph);
  
//   db.item.findOne({mobile:ph},function(err,doc){
    
//         res.json(doc);
//         console.log(doc);
//       })
// });

// app.delete('/item/:itemname',function(req,res)
// {
//     console.log("hi delete");
//     var str=req.params.itemname;
//     console.log(str);
//     var str_array=str.split(",");
//     var mp=str_array[0];
//     console.log(mp);
//     var iname=str_array[1];
//     //var name=req.params.iname;
//     console.log(iname);
//     db.item.update({mobile:mp},{$pull:{item:{name:iname}}})
// })
app.put('/users/:csfdata',function(req,res){
    console.log("I received a put request")
    var name=req.params.csfdata;
    console.log(name);
   
    db.useritem.update({name:name},{"$push":{items:{name:"",score:""}}},function(err,doc){
    //db.users.update({_id:mongojs.ObjectId(userid),csf:csfname},{"$push":{csf:{name:csfname,score:score,percentage:per,date:date,actdef:actdef}}},function(err,doc){   
   /* db.users.update({"name":username,"csf.id":csfid},
{$set:{"csf.$.score":score,"csf.$.percentage":per,"csf.$.date":date,"csf.$.actdef":actdef}})*/
});
});
//for receipt userit
// app.get('/receiptuser:ids',function(req,res){
//   console.log("receipt receipt receipt receipt receipt receipt receipt receipt");
//   var id=req.params.ids;
//   db.transactiondetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
//     res.json(doc);
//     console.log(doc);
//   });
// });
//for getdetails url
app.get('/getSavedDetails',function(req,res){
 // console.log("I received a new username request for login and document from pdf");
  var partyname=req.query.partyname;
  var trans=req.query.Transaction;
  var voucherNo = req.query.voucherNo;
  // console.log(trans);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
     if(trans !="Sale Return"&&trans!="Purchase Return"){
  db.transactiondetail.find({partyname:partyname,Transaction:trans,orderStatus:"Inprogress"},function(err,doc){
       
        res.json(doc);
        console.log("get details sent");
        console.log(doc);
    });
}
else{
  console.log("loop for returing items")
  if(voucherNo!=null){
  db.transactiondetail.find({"voucherNo":voucherNo},function(err,doc){
    res.json(doc);
    console.log(doc);
      });
      }
      else{
        console.log("no no");
        res.json();//for returning empty response for making app.get to wait.
      }
}
});

app.get('/voucherNoGetDetails',function(req,res){
 // console.log("I received request for details by id+++++++++------");
  var voucherNo = req.query.voucherNo;
  //var trans=req.query.Transaction;
 //  console.log(voucherNo);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactiondetail.find({"voucherNo":voucherNo},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});

app.get('/voucherNoGetDetailsSaleInvoice/:data',function(req,res){
  //console.log("I received request for details by id+++++++++------");
  var voucher=req.params.data;
  //var trans=req.query.Transaction;
   //console.log(voucher);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.saleinvoice.find({"voucherNo":voucher},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});



app.get('/transactiondetailbyid:id',function(req,res){
  //console.log("I received request for details by id+++++++++------");
  var id=req.params.id;
  //var trans=req.query.Transaction;
  // console.log(id);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactiondetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});

app.put('/tdetailupdatebyid:str1',function(req,res){
  //console.log("transactiondetailupdatebyid function called =========================================================");
  var str2=req.params.str1;
  //console.log(str2)
  var str_array = str2.split(",");
  var id =  str_array[0];
  var orderstatus = str_array[1];
  //console.log(id)
  //console.log(orderstatus)

  //var trans=req.query.Transaction;
   
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactiondetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus}},function(err,doc)
        {
        res.json(doc);
     //  console.log(doc)
       });
});
 
app.get('/getPartyDetailsNumber',function(req,res){
  //console.log("I received a new username request for login and document saleinv lok here");
  var username = req.query.partyname;
  //var trans=req.query.Transaction;
   //console.log(trans);
   
    db.subscribers.find({subscriber : username},function(err,doc){
        res.json(doc);
       // console.log("here is data in progress "+ doc);
      //  console.log(doc);
    });
   //}
  
});
 app.get('/getsaleinv',function(req,res){
 // console.log("I received a new username request for login and document saleinv lok here");
  var username=req.query.name;
  var trans=req.query.Transaction;
  // console.log(trans);
   
    db.saleinvoice.find({partyname:username,Transaction:trans, status : "In Progress"},function(err,doc){
        res.json(doc);
        //console.log("here is data in progress "+ doc);
       // console.log(doc);
    });
   //}
  
});
 app.get('/getitemname',function(req,res){
 // console.log("I received a new username request for login and document saleinv lok here");
  var username=req.query.Name;
  var trans=req.query.InvGroupName;
  // console.log(trans);
   
    db.items.find({Name:username,InvGroupName:trans},function(err,doc){
        res.json(doc);
        //console.log("here is data in progress "+ doc);
       // console.log(doc);
    });
   //}
  
});

app.get('/useradj',function(req,res){
  console.log("I received a new username request for login and document");
  var username=req.query.name;
  db.useradj.find({partyname:username},function(err,doc){ 
    // db.transaction.find({partyname:username},function(err,doc){
        res.json(doc);
        console.log(doc);
    });
});
app.put('/useradjupdate/:update',function(req,res)
{
    console.log("entered into new tablwwwwwwwwwwwwwwwwwwwwwwww");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);

    var urd_am=str_array[1];
 var urd_amt = parseInt(urd_am)
    console.log(urd_amt);

    var book_am=str_array[2];
    var book_amt = parseInt(book_am)
    console.log(book_amt);

    var sch_am=str_array[3];
    var sch_amt = parseInt(sch_am)
    console.log(sch_amt);

     var rd=str_array[4];
    var rdamt = parseInt(rd)
    console.log(rdamt );
    // var rate=str_array[4];
    // var tot=str_array[5];
    //db.useradj.insert({"partyname":partyname,"urd_amt":urd_amt," book_amt": book_amt,"sch_amt":sch_amt,"rd_amt":rdamt},function(err,doc){ 
    db.useradj.insert({"partyname":partyname,"urd_amt":urd_amt," book_amt": book_amt,"sch_amt":sch_amt,"rd_amt":rdamt},function(err,doc){ 
    
    // db.transaction.find({partyname:username},function(err,doc){
      if(err)
        {
            console.log(err)
        }

        console.log(" in new useradj")
        res.json(doc);

        console.log(doc);
    });
});
// db.batch.update({"barcode":barcode},{"$set":{"stats":status}},function(err,doc){
app.put('/useradjup/:update',function(req,res)
{ //this is for update
    console.log("entered into new tablwwuuuuuuuuuuuuuuuuuuuu");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);

    var urd_am=str_array[1];
 var urd_amt = parseInt(urd_am)
    console.log(urd_amt);

    var book_am=str_array[2];
    var book_amt = parseInt(book_am)
    console.log(book_amt);

    var sch_am=str_array[3];
    var sch_amt = parseInt(sch_am)
    console.log(sch_amt);

     var rd=str_array[4];
    var rdamt = parseInt(rd)
    console.log(rdamt );
    // var rate=str_array[4];
    // var tot=str_array[5];
    //db.useradj.insert({"partyname":partyname,"urd_amt":urd_amt," book_amt": book_amt,"sch_amt":sch_amt,"rd_amt":rdamt},function(err,doc){ 
    db.useradj.update({"partyname":partyname},{"$set":{"urd_amt":urd_amt," book_amt": book_amt,"sch_amt":sch_amt,"rd_amt":rdamt}},function(err,doc){ 
    // db.batch.update({"barcode":barcode},{"$set":{"stats":status}},function(err,doc){

    // db.transaction.find({partyname:username},function(err,doc){
      if(err)
        {
            console.log(err)
        }

        console.log(" in new useradj")
        res.json(doc);

        console.log(doc);
    });
});
 app.get('/transdetails/:update',function(req,res)
{       
   // console.log("entered into new  trans data");
    var str=req.params.update;
    //console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    //console.log(partyname);
   // 
    var trans=str_array[1];
    //console.log(trans);

  
     db.transactiondetail.find({"partyname":partyname,"Transaction":trans,orderStatus:"Inprogress"},function(err,doc){ 
            
        res.json(doc);
    });
});
// for regular sale saved data
 app.get('/regularsaledetails/:update',function(req,res)
{       
    //console.log("entered into new  trans data");
    var str=req.params.update;
    //console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    //console.log(partyname);

    var trans=str_array[1];
    //console.log(trans);

    db.batch.find({"partyname":partyname,"Transaction":trans},function(err,doc){ 
    // db.transaction.find({partyname:username},function(err,doc){
      
        //console.log(" in new trans")
        res.json(doc);

       // console.log(doc);
    });
});

 //for historyfetching
app.get('/historyfetch/:update',function(req,res)
{       
    console.log("entered into new  trans data");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);

    // db.history.find({partyname:partyname},function(err,doc){ 
     db.transactiondetail.find({partyname:partyname,orderStatus:"completed"},function(err,doc){ 
    
        res.json(doc);

        console.log(doc);
    });
});

// data history fetch in list
app.get('/historyfet/:update',function(req,res)
{       
    //console.log("entered into new  trans data");
    var str=req.params.update;
   // console.log(str);
    var str_array=str.split(",");
    var trans=str_array[0];
    //console.log(trans);
   // var order = "completed"
    //db.history.find({"TransactionType":"URD PURCHASE"}
    // db.history.find({"TransactionType":trans},function(err,doc){ 
    // db.transactiondetail.find({"TransactionType":trans,"orderstatus":"completed"},function(err,doc){ 
    // db.transactiondetail.find({"Transaction":trans,"orderStatus":"completed"},function(err,doc){ 
     if(trans == "Regular Sale"){
          db.saleinvoice.find({"Transaction":trans,"status":"completed"},function(err,doc){ 
         
             res.json(doc);
         });
        }else{
           // db.saleinvoice.find({ $and:[ {"voucherNo" : {  $ne: null } }, {  "Transaction" : "Urd Purchase"}]}
           db.saleinvoice.find({ $and:[ {"voucherNo" : {  $ne: null } }, {  "Transaction" :trans}]},function(err,doc){ 
         
         // db.saleinvoice.find({"Transaction":trans},function(err,doc){ 
         
             res.json(doc);
         });
        }
});
// list data update
app.put('/historyup/:update',function(req,res)
{
    console.log("entered into put request $scope.userit[i]._id!=null");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
    console.log(id);
    var partyname=str_array[1];
    console.log(partyname);
    var vouc=str_array[2];
    console.log(vouc);
    var val=str_array[3];
    
    db.history.update({_id:mongojs.ObjectId(id)},{$set:{"partyname":partyname,"VoucherNo":vouc,"Value":val}},function(err,doc){
     // db.useritem.update({"barcode":barcode},{$set:{"partyname":partyname,"name":name,"gwt":gwt,"rate":rate,"total":tot}},function(err,doc){
    
     if(err)
        {
            console.log(err)
        }
        res.json(doc);
        console.log(doc);
      })
});
// history delete
app.delete('/historydelete/:udelete',function(req,res)
{
   // console.log("i got the delete request");
    var id=req.params.udelete;
    //console.log(id);
    db.history.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
})
})
// delete of barcodesummarydelete
app.delete('/barcodesummarydelete/:udelete',function(req,res)
{
   //console.log("i got the delete request");
    var id=req.params.udelete;
    //console.log(id);
    db.barcodesumm.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
})
})
// for barcode delete
app.delete('/deletebarcode/:udelete',function(req,res)
{
   console.log("i got the delete request");
    var barcode=req.params.udelete;
    //console.log(id);
    barcode = parseInt(barcode)
    db.batch.remove({ barcode:barcode}, function(err, docs) {
})
     db.transactiondetail.remove({ "barcode" :barcode});
     db.transactiondetail.remove({ "refid":barcode});
      db.transactiondetail.remove({  "compositeRef":barcode});
})
//for tax new
app.get('/getTaxname:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.tax.find({"taxname": taxnamee},function(err,doc){     
      
        res.json(doc);
})
})
//for tax new
app.get('/getTaxAlias:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.tax.find({"aliasname": taxnamee},function(err,doc){     
      
        res.json(doc);
})
})
// edit in barcode generation update
app.put('/updateBarcodeDataGeneration',function(req,res){
  console.log("entered into put request $scope.userit[i]._id!=null");
       
       var id = req.body._id;
       console.log(req.body);
       console.log(req.body.barcode);
       console.log("ids in edit   "+req.body._id);

     // db.batch.update({_id:mongojs.ObjectId(id)},{$set:{"name":req.body.name,"desc":req.body.desc ,"hsc":req.body.hsc ,"invGroupName":req.body.invGroupName,
     //     "outofstate":req.body.outofstate ,"withinstate":req.body.withinstate,"salesTax":req.body.salesTax,"comboItem":req.body.comboItem,"marginReport":req.body.marginReport,"itemType":req.body.itemType}},function(err,doc)
      db.batch.update({_id:mongojs.ObjectId(req.body._id)},{$set:{"barcode":req.body.barcode,"purity":req.body.purity,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg, 
         "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
      
        {
            res.json(doc);
        
        });  
       db.transactiondetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
        {
           // res.json(doc);
        
        });
  
  

        db.transactiondetail.update({"barcode":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
          "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
         {
           // res.json(doc);
        
        });
})

app.put('/editcompos',function(req,res) {
    console.log(req.body.compositenum)
    console.log(req.body)

      db.transactiondetail.update({"compositenum":req.body.compositenum,"compositeRef":req.body.compositeRef},{$set:{"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
          "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"purity":req.body.purity,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
          {
            res.json(doc);console.log(doc)
        
        });
      if (req.body.compositenum == 0) {
        db.batch.update({"barcode":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"purity":req.body.purity,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg, 
         "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
      
        {
           // res.json(doc);
        
        });
      }

        
       
})

// app.put('/editupdate/:update',function(req,res)
// {
//     //console.log("entered into put request $scope.userit[i]._id!=null");
//       var str=req.params.update;
//    // console.log(str);
//     var str_array=str.split(",");
//     var id=str_array[0];
//     //console.log("id the id is "+id);
//     var code1=str_array[1]
//     var bar =parseInt(code1);
//   //  console.log("code1"+code1)
//     var chgunt=str_array[2]
//     var date=str_array[3]
//     var desc=str_array[4]
//     var final=str_array[5]
//     var gpcs=str_array[6]
//     var gwt=str_array[7]
//     var iname=str_array[8]
//     var ntwt=str_array[9]
//    // var partyname=str_array[10]
//     var size=str_array[11]
//     var taxval1=str_array[12]
//     var taxamt1=str_array[13]
//    var wt=str_array[14]

//     var wastage=str_array[15]
//     var stval=str_array[16]
//     var labval=str_array[17]
//     var rate=str_array[18]
//     //  var stockin=str_array[19];

//        var stockout=str_array[20];
//    // var order = "available"
//     // db.transactiondetail.insert({barcode:barcode,},function(err,doc){
//      db.batch.update({_id:mongojs.ObjectId(id)},{$set:{"barcode":bar,"chgunt":chgunt,"date":date,"desc":desc,
//         "final":final,"gpcs":gpcs,"gwt":gwt,"name":iname,"ntwt":ntwt,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,
//         "wastage":wastage,"stval":stval,"labval":labval}},function(err,doc){
     
//     //var document={name:name,city:city,no:no,email:email,street:street};
//    // db.useritem.insert(req.body,function(err,doc){
//         res.json(doc);
//        // console.log(doc);
    
// })
// });
// history delete
app.delete('/historydelete/:udelete',function(req,res)
{
  //  console.log("i got the delete request");
    var id=req.params.udelete;
   // console.log(id);
    db.history.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
})
})

app.delete('/userit/:udelete',function(req,res)
{
   // console.log("i got the delete request");
   // var id=req.params.udelete;
    var str=req.params.udelete;
    console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
    
     db.transactiondetail.remove({_id:mongojs.ObjectId(id)}, function(err, docs) {
      res.json("deleted");
    })
  
})
app.delete('/saleinv/:id',function(req,res)
{
   var id = req.params.id;
   console.log("i got the saleinvoice delete request ");
    
    //console.log(name);
    
     db.saleinvoice.remove({_id:mongojs.ObjectId(id)}, function(err, docs) {
        res.json("deleted");
    })
})



// app.put('/tagdeleted1/:update',function(req,res)
// {
//    console.log("i got the tagdeleted1 tagdeleted1 tagdeleted1 tagdeleted1");
//    // var tag5=req.query.itemno
//    // console.log(tag5)
//    // var count4=req.query.count
//    //  console.log(count4)
//    // var a
//    var id=req.params.update;
//     console.log(id);
//    db.tags.update({_id: mongojs.ObjectId(id)},{"$set":{"status":"completed"}},function(err, docs) {
//      // console.log(" tag delete exicuted successfully "+count);
//      // count++
//   })
//      //console.log(" tag delete after remove function");
// })
app.delete('/tagdeleted12/:update',function(req,res)
{
   console.log("i got the tagdeleted1 tagdeleted1 tagdeleted1 tagdeleted1");
   
   var id=req.params.update;
    console.log(id);
      db.tags.remove({_id: mongojs.ObjectId(id)})
     //console.log(" tag delete after remove function");
})
//delete and create a new one
app.delete('/deleteTagsError/:update',function(req,res)
{
    console.log("i got the tag delete request i got the tag delete request i got the tag delete request");
   var count=req.params.update;
   // console.log(str);
    // var str_array=str.split(",");
    
    
    // var tagno=parseInt(str_array[0]);
     count = parseInt(count);
   
   // console.log(tagno);({barcode:b},{"$set":{"color":color}},
    db.tags.remove({ count:count}, function(err, docs) {
      res.json("deleted");
})
})
//delete from barcodesumm a new one
// app.put('/barcodedelete/:update',function(req,res)
// {
//     console.log("i got the tag update  request call call call");
//    var str=req.params.update;
//    // console.log(str);
//     var str_array=str.split(",");
    
    
//     var count = parseInt(str_array[0]);
//     console.log(count)
//     db.barcodesumm.update({"count":count},{"$set":{"status":"completed"}},function(err, docs) {
// })
// })
//delete the barsumm record
app.delete('/barcodedelete/:update',function(req,res)
{
    console.log("i got the tag update  request call call call");
   var str=req.params.update;
   // console.log(str);
    var str_array=str.split(",");
    
    
    var count = parseInt(str_array[0]);
    console.log(count)
    db.barcodesumm.remove({"count":count})
})
//summary count
app.get('/summarycount/:update',function(req,res)
{
   // console.log("i got the tag delete request");
   var str=req.params.update;
    //console.log(str);
    var str_array=str.split(",");
    
    
    var tagno=parseInt(str_array[0]);
    var count = parseInt(str_array[1]);
   
    //console.log(tagno);
    db.tags.find({"count":count,status:"Inprogress"},function(err,doc){
      //  console.log(doc);
        res.json(doc);
})
})


// getinovice transaction type
app.get('/getinvoice:trans',function(req,res)
{
    //console.log("i received a get request from count");
    var tax = req.params.trans;
  // var tax1=parseInt(tax);
   // console.log("here the replay is "+tax1);

    //26/4db.batch.find({"barcode": tax1},function(err,doc){
        db.transactionSeriesInvoice.find({"TransactionType":tax},function(err,doc){
        console.log(doc);
        res.json(doc);
})
})
// for insert invoice
// app.post('/postinvoice/:update',function(req,res)
// {   //'/listtran/:update'
//     console.log("i receivecooooooooooooooooooooooooooooooooooooooooooooooooooo");
//    var str=req.params.update;
//     console.log(str);
//     var str_array=str.split(",");
    
//     var prefix=str_array[0];
//     console.log(prefix);
//      var typeno=str_array[1];
//     console.log(typeno);
   
//      db.transactionInvoice.insert({"prefix":prefix,"typeno":typeno},function(err,doc){
//         console.log(doc);
//         res.json(doc);
// })
// })
//
// app.post('/userit1/:update',function(req,res){
//   console.log("I received a new username request for login and document from pdf");
//   // var typeno=req.params.partyname;
//   // var prefix=req.params.Transaction;
//   // var typeno= "100";
//   // var prefix="200";
//   var str=req.params.update;
//     console.log(str);
//     var str_array=str.split(",");
    
//     var prefix=str_array[0];
//     console.log(prefix);
//      var typeno=str_array[1];
//     console.log(typeno);
//    console.log(prefix);
//   db.transactionInvoice.insert({"prefix":prefix,"typeno":typeno},function(err,doc){
//         console.log(doc);
//         res.json(doc);
// })
// });
app.put('/updateBatchTransaction/:update',function(req,res)
{
    //console.log("entered into put request for saleinvoicedata saleinvoicedata update ");
    var str=req.params.update;
    //console.log(str);
    var str_array=str.split(",");
    var barcode=str_array[0];
    //console.log(id);
    var orderStatus=str_array[1];
//   db.transactionInvoice.insert({partyname:username,Transaction:trans},function(err,doc){
    db.batch.update({barcode: Number(barcode)},{$set:{orderStatus:orderStatus}},function(err,doc){
   
        res.json(doc);
        console.log(doc);
    });

});
// for pras
 app.post('/saleinv1',function(req,res){
  console.log("I received a new username request for login and document saleinv lok here eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  var username=req.query.name;
  var trans=req.query.Transaction;
   console.log(trans);
  db.transactionInvoice.insert({partyname:username,Transaction:trans},function(err,doc){
    // db.transactionInvoice.insert({"prefix":prefix,"typeno":typeno},function(err,doc){
//    
        res.json(doc);
        console.log(doc);
    });
});

app.get('/listtran/:update',function(req,res)
{       
    console.log("entered into new  trans data");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    
    var trans=str_array[0];
    console.log(trans);

    db.useritem.find({"Transaction":trans},function(err,doc){ 
    // db.transaction.find({partyname:username},function(err,doc){
      
        console.log(" in new trans")
        res.json(doc);

        console.log(doc);
    });
});

// delete from database saleinvoice
app.delete('/listDeleteEnter/:update',function(req,res)
{
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);
    var trans=str_array[1];
    console.log(trans);
  
    var prefix = (req.params.update).match(/[a-zA-Z]+/g);
    var typeno = (req.params.update).match(/[0-9]+/g);
      prefix = prefix.toString();
      typeno = typeno.toString();
    console.log(prefix+" prefix "+typeno+" typeno")
    db.transactionInvoice.remove({ "prefix" : prefix,"typeno" : typeno });

    db.saleinvoice.remove({ "voucherNo" : req.params.update})
     db.trDetails.remove({ "vocuherNumber" : req.params.update})
      db.trHeaders.remove({ "vocuherNumber" : req.params.update})
       db.transactiondetail.remove({ "voucherNo" : req.params.update})

    //   "voucherNo"  db.saleinvoice.remove({"partyname":partyname,"Transaction":trans}, function(err, docs) {
// })
})
//for delete latest record
app.delete('/updatelistdelete',function(req,res)
{
    //  console.log("req.query.barcode req.query.barcode req.query.barcode req.query.barcode")
   
    //  var count =req.params.udelete;
    // //console.log(id);
    // count = parseInt(count)
     db.updatelist.findAndModify({query :{}, sort: {"_id" : -1}, remove:true}, function(err, docs) {
   // db.updatelist.remove({"count":count}
})
})
// delete in bar generation
app.get('/deletequery',function(req,res)
{
    
db.updatelist.find({}).sort({_id:-1}).limit(1,function(err,doc)
    {
        res.json(doc);
        //console.log(doc);
    })
})
// for post in db.updatelist
app.post('/updatelistinsert/:udelete',function(req,res)
{
    var count =req.params.udelete;
    //console.log(id);
    count = parseInt(count)
    db.updatelist.insert({"count":count},function(err,doc)
    {
   res.json(doc);
    })

})
// delete from database transaction
app.delete('/transactiond/:update',function(req,res)
{
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);
    var trans=str_array[1];
    console.log(trans);
    
    db.transaction.remove({"partyname":partyname,"Transaction":trans}, function(err, docs) {
})
})
// delete from database  useritem
app.delete('/useritemd/:update',function(req,res)
{
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    var partyname=str_array[0];
    console.log(partyname);
    var trans=str_array[1];
    console.log(trans);
    
    db. useritem.remove({"partyname":partyname,"Transaction":trans}, function(err, docs) {
})
})
// delete from database barcodetransactiondetailed
app.delete('/transactiondetaild',function(req,res)
{
    console.log("transactiondetaild req.query.barcode req.query.barcode req.query.barcode")
    var bar=req.query.barcode;
    var barcode = parseInt(bar)
    console.log(barcode)
    //  barcode=parseInt(barcode);

    db.transactiondetail.remove({"barcode":barcode}, function(err, docs) {

})
})
// delete from database transactiondetaile
app.delete('/transactiondetaile',function(req,res)
{
     console.log("req.query.barcode req.query.barcode req.query.barcode req.query.barcode")
   
     var barcode=req.query.barcode;
    console.log(barcode)
    db.transactiondetail.remove({"refid":barcode}, function(err, docs) {
})
})

//for item html get details
app.get('/getinventorygroupmaster',function(req,res)
{
    db.inventorygroupmaster.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/getitemtype',function(req,res)
{
    db.itemtype.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/getsalescategorymaster',function(req,res)
{
    db.salescategorymaster.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/gettaxrate',function(req,res)
{
    db.taxrate.find(function(err,doc){
        res.json(doc);
})
})
// for save item 
app.post('/saveitempost',function(req,res){
     db.items.insert(req.body,function(err,doc){
        res.json(doc);
      })
})
//for get details of saved items
app.get('/getitemdata',function(req,res)
{
    db.items.find(function(err,doc){
        res.json(doc);
})
})
// app.post('/saveitempost/',function(req,res)
// {
//   var sale1 = req.params.update;
//     //sale1 =" "+sale1;
//       console.log(sale1)
//       if(sale1 == "All" ){
//         console.log("kkkkkkkkkkkkkkkkkkkkk")
//          db.items.find(function(err,doc){
//           //console.log("kkkkkkkkkkkkkkkkkkk")
//           //console.log(doc.length)
//        res.json(doc);
// })

//       }
//       else{
//         sale1 =" "+sale1;
//      db.items.find({ItemType: sale1},function(err,doc)
//     {
//         res.json(doc);
//     })
//    }
// })

// for filter in item page
app.get('/getfilter/:update',function(req,res)
{
  var sale1 = req.params.update;
    //sale1 =" "+sale1;
      console.log(sale1)
      if(sale1 == "All" ){
        console.log("kgggggk")
         db.items.find(function(err,doc){
          //console.log("kkkkkkkkkkkkkkkkkkk")
          //console.log(doc.length)
       res.json(doc);
})

      }
      else{
        sale1 =" "+sale1;
     db.items.find({ItemType: sale1},function(err,doc)
    {
        res.json(doc);
    })
   }

   
})
// for delete in item page
app.delete('/itemdelete/:udelete',function(req,res)
{
   // console.log("i got the delete request");
    var id=req.params.udelete;
   
    db.items.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
})
})
// for edit item 
app.put('/editeditem',function(req,res){

  //console.log("entered into put request $scope.item1[i]._id!=null");
       var id = req.body._id
       var inven=req.body.InvGroupName;
       //console.log(inven+"vvvvvvvvvvvvvvvvvvvvvv");
      //  var name=req.body.Name;
      //  console.log(name+"1111111111111111111111111111111"){"_id":mongojs.ObjectId(id)};
     db.items.update({_id : mongojs.ObjectId(id)},{$set:{"Name":req.body.Name,"Desc":req.body.Desc ,"Hsc":req.body.Hsc ,"InvGroupName":req.body.InvGroupName,"SaleCategory":req.body.SaleCategory,
         "Outofstate":req.body.Outofstate ,"Withinstate":req.body.Withinstate,"comboItem":req.body.comboItem,"marginReport":req.body.marginReport,
         "ItemType":req.body.ItemType}},function(err,doc)
        {
          // console.log(doc.name+"aaaaaaaaaaaaaaaaaaaaaaaa");
         // console.log(doc); "SalesTax":req.body.salesTax,
            res.json(doc);

        });
})

//for tax with in state in index1.html



// in item page with in state
app.get('/apigettaxwithinstate', function (req, res) {
  console.log(" api/gettaxwithinstate api/gettaxwithinstate api/gettaxwithinstateapi/gettaxwithinstate")
  
 db.tax.find({"withinstate":"yes"},function (err, docs) {

      res.json(docs);
      console.log(docs);
       console.log(" api/gettaxwithinstate api/gettaxwithinstate api/gettaxwithinstateapi/gettaxwithinstate")
  
  });
})

app.get('/apigettaxoutstate', function(req, res){
 //console.log("i received a get request");
 db.tax.find({"outofstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});
  

app.get('/gettaxwithinstate', function(req, res){
 //console.log("i received a get request");
 db.tax.find({"withinstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});
//tax selection call
app.get('/taxSelectionWithinstate', function(req, res){
 // "taxSelection"
  var taxSelection=req.query.taxSelection;
 //console.log("i received a get request");
 db.tax.find({"taxname" : taxSelection},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});

// in item page out of state
app.get('/gettaxoutofstate', function(req, res){
 //console.log("i received a get request");
 db.tax.find({"outofstate":"yes"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
 res.json(docs);
});
});

// labourtax
app.get('/getLabourTax', function(req, res){
 //console.log("i received a get request");
 db.tax.find({ "taxname" : "LabourTax"},function (err, docs) {
 //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()

 res.json(docs);
});
});
// for combo
app.get('/checkofcomboitem/:combo',  function (req, res) {
 // console.log("this is a put request");
var name = req.params.combo;
//console.log(id);
db.items.find({Name:name}, function (err, doc) {
  res.json(doc);
  //console.log("the edit details r" +doc)
});
});
// frist page taxation

// taxation project starts here

app.get('/getitemtaxation', function(req, res){
   db.taxation.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/opalpost', function (req, res) {
  
  db.taxation.insert(req.body,function(err, doc) {
     res.json(doc);

  });
});



app.delete('/opal/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.taxation.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});

app.get('/item1/:id',  function (req, res) {
  console.log("this is a put request");
var id = req.params.id;
console.log(id);
db.taxation.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
});
});


app.put('/updatetaxation/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.taxation.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, aliasname: req.body.aliasname, taxlevel: req.body.taxlevel}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
});

// frist page taxation

app.get('/gettax', function(req, res){
 console.log("i received a get request");
 db.tax.find(function (err, docs) {
 //console.log(docs);
 res.json(docs);
});
});

app.post('/opal1', function (req, res) {
   console.log("i got post opal1 opal1opal1 opal1 opal1 request");
   console.log(req.body)
   console.log(req.body.taxname);
  
  db.tax.insert(req.body,function(err, doc) {
    res.json(doc);

  });

});

app.delete('/opal1/:id', function (req, res) {
  var id = req.params.id;
  console.log("this is delete"+id);
  db.tax.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    console.log(doc);
  });
});

app.get('/editititem2',function (req, res) {
  console.log("this is  editititem2 editititem2 editititem2a put request");
var aliasname=req.query.aliasname;
var taxname=req.query.taxname;
console.log(taxname)
console.log(aliasname)

db.tax.find({aliasname:aliasname,taxname:taxname}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
});
});
app.get('/getname:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
   //  var ta = req.params.ta;
   // var taxn=(ta);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.taxation.find({"name": taxnamee,},function(err,doc){     
      
        res.json(doc);
})
})
app.get('/getaliasname:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
   //  var ta = req.params.ta;
   // var taxn=(ta);
  
   // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
     db.taxation.find({"aliasname": taxnamee,},function(err,doc){     
      
        res.json(doc);
})
})
// app.get('/getitemname:taxx',function(req,res)
// {
//    // console.log("i received a get request from count");
//     var taxxx = req.params.taxx;
//    var taxnamee=(taxxx);
//    //  var ta = req.params.ta;
//    // var taxn=(ta);
  
//    // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
//      db.items.find({"Name": taxnamee,},function(err,doc){     
      
//         res.json(doc);
// })
// })
// app.get('/getitemgroupname:taxx',function(req,res)
// {
//    // console.log("i received a get request from count");
//     var taxxx = req.params.taxx;
//    var taxnamee=(taxxx);
//    //  var ta = req.params.ta;
//    // var taxn=(ta);
  
//    // db.transactiondetail.find({"barcode": tax1},function(err,doc){     
//      db.items.find({"InvGroupName": taxnamee,},function(err,doc){     
      
//         res.json(doc);
// })
// })


app.get('/remove',function (req, res) {
  console.log("this is  editititem2 editititem2 editititem2a put request");
var aliasname=req.query.aliasname;
var name=req.query.name;
console.log(taxname)
console.log(aliasname)

db.taxation.find({aliasname:aliasname,name:name}, function (err, doc) {
  res.json(doc);
  //console.log("the edit details r" +doc)
});
});


//app.put('/updateedit/:id', function (req, res) {
app.put('/updateedit', function (req, res) {
  //console.log("update  updateedit function updateedit updateedit update function")
  var id = req.body._id;
 // console.log(id);
  db.tax.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {taxname: req.body.taxname, aliasname: req.body.aliasname, displaydate: req.body.displaydate,Rate:req.body.Rate,
    name:req.body.name,outofstate: req.body.outofstate,withinstate: req.body.withinstate,SaleAc: req.body.SaleAc,PurchaseAC: req.body.PurchaseAC}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
  });
  
  app.get('/purchasess',  function (req, res) {
   
    
console.log("jjjjjjj")
    db.ledgeraccounts.find({sortOrder: { $exists: true }},function(err,doc){
   
        res.json(doc);
})

  });

  //  app.get('/sales',  function (req, res) {
   
  //     db.inventorygroupmaster.aggregate([{$project:{"SalesAcc.AccNo":1}},
  //                                         {$unwind:"$SalesAcc"},
  //                                         {$group:{_id:"$SalesAcc.AccNo"}}
 
  //                                       ],function (err, docs) {
 

  //                                       res.json(docs);
  //     });

  // });


// posting data

app.post('/opaltx', function (req, res) {
  // console.log("i got post request");
  console.log("iam done here")
  var tax = req.body.name;
  var tax1 = req.body.PurchaseAc;
  var tax2 = req.body.SaleAc; 
  var tax3 = req.body.Rate; 
  var tax4 = req.body.CessOn; 
   var tax5 = req.body.From; 
  var tax6= req.body.To; 
  var tax7 = req.body.Rate1; 
 console.log("name value " + tax);
 console.log("pur value  " + tax1);
  console.log("sale value  " + tax2);
   console.log("rate value  " + tax3);
  console.log("CessOn value  " + tax4);
  console.log("from value  " + tax5);
   console.log("to value  " + tax6);
    console.log("rate1 value  12 " + tax7);

 var document = {name: tax,PurchaseAc: tax1, SaleAc: tax2,Rate: tax3, CessOn: tax4,From: tax5,To: tax6, Rate1: tax7};
  db.taxtable2.insert(req.body,function(err, doc) {
   res.json(doc);
   });
  
});

// report controller
//'/getbar:barcodenum',
// app.get('/reportonedate/:reportdate',  function (req, res) {
//    // console.log("reportonedate reportonedate reportonedate reportonedate")
//     var reportdate = req.params.reportdate;
//     console.log(reportdate);
//     //from date
//     //1-apr 31st march
//     var fromdate = null
//     var date = new Date()
     
//     var year = date.getFullYear();
//     var month = date.getMonth()+1;
//     var april = 04
//     //month =3
//     if( 3 < month){
//           //console.log("greater "+year)
//           // fromdate = new Date(year+"-"+march);
//           // fromdate = new Date(((new Date(new Date(year+"-"+march)).toISOString().slice(0, 23))+"-05:30")).toISOString();
//          fromdate = new Date(((new Date(new Date(year+"-"+april)).toISOString().slice(0, 23))+"-05:30")).toISOString();
//          // console.log(fromdate)
//       }else{
//            year = date.getFullYear()-1;
//           // console.log("lesser "+year)
//            // fromdate = new Date(year+"-"+march);
//           fromdate = new Date(((new Date(new Date(year+"-"+april)).toISOString().slice(0, 23))+"-05:30")).toISOString();
  
//           // console.log(fromdate)
//        }

//   db.transactiondetail.find({ date: {$gte:(fromdate), $lt: (reportdate)}},function (err, docs) {
//           //console.log(docs);
//           res.json(docs);
//     });

// });
//current finacial year
var fromdate = null
var currentyear = function(){
  //1-apr 31st march
    
    var date = new Date()
     
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var april = 04
    //month =3
    if( 3 < month){
          //console.log("greater "+year)
          // fromdate = new Date(year+"-"+march);
          // fromdate = new Date(((new Date(new Date(year+"-"+march)).toISOString().slice(0, 23))+"-05:30")).toISOString();
         fromdate = new Date(((new Date(new Date(year+"-"+april)).toISOString().slice(0, 23))+"-05:30")).toISOString();
         // console.log(fromdate)
      }else{
           year = date.getFullYear()-1;
          // console.log("lesser "+year)
           // fromdate = new Date(year+"-"+march);
          fromdate = new Date(((new Date(new Date(year+"-"+april)).toISOString().slice(0, 23))+"-05:30")).toISOString();
  
           
       }
       console.log(fromdate)
       console.log("current year date")

}
currentyear();
//app.get('/countdata',
app.get('/issueonedate/:data',function (req, res) {
    console.log("preiwiwitonedate reportonedate reportonedate reportonedate")
    // var username=req.query.name;
    // var reportdate = req.params.reportdate;
    // console.log(reportdate);

   console.log(req.params.data)
   var str=req.params.data;
    // console.log(str);
    var reportdata = str.split(",");
    var transaction =reportdata[0];
    var barcode =reportdata[1];
    var  weight =reportdata[2];
    var report =reportdata[3];
    var reportdate =reportdata[4];
    console.log(" transaction "+transaction+" barcode" +
     barcode+" weight "+weight+" report "+report+" reportdate "+reportdate )
     
    var report = '$'+report;
    //var weight = weight;
    var inputweight = '$'+weight;
    console.log(report)
    console.log("fromdate "+fromdate)
    //from date  weight inputweight
    

  // db.transactiondetail.find({ date: {$gte:(fromdate), $lt: (reportdate)}},function (err, docs) {
  //         //console.log(docs);
  //         res.json(docs);
  //   });
  if(barcode == "yes"){
        console.log("if yes");
        db.transactiondetail.aggregate([
                 {$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id:report ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
              res.json(docs);
          });

  }else{
          console.log("else no");
          db.transactiondetail.aggregate([
                 {$match:{"Transaction": { $ne: NaN },"barcodeNumber": NaN, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id:report ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  console.log(docs);
               res.json(docs);
          });


       }


});
app.get('/receiveonedate/:data',  function (req, res) {
    console.log("receiveonedate receiveonedate receiveonedatereportonedate")
    

     console.log(req.params.data)
      var str=req.params.data;
   // console.log(str);
    var reportdata = str.split(",");
    var transaction =reportdata[0];
    var barcode =reportdata[1];
    var  weight =reportdata[2];
    var report =reportdata[3];
    var report1 =reportdata[3];
    var reportdate =reportdata[4];
    console.log(" transaction "+transaction+" barcode" +
     barcode+" weight "+weight+" report "+report+" reportdate "+reportdate )
     
    var report = '$'+report;
    //var weight = weight;
    var inputweight = '$'+weight;
    console.log(report1)
    console.log("fromdate "+fromdate)
    //from date  weight inputweight
    if("purity" == report1){
      db.transactiondetail.aggregate([
                 {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id :{purity:"$purity",itemName:"$itemName"} ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
               res.json(docs);
        });
      
    }else{

      db.transactiondetail.aggregate([
                 {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id:report ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
               res.json(docs);
        });
      
    }
        
});
//purity in report
app.get('/inventorygroupmasterdetails',function(req,res)
{
   // console.log("inventorygroupmasterdetails request from index");

    db.inventorygroupmaster.find({},function(err,doc){
     //   console.log(doc);
        res.json(doc);
})
})
//purity

app.get('/itemreport2',function(req,res)
{
   // console.log("i received a get request from index");
    var itemgroupid=req.params.inGrpId;

    console.log("Item purity details function called-----"+itemgroupid)
  db.transactiondetail.aggregate([
    { "$lookup": { 
        "from": "inventorygroupvaluenotation", 
        "localField": "purity", 
        "foreignField": "ValueNotation", 
        "as": "collection2_doc"
    }}, 
   { "$unwind": "$collection2_doc" },
    { "$redact": { 
        "$cond": [
            { "$eq": [ "$purity", "$collection2_doc.ValueNotation" ] }, 
            "$$KEEP", 
            "$$PRUNE"
        ]
    }},{$match:{"barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:("2016-07-10T10:50:42.389Z"), $lt: ("2018-02-10T10:50:42.389Z") }}},
    {$group:{_id :{purity:"$purity",itemName:"$itemName"}, gwt:{$sum:"$gwt"},gpcs:{$sum:"$gpcs"},ntwt:{$sum:"$ntwt"}}}
   
],function(err,doc){
   // db.inventorygroupvaluenotation.find({InvGroupID:itemgroupid},function(err,doc){
     //   console.log(doc);
        res.json(doc);
})
})
//pdf party pan details
app.get('/getpartydetails:name',function(req,res)
{
   // console.log("i list is exicuted list1 list1");
   //  var  = req.params.name;
   // var tax1=parseInt(tax);
    //console.log("here the replay is "+tax);

   // db.tags.find({"count": tax1},function(err,doc){
      //  console.log(doc);
      //  db.user.find({"name": req.params.name},function(err,doc){
     db.subscribers.find({ "subscriber" : req.params.name},function(err,doc){
     
        res.json(doc);
})
})
// in mainpgae getinventorygroupvaluenotation
app.get('/getinventorygroupvaluenotation/:data',function(req,res)
{
  
//    var date = new Date();
//   date.setDate(date.getDate() - 1)
//   date.toISOString()
// console.log("date is here "+date.toISOString())
   // var currentdate   = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
   // currentdate.setDate(currentdate .getDate() - 1);
   //{count:b},
   var str=req.params.data;
   
    var str_array=str.split(",");
     var currentdate=str_array[0];

    db.inventorygroupvaluenotationdaily.find({date:currentdate},function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
//last date
app.get('/getinventorygroupvaluenotationlast',function(req,res)
{

    db.inventorygroupvaluenotationdaily.find({}).sort({_id:-1}).limit(1,function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
 
  app.get('/todayinventorygroupvaluenotation/:data',function(req,res)
{
     var str=req.params.data;
   
    var str_array=str.split(",");
     var currentdate=str_array[0];
//    var date = new Date();
//   date.setDate(date.getDate() - 1)
//   date.toISOString()
// console.log("date is here "+date.toISOString())
   // var currentdate   = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
   // currentdate.setDate(currentdate .getDate() - 1);
   //{count:b},
   //var currentdate = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
     currentdate =currentdate.slice(0, 10);
    db.inventorygroupvaluenotationdaily.find({date: { $gt:(currentdate)}},function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
app.get('/stockDetaildisplayBarcodedItems',function(req,res){
    console.log("stockDetaildisplayBarcodedItems");
    // var a=req.query.count;
    // console.log(a);

   // console.log(req.body.InvGroupName);
    
     if (req.query.SaleCategory != undefined && req.query.InvGroupName != undefined ) {
     //  console.log(req.query.InvGroupName);
     // console.log(req.query.SaleCategory);
      db.transactiondetail.aggregate([
                 {$match:{refid: { $exists: true },comboBarcode: { $exists: false }, "stats" : "Inprogress",   "InvGroupName" :req.query.InvGroupName, "SaleCategory" : req.query.SaleCategory,"reset" : {$ne:true}}}
         ],function (err,doc) {
          console.log(doc.length);
          res.json(doc);
           // body...
         })
     }
   // var itemgroupid=req.params.inGrpId;
});
app.get('/stockTotalCall',function(req,res){
    console.log("stockTotalCall");
    // var a=req.query.count;
    // console.log(a);

   // console.log(req.body.InvGroupName);
    
     if (req.query.SaleCategory != undefined && req.query.InvGroupName != undefined ) {
     //  console.log(req.query.InvGroupName);
     // console.log(req.query.SaleCategory);
      db.transactiondetail.aggregate([
                 {$match:{refid: { $exists: true },comboBarcode: { $exists: false }, "stats" : "Inprogress",   "InvGroupName" :req.query.InvGroupName, "SaleCategory" : req.query.SaleCategory,}},
        {
       $group:
         {
      _id: { InvGroupName:  "$InvGroupName" },count: { $sum: 1 },gwt:{$sum:"$gwt"},gpcs:{$sum:"$gpcs"}
     }} ],function (err,doc) {
          console.log(doc.length);
          res.json(doc);
           // body...
         })
     }
   // var itemgroupid=req.params.inGrpId;
});
app.get('/stockResetTrue',function(req,res){
    console.log("stockDetaildisplayBarcodedItems");
    // var a=req.query.count;
    // console.log(a);

   // console.log(req.body.InvGroupName);
    
     if (req.query.SaleCategory != undefined && req.query.InvGroupName != undefined ) {
     //  console.log(req.query.InvGroupName);
     // console.log(req.query.SaleCategory);
      db.transactiondetail.aggregate([
                 {$match:{refid: { $exists: true },comboBarcode: { $exists: false }, "stats" : "Inprogress",   "InvGroupName" :req.query.InvGroupName, "SaleCategory" : req.query.SaleCategory, "reset" : true}}
         ],function (err,doc) {
          console.log(doc.length);
          res.json(doc);
           // body...
         })
     }
   // var itemgroupid=req.params.inGrpId;
});
app.get('/stockCodedBarcodedItems',function(req,res){
    console.log("stockCodedBarcodedItems");
    console.log(req.query.barcode);
      db.transactiondetail.find({"refid" :  Number(req.query.barcode) , comboBarcode: { $exists: false }},function (err,doc) {
          console.log(doc.length);
         // res.json(doc);
          upDateCall()
          })//db.transactiondetail.find
function upDateCall() {
   db.transactiondetail.update({"refid" :  Number(req.query.barcode) , comboBarcode: { $exists: false }},{$set:{"reset":true}},function (err,doc) {
          console.log(doc.length);
         // res.json(doc);
            aggregateCall()
          })//db.transactiondetail.update
}//function upDateCall() {
 function aggregateCall() {

// body...
           db.transactiondetail.aggregate([
                 {$match:{refid: { $exists: true },comboBarcode: { $exists: false }, "stats" : "Inprogress",   "InvGroupName" :req.query.InvGroupName, "SaleCategory" : req.query.SaleCategory, "reset" : true}}
         ],function (err,doc) {
          console.log(doc.length);
          res.json(doc);
           
         })//db.transactiondetail.aggregate
 }          

           
        
})
app.get('/stockUninstallReset',function(req,res){
    console.log("stockUninstallReset");
     console.log(req.query.id);
     console.log(req.params.id);
     db.transactiondetail.update({_id:mongojs.ObjectId(req.query.id)},{$set:{"reset":false }},function(err,doc)
        {
        res.json(doc);
        //console.log(doc)
       });

})
app.get('/stockVerifyPreview',function(req,res){

  console.log(" stockVerifyPreview   req.query.fromdate "+ req.query.fromdate)
 // var  req.query.fromdate ;
 //  req.query.todate ;
 //  req.query.previousDate ;

  var previousDate = req.query.previousDate ;
   var samedateStart = req.query.fromdate;
  var samedateEnd =  req.query.todate ;
//function stockCntrlCall() {
  // body...
  //console.log("stockCntrlCall");
  //var fromdate = "2017-11-23T00:00:00.000Z";
   var reportdate = previousDate ;
 //  var reportdate = samedateStart ;
  //  var samedateStart = "2017-11-23T00:00:00.000Z";
  // var samedateEnd = "2017-11-23T23:59:59.999Z";
  var  openingBalance =null;
  var   outwardBalance = null;
  var inwardBalance = null;
  var  report2 = [];
  var setData = new Set(); 


  function openingBalanceCall() {
    //  console.log("openingBalanceCall");
      return new Promise(function (resolve,reject) { 
      db.transactiondetail.aggregate([
{$match:
      {date: { $gt:(fromdate), $lt: (reportdate) },refid: { $exists: true }}
},

{
         $project:
           {
            
             lesser:
               {
                 $cond: [ { $lt: [ "$soldOutDate",reportdate] }, true, false ]
               },
             greater:
               {
                 $cond: [ { $gt: [ "$soldOutDate",reportdate] }, true, false ]
               },
              
                status1:
               {
                 $cond: [ { $eq: [ "$stats","completed"] }, true, false ]
               },
               "gwt":1,"gpcs":1,"SaleCategory":1,"stats":1,"soldOutDate":1,"date":1,"refid":1,
           }
      },
      

       {
  $match: {
    $or:[
      {'lesser':true, "stats":"Inprogress"},
      {'greater':true,"stats":"completed"}
    ],
  }
},
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory"},opcount: { $sum: 1 },opgwt:{$sum:"$gwt"},opgpcs:{$sum:"$gpcs"}  }
 }
],function(err,doc)
        {
          console.log(" openingBalanceCall opening call "+doc.length);
      // console.log(doc);
          if(doc.length == 0){
            res.json(doc)
          }
         resolve(doc)
         openingBalance = doc;
      //  res.json(doc);
        console.log(" openingBalanceCall inside function "+doc.length);
       // console.log(doc)
})
    })//promise close
  }//openingBalanceCall

  function inwardBalanceCall() {
     return new Promise(function (resolve,reject) {
     // console.log("inwardBalanceCall");
      db.transactiondetail.aggregate([
{$match:
      {date: { $gt:(samedateStart), $lt: (samedateEnd) },refid: { $exists: true }}
},

      
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory"},incount: { $sum: 1 },ingwt:{$sum:"$gwt"},ingpcs:{$sum:"$gpcs"}  }
 }
],function(err,doc)
        {
          resolve(doc);

          inwardBalance = doc;
            console.log(" inwardBalanceCall inside function "+doc.length);
           // console.log(doc)
      //  res.json(doc);
       // console.log(doc.length);
       // console.log(doc)
})
    })
  }//inward
  function outwardBalanceCall() {
      //console.log("outwardBalanceCall");
       return new Promise(function (resolve,reject) {
      db.transactiondetail.aggregate([
{$match:
      {soldOutDate: { $gt:(samedateStart), $lt: (samedateEnd) },refid: { $exists: true }},
},

 {$match:{"stats" : "completed"
      }},
      
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory"},outcount: { $sum: 1 },outgwt:{$sum:"$gwt"},outgpcs:{$sum:"$gpcs"}  }
 }
],function(err,doc)
        {
      //  res.json(doc);
       // console.log(doc.length);
       // console.log(doc);
       resolve(doc);
       outwardBalance = doc;
        console.log(" outwardBalanceCall inside function "+doc.length);
       

})
    })
  }//outward
  function closingBalanceCall() {
    console.log(" inwardBalance closingBalanceCall "+ inwardBalance.length);
    
      //console.log(inwardBalance);
      // console.log(inwardBalance.l);
     
      var  report1 = [];
      var balance = [];
      var m = openingBalance.length;
      var z = 0;
      var z1 = (openingBalance.length )*(inwardBalance.length)
     
      // for (var i = openingBalance.length - 1; i >= 0; i--) {
         var set = new Set();
      for (var i = openingBalance.length - 1; i >= 0; i--) {
         
            m--;
           // console.log(" i openingBalance.length "+i+" m "+m+" j "+j);
            // console.log(openingBalance[i]);
        for (var j = inwardBalance.length-1 ; j >= 0; j--) {
              
            z++;
                 console.log(" z "+z+" z1 "+z1);
                                         
               set.add(openingBalance[i]._id.SaleCategory );
                    // console.log(" inwardBalance[j]._id.SaleCategory "+inwardBalance[j]._id.SaleCategory)
                if (openingBalance[i]._id.SaleCategory == inwardBalance[j]._id.SaleCategory ) {
                
                        //  console.log(" if loop yes openingBalance[i].SaleCategory "+openingBalance[i]._id.SaleCategory+" inwardBalance[j].SaleCategory "+inwardBalance[j]._id.SaleCategory)
                        console.log("inside closing "+openingBalance[i]._id.SaleCategory);
                       //console.log(inwardBalance[j]._id.SaleCategory);
                        // 
                        //console.log(" i "+i+" j "+j);
                       if( balance.indexOf(openingBalance[i]._id.SaleCategory) == -1) {
                                           //        // m--;
                               var obj={}
                               obj["SaleCategory"] = openingBalance[i]._id.SaleCategory;
                                   
                               obj["opcount"] =  openingBalance[i].opcount;
                                obj["opgwt"] = openingBalance[i].opgwt;
                                 obj["opgpcs"] = openingBalance[i].opgpcs;
                                  obj["incount"] =  inwardBalance[j].incount;
                                  obj["ingwt"] = inwardBalance[j].ingwt;
                                  obj["ingpcs"] = inwardBalance[j].ingpcs;
                                 
                                  report1.push(obj);
                                  balance.push(openingBalance[i]._id.SaleCategory);
                       
                                 // if (m == 0 ) {
                                  loopFinishCall(z,z1);
                                   // if (z == z1) {
                                   //       console.log("outwardCal m == 0 "+" z "+z+" z1 "+z1);
                                   //         notMatchinginwardBalance();
                                   //        // outwardCal()
                                   //  }//m ==0
                     
                          }//close of -1
                          loopFinishCall(z,z1);
                           // if (z == z1) {
                           //               console.log("outwardCal m == 0 "+" z "+z+" z1 "+z1);
                           //                 notMatchinginwardBalance();
                           //                // outwardCal()
                           //          }//m ==0
                }//if   if (openingBalance[i]._id.SaleCategory == inwardBalance[j]._id.SaleCategory ) {
                
                else{
                  loopFinishCall(z,z1);
                }
                 //     //console.log(" i "+i+" j "+j);
                 //     //console.log("else loop iz "+i+" j "+j+" m "+m);
                 //     if( balance.indexOf(openingBalance[i]._id.SaleCategory) == -1) {
                 //                  // m--;
                 //                   // console.log("inwardBalance[j]._id.SaleCategory "+inwardBalance[j]._id.SaleCategory)
                 //                  var obj = {};
                 //                   obj["SaleCategory"] = openingBalance[i]._id.SaleCategory;
                 //                   obj["opcount"] =  openingBalance[i].opcount;
                 //                   obj["opgwt"] = openingBalance[i].opgwt;
                 //                   obj["opgpcs"] = openingBalance[i].opgpcs;
                 //                    obj["incount"] =  0;
                 //                   obj["ingwt"] = 0;
                 //                   obj["ingpcs"] = 0;


                                  
                                 
                 //             report1.push(obj);
                 //              balance.push(openingBalance[i]._id.SaleCategory);
                      
                 //              // console.log(report1);
                 //              // if (m == 0 && j<= 0) {
                 //              //if (m == 0 ) {
                 //                loopFinishCall(z,z1);
                 //             //  if (z == z1) {
                 //             //      console.log("outwardCal m == 0 "+" z "+z+" z1 "+z1);
                              
                 //             //     notMatchinginwardBalance();
                 //             //      //console.log("outwardCal")
                 //             //     // outwardCal()
                 //             // }
                 //       }// if( balance.indexOf(openingBalance[i]._id.SaleCategory) == -1) {
                 //    loopFinishCall(z,z1);
                 //      // if (z == z1) {
                 //      //       console.log("outwardCal m == 0 "+" z "+z+" z1 "+z1);
                 //      //      notMatchinginwardBalance();
                 //      //                     // outwardCal()
                 //      //   }//m ==0
                 // }//else closer
         
        }//j
      }//i

      function   loopFinishCall(check,condition){
          if (check == condition) {
            console.log(" loopFinishCall")
           for (var i = openingBalance.length - 1; i >= 0; i--) {
        
                if( balance.indexOf(openingBalance[i]._id.SaleCategory) == -1) {
                                  // m--;
                                   // console.log("inwardBalance[j]._id.SaleCategory "+inwardBalance[j]._id.SaleCategory)
                                  var obj = {};
                                   obj["SaleCategory"] = openingBalance[i]._id.SaleCategory;
                                   obj["opcount"] =  openingBalance[i].opcount;
                                   obj["opgwt"] = openingBalance[i].opgwt;
                                   obj["opgpcs"] = openingBalance[i].opgpcs;
                                    obj["incount"] =  0;
                                   obj["ingwt"] = 0;
                                   obj["ingpcs"] = 0;


                                  
                                 
                             report1.push(obj);
                              balance.push(openingBalance[i]._id.SaleCategory);

                            }//if if( balance.indexOf(openingBalance[i]._id.SaleCategory) == -1) {
                 
                 if(i == 0){
                   notMatchinginwardBalance();
                 }

                            }//for close
           
          }//if check
          
      }//loopFinishCall

    function   notMatchinginwardBalance(){
      console.log("  notMatchinginwardBalance  notMatchinginwardBalance   notMatchinginwardBalance")
     // console.log( report1);
      //console.log(set)
      //console.log(set.size);
      //inwardBalance[j]._id.SaleCategory
      var m3 = inwardBalance.length ;
      for (var a = inwardBalance.length - 1; a >= 0; a--) {
       // console.log(inwardBalance[a]._id.SaleCategory )
        m3--;
        // console.log(set.has(inwardBalance[a]._id.SaleCategory))
         //console.log(set[a]);
          if (set.has(inwardBalance[a]._id.SaleCategory) == false) {
             // console.log(set.has(inwardBalance[a]._id.SaleCategory))
              //console.log("in side loop a "+a);
              if (inwardBalance[a]._id.SaleCategory!= "ands") {
                      var obj={}
                      obj["SaleCategory"] = inwardBalance[a]._id.SaleCategory;
                                   
                      obj["opcount"] = 0;
                      obj["opgwt"] = 0;
                      obj["opgpcs"] = 0;
                      obj["incount"] =  inwardBalance[a].incount;
                      obj["ingwt"] = inwardBalance[a].ingwt;
                      obj["ingpcs"] = inwardBalance[a].ingpcs;
                                 
                      report1.push(obj);
                    }
                      

          }
          if (m3 == 0) {
           // console.log(" m3 "+m3);
           // console.log(report1);
            outwardCal()
          }
      }
    }//notMatchinginwardBalance


   function  outwardCal() {
       console.log("call here "+outwardBalance.length);
       // console.log( outwardBalance[0]._id.SaleCategory);
          
        
      var balance2 = [];
      var m2 = report1.length;
     // for (var k = outwardBalance.length - 1; k >= 0; k--) {
      
      var m4 = outwardBalance.length *   report1.length;
      var m5 = 0;
     // console.log(" m4 m4 "+m4);                  
    for (var k = outwardBalance.length -1; k >= 0; k--) {
     // m5++;
        //  console.log("k k "+k)
          //console.log(" inwardBalance.length outwardCal "+outwardBalance.length);
           //console.log(" outwardBalance[k]._id.SaleCategory "+outwardBalance[k]._id.SaleCategory);
            // console.log( outwardBalance[0]._id.SaleCategory);
          
           setData.add(outwardBalance[k]._id.SaleCategory );
           //console.log("set setData");
           //console.log(setData);
          // console.log(report1)




          for (var n = report1.length - 1; n >= 0; n--) {
              m5++;
             console.log("n n "+n+"k k "+k+" m2 m2 "+m2+" m4 m4 "+m4+" m5 m5 "+m5)
               
            //console.log(" report1 outwardCal "+report1.length);
            //console.log(" report1[n].SaleCategory "+report1[n].SaleCategory);
              //   console.log(" outwardBalance[k]._id.SaleCategory "+outwardBalance[k]._id.SaleCategory);
            if (report1[n].SaleCategory == outwardBalance[k]._id.SaleCategory ) {

            //console.log(" if loop outwardCal ");
         
               if( balance2.indexOf(report1[n].SaleCategory) == -1) {
                     console.log(" report1[n].ingwt "+report1[n].ingwt)
                           m2--;
                       //    console.log("k k "+k+" n n "+n+" m m2 "+m2)
                      
                                  var obj = {};
                                   obj["SaleCategory"] = report1[n].SaleCategory;
                                   obj["opcount"] =  report1[n].opcount;
                                   obj["opgwt"] = report1[n].opgwt;
                                   obj["opgpcs"] = report1[n].opgpcs;
                                    obj["incount"] =  report1[n].incount;
                                   obj["ingwt"] = report1[n].ingwt;
                                   obj["ingpcs"] =report1[n].ingpcs;
                                    obj["outcount"] =  outwardBalance[k].outcount;
                                   obj["outgwt"] = outwardBalance[k].outgwt;
                                   obj["outgpcs"] =outwardBalance[k].outgpcs;
                                    obj["cbcount"] =  (report1[n].opcount + report1[n].incount)-outwardBalance[k].outcount;
                                   obj["cbgwt"] = (report1[n].opgwt + report1[n].ingwt)-outwardBalance[k].outgwt;
                                   obj["cbgpcs"] =(report1[n].opgpcs + report1[n].ingpcs)-outwardBalance[k].outgpcs;
                                   report2.push(obj);
                                    balance2.push(report1[n].SaleCategory);
                               // console.log(" if loop "+report1[n].SaleCategory);
                               //console.log(" m4 m4 "+m4+" m5 m5 "+m5);
                                // if (m2 <= 0 && n<= 0 ) {

                                  if (m4 == m5 ) {
                                  console.log("outwardCal")
                                 // outwardCal()
                                  noMatchOutwardCal()
                                // const timeoutSendResponse = setTimeout(() => {
                     
                                  // res.json(report2)
     
                                  // }, 100);
                             }
                                 
                         }//-1
             }//if   if (report1[n].SaleCategory == outwardBalance[j]._id.SaleCategory ) {
              else {
              //  console.log("else loop loop outwardCal ")
                 if( balance2.indexOf(report1[n].SaleCategory) == -1) {
                           m2--;
                          // console.log("k k "+k+" n n "+n+" m m2 "+m2)
                      
                     //      console.log(" report1[n].ingwt "+report1[n].ingwt)
                                   var obj = {};
                                   obj["SaleCategory"] = report1[n].SaleCategory;
                                   obj["opcount"] =  report1[n].opcount;
                                   obj["opgwt"] = report1[n].opgwt;
                                   obj["opgpcs"] = report1[n].opgpcs;
                                    obj["incount"] =  report1[n].incount;
                                   obj["ingwt"] = report1[n].ingwt;
                                   obj["ingpcs"] =report1[n].ingpcs;
                                      obj["outcount"] = 0;
                                   obj["outgwt"] =0;
                                   obj["outgpcs"] =0;
                                   //   obj["outcount"] =  outwardBalance[k].outcount;
                                   // obj["outgwt"] = outwardBalance[k].outgwt;
                                   // obj["outgpcs"] =outwardBalance[k].outgpcs;
                                  
                                    obj["cbcount"] =  (report1[n].opcount + report1[n].incount);
                                   obj["cbgwt"] = (report1[n].opgwt + report1[n].ingwt);
                                   obj["cbgpcs"] =(report1[n].opgpcs + report1[n].ingpcs);
                                  
                                   report2.push(obj);
                                   balance2.push(report1[n].SaleCategory);
                               // console.log(report2);
                              // console.log("else loop "+report1[n].SaleCategory);
                                // console.log(" m4 m4 "+m4+" m5 m5 "+m5);
                               
                                // if (m2 <= 0 && n<= 0 ) {
                                   if (m4 == m5 ) {
                                   //   console.log(" else outwardCal "+report2.length)
                                
                                      // res.json(report2)
                                       noMatchOutwardCal()
                                 }
                                 
                         }//-1
                          else{
                                console.log(" m4 m4 "+m4+" m5 m5 "+m5);
                                if (m4 == m5 ) {
                                      console.log(" else outwardCal "+report2.length)
                                
                                      // res.json(report2)
                                       noMatchOutwardCal()
                                 }//if m4 ==m5
                          }//else
                          // if (m4 == m5 ) {
                          //             console.log(" else outwardCal "+report2.length)
                                
                          //             // res.json(report2)
                          //              noMatchOutwardCal()
                          //        }//if m4 ==m5
                          //  console.log("completerer else loop ")
              }//else not ==

               if (m4 == m5 ) {
                                      console.log(" else outwardCal "+report2.length)
                                
                                      // res.json(report2)
                                       noMatchOutwardCal()
                                 }//if m4 ==m5
            
          }//n
         }//k
        

   }//out
    function noMatchOutwardCal(){
        console.log("match call ")
         // setOutward.add(outwardBalance[k]._id.SaleCategory );
         //  
         //   
        var m6 = outwardBalance.length ;
      for (var b = outwardBalance.length - 1; b >= 0; b--) {
        //console.log(outwardBalance[b]._id.SaleCategory )
         //console.log("set setData ");
       // console.log(setData);
       m6--;
       for (var c =  report2.length - 1; c >= 0; c--) {
          if (report2[c].SaleCategory == outwardBalance[b]._id.SaleCategory) {
            //console.log(report2[c])
           // console.log(" report2[c].SaleCategory "+report2[c].SaleCategory);
            report2[c].outcount = outwardBalance[b].outcount;
            report2[c].outgwt = outwardBalance[b].outgwt;
            report2[c].outgpcs = outwardBalance[b].outgpcs;
            report2[c].cbcount = (report2[c].opcount + report2[c].incount)-outwardBalance[b].outcount;
            report2[c].cbgwt = (report2[c].opgwt + report2[c].ingwt)-outwardBalance[b].outgwt;
            report2[c].cbgpcs = (report2[c].opgpcs + report2[c].ingpcs)-outwardBalance[b].outgpcs;
            //console.log(" after");
           //  console.log(report2[c]);
                // obj["cbcount"] =  (report1[n].opcount + report1[n].incount)-outwardBalance[k].outcount;
                //                    obj["cbgwt"] = (report1[n].opgwt + report1[n].ingwt)-outwardBalance[k].outgwt;
                //                    obj["cbgpcs"] =(report1[n].opgpcs + report1[n].ingpcs)-outwardBalance[k].outgpcs;
                                 
              // obj["outcount"] =  outwardBalance[b].outcount;
              //                      obj["outgwt"] = outwardBalance[b].outgwt;
              //                      obj["outgpcs"] =outwardBalance[b].outgpcs;
                          
          }
         
       }
        // console.log(set.has(inwardBalance[a]._id.SaleCategory))
         //console.log(set[a]);
          // if (setData.has(outwardBalance[b]._id.SaleCategory) == true) {
          //    console.log(outwardBalance[b])
          //    if (outwardBalance[b]._id.SaleCategory!= "ands") {
          //      console.log("in side loop b "+b+" outwardBalance[b]._id.SaleCategory "+outwardBalance[b]._id.SaleCategory);
          //     console.log(outwardBalance[b].outcount);
          //       console.log(outwardBalance[b]._id.SaleCategory);
          //         console.log(outwardBalance[b].outgwt);

          //             var obj={}
          //             obj["SaleCategory"] = outwardBalance[b]._id.SaleCategory;
                                   
          //             obj["opcount"] = 0;
          //             obj["opgwt"] = 0;
          //             obj["opgpcs"] = 0;
          //             // obj["incount"] = outwardBalance[b].incount;
          //             // obj["ingwt"] = outwardBalance[b].ingwt;
          //             // obj["ingpcs"] = outwardBalance[b].ingpcs;
          //               obj["outcount"] =  outwardBalance[b].outcount;
          //                          obj["outgwt"] = outwardBalance[b].outgwt;
          //                          obj["outgpcs"] =outwardBalance[b].outgpcs;
          //                          //  obj["cbcount"] =  (report1[n].opcount + report1[n].incount)-outwardBalance[k].outcount;
          //                          // obj["cbgwt"] = (report1[n].opgwt + report1[n].ingwt)-outwardBalance[k].outgwt;
          //                          // obj["cbgpcs"] =(report1[n].opgpcs + report1[n].ingpcs)-outwardBalance[k].outgpcs;
                                  
                                 
          //             report2.push(obj);
          //             //console.log(report2)
          //             console.log(obj)

          //           }
                      

          // }
          if (m6 == 0) {
           // console.log(" m6 "+m6);
            res.json(report2)
           // console.log(report1);
           // outwardCal()
          }
      }
    }// noMatchOutwardCal
} //closing
  function updateReport() {
     //openingBalanceCall();
     console.log("updateReport()")
    //fetch()
    openingBalanceCall()
    .then(function (openingBalanceData) {
      //console.log("return call");
     // console.log(openingBalanceData);
       console.log(" openingBalanceData "+openingBalanceData.length);
      return  outwardBalanceCall()
    })
    .then(function (outwardBalance) {
      console.log(" outwardBalance "+outwardBalance.length);
      console.log(outwardBalance)
      if (outwardBalance.length == 0) {
             // console.log(" in promsis outwardBalance.length == 0 ");
             var obj = { _id:{"SaleCategory": "ands"}, "opcount": "Valid" };        
                             outwardBalance.push(obj);
                             //console.log(outwardBalance);
                            // console.log( outwardBalance[0]._id.SaleCategory);
                }
      return inwardBalanceCall() 

    })
    .then(function (inwardBalance) {
      console.log("inward "+inwardBalance.length);
       if (inwardBalance.length == 0) {
             // console.log(" in promsis outwardBalance.length == 0 ");
             var obj = { _id:{"SaleCategory": "ands"}, "incount": "Valid" };        
                             inwardBalance.push(obj);
                             //console.log(outwardBalance);
                          //   console.log( inwardBalance[0]._id.SaleCategory);
                }
        return closingBalanceCall() 
    })
    
  }
updateReport();
//}// stockCntrlCall() {
//stockCntrlCall()
})


app.post('/postinventorygroupvaluenotation/:data',function(req,res)
{
    var str=req.params.data;
   
    var str_array=str.split(",");
     var NotationID=str_array[0];

     var InvGroupID=str_array[1];

     var ValueNotation=str_array[2];

     var ConversionPercentage=str_array[3];
     var Rate=str_array[4];
     var InvGroupName=str_array[5];
     var date=str_array[6];
     var update=str_array[7];
     console.log(update)
     console.log(str)

    // req.body.date = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
    // console.log(req.body[0].date4)
    // console.log(req.body[0].InvGroupID)
    //  console.log("date displayed uplokk")
   //  db.inventorygroupvaluenotationdaily.insert(req.body,function(err,doc)
   //  {
   //     console.log(doc)
   // res.json(doc);
   //  })
   if(update == "equal" ){
    console.log("update");
   db.inventorygroupvaluenotationdaily.update({"NotationID":NotationID ,"InvGroupID" :InvGroupID,"ValueNotation":ValueNotation,"ConversionPercentage":ConversionPercentage,
      "InvGroupName":InvGroupName,date:date},{$set:{"Rate":Rate}},function(err,doc)
        {
            console.log(doc)
            res.json(doc);
        })
  }else{
      console.log("insert");
    db.inventorygroupvaluenotationdaily.insert({"NotationID":NotationID ,"InvGroupID" :InvGroupID,"ValueNotation":ValueNotation,"ConversionPercentage":ConversionPercentage,
      "Rate":Rate,"InvGroupName":InvGroupName,date:date},function(err,doc)
        {
            console.log(doc)
            res.json(doc);
        })
  }


})
//merchant details
app.get('/getmerchantdetails',function(req,res)
{
   // console.log("i received a get request from index");
    db.merchantDetails.find(function(err,doc){
     //   console.log(doc);
        res.json(doc);
})
})
// app.post('/user12/:user1').success(function(response){

//     })
app.post('/user12/:data',function(req,res)
{ 
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var length = str_array.length;
    //console.log(length);
    var voucher = str_array[length - 1];
    for(var i =0;i<length - 1;i++){
    //  console.log("here is the length "+str_array[i]);
      db.transactiondetail.update({_id:mongojs.ObjectId(str_array[i])},{$set:{"voucherNo":voucher }},function(err,doc)
        {
        //res.json(doc);
        //console.log(doc)
       });
    }
    
    //console.log("voucher length "+voucher)
   // console.log('look up things syuasasdyusadsdhyasdbdfhudbasjdbashudbhdhy');
 })

app.post('/saleInvoiceInvoice/:data',function(req,res)
{ 
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var id = str_array[0];
   // console.log(length);
    var voucher = str_array[1];
    
     db.saleinvoice.update({_id:mongojs.ObjectId(id)},{$set:{"voucherNo":voucher }},function(err,doc)
        {
        res.json(doc);
        //console.log(doc)
       });
   
    
     })
app.get('/getSaleInvoicedata/:data',function(req,res){ 
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var id = str_array[0];
  
     db.saleinvoice.find({_id:mongojs.ObjectId(id),"voucherNo": { $exists: true }},function(err,doc){
        res.json(doc);
        //console.log(doc)
       });
   
    
 })

app.get('/getLoginDetails',function(req,res)
{       
   // console.log("entered into new  trans data");
    var username=req.query.username;
    var password=req.query.password;
    db.loginDetails.find({name:username,password:password},function(err,doc){ 
     
        res.json(doc);
       
    });
});



app.get('/trCollectionCreation',function(req,res){ 

   // console.log("entered into new  trans data");
    console.log("Discount Given Discount GivenDiscount getinventorygroupvaluenotation trCollectionCreation")
    //res.json("100");
    var salesIds=req.query.salesIds;
    var userIds = req.query.userIds;
    var trailRepeat = req.query.trail;
    var userIdData = null;
   // console.log("trailRepeat trailRepeat "+trailRepeat)
    if (trailRepeat  == "yes") {


    //console.log("userIds.length userIds.length "+userIds.length);
    if (userIds.length == 24) {
      userIdData = userIds ;
    }else{
       userIdData = userIds[0]
    }
    //console.log()
    var currentdate = null;
    var currentYear = null;
    var voucherType = null;
    var  vocuherNumber =null;
    var suffix = null;
    var name = null;
    var amountTotal = null;
     var concat = null;
     var billtype = null;
  
    findCall(req.query.salesIds);
    
    function findCall(argument) {
       db.saleinvoice.find({ "_id" : mongojs.ObjectId(argument)},function (err,res) {
    //console.log(res);
    //res.json(res)
     
  currentdate =  res[0].date ;
  billtype =  res[0].billtype ;
  //"billtype" : "Cash"
    currentdate = currentdate.slice(0, 10);
     //console.log( currentdate);
    
      currentYear = res[0].date.slice(0, 4);
    // console.log(currentYear);
    // console.log(res[0].Transaction);
     voucherType = res[0].Transaction;
    
     // console.log(res[0].invoiceValue);
     //console.log(res[0].voucherNo);
     vocuherNumber = res[0].voucherNo;
     suffix = res[0].voucherNo.slice(0, 2);
     name = res[0].partyname ;
     amountTotal = res[0].invoiceValue
     // console.log(suffix );
     //console.log(res[0].partyname);
     concat = "To "+res[0].partyname ;
     //console.log(concat);
     
     taxCall(res[0].tax1);
     if (billtype == "Cash") {
       if (voucherType == "RD Purchase") {
           gstCall("Cash Paid", amountTotal);
       }else{
                gstCall("Cash on hand", amountTotal);
            }
       
     }else{
        defaultBalanceSubscriber(name);
     }
   
     if (res[0].dis!=0) {
       gstCall("Discount Given",res[0].dis);
     }
     groupDetails(vocuherNumber);


   })
    }//finalCall
  trailRepeat  = "false" ; 
}//if trail
 
      // taxCall(res[0].tax1)
        
           
     // call (res[0].Transaction,)
     function defaultBalanceSubscriber(party) {
       // body...
    // console.log("defaultBalanceSubscriber call")

       db.subscribers.aggregate([
      {$match:{"subscriber" : party }},
             { "$lookup": { 
                            "from": "ledgeraccounts", 
                            "localField":   "accountName", 
                            "foreignField": "subscriber", 
                            "as": "ledger"
                         }
            },
             {$unwind:"$ledger"},
             //{$match:{"subscriber" : "Arun","ledger._id" :ObjectId("59e05d2296096c1c9c69babd")}},
              { "$project" :{ "subscriber" :1,"ledger.groupID":1,cmpTo: { $cmp: [ "$ledgerID", "$ledger._id"] }}},
              {$match:{"cmpTo" :0 }},
               { "$lookup": { 
                            "from": "subgroups", 
                            "localField":  "SGID", 
                            "foreignField": "ledger.groupID", 
                            "as": "subgroup"
                         }
            },
            {$unwind:"$subgroup"},
              { "$project" :{ "subscriber" :1,"subgroup.MGID":1,cmpTo1: { $cmp: [ "$subgroup.SGID", "$ledger.groupID"] }}},
              {$match:{"cmpTo1" :0 }},
                             { "$lookup": { 
                            "from": "maingroups", 
                            "localField":   "MGID", 
                            "foreignField": "subgroup.MGID", 
                            "as": "mggroup"
                         }
            },
             {$unwind:"$mggroup"},
              { "$project" :{ "subscriber" :1,"subgroup.MGID":1,"mggroup.MGID":1,"subgroup.SGID":1,"ledger.groupID":1,"mggroup.DefaultBalance":1 ,cmpTo2: { $cmp: [ "$subgroup.MGID", "$mggroup.MGID"] }}},
              {$match:{"cmpTo2" :0 }},
              { "$project" :{ "mggroup.DefaultBalance" :1}}
             
              
           ],function (err,result) {
        //console.log(result[0].mggroup.DefaultBalance);
         // body...
         insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,result[0].mggroup.DefaultBalance);
         // console.log("date         id     is   look       here insertCall ");
   // searchCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat)
  
       })

     }//defaultBalance
       function insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance) {
            db.trDetails.insert({voucherType:voucherType,voucherDate:currentdate,prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:vocuherNumber,
           accountId:name,amount:amountTotal,narration:concat,transType:DefaultBalance},function (err,res) {
           //  console.log(res)
           // taxCall()
          // groupDetails(vocuherNumber);
            })
       };//insertCall

        function taxCall(totalTax) {
      
          // console.log("date         id     is   look       here  taxCall "+taxCall);
   
          db.transactiondetail.find({ "_id" : mongojs.ObjectId(userIdData)},function (err,request) {
         //    db.transactiondetail.find({ "_id" : mongojs.ObjectId(req.query.userIds)},function (err,request) {
           
               //console.log("date         id     is   look       here  trCollectionCreation "+request[0].withinstatecgst);
               if(request[0].withinstatecgst != 0){
                 db.tax.find({"withinstate":"yes"},function (err, docs) {
            //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
            //res.json(docs);
           var cgstCheck = docs[0].Rate;
           //var cgstSortOrder = "CGST collected";
            var cgstSortOrder = docs[0].SaleAc;
            cgstSortOrder = cgstSortOrder.trim();
           var sgstCheck = docs[1].Rate;
         var sgstSortOrder = docs[1].SaleAc;
         sgstSortOrder = sgstSortOrder.trim();
            // var sgstSortOrder = "SGST charges collected";
           // console.log( docs[0].Rate);
           // console.log(docs[1].Rate);
           var ratioTotal = Number(cgstCheck) + Number(sgstCheck) ;
          // console.log( ratioTotal +"ratioTotal");
           // cgst sgst calculation
           // var a = 23.456667;
           // a = a.toFixed(2);
           //  console.log( a);
           var total = totalTax;
           var cgst = ((total)*(cgstCheck/ratioTotal));
           // console.log( cgst);
           var sgst = (total*(sgstCheck/ratioTotal));
            // gstCall("CGST collected",cgst);
            // gstCall("SGST charges collected",sgst );
            if (voucherType != "RD Purchase") {
                 gstCall(cgstSortOrder,cgst);
                 gstCall(sgstSortOrder,sgst );
            }else if(voucherType == "RD Purchase"){
                 gstCall("CGST paid",cgst);
                 gstCall("SGST Paid",sgst);  
            }
             
           

        });
            //}

    }else{
       db.tax.find({"outofstate":"yes"},function (err, docs) {
            //console.log(docs);db.tax.find({"withinstate":"yes"}).pretty()
            //res.json(docs);
           // var igstCheck = docs[0].Rate;
            
            if (voucherType != "RD Purchase") {
                 gstCall("IGST collected",docs[0].Rate);
            }else if(voucherType == "RD Purchase"){
                 gstCall("IGST collected",docs[0].Rate);
            }
            //console.log( docs[0].Rate)
        });

    }//ele
  })//transactiondetail
}//taxCall

  function gstCall(gst,gstamount) {
   // console.log("receivej receivej receivej "+receivej)
  db.ledgeraccounts.aggregate([
      {$match:{"sortOrder" : gst }},
       { "$lookup": { 
                            "from": "maingroups", 
                            "localField":   "MGID", 
                            "foreignField": "alias", 
                            "as": "mggroup"
                         }
            },
             {$unwind:"$mggroup"},
              { "$project" :{ "sortOrder" :1, "accountName" :1,"mggroup.MGID":1,"mggroup.MGID":1,"MGID":1,"mggroup.DefaultBalance":1,cmpTo: { $cmp: [ "$alias", "$mggroup.MGID"] }}},
              {$match:{"cmpTo" :0 }},

             
              
           ],function (err,response) {
            //console.log(response[0].mggroup.DefaultBalance);
            // console.log(response[0].accountName);
            // console.log(response[0].sortOrder);
           var  narration = "To "+response[0].sortOrder ;
           // var  narration = "To " ;
         
         // gstInsertCall()
         gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,gstamount,narration,response[0].mggroup.DefaultBalance,response[0].accountName) 
       
             // body...
           })
}//gstcall

//(argument) {
  // body...
 function gstInsertCall  (currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance,accountName) {
            db.trDetails.insert({voucherType:voucherType,voucherDate:currentdate,prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:vocuherNumber,
           accountId:accountName,amount:amountTotal,narration:concat,transType:DefaultBalance},function (err,res) {
           //  console.log(res)
           
            })
}//gstInsertCall
 function groupDetails(argument) {
   // body...
    if(voucherType.toUpperCase().match(/SALE/g)  == "SALE"){
    //alert("Sale ")
    db.transactiondetail.aggregate([
      {$match:{"voucherNo" :argument  }},
       { "$lookup": { 
                            "from": "inventorygroupmaster", 
                            "localField":   "SalesAcc", 
                            "foreignField":  "AccNo", 
                            "as": "inventorygroup"
                         }
            },
             {$unwind:"$inventorygroup"},
              {$unwind:"$inventorygroup.SalesAcc"},
        
            { "$project" :{ "AccNo":1,  "taxval":1,"inventorygroup.SalesAcc.AccNo" :1,cmpTo: { $cmp: [ "$inventorygroup.SalesAcc.AccNo", "$AccNo"] }}},
           {$match:{"cmpTo" :0 }},
            {$group:{_id:{name:"$AccNo",name1:"$inventorygroup.SalesAcc.AccNo"},"score" : {$sum : "$taxval"}}}
        
             
              
           ],function (err,res) {
             
             for (var j = res.length - 1; j >= 0; j--) {
                 gstCall(res[j]._id.name,res[j].score)
                 if ( j == 0) {
                // console.log("trHeader j"+j);
                  trHeader()
                 }
             }
             
           
            })
    }else if(voucherType.toUpperCase().match(/PURCHASE/g) == "PURCHASE"){
          db.transactiondetail.aggregate([
      {$match:{"voucherNo" :argument  }},
         { "$lookup": { 
                            "from": "inventorygroupmaster", 
                            "localField":   "PurchaseAcc" , 
                            "foreignField":  "AccNo", 
                            "as": "inventorygroup"
                         }
            },
             {$unwind:"$inventorygroup"}, 
            
              {$unwind:"$inventorygroup.PurchaseAcc"},
        
            { "$project" :{ "AccNo":1,  "taxval":1,"inventorygroup.PurchaseAcc.AccNo" :1,cmpTo: { $cmp: [ "$inventorygroup.PurchaseAcc.AccNo", "$AccNo"] }}},
           {$match:{"cmpTo" :0 }},
            {$group:{_id:{name:"$AccNo",name1:"$inventorygroupPurchaseAcc.AccNo"},"score" : {$sum : "$taxval"}}}
             
              
           ],function (err,res) {
             
             for (var j = res.length - 1; j >= 0; j--) {
                 gstCall(res[j]._id.name,res[j].score)
                 if ( j == 0) {
                   console.log("trHeader j"+j);
                  trHeader()
                 }
             }
             
           
            })
    }

  
 
}//groupcall


 function trHeader() {
   console.log("trHeader call")
   const timeoutObj = setTimeout(() => {
     
      db.trDetails.find({vocuherNumber:vocuherNumber},(function(err,doc){
        res.json(doc);
           console.log("voucherType voucherType voucherType voucherType voucherType "+voucherType)
           console.log(doc);
          db.trHeaders.insert({voucherType:voucherType,voucherDate:currentdate,prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:vocuherNumber,
                amount:amountTotal,numberOfDetails:doc.length},function (err,res) {
                
          })
        
      }))
    }, 3000);
 }
// clearTimeout();
//}


});//trCollectionCreation
//}
//checkcall()

app.get('/reportResult/:data',  function (req, res) {
    console.log("receiveonedate receiveonedate receiveonedatereportonedate")
    var  printary = [];
      var lengthitemNamesort = null;
      var printfinalary = [];
      

     console.log(req.params.data);
      var str=req.params.data;
   // console.log(str);
    var reportdata = str.split(",");
    var transaction =reportdata[0];
    var barcode =reportdata[1];
    var  weight =reportdata[2];
    var report =reportdata[3];
    var report1 =reportdata[3];
    var reportdate =reportdata[4];

    var remainingItems = [];

     var orderSort1 = reportdata[5];
      var orderSort2 = reportdata[6];
      var orderSort3 = reportdata[7];
      var orderSort4 = reportdata[8];
     orderSort1 = orderSort1.toLowerCase();
     var sortA  = "$"+orderSort1;
     orderSort2 = orderSort2.toLowerCase();
     var sortB = "$"+orderSort2;
     orderSort3 = orderSort3.toLowerCase();
     var sortC = "$"+orderSort3;
     orderSort4 = orderSort4.toLowerCase();
    var sortD  = "$"+orderSort4;
    if (orderSort1 == "salecty") {
        console.log(" orderSort2 orderSort2 orderSort2 "+orderSort2)
        sortA = "$salesCtg";
    }
    if (orderSort2 == "salecty") {
        console.log(" orderSort2 orderSort2 orderSort2 "+orderSort2)
        sortB = "$salesCtg";
    }
    if (orderSort3 == "salecty") {
        console.log(" orderSort2 orderSort2 orderSort2 "+orderSort2)
        sortC = "$salesCtg";
    }
    if (orderSort4 == "salecty") {
        console.log(" orderSort2 orderSort2 orderSort2 "+orderSort2)
        sortD = "$salesCtg";
    }
      console.log("  orderSort1  "+orderSort1+" orderSort2 "+orderSort2+"  orderSort3  "+orderSort3+" orderSort4 "+orderSort4)
       console.log("  sortA  "+sortA+" sortB "+sortB+"  sortC  "+sortC+" sortD "+sortD)

//      var sortA =  "$group";
// var sortB = "$purity";
// var sortC = "$item";
// var sortD = "$salesCtg";
    console.log(" reportdate reportonedate reportonedate reportdate  "+reportdate)
 // function document() {
  db.transactiondetail.aggregate([
                // {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:("2017-04-01T00:00:00.000Z"), $lt: ("2017-11-01T00:00:00.000Z") }}},
                   {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
               // {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: ("2017-11-01T00:00:00.000Z") }}},
               
                 
                 { "$lookup": { 
                            "from": "items", 
                            "localField":   "Name", 
                            "foreignField":  "itemName", 
                            "as": "itemDetailsFetch"
                         }
        },
        {$unwind:"$itemDetailsFetch"},
        { "$project" :{ "gpcs" :1,"gwt":1,"purity":1,"itemName":1,"itemDetailsFetch.Name":1 ,"itemDetailsFetch.SaleCategory":1 ,"itemDetailsFetch.InvGroupName":1 ,
          cmpTo2: { $cmp: [ "$itemName", "$itemDetailsFetch.Name"] }
                }},
        {$match:{"cmpTo2" :0 }},
              
              
                {$group:{_id :{purity:"$purity",itemName:"$itemName",Group:"$itemDetailsFetch.InvGroupName",saleCategory:"$itemDetailsFetch.SaleCategory"} ,rccPcs:{$sum:"$gpcs"},rccQty:{$sum:"$gwt"}}},
                                         
              { $sort : {  "_id.saleCategory" : 1,"_id.Group" : 1,  "_id.itemName" : 1, "_id.purity" : 1, } }  
                 ],function (err,result) {
                 // console.log(result[0]._id.purity);
                remainingItems =result;
                 console.log("remainingItems "+remainingItems.length);
                   // body...
                   db.transactiondetail.aggregate([
                //  {$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:("2017-04-01T00:00:00.000Z"), $lt: ("2017-11-01T00:00:00.000Z") }}},
                     {$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: (reportdate) }}},
               //  {$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: ("2017-11-01T00:00:00.000Z") }}},
               
                 
                 { "$lookup": { 
                            "from": "items", 
                            "localField":   "Name", 
                            "foreignField":  "itemName", 
                            "as": "itemDetailsFetch"
                         }
        },
        {$unwind:"$itemDetailsFetch"},
        { "$project" :{ "gpcs" :1,"gwt":1,"purity":1,"itemName":1,"itemDetailsFetch.Name":1 ,"itemDetailsFetch.SaleCategory":1 ,"itemDetailsFetch.InvGroupName":1 ,
          cmpTo2: { $cmp: [ "$itemName", "$itemDetailsFetch.Name"] }
                }},
        {$match:{"cmpTo2" :0 }},
              
              
                {$group:{_id :{purity:"$purity",itemName:"$itemName",Group:"$itemDetailsFetch.InvGroupName",saleCategory:"$itemDetailsFetch.SaleCategory"} ,issPcs:{$sum:"$gpcs"},issQty:{$sum:"$gwt"}}},
                { $sort : { "_id.saleCategory" : 1,"_id.Group" : 1,  "_id.itemName" : 1, "_id.purity" : 1, } }  
                                         
              
                 ],function (err,result1) {
                    console.log("result "+result1.length);
                  if (result1.length == 0 && remainingItems.length == 0) {
                       console.log(m+""+z+" 00000  final send");
                       res.json(result1);
                  }
                  // console.log(result1.length);//issPcs
                  //  console.log(result.length);
                 // console.log(result1[0]._id.purity);
                 var report1 =[];
                  var totQty = 0;
                  var totPcs = 0;
                 var ciQty = 0;
                var ciPcs = 0;
              // var mySet = new Set();
                  for (var z = result.length - 1; z >= 0; z--) {
                  
                        for (var m = result1.length - 1; m >= 0; m--) {
              //  set.add(result[z]._id.itemName );

                            if (result1[m]._id.purity == result[z]._id.purity && result1[m]._id.itemName == result[z]._id.itemName  && result1[m]._id.Group == result[z]._id.Group   ) {
                              //console.log(result1[m]._id.purity+" "+result1[m]._id.itemName+" "+result1[m]._id.Group );
                             //  mySet.add({purity:result[z]._id.purity,itemName:result[z]._id.itemName,Group:result[z]._id.Group});
                            //   var r = z;
                              
                                // console.log("remainingItems "+remainingItems.length);
                               var obj = {};
                                   obj["item"] = result1[m]._id.itemName;
                                   // obj["opQty"] = opQty;
                                   // obj["opPcs"] = opPcs;
                                 // ,rccPcs:{$sum:"$gpcs"},rccQty:{$sum:"
                                   obj["rcvQty"] =  result[z].rccQty;
                                   obj["rcvPcs"] = result[z].rccPcs;
                                   obj["totQty"] = result[z].rccQty;
                                   obj["totPcs"] = result[z].rccPcs;
                                   obj["issQty"] = result1[m].issQty;
                                   obj["issPcs"] = result1[m].issPcs;
                                   obj["ciQty"] = (result[z].rccQty - result1[m].issQty );
                                   obj["ciPcs"] = (result[z].rccPcs - result1[m].issPcs );
                                   obj["group"] = result1[m]._id.Group;
                                   obj["purity"] = result1[m]._id.purity;
                                   obj["salesCtg"] = result1[m]._id.saleCategory;
                                   report1.push(obj);
                                   //console.log(report1);
                                   remainingItems = remainingItems.filter((item) => item !== result[z]);
                                   //console.log(remainingItems)
                                  console.log("remainingItems "+remainingItems.length);
                                    // delete remainingItems[r]
                            }
                            if (m==0 && z == 0) {
                              console.log(m+""+z)
                            //  res.json(report1);
                            //   sendResponse()
                              addNoRepeatItems()
                            }//if m==0 
                        }//for m
                  }//fork
                  function addNoRepeatItems() {
                    console.log("addNoRepeatItems");
                    // console.log(remainingItems)

                      //console.log("remainingItems "+remainingItems.length);
                     for (var z = result.length - 1; z >= 0; z--) {
                  
                        for (var m = remainingItems.length - 1; m >= 0; m--) {
              //  set.add(result[z]._id.itemName );

                            if (remainingItems[m]._id.purity == result[z]._id.purity && remainingItems[m]._id.itemName == result[z]._id.itemName  && remainingItems[m]._id.Group == result[z]._id.Group   ) {
                              //console.log(result1[m]._id.purity+" "+result1[m]._id.itemName+" "+result1[m]._id.Group );
                             //  mySet.add({purity:result[z]._id.purity,itemName:result[z]._id.itemName,Group:result[z]._id.Group});
                            //   var r = z;
                              
                                // console.log("remainingItems "+remainingItems.length);
                               var obj = {};
                                   obj["item"] = remainingItems[m]._id.itemName;
                                   // obj["opQty"] = opQty;
                                   // obj["opPcs"] = opPcs;
                                 // ,rccPcs:{$sum:"$gpcs"},rccQty:{$sum:"
                                   obj["rcvQty"] =  remainingItems[m].rccQty;
                                   obj["rcvPcs"] = remainingItems[m].rccPcs;
                                   obj["totQty"] = remainingItems[m].rccQty;
                                   obj["totPcs"] = remainingItems[m].rccPcs;
                                   obj["issQty"] = 0;
                                   obj["issPcs"] = 0;
                                   obj["ciQty"] = remainingItems[m].rccQty; 
                                   obj["ciPcs"] = remainingItems[m].rccPcs;
                                   obj["group"] = remainingItems[m]._id.Group;
                                   obj["purity"] = remainingItems[m]._id.purity;
                                   obj["salesCtg"] = remainingItems[m]._id.saleCategory;
                                   report1.push(obj);
                                   //console.log(report1);
                                  
                            }
                            if (m==0 && z == 0) {
                              console.log(m+""+z+" final send")
                             // res.json(report1);
                              db.trail.insert(report1,function(err,doc)
    {
  // res.json(doc);
  //var sort10 = "group";
//  var sort_order = {};

// sort_order[ "group" ] = 1;
//  // db.trail.aggregate([ { $sort : {sort10:1,item:1,purity:1,salesCtg:1}}
//   db.trail.find(  {sort: sort_order}
//  var sortA =  "$group";
// var sortB = "$purity";
// var sortC = "$item";
// var sortD = "$salesCtg";
db.trail.aggregate([
  //{$group:{_id :{purity:"$purity",itemName:"$itemName",Group:"$itemDetailsFetch.InvGroupName",saleCategory:"$itemDetailsFetch.SaleCategory"} ,rccPcs:{$sum:"$gpcs"},rccQty:{$sum:"$gwt"}}},
     {$group:{_id :{sort1:sortA,sort2:sortB,sort3:sortC,sort4:sortD} ,ciPcs:{$sum:"$ciPcs"},ciQty:{$sum:"$ciQty"}
     ,issPcs:{$sum:"$issPcs"},issQty:{$sum:"$issQty"} 
     ,rcvPcs:{$sum:"$rcvPcs"},rcvQty:{$sum:"$rcvQty"}
     }},
      
   { $sort : {  "_id.sort1":1,"_id.sort2":1,"_id.sort3":1,"_id.sort4":1,}}
],function(err,doc){
    res.json(doc);
     db.trail.remove({});
  })//find
    })

                            //   sendResponse()
                              //addNoRepeatItems()
                            }//if m==0 
                        }//for m
                  }//fork

                  }//addNoRepeatItems
                  function sendResponse() {
                    // body...
                     const timeoutSendResponse = setTimeout(() => {
                     // res.json(report1);
                      sendResponseInsert() 
     
                    }, 100);// timeoutSendResponse
                  }//sendResponse
                 function sendResponseInsert() {  
                    for(var k = 0;k< report1.length;k++){
                        
                          if( printary.indexOf(report1[k].group) == -1) {
                                 // alert("entered to remove duplicates ")
                               var obj3 = {};
                                obj3["group"] = report1[k].group;
                            
                                 
                                   
                                 printary.push(report1[k].group);
                                  printfinalary.push(obj3)
                                 // console.log(printary)
                                  //  alert(arrcon)
                         }
                          // obj["salesCtg"] = report1[k].salesCtg;
                     if( printary.indexOf(report1[k].salesCtg) == -1) {
                                 // alert("entered to remove duplicates ")
                               var obj3 = {};
                                obj3["salesCtg"] = report1[k].salesCtg;
                            
                                 
                                   
                                 printary.push(report1[k].salesCtg);
                                  printfinalary.push(obj3)
                                 // console.log(printary)
                                  //  alert(arrcon)
                         }
                         if( printary.indexOf(report1[k].purity) == -1) {
                         // alert("entered to remove duplicates ")
                           var obj3 = {};
                           
                            obj3["purity"] = report1[k].purity;
                            printary.push(report1[k].purity);
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
                           console.log(printfinalary)
                          // $scope.reportonedate1 =printfinalary;
                            console.log(" x4 = yield ");
                           //  alert(arrcon)
                         }else{
                                   var obj = {};
                                   obj["item"] = report1[k].item;
                                   obj["opQty"] = report1[k].opQty;
                                   obj["opPcs"] = report1[k].opPcs;
                                   obj["rcvQty"] = report1[k].rcvQty;
                                   obj["rcvPcs"] = report1[k].rcvPcs;
                                   obj["totQty"] = report1[k].totQty;
                                   obj["totPcs"] = report1[k].totPcs;
                                   obj["issQty"] = report1[k].issQty ;
                                   obj["issPcs"] = report1[k].issPcs;
                                   obj["ciQty"] = report1[k].ciQty;
                                   obj["ciPcs"] = report1[k].ciPcs;
                                  // obj["salesCtg"] = report1[k].salesCtg;
                    
                                   printfinalary.push(obj)
                                       console.log(printfinalary)
                                   //  $scope.reportonedate1 =printfinalary;
                                     // console.log(" x4 = yield ");

                              }
                            if ( k == report1.length-1) { 
                              sendResponseCallFinal()
                            }//k == report1.length-1
                       }//for loop
                         function sendResponseCallFinal() {
                         const timeoutSendData = setTimeout(() => {
                            res.json(printfinalary);
                          // sendResponseInsert() 
     
                         }, 100);
                       }
                     }//responseInsert

                 } );
                 });
//}
 //document()

  }) //reportResult
//groupWiseControllers
app.get('/groupWiseHeaders',function(req,res){
   db.inventorygroupmaster.find({}).sort({"sortOrder" :1},function(err,doc)
    {
        res.json(doc);
        //console.log(doc);
    })
 
})
function testCall() {
  console.log("testCall")
  var sort_order = {};

sort_order[ "group" ] = 1;
 // db.trail.aggregate([ { $sort : {sort10:1,item:1,purity:1,salesCtg:1}}
  db.trail.aggregate([ { $sort : { sort_order}}]
    //   {$group:{_id :{purity:"$purity",itemName:"$itemName",Group:"$itemDetailsFetch.InvGroupName",saleCategory:"$itemDetailsFetch.SaleCategory"} ,rccPcs:{$sum:"$gpcs"},rccQty:{$sum:"$gwt"}}},
          
 //articles.find({}, {sort: sort_order, limit: 1});
 ,function(err,doc){
  console.log(doc)
   // res.json(doc);
  })//find
   // })
  // body...
}
//testCall()
//for dumy
// app.get('/dummygroupWiseHeaders',function(req,res){
//    db.inventorygroupmaster_copy.find({}).sort({"sortOrder" :1},function(err,doc)
//     {
//         res.json(doc);
//         //console.log(doc);
//     })
 
// })
app.get('/getGroupWisePreview',function(req,res){

  console.log(" getGroupWisePreview   req.query.fromdate "+ req.query.fromdate)
 // var  req.query.fromdate ;
 //  req.query.todate ;
 //  req.query.previousDate ;

  //var previousDate = req.query.previousDate ;
   var samedateStart = req.query.fromdate;
  var samedateEnd =  req.query.todate ;
  var Weight =  req.query.Wt ;

  //"$ntwt"
  var weigthCondition = null;
  if ("NettWt" ==  req.query.Wt ) {
    console.log("ntwt ntwt  "+req.query.Wt);
    weigthCondition = "$ntwt";
  }else{
     console.log("gwt gwt "+req.query.Wt);//"$gwt"
     weigthCondition = "$gwt";
  }
   var Transaction =  req.query.Transaction ;
  
 // let set = new Set();
  var array = [];
 // console.log("req.query.fromdate "+req.query.fromdate+"  req.query.todate "+ req.query.todate+" wt "+req.query.Wt);
 // db.transactiondetail.aggregate([])
    db.transactiondetail.aggregate([
      {$match:
      {date: { $gt:(req.query.fromdate), $lt: (req.query.todate) },
       "Transaction" : req.query.Transaction,
      //refid: { $exists: true },
     // "TransactionClass" : "Sale"
  
      },
},
{ "$lookup": { 
        "from": "inventorygroupmaster", 
        "localField": "InvGroupName", 
        "foreignField": "InvGroupName", 
        "as": "collection2_doc"
    }}, 
  { "$unwind": "$collection2_doc" },
    { "$redact": { 
        "$cond": [
            { "$eq": [ "$InvGroupName", "$collection2_doc.InvGroupName" ] }, 
            "$$KEEP", 
            "$$PRUNE"
        ]
    }},
    { "$lookup": { 
        "from": "transactionSeriesInvoice", 
        "localField": "TransactionType", 
        "foreignField": "Transaction", 
        "as": "collection3_doc"
    }}, 
  { "$unwind": "$collection3_doc" },
    { "$redact": { 
        "$cond": [
            { "$eq": [ "$Transaction", "$collection3_doc.TransactionType" ] }, 
            "$$KEEP", 
            "$$PRUNE"
        ] 
    }},
  {
         $project:
           { "Transaction":1,"date":1,gwt:1,ntwt:1,"collection3_doc.TransactionClass":1,"InvGroupName":1,"collection2_doc.sortOrder":1,}
       },
                   
          {
         $group:
        //  {_id: { Class:"$collection3_doc.TransactionClass","sortOrder":"$collection2_doc.sortOrder","Transaction":"$Transaction","InvGroupName":"$InvGroupName"},opgwt:{$sum:weigthCondition} ,opntwt:{$sum:"$ntwt"}}
        {_id: { Class:"$collection3_doc.TransactionClass","sortOrder":"$collection2_doc.sortOrder","Transaction":"$Transaction","InvGroupName":"$InvGroupName"},opgwt:{$sum:weigthCondition} ,opntwt:{$sum:"$ntwt"}}
    
       },         
                    
  { $sort : {  "_id.Class":-1,"_id.Transaction":-1,"_id.sortOrder":-1}}
  
      ],function(err,doc){

      // console.log("doc.length "+doc.length)
           db.inventorygroupmaster.find({}).sort({"sortOrder" :1},function(err,result){
        //    db.inventorygroupmaster.find({}).sort({"sortOrder" :1},function(err,result){
          
          for (var j =0 ,len = result.length-1 ; j <= len; j++) {

              //  console.log(" result[j].sortOrder "+ result[j].sortOrder) 
                if(doc.length == 0){
               //   console.log(req.query.Transaction);
                  if (j == 0) {
                    array.push({
                   'Transaction':req.query.Transaction,
                  'sort':[]
                 })
                  }//j0
                 // if (i == len1 ) {
                          // console.log("len1"+result[j].sortOrder)
                           array[0].sort.push({"InvGroupName":result[j].InvGroupName,"opgwt":"","sortOrder":result[j].sortOrder});
                          // console.log(array)
                      //  }

                  if ( (len+1) == array[0].sort.length) {
                      //  console.log("array[0].sort.length "+array[0].sort.length+" len result[j].sortOrder "+result[j].sortOrder+" j "+j)
                           res.json(array)
                       }
                }else{
             for (var i =0,len1 = doc.length - 1 ; i <= len1 ; i++) {
                //console.log("result[j].InvGroupName "+result[j].InvGroupName+" doc[i]._id.InvGroupName "+doc[i]._id.InvGroupName);
                  if (j == 0 && i ==0) {
                    array.push({
                   'Transaction':doc[i]._id.Transaction,
                   'class':doc[i]._id.Class,
                   'sort':[]
                 })
                  }

                if (result[j].sortOrder == doc[i]._id.sortOrder) {
                 
                        array[0].sort.push({"InvGroupName":doc[i]._id.InvGroupName,"opgwt":doc[i].opgwt,"sortOrder":doc[i]._id.sortOrder});
                        if (j == len) {
                          res.json(array)
                        }
                      break;
                }else{
                        
                        if (i == len1 ) {
                          // console.log("len1"+result[j].sortOrder)
                           array[0].sort.push({"InvGroupName":result[j].InvGroupName,"opgwt":"","sortOrder":result[j].sortOrder});
                          // console.log(array)
                        }
                       //if (j == len) {
                       if ( (len+1) == array[0].sort.length) {
                        //console.log("array[0].sort.length "+array[0].sort.length+" len result[j].sortOrder "+result[j].sortOrder+" j "+j)
                           res.json(array)
                       }
                    }//else close   if (result[j].sortOrder == doc[i]._id.sortOrder) {
                 
             }//i
           }// if(doc.length == 0){
          }//for j

        })//db.inventory
      
        // for (var i =0 ; i <= doc.length - 1; i++) {
        //   //console.log(doc[i])

        //   if (i == 0) {

        //      array.push({
        //        'Transaction':doc[i]._id.Transaction,
        //        'class':doc[i]._id.Class,
        //        'sort':[{"InvGroupName":doc[i]._id.InvGroupName,"opgwt":doc[i].opgwt,"sortOrder":doc[i]._id.sortOrder}]
        //       })
        //       set.add(doc[i]._id.InvGroupName)
        //       if (i == doc.length - 1 ) {
        //              // res.json(array)
        //             // finalDisplayCall()
        //           }//
        //   } 
        //   else {
            
        //           array[0].sort.push({"InvGroupName":doc[i]._id.InvGroupName,"opgwt":doc[i].opgwt,"sortOrder":doc[i]._id.sortOrder});
        //           // console.log(array) 
        //            set.add(doc[i]._id.InvGroupName)
        //           if (i == doc.length - 1 ) {
        //              // res.json(array)
        //             // finalDisplayCall()
        //           }//if
           
        //      }//else closer
        // }//for

       
    })//db
    
})
// get all data/stuff of the body (POST) parameters

// var port = process.env.PORT || 8090;
// app.listen(port)
// console.log("server running on port 8090")
//app.listen(9000);
//console.log("server running on port 9000");
var db1 = require('./config/db');

//var port = process.env.PORT || 9000; // set our port

mongoose.connect(db1.url, function(err, db) {
  if (err) {
    console.log("Connection to Database Failed");
    throw err;
  }
  console.log("Connected to Database");
});




app.use(bodyParser.json({limit: '20mb'})); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));// parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/subscriber_images'));

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes
//require('./app/rout')(app);
// start app ===============================================
app.listen(4000); 
//console.log('Listening on port ' + port);       // shoutout to the user
console.log("server running on port 4000");
exports = module.exports = app;
/* using the express library for requests for mongodb database */
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var mongoose  = require('mongoose');
var db=mongojs('inventory200',['user','tags','transaction','saleInvoice','mode','transactionDetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barCodeSummary','stockPointMaster','configurations','inventoryGroupMaster','salesCategoryMaster','itemType','taxrate',
  'items','tax','taxation','inventoryGroupValueNotationDaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails','trail','staff','receipts','cardType']);


var bodyParser=require('body-parser');


//var app            = express();
//var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bson = require('bson');
var Promise = require('es6-promise').Promise;
var Decimal128 = require('mongodb').Decimal128;
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/getPartyName:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
     db.subscribers.find({"subscriber": taxnamee},function(err,doc){     
      
        res.json(doc);
})
})

app.get('/countdata',function(req,res){
   db.barCodeSummary.find({}).sort({_id:-1}).limit(1,function(err,doc){
        res.json(doc);
       
    })
  
})

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
    db.barCodeSummary.find({status:"Inprogress"}).sort({_id:-1},function(err,doc){
        //console.log(doc); db.barCodeSummary.find({status:"completed"})
        res.json(doc);
})

     })



// prn file generation

app.post('/prn',function(req,res){
  console.log("prn function prn function")
  var ItemName =req.body.itemName;
  console.log(" req.body.SaleCategory req.body.SaleCategory "+req.body.SaleCategory); 
   // var path = 'sample/prntext.txt';
   // var path1 = 'sample/prnfile.prn';
   // var a = 'prntext.txt';
   // var b = 'prnfile.prn';
   // db.salesCategoryMaster.find({"SaleCategoryType" : req.body.SaleCategory},function(err,doc){
     var str = req.body.SaleCategory;
     str = str.trim();
    console.log(str.trim());
    db.salesCategoryMaster.find({"SaleCategoryType" :str},function(err,doc){
    
        console.log(" req.body.SaleCategory "+req.body.SaleCategory); //db.barCodeSummary.find({status:"completed"})
        res.json(doc);
        console.log("doc.PrnFileName "+doc[0].PrnFileName)
        console.log("doc.PrnTemplate "+doc[0].PrnTemplateName)
    //})
   // var a = 'BC_BangalesTemplate.txt';
   // var b = 'BC_Bangales.prn';
   //var a = doc[0].PrnTemplateName;
   //var b = doc[0].PrnFileName;
   var a = doc[0].PrnFileName;
   //var b = doc[0].PrnFileName;

   var path = 'Data/PrnFiles/Templates/'+a;
    //var path = 'Data/PrnFiles/BC_BangalesTemplate.txt';
   //var path1 = 'Data/PrnFiles/Files/'+b;
    var path1 = 'Data/PrnFiles/prnfile.prn';
  // if(ItemName == "Big Chain"){
  //   var path = 'sample/prntext.txt';
  //   var path1 = 'sample/prnfile.prn';
  // } else if(ItemName == "Bangales"){
  //   var path = 'sample/prnbangalestext.txt';
  //   var path1 = 'sample/prnbangalesfile.prn';
  // }else if(ItemName == "Gold Ring"){
  //   var path = 'sample/prngoldringtext.txt';
  //   var path1 = 'sample/prngoldringfile.prn';
  // }
  

  var http = require('http');
  fs = require('fs')
  fs.readFile(path, 'utf8', function (err,data) {
      if (err) {
         return console.log(err);
      }
    // var ItemName =req.body.itemName;
    // var barcode = req.body.barcode;
    // var result = data.replace(/Item NameOrCategory/g, ItemName);
    // var result1 =result.replace(/12345678/g, barcode);
    //  console.log(req.body.chgunt);
  console.log(req.body.barcode);
  //console.log(req.body.iname);
  var ItemName =req.body.itemName;
  var barcode = req.body.barcode;
  var Charge1Total =req.body.taxval1;
  var GrossQty =req.body.gwt;
  var ChargableUnits =req.body.chgunt;
  if (req.body.desc == undefined) {
      //console.log(" iam undfhdf desc "+req.body.desc);
      req.body.desc = '';
  };
  if (req.body.size == undefined) {
      //console.log(" iam undfhdf desc "+req.body.desc);
      req.body.size = '';
  };
  if (req.body.stwt == undefined) {
      req.body.stwt = '';
  };
  if (req.body.pctcal == undefined) {
      req.body.pctcal = '';
  };
  if (req.body.wastage == undefined) {
      req.body.wastage = '';
  };
  if (req.body.matadj == undefined) {
      req.body.matadj = '';
  };
  if (req.body.mrp == undefined) {
      req.body.mrp = '';
  };
  if (req.body.rate == undefined) {
      req.body.rate = '';
  };
  if (req.body.labcal == undefined) {
      req.body.labcal = '';
  };
  if (req.body.labamt == undefined) {
      req.body.labamt = '';
  };
  if (req.body.labval == undefined) {
      req.body.labval = '';
  };
  if (req.body.stonecal == undefined) {
      req.body.stonecal = '';
  };
  if (req.body.stchg == undefined) {
      req.body.stchg = '';
  };
  if (req.body.stval == undefined) {
      req.body.stval = '';
  };

    var result = data.replace(/StockBookDetail.itemName/g, req.body.itemName);
    var result1 =result.replace(/StockBookDetail.barcode/g, req.body.barcode);
    var result2 =result1.replace(/StockBookDetail.barcode/g, req.body.barcode);
    var result3 =result2.replace(/StockBookDetail.desc/g, req.body.desc);
    var result4 =result3.replace(/StockBookDetail.size/g, req.body.size);
    var result5 =result4.replace(/StockBookDetail.purity/g, req.body.purity);
    var result6 =result5.replace(/StockBookDetail.gwt/g, req.body.gwt);
    var result7 =result6.replace(/StockBookDetail.gpcs/g, req.body.gpcs);
    var result8 =result7.replace(/StockBookDetail.stwt/g, req.body.stwt);
    var result9 =result8.replace(/StockBookDetail.uom/g, req.body.uom);
    var result10 =result9.replace(/StockBookDetail.ntwt/g, req.body.ntwt);
    var result11 =result10.replace(/StockBookDetail.pctcal/g, req.body.pctcal);
    var result12 =result11.replace(/StockBookDetail.wastage/g, req.body.wastage);
    var result13 =result12.replace(/StockBookDetail.matadj/g, req.body.matadj);
    var result14 =result13.replace(/StockBookDetail.chgunt/g, req.body.chgunt);
    var result15 =result14.replace(/StockBookDetail.mrp/g, req.body.mrp);
    var result16 =result15.replace(/StockBookDetail.rate/g, req.body.rate);
    var result17 =result16.replace(/StockBookDetail.labcal/g, req.body.labcal);
    var result18 =result17.replace(/StockBookDetail.labamt/g, req.body.labamt);
    var result19 =result18.replace(/StockBookDetail.labval/g, req.body.labval);
    var result20 =result19.replace(/StockBookDetail.stonecal/g, req.body.stonecal);
    var result21 =result20.replace(/StockBookDetail.stchg/g, req.body.stchg);
    var result22 =result21.replace(/StockBookDetail.stval/g, req.body.stval);
    var result23 =result22.replace(/StockBookDetail.taxval/g, req.body.taxval);  


      fs.writeFile(path1, result23, 'utf8', function (err) {
           if (err) return console.log(err);

     //this for batch file and print command
             // require('child_process').exec(__dirname + "/batchfile.bat", function (err, stdout, stderr) {
              require('child_process').exec(__dirname + "/batchfile.bat", function (err, stdout, stderr) {
                    
                   if (err) {
                     return console.log(err);
                    }
                    console.log(" print calls here ")
                    //setTimeout(deleteFileCall, 2000);
                    // function deleteFileCall(){
                    //   fs.unlink('Data/PrnFiles/prnfile.prn');
                 
                    // }
                  //  console.log(stdout);
             });//require
      });
  });
});//db salec
});
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
   

//  console.log(data);
  
//   console.log(req.body.chgunt);
//   console.log(req.body.barcode);
//   console.log(req.body.iname);
//   var ItemName =req.body.iname;
//   var barcode = req.body.barcode;
//   var Charge1Total =req.body.taxval1;
//   var GrossQty =req.body.gwt;
//   var ChargableUnits =req.body.chgunt;

//    var result = data.replace(/batch.ItemName/g, ItemName);
//    var result1 =result.replace(/batch.Barcode/g, barcode);
//    var result2 = result1.replace(/StockBookDetail.Charge1Total/g, Charge1Total);
//    var result3 = result2.replace(/StockBookDetail.GrossQty/g, GrossQty );
//    var result4 = result3.replace(/StockBookDetail.ChargeableUnits/g, ChargableUnits);
//     var result5 =result4.replace(/StockBookDetail.Barcode/g, barcode);
    
//   fs.writeFile('sample/sample.prn', result5, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
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
       // inVoiceSeriesConfig = doc[0].inVoiceSeries;
        res.json(doc);
})
})
var inVoiceSeriesConfig = null;
var DecimalPoints = null;
var rupeesDecimalPoints = null;
function configurationCall() {
  db.configurations.find(function(err,doc){
        if (doc.length != 0) {
          inVoiceSeriesConfig = doc[0].inVoiceSeries;
          DecimalPoints = doc[0].DecimalPoints;
          rupeesDecimalPoints = doc[0].rupeesDecimalPoints;
           
          console.log('inVoiceSeriesConfig '+inVoiceSeriesConfig);
        };
})
}//configurationCall
configurationCall()

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
    db.stockPointMaster.find(function(err,doc){
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
   //22/6 db.barCodeSummary.find({status:"Inprogress"},function(err,doc){
        //console.log(doc);
         db.barCodeSummary.find({status:"Inprogress"},function(err,doc){
   
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
// app.get('/batchBarcode:barcodenum',function(req,res){
//    // var tax = req.params.barcodenum;
//    console.log("batchBarcode:barcodenum ")
//    // var tax1=parseInt(tax);
//    // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
//      db.batch.find({"barcode": Number(req.params.barcodenum),"orderStatus" : "available"},function(err,doc){     
//       console.log(doc.length)
//        // res.json(doc);
//        if (doc.length != 0) {
//            db.transactionDetail.find({"barcode": Number(req.params.barcodenum),"Transaction" : "Barcoding"},function(err,doc){     
      
//                 res.json(doc);
//            })
//        }//if
//          else{
//           res.json(doc);
//          }
//       });
// });
app.get('/getbar:barcodenum',function(req,res)
{
   // console.log("i received a get request from count");
    var tax = req.params.barcodenum;
   var tax1=parseInt(tax);
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
     db.transactionDetail.find({"barcode": tax1},function(err,doc){     
      
        res.json(doc);
 //         console.log("i am combo "+doc[0].barcode);
 // // "comboItem" : "yes"
 //         if (doc[0].comboItem == "yes"  ) {
 //          console.log(" comno true    true   ytrrr "+ doc[0].comboItemCheck)
 //         }
        //  db.transactionDetail.find({comboBarcode:barcode},function(err,doc)
      
        // {
        //     res.json(doc);
        
        // }); 
})
})

app.get('/codeDetails:barcodenum',function(req,res){
    console.log("i received a get request from count");
    var barcoded = req.params.barcodenum;
    barcoded=parseInt(barcoded);
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
   //  db.transactionDetail.find({"barcode": barcoded, "orderStatus" : "completed","Transaction" : "Regular Sale"},function(err,doc){     
      db.batch.find({"barcode": barcoded, "orderStatus" : "completed"},function(err,doc){     
      
        res.json(doc);
})
})
//combo
  // db.transactionDetail.find({"comboBarcode":21462851},function(err,doc){ 
  //        console.log("transactionDetail")
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
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
     db.transactionDetail.find({ "comboBarcode" : tax1},function(err,doc){     
      
        res.json(doc);
})
})
app.get('/getComboBarcode:barcodenum',function(req,res){

    console.log("i received a get request from count getComboBarcode getComboBarcode getComboBarcode getComboBarcode");
    var tax = req.params.barcodenum;
   var tax1=parseInt(tax);
  
    db.transactionDetail.find({"comboBarcode": tax1},function(err,doc){     
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
     db.transactionDetail.find({"comboBarcode":barcodeNumber},function(err,doc){     
        console.log("  gpcs "+ gpcs+"  gwt "+gwt);
      //  console.log(doc[0]);
        // console.log(doc);
        console.log(doc[0].gwt);
        console.log(doc[0].gpcs);

        gwt = doc[0].gwt -gwt;
       gpcs = doc[0].gpcs - gpcs;
       console.log("getComboBarcode "+doc[0].gwt+" doc[0].gwt "+" doc[0].gpcs "+doc[0].gpcs);
       // res.json(doc);
       
        db.transactionDetail.update({comboBarcode:barcodeNumber},{$set:{
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
  
//     db.transactionDetail.find({"comboBarcode": tax1},function(err,doc){     
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
   
    db.inventoryGroupMaster.find({"InvGroupName": invGroupName},function(err,doc){     
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
    db.batch.find({count:count,"stats" : "Inprogress"}).sort({_id:-1},function(err,doc)
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
//     db.transactionDetail.find({partyname:partyname},function(err,doc){
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
//date fetch
app.get('/getdate:data',function(req,res)
{
  // var strdata=req.params.data;
  console.log("nnnnnnnnnnnnnnnnnnmnnnnnnnnnnnnnnnnnnnnnnn");
  // var strdata_array=strdata;
  var tran=req.params.data;
  console.log(tran+"tran type tran type tran type tran type tran type tran type");
  // var pname=strdata_array[1];
  db.transactionDetail.find({"Transaction":tran}).sort({_id:-1}).limit(1,function(err,doc){
        res.json(doc);
        console.log(doc);
  })
  // db.transactionDetail.aggregate( { $sort: { Transaction: 1, date: 1 } }
  //       { "$group": {"Transaction":tran,"partyname":pname,"date": { "$max": "$date" }}},function(err,doc){
  //   res.json(doc);
  //   console.log(doc);
  // })
  // db.transactionDetail.aggregate({"Transaction":tran,"partyname":pname,"date":{$lt:date}}).sort({_id:-1}).limit(1)
  });
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
   //db.transactionDetail.find({count:count}).sort({_id:-1}).limit(1
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
    

    db.transactionDetail.find({barcode:barcode},function(err,doc){ 
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

//     db.transactionDetail.find({barcode:barcode},function(err,doc){ 
//       console.log(" in new history")
//         res.json(doc);
//         console.log(doc);
//     });
// });
//for getting dates and voucherNo
app.get('/iateapple:spdata',function(req,res){
  console.log("voucher no and dates");
  var str=req.params.spdata
  console.log(str);
  var str_array=str.split(",");
  var pname=str_array[0];
  var tran=str_array[1];
  if(tran == "Purchase Return"){
// <<<<<<< HEAD
  // db.transactionDetail.find({"partyname":pname,"Transaction" : "RD Purchase","voucherNo":{$ne:'null'}},function(err,doc){
    db.transactionDetail.aggregate([{$match:{"partyname":pname,"Transaction":"RD Purchase","voucherNo":{$ne:"null"}}},
    {$group:{_id:{voucherNo:"$voucherNo"}}}],function(err,doc){
    res.json(doc);
    console.log(doc+"voucher No and dates");
    });
    }
  else{
    // db.transactionDetail.find({"partyname":pname,"Transaction":"Regular Sale","voucherNo":{$ne:'null'}},function(err,doc){
      db.transactionDetail.aggregate([{$match:{"partyname":pname,"Transaction":"Regular Sale","voucherNo":{$ne:"null"}}},
      {$group:{_id:{voucherNo:"$voucherNo"}}}],function(err,doc){  
          res.json(doc);
      });

      }
// =======
  // db.transactionDetail.find({"partyname":pname,"Transaction" : "RD Purchase","voucherNo":{$ne:'null'}},function(err,doc){
  //   res.json(doc);
  //   console.log(doc+"voucher No and dates");
  // });
  // }
  // else{
  //   db.transactionDetail.find({"partyname":pname,"Transaction":"Regular Sale","voucherNo":{$ne:'null'}},function(err,doc){
  //     res.json(doc);
  //   });

  // }
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
});
// for getting approval out data
app.get('/appouts:data',function(req,res){
  console.log("approval approval approval approval approval approval");
  var pname=req.params.data;
  console.log(pname);
  var trans="Approval Out";
  // var str_array=str.split(",");
  // var pname=str_array[0];
  // var trans="Approval Out";
  // db.transactionDetail.find({"partyname":pname,"Transaction":trans},function(err,doc){
    db.transactionDetail.aggregate([{$match:{"partyname":pname,"Transaction":trans,"voucherNo":{$ne:"null"}}},
      {$group:{_id:{voucherNo:"$voucherNo"}}}],function(err,doc){ 
    res.json(doc);
    console.log(doc+"Approval Outs");
  });
});
//previous
// app.post('/userdata/:updat',function(req,res){
//     //console.log("igot order requestttttttttttttttttttttt");
//  var str=req.params.updat;
//     //console.log(str);
//     var str_array=str.split(",");
//     var tran=str_array[0];
//     //console.log("status is"+status);
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
//     var partyname=str_array[10]
//     var size=str_array[11]
//     var taxval1=str_array[12]
//     var taxamt1=str_array[13]
//    var wt=str_array[14]

//     var wastage=str_array[15]
//     var stval=str_array[16]
//     var labval=str_array[17]
//     var rate=str_array[18]
//     var stock=str_array[19]
//     //console.log(partyname)
//     console.log("finished")
//     //db.useritem.insert
//      db.useritem.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
//         "name":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"StockInward":stock,"wastage":wastage,"stval":stval,"labval":labval},function(err,doc){
     
//     //var document={name:name,city:city,no:no,email:email,street:street};
//    // db.useritem.insert(req.body,function(err,doc){
//         res.json(doc);
//       //  console.log(doc);
    
// })
// })
app.get('/compos:barcodenum',function(req,res) {
  var barcoded = req.params.barcodenum;
   barcoded=parseInt(barcoded);
db.transactionDetail.find({"StockInward":{$ne: "no"},"compositeRef":barcoded},function(err,doc){
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

      
         var withinstatecgst =(str_array[22])
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
            var id = str_array[46]
          //  mrp = parseFloat(mrp)
        

       
        if( mrp == "undefined"){
            mrp = null;
        }else{
          mrp = parseFloat(mrp)
         }
        if(stchg == "undefined"){
          stchg = null;
        }
        if( withinstatecgst == "undefined"){
          withinstatecgst =null;
          withinstatesgst =null;
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


  if( wt == "undefined" || wt ==  0){
           wt =null
        }
        wt = parseFloat(wt)
      
       if(tran == "Regular Sale"){ //"stockInward":stockInward,
         db.transactionDetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"Inprogress","withinstatecgst":Number(withinstatecgst),"withinstatesgst":Number(withinstatesgst),
                "outofstateigst":Number(outofstateigst),"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,
                "billType":billType,"taxSelection":taxSelection,"InvGroupName":InvGroupName,"SaleCategory":SaleCategory,"stockPoint":stockPoint},function(err,doc){
                res.json(doc);
                 console.log("Regular Sale insert when id is null look here cgst "+Number(withinstatecgst))
                // console.log(doc);    
        })
 
       }else{
        if(tran == "Issue Voucher"||tran == "Receipt Voucher"||tran == "RD Purchase"||tran == "Approval Out" || tran == "Sale Return"||tran == "Purchase Return" ||
         tran == "Approval Return"||tran == 'Opening Stock'){
          console.log("cccccccccccccccccccc");
          db.transactionDetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"completed","withinstatecgst":Number(withinstatecgst),"withinstatesgst":Number(withinstatesgst),
                "outofstateigst":Number(outofstateigst),"stockInward":stockInward,"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,"RefId":refid,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,"urdAdjustment":urdAdjustment,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,"billType":billType,"taxSelection":taxSelection,"stockPoint":stockPoint,
// =======
                // "billType":billType,"taxSelection":taxSelection,"stockPoint":stockPoint,"stonecal":stonecal,"RefId":refid,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,"urdAdjustment":urdAdjustment,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,},function(err,doc){
                "InvGroupName":InvGroupName,"SaleCategory":SaleCategory},function(err,doc){
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
                res.json(doc);
                 console.log("else insert when id is null look here")
                 console.log(doc);   
        })
          
        }
       else{
         db.transactionDetail.insert({"Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
                "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"Inprogress","withinstatecgst":Number(withinstatecgst),"withinstatesgst":Number(withinstatesgst),
                "outofstateigst":Number(outofstateigst),"stockInward":stockInward,"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
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
      delete( req.body.stockPoint1 )
       
        
       delete( req.body.voucherClass)
       
       delete(req.body.accNumbers);
        delete( req.body.voucherClassId) 
        delete( req.body.transactionTypeId )
         delete( req.body.invGroupName )
         delete( req.body.invGroupAccNo )
        delete( req.body.voucherDate)
         delete( req.body.voucherTime )
         delete( req.body.stockPoint )
        delete( req.body.Transaction)
         delete( req.body.stockInward )
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
app.post('/saleInvoicedata',function(req,res){
    
    //var document={name:name,city:city,no:no,email:email,street:street};
    db.saleInvoice.insert(req.body,function(err,doc){
        res.json(doc);
      
})
})
app.post('/bardata',function(req,res){
    console.log("date bardata "+req.body.date);
    console.log(req.body);
    req.body[0].date = new Date(req.body[0].date);
     console.log("before "+req.body[0].totalpcs+ typeof(req.body[0].totalpcs))
    
    req.body[0].totalpcs = Number(req.body[0].totalpcs);
   req.body[0].totaltags = Number(req.body[0].totaltags)
    //totalweight = parseFloat(req.body[0].totalweight).toFixed(DecimalPoints);
    //req.body[0].totalweight = Decimal128.fromString( totalweight);
     req.body[0].totalweight = parseFloat(req.body[0].totalweight).toFixed(DecimalPoints);
     
    console.log('req.body')
    console.log("aftre "+req.body[0].totalpcs+ typeof(req.body[0].totalpcs)+req.body[0].totalweight+" "+DecimalPoints)
    //var document={name:name,city:city,no:no,email:email,street:street};
    db.barCodeSummary.insert(req.body[0],function(err,doc){
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
   
    db.batch.find({date: { $gt:(fdate), $lt: (tdate) }}).sort({_id:-1},function(err,doc){
     //console.log(doc);
      res.json(doc);

    })
})

 
// barcode serach in barcodechange html
 app.get('/barcodeBatchFind',function(req,res)
{
  
    var Barcode=req.query.Barcode;
    
   console.log(" barcode                            "+Barcode)
    db.batch.find({"barcode" : Number(Barcode)}).sort({_id:-1},function(err,doc){
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
     //      db.inventoryGroupMaster.find({InvGroupName:itemname},function(err,doc){
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
    db.inventoryGroupMaster.find({InvGroupName:itemname},function(err,doc){
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
   // db.inventoryGroupValueNotation.find({InvGroupID:itemgroupid},function(err,doc){
      db.inventoryGroupValueNotationDaily.find({InvGroupID:itemgroupid,date:currentdate},function(err,doc){
    //console.log("purity call")
     //   console.log(doc);
        res.json(doc);
})
})
//insert
app.post('/transactionstoc/:updat',function(req,res)
{
    console.log("iam updating here is this kkkkkkkk");
   
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
//    // db.transactionDetails.insert({barcode:"barcode",Transaction:"Barcoding",StockInward:"yes"},function(err,doc){
//      db.transactionDetails.insert(req.body,function(err,doc){
        
//         res.json(doc);
// })
// })
//app.post('/transactionstock/:update',function(req,res)
app.post('/transactionstock',function(req,res){
    delete(req.body.Batch)
    delete(req.body.stats)
     delete(req.body.Qty)
    delete(req.body.tags)
    delete(req.body.wt)
    delete(req.body.color)
     delete( req.body.irate)
     delete(req.body.accNumbers);
       delete( req.body.stockPoint1 );

 db.transactionDetail.insert(req.body,function(err,doc){
     
        res.json(doc);
      // console.log("post success transactionstock barcode ");
    
})
})
// for transaction details for barcoding parallel in and out
app.post('/transactionstockInward',function(req,res){
     // delete(req.body.Transaction)
     delete(req.body.Batch)
    delete(req.body.stats)
    delete(req.body.tags)
    delete(req.body.wt)
    delete(req.body.color)
    delete(req.body.Qty)
      req.body.refid = req.body.compositeRef;
       //delete(req.body.orderStatus)
        req.body.stockInward = "no";
        req.body.stockPoint =  req.body.stockPoint1;
        req.body.refid = req.body.barcode 
       delete( req.body.stockPoint1 )
       delete( req.body.orderstatus)
        delete (req.body.barcode)
       delete( req.body.voucherClass)
       delete( req.body.irate)
       delete(req.body.accNumbers);
              delete( req.body.voucherClassId) 
              delete( req.body.transactionTypeId )
               delete( req.body.invGroupName )
               delete( req.body.invGroupAccNo )
              delete( req.body.voucherDate)
               delete( req.body.voucherTime )
            req.body.orderStatus = 'available';
            req.body.ntwt  = parseFloat(req.body.ntwt)
            req.body.gwt  = parseFloat(req.body.gwt)
            req.body.gpcs  = parseFloat(req.body.gpcs)
      db.transactionDetail.insert(req.body,function(err,doc){
       res.json(doc);   
       //console.log("post success transactionstockInward refid ");
     
})
})

app.post('/transactionComboItemInsert',function(req,res)
{
        // delete(req.body.Transaction)
        delete(req.body.orderStatus)
       // req.body.StockInward = "no";
        req.body.refid = req.body.barcode ;
        delete( req.body.orderstatus);
         delete( req.body.stockInward);


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
        delete(req.body.Batch)
        delete(req.body.stats)
        delete(req.body.tags)
        delete(req.body.wt)
        delete(req.body.color)
        delete(req.body.Qty)
        // delete(req.body.stockPoint)
        delete(req.body.stockPoint1)
        req.body.ntwt  = parseFloat(req.body.ntwt)
        req.body.gwt  = parseFloat(req.body.gwt)
        req.body.gpcs  = parseFloat(req.body.gpcs)
        db.transactionDetail.insert(req.body,function(err,doc){
             res.json(doc);    
        })
})
// for transaction details collection in inventory
app.get('/transactionDetails',function(req,res){
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
    // db.salesPerson.find(function(err,doc){
    //     //console.log(doc);
    //     res.json(doc);
    db.staff.find(function(err,doc){
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
  db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus}},function(err,doc)
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
      db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus, "urdAdjustment" :diff}},function(err,doc)
        {
        res.json(doc);
        console.log(doc)
       });

    }else{
      console.log("urdRefund == defined "+urdRefund );
    var orderstatus = "completed"
  db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus, "urdAdjustment":diff, "urdRefund":diff }},function(err,doc)
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
app.post('/transactionDetail/:updat',function(req,res)
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
    db.transactionDetail.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
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
     db.transactionDetail.insert({"barcode":bar,"Transaction":tran,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
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
// app.get('/getPrefix:prefix',function(req,res){
//   console.log("getting transactionseries invoice");
//   var myprefix=req.params.prefix;
//   db.transactionSeriesInvoice.find({"TransactionType":myprefix},function(err,doc){
//     res.json(doc);
//     console.log(doc);
//   })
// });
//function inVoiceCall() {
app.get('/getPrefix',function(req,res){  
  
  
  //var Transaction = "Regular Sale";
  //var Transaction = "Valuation";

  var Transaction = req.query.transaction;
  // var Transaction = "Urd Purchase";
 // var type = "TransactionType";
  //var voucherSeriesType = "StartingTransactionTypeNo";
  var voucherSeriesType =  req.query.invoiceVoucher;
  var classType = null;
  db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
   // console.log(doc);
    classType = doc[0].TransactionClass;
  })
  db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
        //
    console.log(" record transactionInvoice "+doc.length);
      if (doc.length == 0) {
          console.log(" insert call ");
          insertNewTransactionInvoice();
      }else{
              console.log(" update  call ");
              insertUpdateTransactionInvoice();
           }
  })//transactionInvoice
  function insertNewTransactionInvoice() {
     // console.log(" insertNewTransactionInvoice call ");
      db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
            // console.log(doc);
            if (voucherSeriesType == "StartingTransactionClassNo" ) {
                    var voucherSeries =  doc[0].StartingTransactionClassNo ;
                    db.transactionInvoice.find({"TransactionClass":classType},function(err,doc1){
                        if (doc1.length == 0) {
                         // var TransactionNoCheck = 
                          voucherSeries =  doc[0].StartingTransactionClassNo ;
                
                        }else{
                          voucherSeries = Number(doc1[0].TransactionNo) +1;
                        }
                      //console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      //console.log(" if multi  check udate call "+doc1[0].TransactionNo);
                      db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true })
                           
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                            console.log(doc.TransactionPrefix+doc.TransactionNo);
                              //res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      
                             res.json(doc.TransactionPrefix+doc.TransactionNo);
                        })
                    })
          
            }else{
                    var voucherSeries =  doc[0].StartingTransactionTypeNo ;
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                          console.log(doc.TransactionPrefix+doc.TransactionNo);
                           res.json(doc.TransactionPrefix+doc.TransactionNo);
                            // res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      
                        })

                 }
          
      })
  }//insertNewTransactionInvoice
   function insertUpdateTransactionInvoice() {
      console.log("insertUpdateTransactionInvoice");

      if (voucherSeriesType == "StartingTransactionClassNo" ) {
              
                    //var voucherSeries =  doc[0].StartingTransactionClassNo ;
          
               db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true },function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log(" if multi "+classType);
                       res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                       
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
      }else{
              db.transactionInvoice.update({"TransactionType":Transaction},  { $inc: {"TransactionNo": 1 }},function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log("else one "+classType);
                       res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
           }
     
      
   }//insertUpdateTransactionInvoice
});
// for pdf data generation using barcode
app.get('/getparty',function(req,res){    
   console.log("getparty getparty getparty getparty getparty getparty")
var id =req.query.id;
     //  console.log(partyname);
     // var trans=req.query.Transaction;
     // console.log(trans);
    //db.transactionDetail.find({"partyname":partyname,"Transaction":trans},function(err,doc){
      db.transactionDetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
        
        res.json(doc);
       // console.log(doc);
        // if (doc[0].compositeRef != undefined) {
           
        //       function incrementCall(c) {
        //             // body...
        //             console.log(" doc[0].compositeRef doc[0].compositeRef "+doc[0].compositeRef)
            
        //          if (c <=3) {
                  
        //             db.transactionDetail.findOne({"compositeRef":Number(doc[0].compositeRef),"compositenum":Number(c)},function(err,doc1){
        //                // console.log(doc1[0]);
        //                 console.log(doc1);
        //                 incrementCall(c+1)
        //                // res.json(doc);
        //             })              
        //         }
             
        //    }// incrementCall(c)
        //    incrementCall(1)
        //  }
    });
})

//for getting partynames in receipt
app.get('/partynames',function(req,res){
  db.subscribers.find(function(err,doc){
    res.json(doc);
})
});

app.get('/bank',function(req,res)
{
    console.log("i received a get request from index");
    db.bank.find(function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

app.get('/cards',function(req,res){
  console.log("finding card types");
  db.cardType.find(function(err,doc){
    console.log(doc)
    res.json(doc);
  });
});

//receipt no
app.get('/getprefixs',function(req,res ){
  console.log("1111111111111111111111111111111111111111")
  // var tran=req.params.tra;
db.transactionSeriesInvoice.find({"TransactionType":'Receipt'},function(err,doc12){
    console.log(" check datafrwsdtywefdqwetyfqewfty ");
    console.log(doc12[0]);
    console.log(doc12);
    res.json(doc12);
});
});

//for getting totalcount
app.get('/gettotalcount',function(req,res){
  db.transactionInvoice.count({"prefix":'RP'},function(err,doc){
    console.log(doc);
    res.json(doc);
  });
});

//for inserting billNo to transactionInvoice
app.put('/insertbill:values',function(req,res){
  var dataz=req.params.values;
  console.log(dataz+"1111111111111111111111111111");
  var dataz_array=dataz.split(",");
  var pre=dataz_array[0];
  console.log(pre+"222222222222222222222222222222");
  var no=dataz_array[1];
  console.log(no+"3333333333333333333333333333333333");
  db.transactionInvoice.insert({"prefix":pre,"typeno":no},function(err,doc){
    console.log(doc);
    res.json(doc);
  })
})

app.post('/AccountStatusReceipt:values',function(req,res){
  var insertbill = req.params.values;
  //console.log(insertbill +"1111111111111111111111111111");
  var insertbill_array=insertbill.split(",");
  //var voucher = insertbill_array[0];
  db.saleInvoice.update({"voucherNo":insertbill_array[0]},{$set:{"AccountStatus":"completed"}},function(err,doc){
    
      res.json(doc);
      console.log("replayyyyyyyyyyyyyyyyyyyyy "+insertbill_array[0]);
      console.log(doc);
      
   });
 
})
//FOR INSERTING New field into saleinvoice
app.put('/newAccountstatus:status',function(req,res){
  console.log("inserting new status status status status1111111111111111");
  var stat1=req.params.status;
  var stat1_array=stat1.split(",");
  var ids=stat1_array[0];
  var accountstatus=stat1_array[1];
  console.log(accountstatus);
  console.log("i will be insertinbg a field"+ids+"........."+accountstatus);
  db.saleInvoice.update({ "_id":mongojs.ObjectId(ids)},{"$set":{"AccountStatus":accountstatus}},function(err,doc){
    console.log(doc+"3333333333333333333333333");
    res.json(doc);
  })
})

//for getting voucherids foer receipts
app.get('/getvoucherids:name',function(req,res){
  console.log("selected partyname is ");
  var pname=req.params.name;
  console.log("partyname is "+ pname);
  db.saleInvoice.aggregate([{$match:{"partyname":pname,"Transaction":"Regular Sale","AccountStatus":'Inprogress',"voucherNo":{$ne:"null"}}},
    {$group:{_id:{voucherNo:"$voucherNo",date:"$date",net:"$netamt"}}}],function(err,doc){
    res.json(doc);
    console.log(doc+"voucher No and dates");
    });
})


//for getting  receipts details
app.get('/getRecepietData:voucher',function(req,res){
  console.log("selected partyname is ");
  // var voucher = req.params.voucher;
  // console.log("partyname is "+ voucher);
  db.receipts.find({"voucherNo" : req.params.voucher,"voucherStatus" : "InProgress"},function(err,doc){
    res.json(doc);
  })
  // db.saleInvoice.aggregate([{$match:{"partyname":pname,"Transaction":"Regular Sale","voucherNo":{$ne:"null"}}},
  //   {$group:{_id:{voucherNo:"$voucherNo",date:"$date",net:"$netamt"}}}],function(err,doc){
  //   res.json(doc);
  //   console.log(doc+"voucher No and dates");
  //   });
})
//for inserting into receipt
app.post('/receiptdata/:datas',function(req,res){
  console.log("inserting into receipts+99999999999999999999");
  var rdata1=req.params.datas;

  var rdata1_array=rdata1.split(",");
  console.log(rdata1_array)
  var mode=rdata1_array[0];
  var amount=rdata1_array[1];
  var bank=rdata1_array[2];
  var chequeno=rdata1_array[3];
  var chequeDate = rdata1_array[4];
  // if (chequeDate != 'undefined') {
  //   console.log(" date n "+ chequeDate);
  //   chequeDate = new Date(chequeDate);
  // }else{
  //   chequeDate = null;
  // }
  
  var cardnos=rdata1_array[5];
  var ctype=rdata1_array[6];
  var appno=rdata1_array[7];
  var pname=rdata1_array[8];
  var bdate=rdata1_array[9];
  var bill=rdata1_array[10];
  var narrate=rdata1_array[11];
  var totals=rdata1_array[12];
  var voucher=rdata1_array[13];
  var voucherStatus = rdata1_array[14];
  var netBalance = rdata1_array[15];
   amount = parseFloat(amount).toFixed(rupeesDecimalPoints);
   totals = parseFloat(totals).toFixed(rupeesDecimalPoints);
   netBalance = parseFloat(netBalance).toFixed(rupeesDecimalPoints);
  //db.receipts.insert({"name":"gvhdfgfehyu"})
  db.receipts.insert({"Mode":mode,"Amount":Decimal128.fromString(amount),"Bank":bank,"ChequeNo":chequeno,"Date":chequeDate,"CardNo":cardnos,"CardType":ctype,"ApprovalNo":appno,"partyname":pname,"BilledDate":new Date(bdate),
    "BillNo":bill,"Narration":narrate,"PaidAmount":Decimal128.fromString(totals),"voucherNo":voucher,"voucherStatus":voucherStatus,'netBalance':Decimal128.fromString(netBalance)},function(err,doc){
     console.log(" checking data here ");
     console.log(doc);
    res.json(doc);
  })
})
// recepiet data trdetails and trheader
app.get('/receipetCreation',function(req,res){   
      var BillNo = req.query.BillNo;
      var voucherNo = req.query.voucherNo;
      console.log(" BillNo "+BillNo);

      var voucherId = 0;
      var currentdate = null;
      var currentYear = null;
      var voucherType = null;
      var  vocuherNumber =null;
      var suffix = null;
      var name = null;
      var amountTotal = null;
      var amountNet = null;
      var narration = null;
      var billtype = null;
      var voucherRowNumber = 0;
      var salesPerson = null;
      var refId ;
      findCall(req.query.voucherNo);
    
      function findCall(argument) {
                db.saleInvoice.find({ "voucherNo" :argument },function (err,res) {

                console.log(res)
                currentdate =  res[0].date ;
                billtype =  res[0].billtype ;

                currentYear = res[0].date.slice(0, 4);

                voucherType = res[0].Transaction;

                vocuherNumber = res[0].voucherNo;
                suffix = res[0].voucherNo.slice(0, 2);
                name = res[0].partyname ;

                //to find voucherClass
                db.transactionSeriesInvoice.find({ "TransactionType" :voucherType },function (err,resData) {
                voucherClass =  resData[0].TransactionClass ;
               // trHeaderCall (amountNet,narration)
                voucherIdCall()
                //trHeaderCall (amountTotal,narration);
                })

                })
      }//finalCall
      function voucherIdCall() {
                db.trHeaders.find({}).sort({_id:-1}).limit(1,function(err,data){
                  //res.json(doc);
                  console.log(data.length);
                  if (data.length == 0) {
                      voucherId = 1;
                  }else{
                         voucherId =  Number(data[0].voucherId) ; 
                         console.log(" voucher   voucher "+data[0].voucherId)
                         voucherId++;
                       }
                    receiptsCall();   
                })//db.trHeaders

       }//voucherIdCall
       function receiptsCall() {
            db.receipts.find({BillNo:req.query.BillNo},function(err,documents){
              
                  //res.json(doc);
                  console.log(documents);
                  amountNet = documents[0].PaidAmount;
                  narration = documents[0].Narration;
                  trDetailsInsertCall(documents[0].PaidAmount,name,'Dr')
                  //trHeaderCall (documents[0].PaidAmount,documents[0].Narration)
                  for (var billNoIndex = documents.length - 1;billNoIndex >= 0; billNoIndex--) {
                    //Things[i]

                    trDetailsCall(documents[billNoIndex].Mode,billNoIndex,documents[billNoIndex].Amount)

                  };
            });// db.receipts
      }//receipts
      function trDetailsCall (Mode,index,Amount) {
        if (Mode == "Cash") {
           console.log(" iam cash L011 ")
           console.log(" PaidAmount "+Amount)
           trDetailsInsertCall(Amount,'L011','Cr',index)
        }else if (Mode == "Card") {
           console.log(" iam card PaidAmount");
            trDetailsInsertCall(Amount,'Lc11','Cr',index)
       

        }else if (Mode == "Cheque"){
            trDetailsInsertCall(Amount,'LQ11','Cr',index)
       
        }
        // body...
      }//trDetailsCall
      
      function trDetailsInsertCall (amount,accountId,transType,index) {
            voucherRowNumber++;
            var amount = parseFloat(amount).toFixed(rupeesDecimalPoints);
            db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate: new Date(),
                accountId:accountId,amount:Decimal128.fromString(amount),transType:transType},function (err,res) {
           
            })
            if (index == 0) {
                trHeaderCall (amountNet,narration);
            };
      }//trdetails

    
 ////////   
 function trHeaderCall (amountTotal,narration) {
         var amountTotal = parseFloat(amountTotal).toFixed(rupeesDecimalPoints);
          
          db.trHeaders.insert({voucherId:voucherId,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:'',
              amount:Decimal128.fromString(amountTotal),numberOfDetails:voucherRowNumber,userId:'',narration:narration,remarks:''},function (err,res) {
          })
  }//trHeaderCall

})

app.get('/urdDetails',function(req,res)
{   
var id =req.query.id;
      db.transactionDetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
        
        res.json(doc);
        console.log(doc);
    });
})
//partynames
app.get('/getTranDetails',function(req,res){
  console.log("sssssssssssssssssssssssssssssssssssss");
  db.subscribers.find({},function(err,doc){
    res.json(doc);
  });
})
//alltarnsactions
  app.get('/AllTransaction/:pdata',function(req,res){
    console.log("vvvvvvvvvvvvvvvvvvvvvv");
    var pstr=req.params.pdata;
    var pstr_array=pstr.split(",");
    var partyname=pstr_array[0];
    var date1=pstr_array[1];
    var date2=pstr_array[2];
      console.log(partyname+" "+date1+" "+date2);
      // db.transactionDetail.find({"partyname":partyname,"created_on": {"$gt": date1, "$lt": date2}},function(err,doc){
        db.transactionDetail.find({date:{$gt:date1, $lt:date2},"partyname":partyname},function(err,doc){
          console.log("dddddddddddddd");
            res.json(doc);
            console.log(doc);
      })
  })
//confirm
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

     db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":status,"stockInward":"no"}},function(err,doc)
        {
        res.json(doc);
       });
    // db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":status}});
    // db.transactionDetail.update({refid:  bar},{$set:{"stats":status,"soldOutDate":soldOutDate}});



})


app.get('/count1/:count',function(req,res)
{
   // console.log("iam finding count ");
   
    var str=req.params.count;
    
    var count1 =parseInt(str);
   // console.log("count"+count1)

    //console.log("finished")
     db.barCodeSummary.find({"count":count1},function(err,doc){
        //res.json(doc);db.barCodeSummary.find({"count":1})
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
     db.transactionDetail.insert(req.body,function(err,doc){
       // console.log("noerror")
        res.json(doc);
      });
})

// for combo new barcode
app.post('/combotransactionDetail',function(req,res)
{
 // console.log("iam inserting in the split table ");
   //console.log(req.body)
     db.transactionDetail.insert(req.body,function(err,doc){
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
     db.transactionDetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
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
     db.transactionDetail.find({"Transaction":transaction,"partyname" : party,"orderStatus" : "Inprogress" },function(err,doc){
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
     db.transactionDetail.find({"Transaction":transaction,"partyname" : party,"orderStatus" : "Inprogress","voucherNo" : { $exists: true }  },function(err,doc){
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
     

 // db.barCodeSummary.update({_id:mongojs.ObjectId(id)},
 //  update:{$set:{itemname: req.body.itemname, stockfrom: req.body.stockfrom ,totalpcs:req.body.totalpcs,totalweight:req.body.totalweight,totaltags:req.body.totaltags}},new :true},function(err,doc){
  
  db.barCodeSummary.update({_id:mongojs.ObjectId(id)},{$set:{"itemname":ItemName,"stockfrom":stockout,"stockto":stockin,"totalpcs":pcs,"totalweight":wt,"totaltags":titems,"count":count,
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
  db.transactionDetail.insert({"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
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
  //console.log(transac+"#@################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
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
           db.transactionDetail.insert({"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
               "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"stockInward":req.body.stockInward,"taxamt":req.body.taxamt,
              "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"InvGroupName":req.body.InvGroupName,"SaleCategory":req.body.SaleCategory,"purity":req.body.purity,
             "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
             "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"taxSelection":req.body.taxSelection,"stockPoint":req.body.stockPoint},function(err,doc){
                    console.log("updated the data in save during sale return "+doc.length)
                    res.json(doc);
        
           });  
           //console.log("inserted the data in save when id not null")
          //for combo update
           db.transactionDetail.find({  "comboBarcode" : req.body.barcode},function(err,doc12){     
               
               console.log(doc12);
               if (doc12 != 0) {


                   console.log(" combo item getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate"+req.body.barcode);
    
                    db.transactionDetail.find({"comboBarcode": req.body.barcode},function(err,doc1){     
                        console.log("getComboBarcode");
                        var gpcs = doc1[0].gpcs + req.body.gpcs ;
                        var gwt = doc1[0].gwt + req.body.gwt ;
                         
                            db.transactionDetail.update({comboBarcode:req.body.barcode},{$set:{
                                  "gpcs":gpcs,"gwt":gwt,"itemName":req.body.itemName}},function(err,doc){
                                   //res.json(doc)
                                   db.batch.update({barcode: req.body.barcode},{$set:{orderStatus:"available"}});
                            });//update
                    })//find
  
               }else{//if loop
                console.log(" not a combo item ");
               }
           })

 });


app.put('/updateUseritCall',function(req,res)
{
   
    var id = req.body._id;
     req.body.ntwt = parseFloat(req.body.ntwt);
       // console.log(req.body)
       // console.log(req.body.barcode)
  
     db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"taxSelection":req.body.taxSelection,
      "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,
     "withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"purity":req.body.purity,
               "InvGroupName":req.body.InvGroupName ,"SaleCategory":req.body.SaleCategory}},function(err,doc){
            //console.log("updated the data in save when id not null")
            res.json(doc);
        
        }); 
     //
      if(req.body.barcode == undefined || req.body.barcode == null ||  req.body.split == "yes"){
          console.log(" barcode is null ");
      }else{
          console.log(" barcode is here look  "+req.body.barcode);
            //for updated in refid data  "barcode":req.body.barcode,
        db.transactionDetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
        {
           // res.json(doc);
        
        }); 
  
      }
        
});
app.post('/insertUseritDetails',function(req,res){
  //console.log(req.body);
    console.log("entered into put request $scope.userit[i]._id!=null +++++++=====+++++");
     //  console.log(req.body.gwt);
        console.log(req.body.Transaction);
         if (req.body.Transaction == "Regular Sale") {
               delete(req.body.stockInward);
          }
      req.body.gpcs =  parseFloat(req.body.gpcs);
       req.body.gwt = parseFloat(req.body.gwt);
       req.body.ntwt = parseFloat(req.body.ntwt);
        req.body.taxval = parseFloat(req.body.taxval);
         req.body.voucherNo = null; 
         delete(req.body.irate);
         delete(req.body.accNumbers);

   db.transactionDetail.insert(req.body,function(err,doc){
   
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
           // if(req.body.Transaction!='Approval Out'){
            console.log("not")
        db.transactionDetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,"stockPoint":req.body.stockPoint}},function(err,doc)
        {
           // res.json(doc);
        
        }); 
      // }
      // else{
      //   console.log("approval out");
      //   db.transactionDetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
      //    "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
      //   "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
      //     "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,"stockPoint":req.body.stockPoint}},function(err,doc)
      //   {
      //      // res.json(doc);
        
      //   }); 
      // }
      }
        

   // var id = req.body._id
   //     console.log(req.body)
   //     console.log(req.body.barcode)
  
     // db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
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
  var barcode=str_array[1];
  console.log(pid);
  var voucher="null";
  db.transactionDetail.update({_id:mongojs.ObjectId(pid)},{$set:{"voucherNo":voucher}},function(err,doc){
    res.json(doc);
    console.log(doc);
  });
  db.batch.update({"barcode":Number(barcode)},{$set:{"orderStatus":"available"}},function(err,doc){
    //res.json(doc);
    // console.log(doc);
  });

  
});
//for approval updating
// app.put('/approvalupdate:appdata',function(req,res){
//   console.log("approval approval approval approval approval approval approval");
//   // console.log(req.params.appdata);
//    var appstr=req.params.appdata;
//    console.log(appstr);
//   // var appstr_array=appstr.split(",");
//   // var tran=appstr_array[0];
//   // console.log(tran);
//   // var pname=appstr_array[1];
//   // console.log(pname);
//   // db.transactionDetail.update({})
//   var id=req.params.appdata;
//   db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":"completed"}},function(err,doc){
//     res.json(doc);
//   })
// });
//new one with function
app.put('/updateUseritCall',function(req,res)
{
   
    var id = req.body._id;
     req.body.ntwt = parseFloat(req.body.ntwt);
       // console.log(req.body)
       // console.log(req.body.barcode)
  
     db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no","taxamt":req.body.taxamt,
        "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
       "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
       "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"taxSelection":req.body.taxSelection,
      "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,
    "withinstatecgst":Number(req.body.withinstatecgst),
         "withinstatesgst":Number(req.body.withinstatesgst),"outofstateigst":Number(req.body.outofstateigst),"InvGroupName":req.body.InvGroupName ,"SaleCategory":req.body.SaleCategory}},function(err,doc){
            //console.log("updated the data in save when id not null")
            res.json(doc);
        
        }); 
     //
      if(req.body.barcode == undefined || req.body.barcode == null ||  req.body.split == "yes"){
          console.log(" barcode is null ");
      }else{
          console.log(" barcode is here look  "+req.body.barcode);
            //for updated in refid data  "barcode":req.body.barcode,
        db.transactionDetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
        {
           // res.json(doc);
        
        }); 
  
      }
        
});
// for update of userit

app.put('/updateSaveData/:update',function(req,res){

   //app.post('/savedata1/:update',function(req,res){
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
    if( wt == "undefined" ){
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
            var id = str_array[46]
            var barcode = str_array[47]
             var orderStatus = str_array[48]
          //  mrp = parseFloat(mrp)
//        console.log(" with in state "+withinstatecgst)

       
        if( mrp == "undefined" || mrp == "null"){
            mrp = null;
        }else{
          mrp = parseFloat(mrp)
         }
        if(stchg == "undefined" || stchg == "null"){
          stchg = null;
        }
        if( withinstatecgst == "undefined" ||  withinstatecgst == "null"){
          withinstatecgst =null
          withinstatesgst =null
        }
        if( outofstateigst == "undefined" ||  outofstateigst == "null"){
          outofstateigst =null
        }
        if( wastage == "undefined" ||  wastage == "null"){
            wastage =null
        }
        if( stval == "undefined" ||  stval == "null"){
           stval =null
        }
        if( labval == "undefined" ||  labval == "null"){
          labval =null
        }
        if( labcal == "undefined" ||  labcal == "null"){
          labcal =null
        }
        if( labamt == "undefined" ||  labamt == "null"){
          labamt =null
        }
        if( desc == "undefined" || desc == 'null'){
          desc = null;
          console.log(" desc  desc  desc json  "+desc)
        }
        if( size == "undefined" || size == 'null'){
          size = null;
           console.log(" desc  desc  desc size "+size)
       
        }
        if( labourTaxValue == "undefined" ||  labourTaxValue == "null"){
          labourTaxValue =null
        }


  // console.log("db.transactionDetail.insert db.transactionDetail.insert db.transactionDetail.insert db.transactionDetail.insert")
  //    db.transactionDetail.insert(req.body,function(err,doc){
  //       res.json(doc);
  //     })
 // db.transactionDetail.insert({"partyname":partyname,"Transaction":"train",orderStatus:"Inprogress"},function(err,doc){ 
            
 //        res.json(doc);
 //    });
  if( wt == "undefined" || wt ==  0 ||  wt == "null"){
           wt =null
        }
        wt = parseFloat(wt)
      
   
     db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"barcode":barcode,
     
    "Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
    "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":"Inprogress","withinstatecgst":Number(withinstatecgst),
         "withinstatesgst":Number(withinstatesgst),"outofstateigst":Number(outofstateigst),"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,
                voucherNo:null,"billType":billType,"taxSelection":taxSelection,"InvGroupName":InvGroupName,"SaleCategory":SaleCategory,"stockPoint":stockPoint}},function(err,doc){
                res.json(doc);

        }); 
     
        
});


app.put('/editSavedData/:update',function(req,res){

   //app.post('/savedata1/:update',function(req,res){
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
    if( wt == "undefined" ){
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
            var id = str_array[46]
            var barcode = str_array[47]
             var orderStatus = str_array[48]
          //  mrp = parseFloat(mrp)
        

       
        if( mrp == "undefined" || mrp == "null"){
            mrp = null;
        }else{
          mrp = parseFloat(mrp)
         }
        if(stchg == "undefined" || stchg == "null"){
          stchg = null;
        }
        if( withinstatecgst == "undefined" ||  withinstatecgst == "null"){
          withinstatecgst =null
          withinstatesgst =null
        }
        if( outofstateigst == "undefined" ||  outofstateigst == "null"){
          outofstateigst =null
        }
        if( wastage == "undefined" ||  wastage == "null"){
            wastage =null
        }
        if( stval == "undefined" ||  stval == "null"){
           stval =null
        }
        if( labval == "undefined" ||  labval == "null"){
          labval =null
        }
        if( labcal == "undefined" ||  labcal == "null"){
          labcal =null
        }
        if( labamt == "undefined" ||  labamt == "null"){
          labamt =null
        }
        if( desc == "undefined" || desc == 'null'){
          desc = null;
          console.log(" desc  desc  desc json  "+desc)
        }
        if( size == "undefined" || size == 'null'){
          size = null;
           console.log(" desc  desc  desc size "+size)
       
        }
        if( labourTaxValue == "undefined" ||  labourTaxValue == "null"){
          labourTaxValue =null
        }


  // console.log("db.transactionDetail.insert db.transactionDetail.insert db.transactionDetail.insert db.transactionDetail.insert")
  //    db.transactionDetail.insert(req.body,function(err,doc){
  //       res.json(doc);
  //     })
 // db.transactionDetail.insert({"partyname":partyname,"Transaction":"train",orderStatus:"Inprogress"},function(err,doc){ 
            
 //        res.json(doc);
 //    });
  if( wt == "undefined" || wt ==  0 ||  wt == "null"){
           wt =null
        }
        wt = parseFloat(wt)
    
   

     db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"barcode":barcode,
     
    "Transaction":tran,"barcodeNumber":bar,"chgunt":chgunt,"date":date,"desc":desc,"final":final,"gpcs":gpcs,"gwt":gwt,
    "itemName":iname,"ntwt":ntwt,"partyname":partyname,"rate":rate,"size":size,"taxval":taxval1,"taxamt":taxamt1,"stwt":wt,"wastage":wastage,"stval":stval,
                "labval":labval,"orderStatus":orderStatus,"withinstatecgst":Number(withinstatecgst),
         "withinstatesgst":Number(withinstatesgst),"outofstateigst":Number(outofstateigst),"Hsc":Hsc,"purity":purity,"uom":uom,"pctcal":pctcal,"labcal":labcal,
                "stonecal":stonecal,'salesPerson':salesPerson,'AccNo':AccNo,'labourTaxValue':labourTaxValue,'labamt':labamt,'stchg':stchg,'comboItem':comboItem,'mrp':mrp,
               "billType":billType,"taxSelection":taxSelection,"InvGroupName":InvGroupName,"SaleCategory":SaleCategory,"stockPoint":stockPoint}},function(err,doc){
                res.json(doc);
                console.log(" iamaa djfd "+doc)
        }); 
if (tran == "Urd Purchase") {
      db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{
      "urdAdjustment":final
      }})
    
  }; 
     
        
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
  db.saleInvoice.find({"voucherNo":voucherNo,"partyname":pname},function(err,doc){
    res.json(doc);
    console.log(doc+"ssssssssssssssssssssssssssssssssssssssss");
  });
});
//for updating saleInvoice
app.put('/salesnew/:apple',function(req,res){
   // console.log(saledata+"dddddddddddddd");
   // console.log("updating saleInvoice after  return");
    // console.log(req.params.shivu);
  var sal=req.params.apple;
  console.log(sal);
  console.log("updating saleInvoice after  return");
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
   db.saleInvoice.update({"partyname":pname,"voucherNo":voucher},{$set:{"taxableval":taxableval2,
     "tax":tax2,"subtol":subtol2,"invoiceValue":invoice2,"netamt":invoice2}},function(err,doc){
      
    //     db.saleInvoice.insert({_id:mongojs.ObjectId(pid),"taxableval":taxableval2,
    // "tax":tax2,"subtol":subtol2,"invoiceValue":invoice2,"netamt":invoice2,"Transaction":trans}},function(err,doc){
      


      res.json(doc);
      console.log(doc);
      // console.log(doc[0].taxableval);
      // console.log(doc[0].tax);
    });
});

// for update of userit
app.put('/getComboBarcodeUpdate',function(req,res){

   console.log("getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate getComboBarcodeUpdate"+req.body.barcode);
    var barcode = req.body.barcode;
      //  console.log(req.body)
        console.log(req.body.barcode);
    db.transactionDetail.find({"comboBarcode": req.body.barcode},function(err,doc1){     
        console.log("getComboBarcode");
        var gpcs = doc1[0].gpcs -req.body.gpcs ;
        var gwt = doc1[0].gwt -req.body.gwt ;
        
        var ntwt = doc1[0].ntwt -req.body.ntwt ;
        var chgunt = doc1[0].chgunt -req.body.chgunt;
        var taxval = doc1[0].taxval -req.body.taxval ;
        // var gwt = doc1[0].gwt -req.body.gwt ;
        // var gwt = doc1[0].gwt -req.body.gwt ;
        // var gwt = doc1[0].gwt -req.body.gwt ;

        //res.json(doc);
         // $scope.user[i].gwt = response[0].gwt -$scope.user[i].gwt;
         // $scope.user[i].gpcs = response[0].gpcs - $scope.user[i].gpcs;
                                                                  // ,  { $inc: {"TransactionNo": 1 }}                                  
        db.transactionDetail.update({comboBarcode:req.body.barcode},
          {$set:{
         "gpcs":gpcs,"gwt":gwt,"ntwt":ntwt,"chgunt":chgunt,"taxval":taxval,
         //"gpcs": -req.body.gpcs,"gwt":-req.body.gwt,"ntwt":-req.body.ntwt,"chgunt":-req.body.chgunt,"taxval":-req.body.taxval,
       //  "wastage":-req.body.wastage,"labamt":-req.body.labamt,"labval":-req.body.labval,"stchg":-req.body.stchg,"stval":-req.body.stval,"stwt":-req.body.stwt
       }},function(err,doc){
           //res.json(doc);-2
           //"stwt":-req.body.stwt
         //  db.transactionDetail.update({comboBarcode:req.body.barcode},{$set:{
         // "gpcs":gpcs,"gwt":gwt,"itemName":req.body.itemName}},function(err,doc){
            
            if (gpcs <= 0 || gwt <= 0) {
                console.log(" gpcs <= 0 gwt "+gwt+" gpcs "+gpcs);
                upDateBatch("completed"); 
            }else{
                console.log(" gpcs >= 0 gwt "+gwt+" gpcs "+gpcs);
               
                upDateBatch("available"); 
            }
        });
    })
  function upDateBatch(status) {
    console.log(" function upDateBatch function updateBatchTransactionfunction updateBatchTransactionfunction function upDateBatch "+status+" Number(barcode) "+Number(barcode))
    db.batch.update({barcode: Number(barcode)},{$set:{orderStatus:status}},function (err,doc) {
        res.json(doc);
    })
    
  }
     
});
// function checkCall(argument) {
//   console.log(" 64101017 "); // { $exists: true }
//    db.transactionDetail.find({  "comboBarcode" : 53132197},function(err,doc){     
       
//        console.log(doc.length)
//    })

// }//
// checkCall()
// barcode data
app.get('/batchBarcodeNumber:barcodenum',function(req,res){
   // var tax = req.params.barcodenum;
   console.log("batchBarcode:barcodenum 1 ")
    // console.log("batchBarcode:barcodenum "+req.params.barcodenum)
  
   // var tax1=parseInt(tax); //64101017
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
     db.batch.find({"barcode": Number(req.params.barcodenum)},function(err,doc){     
     //db.batch.find({"barcode": Number(req.params.barcodenum),"orderStatus" : "available"},function(err,doc){     
     
       // db.batch.find({"barcode": 64101017,"orderStatus" : "available"},function(err,doc){     
       //console.log(doc)
       console.log(doc.length)
       //console.log("doc[0].orderStatus12 "+ doc[0].orderStatus)
       // res.json(doc);
       if (doc.length != 0 && doc[0].orderStatus == "available") {
           db.transactionDetail.find({"barcode": Number(req.params.barcodenum),"Transaction" :"Barcoding"},function(err,doc){     
              
                if (doc[0].comboItem == 'yes' && doc.length != 0) {
                      //console.log("combo item inside loop "+doc[0].comboItem);
                      db.transactionDetail.find({"comboBarcode":  Number(req.params.barcodenum)},function(err,doc1){     
                            //console.log("getComboBarcode");
                            //doc1[0].barcode = Number(req.params.barcodenum);
                            if(doc1[0].gwt == 0 || doc1[0].gpcs == 0 ){
                              // $scope.userit[$index]="";s
                              console.log(" check length is zero ");
                              res.json([]);
                            }else{
                              console.log(" check length is not zero ")
                              res.json(doc1);
                            }
                          
                      })
                }else{ //combo else
                   res.json(doc);
                }
               
           })//trans

       }//if
         else{
                //console.log(doc[0].orderStatus)
                res.json(doc);
         }
      });//batch
});
app.put('/saleInvoicedata12/:update',function(req,res)
{
    console.log("entered into put request for saleInvoicedata saleInvoicedata update ");
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
          db.saleInvoice.update({_id:mongojs.ObjectId(id)},{$set:{"partyname":partyname,"taxableval":taxableval,"tax":tax,"subtol":subtol,"adj":adj,
            "status":status,"labourtax":labourtax,"labourValue":labourValue,"dis":dis,"char":char,"netamt":netamt,"decimals":decimals,"invoiceValue":invoiceValue}},function(err,doc){
              res.json(doc);
              console.log(doc);
          })
        }else{
          db.saleInvoice.update({_id:mongojs.ObjectId(id)},{$set:{"partyname":partyname,"taxableval":taxableval,"tax":tax,"subtol":subtol,"adj":adj,
            "labourtax":labourtax,"labourValue":labourValue,"dis":dis,"char":char,"netamt":netamt,"decimals":decimals,"invoiceValue":invoiceValue}},function(err,doc){
              res.json(doc);
              console.log(doc);
          })

        }
         
})

//confirm
app.put('/saleInvoicedataconfirm/:update',function(req,res)
{
    console.log("saleInvoicedataconfirm call");
    var str=req.params.update;
    console.log(str);
    var str_array=str.split(",");
    // var id=str_array[0];
    // console.log(id);
    var partyname=str_array[0];
    console.log(partyname);
    var transaction=str_array[1];
    console.log(transaction);
    db.saleInvoice.update({"partyname":partyname,"status":"In Progress", "Transaction" :transaction },{$set:{"status":"completed"}},function(err,doc){
  
        res.json(doc);
        //console.log("here is resulrs")
       // console.log(doc);
    });
    // res.json(doc);
    //     console.log(doc);
});
app.put('/editedUseritUpdate',function(req,res)
{
    console.log(" sdfhdsfjhkjsdshfkjsdhfkjsdklfjlsdfj dsjhidhfiu sdfiuufu ")
    var id = req.body._id
        console.log(req.body)
       // console.log(req.body.barcode)
  
     // db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"Transaction":req.body.Transaction,"barcode":req.body.barcode,"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
     //     "gpcs":req.body.gpcs,"gwt":req.body.gwt,"itemName":req.body.itemName,"ntwt":req.body.ntwt,"rate":req.body.rate,"mrp":req.body.mrp,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,"withinstatecgst":req.body.withinstatecgst,
     //     "withinstatesgst":req.body.withinstatesgst,"outofstateigst":req.body.outofstateigst,"partyname":req.body.partyname, "orderStatus":req.body.orderStatus,"StockInward":"no",
     //    "wastage":req.body.wastage,"stval":req.body.stval,"labval":req.body.labval,"final":req.body.final,"invGroupAccNO":req.body.invGroupAccNO,"invGroupName":req.body.invGroupName,
     //   "transactionTypeId":req.body.transactionTypeId,"voucherClass":req.body.voucherClass,"voucherClassId":req.body.voucherClassId,"voucherDate":req.body.voucherDate,"voucherTime":req.body.voucherTime,
     //   "salesPerson":req.body.salesPerson,"AccNo":req.body.AccNo,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,'comboItem':req.body.comboItem,"billType":req.body.billType,"labcal":req.body.labcal,"pctcal":req.body.pctcal,
     //   "stonecal":req.body.stonecal,"purity":req.body.purity}},function(err,doc)
      
     //    {
     //        res.json(doc);
        
     //    });  
  
});

app.get('/getsaleInvoice_id:id1',function(req,res){
 // console.log("getsaleInvoice_id getsaleInvoice_id getsaleInvoice_id ");

  var id=req.params.id1;
  //var trans=req.query.Transaction;
  // console.log(id);
   // "_id" : ObjectId("597f10802fec641cfc8ec970"),
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.saleInvoice.find({_id:mongojs.ObjectId(id)},function(err,doc){
  
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
//   db.transactionDetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
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
// <<<<<<< HEAD
//      if(trans !="Sale Return"&&trans!="Purchase Return"&&trans!="Approval Sale"
//       && trans!='Approval Return' ){
//       console.log("First if 999999999999999999999999999");
//   db.transactionDetail.find({partyname:partyname,Transaction:trans,orderStatus:"Inprogress"},function(err,doc){
       
//         res.json(doc);
//         console.log("get details sent");
//         console.log(doc);
//     });
// }
// else{
  
//   if(voucherNo!=null){
//     console.log("loop for returing items vvvvvvvvvv8888888888");
//   db.transactionDetail.find({"voucherNo":voucherNo},function(err,doc){
//     res.json(doc);
//     console.log(doc);
//       });
//       }
//       else{
//         console.log("Not vvvvvvvvvv" );
//         console.log("no no");
//         res.json();//for returning empty response for making app.get to wait.
//       }
// }
// =======
    if(trans !="Sale Return"&&trans!="Purchase Return"&&trans!="Approval Sale"
       && trans!='Approval Return' && trans!='Urd Purchase'  ){
          console.log("First if 999999999999999999999999999");
          db.transactionDetail.find({partyname:partyname,Transaction:trans,orderStatus:"Inprogress"},function(err,doc){

          res.json(doc);
          console.log("get details sent");
          console.log(doc);
          });
    }else{
    

              if(voucherNo!=null){
                  console.log("loop for returing items vvvvvvvvvv8888888888");
                  db.transactionDetail.find({"voucherNo":voucherNo},function(err,doc){
                  res.json(doc);
                  console.log(doc);
                  });
              }else{
              
                      console.log("Not vvvvvvvvvv zero call" );
                      console.log("no no");
                      res.json([]);//for returning empty response for making app.get to wait.
                   }
         }//else close
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6
});

app.get('/voucherNoGetDetails',function(req,res){
 // console.log("I received request for details by id+++++++++------");
  var voucherNo = req.query.voucherNo;
  //var trans=req.query.Transaction;
 //  console.log(voucherNo);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactionDetail.find({"voucherNo":voucherNo},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});

app.get('/voucherNoGetDetailssaleInvoice/:data',function(req,res){
  //console.log("I received request for details by id+++++++++------");
  var voucher=req.params.data;
  //var trans=req.query.Transaction;
   //console.log(voucher);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.saleInvoice.find({"voucherNo":voucher},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});



app.get('/transactionDetailbyid:id',function(req,res){
  //console.log("I received request for details by id+++++++++------");
  var id=req.params.id;
  //var trans=req.query.Transaction;
  // console.log(id);
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactionDetail.find({_id:mongojs.ObjectId(id)},function(err,doc){
  
        res.json(doc);
       // console.log(doc);
    });
});

app.put('/tdetailupdatebyid:str1',function(req,res){
  //console.log("transactionDetailupdatebyid function called =========================================================");
  var str2=req.params.str1;
  //console.log(str2)
  var str_array = str2.split(",");
  var id =  str_array[0];
  var orderstatus = str_array[1];
  //console.log(id)
  //console.log(orderstatus)

  //var trans=req.query.Transaction;
   
  // db.useritem.find({partyname:partyname,Transaction:trans},function(err,doc){
  db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"orderStatus":orderstatus}},function(err,doc)
        {
        res.json(doc);
     //  console.log(doc)
       });
});
 
app.get('/getPartyDetailsNumber',function(req,res){
  console.log("I received a new username request for login and document saleinv lok here");
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
   if (trans=="Regular Sale") {
    db.saleInvoice.find({partyname:username,Transaction:trans, status : "In Progress"}).sort({_id:-1}).limit(1,function(err,doc){
        res.json(doc);
        //console.log("here is data in progress "+ doc);
       // console.log(doc);
    });
   }
   else{
    res.json([]);
   }
  
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

  
     db.transactionDetail.find({"partyname":partyname,"Transaction":trans,orderStatus:"Inprogress"},function(err,doc){ 
            
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
     db.transactionDetail.find({partyname:partyname,orderStatus:"completed"},function(err,doc){ 
    
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
    // db.transactionDetail.find({"TransactionType":trans,"orderstatus":"completed"},function(err,doc){ 
    // db.transactionDetail.find({"Transaction":trans,"orderStatus":"completed"},function(err,doc){ 
     if(trans == "Regular Sale"){
          db.saleInvoice.find({"Transaction":trans,"status":"completed"},function(err,doc){ 
         
             res.json(doc);
         });
        }else{
           // db.saleInvoice.find({ $and:[ {"voucherNo" : {  $ne: null } }, {  "Transaction" : "Urd Purchase"}]}
           db.saleInvoice.find({ $and:[ {"voucherNo" : {  $ne: null } }, {  "Transaction" :trans}]},function(err,doc){ 
         
         // db.saleInvoice.find({"Transaction":trans},function(err,doc){ 
         
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
// delete of barCodeSummaryarydelete
app.delete('/barCodeSummaryarydelete/:udelete',function(req,res)
{
   //console.log("i got the delete request");
    var id=req.params.udelete;
    //console.log(id);
    db.barCodeSummary.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
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
     db.transactionDetail.remove({ "barcode" :barcode});
     db.transactionDetail.remove({ "refid":barcode});
      db.transactionDetail.remove({  "compositeRef":barcode});
})

//for deleting inprogress regular saleInvoice data
app.delete('/deleteinprogress:id',function(req,res){
  var ids=req.params.id;
  console.log(ids+"ids ids ds ids ids");
  db.saleInvoice.remove({_id: mongojs.ObjectId(ids)},function(err,doc){

  })
})
//for tax new
app.get('/getTaxname:taxx',function(req,res)
{
   // console.log("i received a get request from count");
    var taxxx = req.params.taxx;
   var taxnamee=(taxxx);
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
       db.transactionDetail.update({"refid":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
         "gpcs":req.body.gpcs,"gwt":req.body.gwt,"name":req.body.iname,"ntwt":req.body.ntwt,"rate":req.body.rate,"size":req.body.size,"taxval":req.body.taxval,"stwt":req.body.stwt,
        "wastage":req.body.wastage,"stval":req.body.stval,"mrp":req.body.mrp,"labval":req.body.labval,'labamt':req.body.labamt,"labourTaxValue":req.body.labourTaxValue,'labamt':req.body.labamt,'stchg':req.body.stchg,
          "stonecal":req.body.stonecal,"pctcal":req.body.pctcal,"labcal":req.body.labcal,}},function(err,doc)
        {
           // res.json(doc);
        
        });
  
  

        db.transactionDetail.update({"barcode":req.body.barcode},{$set:{"chgunt":req.body.chgunt,"purity":req.body.purity,"date":req.body.date,"desc":req.body.desc,
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

      db.transactionDetail.update({"compositenum":req.body.compositenum,"compositeRef":req.body.compositeRef},{$set:{"chgunt":req.body.chgunt,"date":req.body.date,"desc":req.body.desc,
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
//     // db.transactionDetail.insert({barcode:barcode,},function(err,doc){
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
    console.log("i got the delete request");
   // var id=req.params.udelete;
    var str=req.params.udelete;
    console.log(str);
    var str_array=str.split(",");
    var id=str_array[0];
    
     db.transactionDetail.remove({_id:mongojs.ObjectId(id),"Transaction": { $ne: "Barcoding" }}, function(err, docs) {
      res.json("deleted");
    })
  
})
app.delete('/saleinv/:id',function(req,res)
{
   var id = req.params.id;
   console.log("i got the saleInvoice delete request ");
    
    //console.log(name);
    
     db.saleInvoice.remove({_id:mongojs.ObjectId(id)}, function(err, docs) {
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
app.delete('/tagdeleted12/:update',function(req,res){
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
//delete from barCodeSummary a new one
// app.put('/barcodedelete/:update',function(req,res)
// {
//     console.log("i got the tag update  request call call call");
//    var str=req.params.update;
//    // console.log(str);
//     var str_array=str.split(",");
    
    
//     var count = parseInt(str_array[0]);
//     console.log(count)
//     db.barCodeSummary.update({"count":count},{"$set":{"status":"completed"}},function(err, docs) {
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
    db.barCodeSummary.remove({"count":count})
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
//for getting receipt details
app.get('/getStoredReceipt:bill',function(req,res){
  var num=req.params.bill;
  console.log("num num num num num num num num num");
  db.receipts.find({"BillNo":num},function(err,doc){
    console.log(doc+"data retrived");
    res.json(doc);
  })
})
app.put('/updateBatchTransaction/:update',function(req,res)
{
    //console.log("entered into put request for saleInvoicedata saleInvoicedata update ");
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

// delete from database saleInvoice
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

    db.saleInvoice.remove({ "voucherNo" : req.params.update})
     db.trDetails.remove({ "vocuherNumber" : req.params.update})
      db.trHeaders.remove({ "vocuherNumber" : req.params.update})
       db.transactionDetail.remove({ "voucherNo" : req.params.update})

    //   "voucherNo"  db.saleInvoice.remove({"partyname":partyname,"Transaction":trans}, function(err, docs) {
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
// delete from database barcodetransactionDetailed
app.delete('/transactionDetaild',function(req,res)
{
    console.log("transactionDetaild req.query.barcode req.query.barcode req.query.barcode")
    var bar=req.query.barcode;
    var barcode = parseInt(bar)
    console.log(barcode)
    //  barcode=parseInt(barcode);

    db.transactionDetail.remove({"barcode":barcode}, function(err, docs) {

})
})
// delete from database transactionDetaile
app.delete('/transactionDetaile',function(req,res)
{
     console.log("req.query.barcode req.query.barcode req.query.barcode req.query.barcode")
   
     var barcode=req.query.barcode;
    console.log(barcode)
    db.transactionDetail.remove({"refid":barcode}, function(err, docs) {
})
})

//for item html get details
app.get('/getinventoryGroupMaster',function(req,res)
{
    db.inventoryGroupMaster.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/getitemType',function(req,res)
{
    db.itemType.find(function(err,doc){
        res.json(doc);
})
})
//for item html get details
app.get('/getsalesCategoryMaster',function(req,res)
{
    db.salesCategoryMaster.find(function(err,doc){
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
    db.items.find({}).sort({_id:-1},function(err,doc){
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
//      db.items.find({itemType: sale1},function(err,doc)
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
         db.items.find({}).sort({_id:-1},function(err,doc){
          //console.log("kkkkkkkkkkkkkkkkkkk")
          //console.log(doc.length)
       res.json(doc);
})

      }
      else{
        sale1 =" "+sale1;
     db.items.find({itemType: sale1}).sort({_id:-1},function(err,doc)
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
      res.json(docs)
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
         "itemType":req.body.itemType}},function(err,doc)
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
   db.taxation.find({}).sort({_id:-1},function (err, docs) {
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
 db.tax.find({}).sort({_id:-1},function (err, docs) {
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
//ledger account integration
app.get('/getLedgerAccont',function (req, res) {
  console.log("this is  editititem2 editititem2 editititem2a put request");
  //var sortOrder=req.query.sortOrder;
 

db.ledgeraccounts.findOne({accountName:(req.query.accountName).trim()}, function (err, doc) {
  res.json(doc);
  console.log("the edit details r" +doc)
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
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
  
   // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
  
//    // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
  
//    // db.transactionDetail.find({"barcode": tax1},function(err,doc){     
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
    name:req.body.name,outofstate: req.body.outofstate,withinstate: req.body.withinstate,SaleAc: req.body.SaleAc,PurchaseAC: req.body.PurchaseAC,salesId: req.body.salesId,purchaseId: req.body.purchaseId}},
    new: true}, function (err, doc) {

      res.json(doc);
    });
  });
  
  app.get('/purchasess',  function (req, res) {
   
    
console.log("jjjjjjj")
    db.ledgeraccounts.find({accountName: { $exists: true }},function(err,doc){
   
        res.json(doc);
})

  });

  //  app.get('/sales',  function (req, res) {
   
  //     db.inventoryGroupMaster.aggregate([{$project:{"SalesAcc.AccNo":1}},
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

//   db.transactionDetail.find({ date: {$gte:(fromdate), $lt: (reportdate)}},function (err, docs) {
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
       //console.log(fromdate)
       //console.log("current year date")

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
    

  // db.transactionDetail.find({ date: {$gte:(fromdate), $lt: (reportdate)}},function (err, docs) {
  //         //console.log(docs);
  //         res.json(docs);
  //   });
  if(barcode == "yes"){
        console.log("if yes");
        db.transactionDetail.aggregate([
                 {$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id:report ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
              res.json(docs);
          });

  }else{
          console.log("else no");
          db.transactionDetail.aggregate([
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
      db.transactionDetail.aggregate([
                 {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id :{purity:"$purity",itemName:"$itemName"} ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
               res.json(docs);
        });
      
    }else{

      db.transactionDetail.aggregate([
                 {$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
                 {$group:{_id:report ,weight:{$sum:inputweight},gpcs:{$sum:"$gpcs"}}},{ $sort : { _id: 1 } }
                 ],function (err, docs) {
                  //console.log(docs);
               res.json(docs);
        });
      
    }
        
});
//purity in report
app.get('/inventoryGroupMasterdetails',function(req,res)
{
   // console.log("inventoryGroupMasterdetails request from index");

    db.inventoryGroupMaster.find({},function(err,doc){
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
  db.transactionDetail.aggregate([
    { "$lookup": { 
        "from": "inventoryGroupValueNotation", 
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
   // db.inventoryGroupValueNotation.find({InvGroupID:itemgroupid},function(err,doc){
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
// in mainpgae getinventoryGroupValueNotation
app.get('/getinventoryGroupValueNotation/:data',function(req,res)
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

    db.inventoryGroupValueNotationDaily.find({date:currentdate},function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
//last date
app.get('/getinventoryGroupValueNotationlast',function(req,res)
{

    db.inventoryGroupValueNotationDaily.find({}).sort({_id:-1}).limit(1,function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})
 
app.get('/todayinventoryGroupValueNotation/:data',function(req,res){
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
    db.inventoryGroupValueNotationDaily.find({date: { $gt:(currentdate)}},function(err,doc){
        //console.log(doc);
        res.json(doc);
})
})

app.get('/groupAndCategoryBarcode',function(req,res){
    console.log("groupAndCategoryBarcode");
    
      // db.transactionDetail.find(
      //            {refid:Number(req.query.barcode)}
      //    ,function (err,doc) {
          
      //      // body...
      //    })
      db.transactionDetail.find({"refid" :  Number(req.query.barcode) , comboBarcode: { $exists: false }},function (err,doc) {
          //console.log(doc.length);
          console.log(" barcoded "+doc.length);
          res.json(doc);
         // res.json(doc);
          //upDateCall()
          })//db.transactionDetail.find
     //}
   // var itemgroupid=req.params.inGrpId;
});

app.get('/stockDetaildisplayBarcodedItems',function(req,res){
    console.log("stockDetaildisplayBarcodedItems");
    // var a=req.query.count;
    // console.log(a);

   // console.log(req.body.InvGroupName);
    
     if (req.query.SaleCategory != undefined && req.query.InvGroupName != undefined ) {
     //  console.log(req.query.InvGroupName);
     // console.log(req.query.SaleCategory);
      db.transactionDetail.aggregate([
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
      db.transactionDetail.aggregate([
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
      db.transactionDetail.aggregate([
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
      db.transactionDetail.find({"refid" :  Number(req.query.barcode) , comboBarcode: { $exists: false }},function (err,doc) {
          console.log(doc.length);
         // res.json(doc);
          upDateCall()
          })//db.transactionDetail.find
function upDateCall() {
   db.transactionDetail.update({"refid" :  Number(req.query.barcode) , comboBarcode: { $exists: false }},{$set:{"reset":true}},function (err,doc) {
          console.log(doc.length);
         // res.json(doc);
            aggregateCall()
          })//db.transactionDetail.update
}//function upDateCall() {
 function aggregateCall() {

// body...
           db.transactionDetail.aggregate([
                 {$match:{refid: { $exists: true },comboBarcode: { $exists: false }, "stats" : "Inprogress",   "InvGroupName" :req.query.InvGroupName, "SaleCategory" : req.query.SaleCategory, "reset" : true}}
         ],function (err,doc) {
          console.log(doc.length);
          res.json(doc);
           
         })//db.transactionDetail.aggregate
 }          

           
        
})
app.get('/stockUninstallReset',function(req,res){
    console.log("stockUninstallReset");
     console.log(req.query.id);
     console.log(req.params.id);
     db.transactionDetail.update({_id:mongojs.ObjectId(req.query.id)},{$set:{"reset":false }},function(err,doc)
        {
        res.json(doc);
        //console.log(doc)
       });

})
app.get('/stockVerifyPreview',function(req,res){

  console.log(" stockVerifyPreview   req.query.fromdate "+ req.query.fromdate)
 

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
   var newArray =[];


  function openingBalanceCall() {
    //  console.log("openingBalanceCall");
      return new Promise(function (resolve,reject) { 
         db.transactionDetail.aggregate([
      {$match:
          {date: { $gt:(fromdate), $lt: (reportdate)},stockInward:{  $ne: null },$and: [ { barcode: { $ne: "undefined" } }, { barcode: { $exists: true } } ] }
      },    
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory", stockInward:"$stockInward"},incount: { $sum: 1 },ingwt:{$sum:"$gwt"},ingpcs:{$sum:"$gpcs"}  }
      },
      
       {
          $project:{  SaleCategory: 1,stockInward: 1, incount: 1, ingwt:1,  ingpcs:1, cmpToYes: {  $cmp: [ "yes","$_id.stockInward" ] },    }
              
     },
     {$match:
                {cmpToYes:0}
     },
  ],function(err,doc1){         
    
      // console.log(doc1[0]);   
       db.transactionDetail.aggregate([
{$match:
      //db.inventory.find( { $and: [ { barcode: { $ne: undefined } }, { barcode: { $exists: true } } ] } )
      {date: { $gt:(fromdate), $lt: (reportdate) },stockInward:{  $ne: null },$and: [ { barcode: { $ne: "undefined" } }, { barcode: { $exists: true } } ] }
},    
      {  $group:
     
         {_id: { SaleCategory:"$SaleCategory", stockInward:"$stockInward"},incount: { $sum: 1 },ingwt:{$sum:"$gwt"},ingpcs:{$sum:"$gpcs"}  }
      },
       {
          $project:{SaleCategory: 1,stockInward: 1, incount: 1,  ingwt:1, ingpcs:1, cmpToNo: { $cmp: [ "no","$_id.stockInward" ] },}
       },
      {$match:{cmpToNo:0}
       },
     //     {
     //      $project:{  SaleCategory: 1,stockInward: 1, incount: 1, ingwt:1,  ingpcs:1, cmpToYes: {  $cmp: [ "yes","$_id.stockInward" ] },    }
              
     // },
     // {$match:
     //            {cmpToYes:0}
     // },
     
],function(err,doc){
       // console.log("doc");
       // console.log(doc[0]);
           function compareStockInwardYes(m) {
           
             compareStockInwardYesLength =  doc1.length;
             compareStockInwardNoLength =  doc.length;
              if (m< compareStockInwardYesLength) {
                   // console.log(doc1[m]._id.SaleCategory +" m "+m);
                   
                    function compareStockInwardNo(n) {
                      if (n< compareStockInwardNoLength) {
                             //console.log(doc[n]._id.SaleCategory +" n "+n);
                             if (doc[n]._id.SaleCategory == doc1[m]._id.SaleCategory) {
                                 //console.log(doc[n]._id.SaleCategory +" n "+n+" m "+m+ " doc1[m]._id.SaleCategory "+doc1[m]._id.SaleCategory);
                                 
                                  
                                   var obj = {"_id":{SaleCategory:doc1[m]._id.SaleCategory},opcount:doc1[m].incount - doc[n].incount ,
                                   opgwt:doc1[m].ingwt - doc[n].ingwt ,opgpcs:doc1[m]. ingpcs - doc[n]. ingpcs , };
                             
                                      newArray.push(obj);
                                     

                             }//if (doc[n]._id.SaleCategory == doc1[m]._id.SaleCategory) {
                              
                             compareStockInwardNo(n+1)
                      }//n< compareStockInwardNoLength
                        else{
                               // console.log(" m "+m+" n "+n);
                        
                               compareStockInwardYes(m+1);
                               
                                if (m == compareStockInwardYesLength-1 ) {
                                  // console.log(newArray);
                                   // console.log(" m "+m);
                                   if(newArray.length == 0){
                                    res.json(newArray)
                                    }
                                     resolve(newArray)
                                     openingBalance = newArray;
                                      console.log(" m "+m+ " openingBalance "+ openingBalance.length);
                                }//m == compareStockInwardYesLength-1
                                    
                            }
                    }//compareStockInwardNo
                    compareStockInwardNo(0);
              }
                  
           }//compareStockInwardYes()
       compareStockInwardYes(0)
       // res.json(doc1);
    })//doc
  })//doc1
    })//promise close
  }//openingBalanceCall

  function inwardBalanceCall() {
     return new Promise(function (resolve,reject) {
     // console.log("inwardBalanceCall");
      db.transactionDetail.aggregate([
{$match:
      {date:{ $gt:(samedateStart), $lt: (samedateEnd) },stockInward:"yes",$and: [ { barcode: { $ne: "undefined" } }, { barcode: { $exists: true } } ]},
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
      db.transactionDetail.aggregate([
{$match:
      {date: {$gt:(samedateStart), $lt: (samedateEnd) },stockInward:"no",$and: [ { barcode: { $ne: "undefined" } }, { barcode: { $exists: true } } ]},
},

      
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
                        
          }
         
       }
        
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


app.post('/postinventoryGroupValueNotation/:data',function(req,res)
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
     var id = str_array[8];
     console.log(update)
     console.log(str)

    // req.body.date = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
    // console.log(req.body[0].date4)
    // console.log(req.body[0].InvGroupID)
    //  console.log("date displayed uplokk")
   //  db.inventoryGroupValueNotationDaily.insert(req.body,function(err,doc)
   //  {
   //     console.log(doc)
   // res.json(doc);
   //  })
   if(update == "equal" ){
    console.log("update call");
   // db.inventoryGroupValueNotationDaily.update({"NotationID":NotationID ,"InvGroupID" :InvGroupID,"ValueNotation":ValueNotation,"ConversionPercentage":ConversionPercentage,
   //    "InvGroupName":InvGroupName,date:date},{$set:{"Rate":Rate}},function(err,doc)
   //      {
   //          //console.log(doc)
   //          res.json(doc);
   //      })
  
      db.inventoryGroupValueNotationDaily.update({_id : mongojs.ObjectId(id)},{$set:{"Rate":Rate }},function(err,doc)
        {
            //console.log(doc)
            res.json(doc);
        })
  }else{
      console.log("insert");
    db.inventoryGroupValueNotationDaily.insert({"NotationID":NotationID ,"InvGroupID" :InvGroupID,"ValueNotation":ValueNotation,"ConversionPercentage":ConversionPercentage,
      "Rate":Rate,"InvGroupName":InvGroupName,date:date},function(err,doc)
        {
           // console.log(doc)
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
app.post('/user12/:data',function(req,res){ 
  console.log('look up things syuasasdyusadsdhyasdbdfhudbasjdbashudbhdhy');
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var length = str_array.length;
    //console.log(length);
    var voucher = str_array[length - 1];
    for(var i =0;i<length - 1;i++){
    //  console.log("here is the length "+str_array[i]);
      db.transactionDetail.update({_id:mongojs.ObjectId(str_array[i])},{$set:{"voucherNo":voucher }},function(err,doc)
        {
        //res.json(doc);
        //console.log(doc)
       });
    }
});
    //new update on Approval sale
    app.put('/user13/:data',function(req,res){
      console.log('updating on approval sale');
      var str=req.params.data;
      var str_array=str.split(",");
      var id=str_array[0];
      var trans=str_array[1];
      var voucher=str_array[2];
      db.transactionDetail.update({_id:mongojs.ObjectId(id)},{$set:{"voucherNo":voucher,"Transaction":trans}},function(err,doc){
        res.json(doc);
      })
    });
    //console.log("voucher length "+voucher)
   // console.log('look up things syuasasdyusadsdhyasdbdfhudbasjdbashudbhdhy');


app.post('/saleInvoiceInvoice/:data',function(req,res)
{ 
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var id = str_array[0];
   // console.log(length);
    var voucher = str_array[1];
    
     db.saleInvoice.update({_id:mongojs.ObjectId(id)},{$set:{"voucherNo":voucher,"status":"completed"}},function(err,doc)
        {
        res.json(doc);
        //console.log(doc)
       });
   
    
     })
app.get('/getsaleInvoicedata/:data',function(req,res){ 
  var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var id = str_array[0];
  
     db.saleInvoice.find({_id:mongojs.ObjectId(id),"voucherNo": { $exists: true }},function(err,doc){
        res.json(doc);
        //console.log(doc)
       });
   
    
 })

app.get('/getLoginDetails',function(req,res)
{       
   // console.log("entered into new  trans data");
    var username=req.query.username;
    var password=req.query.password;
    // db.loginDetails.find({name:username,password:password},function(err,doc){ 
     
    //     res.json(doc);
       
    // });
    db.staff.find({name:username,password:password},function(err,doc){ 
     
        res.json(doc);
       
    });
});
//to convert string into number
// function convertionCall() {
//   console.log(" conversion call ");
//   db.transactionDetail.find().forEach( function (x) {
//    // if (x.outofstateigst != 'null') {
//       x.outofstateigst = parseInt(x.outofstateigst);
//       //}
//       x.withinstatecgst = parseInt(x.withinstatecgst);
//       x.withinstatesgst = parseInt(x.withinstatesgst);
//       db.transactionDetail.save(x);
//   });
// }


app.get('/trCollectionCreation/:data',function(req,res){ 
    //console.log('inVoiceSeriesConfig '+inVoiceSeriesConfig);
     configurationCall();   
   // console.log("entered into new  trans data");
//    function changeNumberType(voucher) {
//     db.trDetails.find().forEach( function (x) {
// x.amount = Number(x.amount);
// db.trDetails.save(x);
// });
        // db.transactionInvoice.update({"TransactionClass":classType})
                     
        //  db.trDetails.update({voucherId:voucher}, { $set: {"TransactionNo": 1 }}, { multi: true })
       // db.trHeaders.find({voucherId:128}).forEach( function(obj) { obj.amount = new parseFloat( obj.amount );db.trHeaders.save(obj); } );
   //}
    console.log("Discount Given Discount GivenDiscount getinventoryGroupValueNotation trCollectionCreation")
   res.json("100");
   var taxDuplicateCheck = [];
 var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var length = str_array.length;
    //console.log(length);
    var voucher = str_array[length - 1];
    // for(var i =0;i<length ;i++){
    //   console.log("str_array[i] "+str_array[i])
    // }

    //voucherId check
    var voucherId = 0;
    var voucherClass = null;
    db.trHeaders.find({}).sort({_id:-1}).limit(1,function(err,data){
        //res.json(doc);
        console.log(data.length);
        if (data.length == 0) {
            voucherId = 1;
        }else{
               voucherId =  Number(data[0].voucherId) ; 
               console.log(" voucher   voucher "+data[0].voucherId)
               voucherId++;
             }
    })
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
    var amountNet = null;
     var concat = null;
     var billtype = null;
      var voucherRowNumber = 0;
      var salesPerson = null;
      var refId ;
    findCall(req.query.salesIds);
    
    function findCall(argument) {
       db.saleInvoice.find({ "_id" : mongojs.ObjectId(argument)},function (err,res) {
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
     if (res[0].adj == 'null') {
        amountTotal = res[0].invoiceValue;
     }else{
        amountTotal = Decimal128.fromString(res[0].invoiceValue) + Decimal128.fromString(res[0].adj) ;
     }
     //Decimal128.fromString("636.45")
     amountNet = res[0].netamt;
     // console.log(suffix );
     //console.log(res[0].partyname);
     concat = "To "+res[0].partyname ;
     //console.log(concat);
     
     //to find voucherClass
     db.transactionSeriesInvoice.find({ "TransactionType" :voucherType },function (err,resData) {
            voucherClass =  resData[0].TransactionClass ;
     })
   

     //taxCall(res[0].tax1);
     //for not allowing urd purchase transactions
     if (voucherType != "Urd Purchase") {
             if (billtype == "Cash" ) {

                     if (voucherType == "RD Purchase") {
                         gstCall("Cash Paid", amountTotal);
                     }else{
                            //  gstCall("Cash on hand", amountTotal);
                          }
                    defaultBalanceSubscriber(name);
             }else{
                    defaultBalanceSubscriber(name);
                  }
           
             if (res[0].dis!=0) {
               gstCall("Discount Given",res[0].dis);
             }

             if (res[0].decimals!=0 && res[0].decimals!='' && res[0].decimals!='NaN' && res[0].decimals!= 'undefined') {
               gstCall("Round off sales",res[0].decimals);
             }
             groupDetails(vocuherNumber);
             taxCaluclations(m=0);
      }else{ // if (voucherType != "Urd Purchase") 

            defaultBalanceSubscriber(name);
             refId = "";
             db.transactionDetail.find({ "_id" : mongojs.ObjectId(str_array[0])},function (err,request) {
                            //    db.transactionDetail.find({ "_id" : mongojs.ObjectId(req.query.userIds)},function (err,request) {
                           salesPerson =  request[0].salesPerson;
                  gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,'Cr','L035') 
           
             })
            setTimeout(trHeader, 3000);
      }

   })
    }//finalCall
  trailRepeat  = "false" ; 
}//if trail
 
  

        
           
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
            // {$unwind:"$subgroup"},
            //   { "$project" :{ "subscriber" :1,"subgroup.MGID":1,cmpTo1: { $cmp: [ "$subgroup.SGID", "$ledger.groupID"] }}},
            //   {$match:{"cmpTo1" :0 }},
            //                  { "$lookup": { 
            //                 "from": "maingroups", 
            //                 "localField":   "MGID", 
            //                 "foreignField": "subgroup.MGID", 
            //                 "as": "mggroup"
            //              }
            // },
             // {$unwind:"$mggroup"},
             //  { "$project" :{ "subscriber" :1,"subgroup.MGID":1,"mggroup.MGID":1,"subgroup.SGID":1,"ledger.groupID":1,"mggroup.DefaultBalance":1 ,cmpTo2: { $cmp: [ "$subgroup.MGID", "$mggroup.MGID"] }}},
             //  {$match:{"cmpTo2" :0 }},
             //  { "$project" :{ "mggroup.DefaultBalance" :1}}
             
              
           ],function (err,result) {
        //console.log(result[0].mggroup.DefaultBalance);
         // body...
         insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,'Dr');
         // console.log("date         id     is   look       here insertCall ");
   // searchCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat)
  
       })

     }//defaultBalance
       function insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance) {
              if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                DefaultBalance = 'Dr';
              }else{
                  DefaultBalance = 'Cr';
              }
              voucherRowNumber++;
            db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate: new Date(currentdate),
           accountId:name,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
           
            })
       };//insertCall


         function taxCaluclations(m) {
         if (m<length) {
              console.log("str_array[i] "+str_array[m]+" m "+m+" len "+length);
              // m++;
              // taxCaluclations(m);
              if (m >= 0) {
                   db.transactionDetail.find({ "_id" : mongojs.ObjectId(str_array[m])},function (err,request) {
                            //    db.transactionDetail.find({ "_id" : mongojs.ObjectId(req.query.userIds)},function (err,request) {
                           salesPerson =  request[0].salesPerson;
                            //vocuherNumber = request[0].voucherNo;
                            if (request[0].Transaction == "RD Purchase") {
                              refId = request[0].RefId;
                            }else{
                              refId = "";
                            }
                            if(taxDuplicateCheck.indexOf(request[0].taxSelection) == -1) {
                                taxDuplicateCheck.push(request[0].taxSelection);
                                noRepeatedCall();
                            }else{
                                       m++;
                                       taxCaluclations(m);
                                       console.log(" nonon no  taxSelection "+request[0].taxSelection+" len ")
                                       
                                 }
                            function noRepeatedCall() {
                                  if (request[0].taxSelection != 'undefined') {
                                       db.transactionDetail.find({ "taxSelection" : request[0].taxSelection,voucherNo:request[0].voucherNo },function (err,data) {
                                           console.log(" taxSelection "+request[0].taxSelection+" len "+data.length);
                                          
                                    db.transactionDetail.aggregate([{$match:{ "taxSelection" : request[0].taxSelection,voucherNo:request[0].voucherNo}},
                                            { "$lookup": {  "from": "tax",   "localField":   "taxname", "foreignField":  "taxSelection", "as": "taxCollection"}},
                  
                                             { "$unwind": "$taxCollection" },
                                              { "$redact": { 
                                                  "$cond": [
                                                      { "$eq": [ "$taxSelection", "$taxCollection.taxname" ] }, 
                                                      "$$KEEP", 
                                                      "$$PRUNE"
                                                  ]
                                              }},
                                             //{$group:{_id :{taxSelection:"$taxSelection","purchaseId":"$taxCollection.purchaseId","salesId":"$taxCollection.salesId"} ,
                                             //sgst:{$sum:"$withinstatesgst"},
                                            //   cgst:{$sum:"$withinstatecgst"},igst:{$sum:"outofstateigst"}
                                            {$group:{_id :{taxSelection:"$taxSelection","purchaseId":"$taxCollection.purchaseId","salesId":"$taxCollection.salesId",
      "PurchaseAC":"$taxCollection.PurchaseAC","SaleAc":"$taxCollection.SaleAc","withinstate":"$taxCollection.withinstate" } ,
   sgst:{$sum:"$withinstatesgst"},
                                                   cgst:{$sum:"$withinstatecgst"},igst:{$sum:"$outofstateigst"}     
                                               }} ],function (err,data1) {
                                                       console.log(data1);
                                                       //console.log("  enteretrweytwqywteqweyt "+data1[0]._id.withinstate)
                                                    if (data1[0]._id.withinstate == "yes") {
                                                        // console.log(" start  enteretrweytwqywteqweyt ")
                                                        // console.log(data1);
                                                        // console.log(data1[0]._id.salesId);
                                                        // console.log(data1[1]._id.salesId);
                                                        // console.log(data1[0].sgst);
                                                        //  console.log(data1[0].cgst);

                                                        // console.log(data1[0]._id.purchaseId);
                                                        // console.log(data1[1]._id.purchaseId);
                                                        if (voucherType != "RD Purchase") {
                                                           // gstCall(data1[0]._id.salesId,data1[0].sgst);
                                                           // gstCall(data1[1]._id.salesId,data1[1].cgst );
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].sgst,concat,'Cr',data1[0]._id.salesId) 
       
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[1].cgst,concat,'Cr',data1[1]._id.salesId) 
       
                                                        }else if(voucherType == "RD Purchase"){
                                                           // gstCall(data1[0]._id.purchaseId,data1[0].sgst);
                                                           // gstCall(data1[1]._id.purchaseId,data1[1].cgst);
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].sgst,concat,'Dr',data1[0]._id.purchaseId) 
       
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[1].cgst,concat,'Dr',data1[1]._id.purchaseId) 
         
                                                        }
                                                    } else if(data1[0]._id.outofstate == "yes"){
                                          
                                                                if (voucherType != "RD Purchase") {
                                                                       gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].igst,concat,'Cr',data1[0]._id.salesId) 
       
                                                                     //gstCall(data1[0]._id.salesId,data1[0].igst );
                                                                }else if(voucherType == "RD Purchase"){
                                                                       gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].igst,concat,'Dr',data1[0]._id.purchaseId) 
       
                                                                    // gstCall(data1[0]._id.purchaseId,data1[0].igst);
                                                                }
                                            
                                                    }

                                                        m++;
                                                          taxCaluclations(m);
                                               })//aggregate



                                       })//find
                                      
                                 };//taxSelection undefined
                            }//noRepeatedCall
                            
                          
                  })//transactionDetail

              }// if (m == 0)
         }//  if (m<length)

    }//taxCaluclations
    
      
  function gstCall(gst,gstamount) {
      console.log(" gst "+gst)
       db.ledgeraccounts.find({"accountName" : gst },function (err,response) {
           //gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,gstamount,narration,response[0].mggroup.DefaultBalance,response[0].accountName) 
           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,gstamount,concat,'Cr',response[0].accountIds) 
         
       }) 
 
  }//gstCall
  
      
 function gstInsertCall  (currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance,accountName) {
           
            if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                DefaultBalance = 'Cr';
            }else{
                DefaultBalance = 'Dr';
            }
   
              voucherRowNumber++;
              amountTotal = parseFloat(amountTotal).toFixed(2);
             db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate:new Date(currentdate),
                 accountId:accountName,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
           
            })
}//gstInsertCall
 function groupDetails(argument) {
   // body...
   console.log(" hjjjjjjjjjjjjjjjj hyyujjjjjjjjjj "+argument)
    // $scope.TransactionPurchase = [{"TransactionType":"Regular Sale"},{"TransactionType":"Purchase Return"}, {"}, {"}, {"TransactionType":"Approval Sale"}]
   if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
   // if(voucherType.toUpperCase().match(/SALE/g)  == "SALE"){
    //alert("Sale ")
    db.transactionDetail.aggregate([
      {$match:{"voucherNo" :argument  }},
       { "$lookup": { 
                            "from": "inventoryGroupMaster", 
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
                //console.log("trHeader j"+j);
                 // trHeader()
                  setTimeout(trHeader, 3000);
                 }
             }
             
           
            })
   // $scope.TransactionSales = [{"TransactionType":"Urd Purchase"},{"TransactionType":"RD Purchase"},{"TransactionType":"Sale Return"},{"TransactionType":"Receipt Voucher"},{"TransactionType":"Approval Return"}]//TransactionType == "Valuation"
   
    }else if(voucherType == 'Urd Purchase' || voucherType == "RD Purchase" ||voucherType == "Sale Return" ||voucherType == "Receipt Voucher"){
     //}else if(voucherType.toUpperCase().match(/PURCHASE/g) == "PURCHASE"){
     
          db.transactionDetail.aggregate([
      {$match:{"voucherNo" :argument  }},
         { "$lookup": { 
                            "from": "inventoryGroupMaster", 
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
                  //trHeader()
                  setTimeout(trHeader, 3000);
                 }
             }
             
           
            })
    }

  
 
}//groupcall


 function trHeader() {
   console.log("trHeader call1")
     //db.trDetails.find({vocuherId:vocuherId},function(err,doc){
       // res.json(doc);
           console.log("voucherType voucherType voucherType voucherType voucherType "+salesPerson)
          // console.log(doc);
          db.trHeaders.insert({voucherId:voucherId,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(currentdate),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:refId,
                amount:Decimal128.fromString(amountTotal),numberOfDetails:voucherRowNumber,userId:salesPerson,narration:'',remarks:''},function (err,res) {
               
               // changeNumberType(voucherId)
                if (voucherType != 'Urd Purchase') {
                      voucherId =  voucherId+1;
                      voucherRowNumber = 0;

                     if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                          //DefaultBalance = 'Dr';
                          insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountNet,concat,'Dr');
                          //gstCall("Cash on hand", amountTotal);
                          receiptAndPaymentCallTrDetails(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountNet,concat,'Cr','L011')
                     
                     }else{
                          DefaultBalance = 'Cr';
                          insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance);
                         // gstCall("Cash on hand", amountTotal);
                          receiptAndPaymentCallTrDetails(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,'Dr','L013')
                     }
             }//urd purchase  

          })
      
   
 }//trHeader

function receiptAndPaymentCallTrDetails  (currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance,accountName) {
           
              voucherRowNumber++;
             db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate:new Date(currentdate),
                 accountId:accountName,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
                  
               if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                    inVoiceCall('Receipts',inVoiceSeriesConfig) 
               }else{
                    inVoiceCall('Payment',inVoiceSeriesConfig) 
              }
                  
            })
}//receiptAndPaymentCallTrDetails 
function inVoiceCall(Transaction,voucherSeriesType) {
   console.log("  inVoiceCall inVoiceCallinVoiceCall check ");
   
  var Transaction = Transaction;
  
  var voucherSeriesType =  voucherSeriesType;
  var classType = null;
  db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
   // console.log(doc);
    classType = doc[0].TransactionClass;
  })
  db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
        //
    console.log(" record transactionInvoice "+doc.length);
      if (doc.length == 0) {
          console.log(" insert call ");
          insertNewTransactionInvoice();
      }else{
              console.log(" update  call ");
              insertUpdateTransactionInvoice();
           }
  })//transactionInvoice
  function insertNewTransactionInvoice() {
     // console.log(" insertNewTransactionInvoice call ");
      db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
            // console.log(doc);
            if (voucherSeriesType == "StartingTransactionClassNo" ) {
                    var voucherSeries =  doc[0].StartingTransactionClassNo ;
                    db.transactionInvoice.find({"TransactionClass":classType},function(err,doc1){
                        if (doc1.length == 0) {
                         // var TransactionNoCheck = 
                          voucherSeries =  doc[0].StartingTransactionClassNo ;
                
                        }else{
                          voucherSeries = Number(doc1[0].TransactionNo) +1;
                        }
                      //console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      //console.log(" if multi  check udate call "+doc1[0].TransactionNo);
                      db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true })
                           
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                            console.log(doc.TransactionPrefix+doc.TransactionNo);
                             receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)
                             //res.json(doc.TransactionPrefix+doc.TransactionNo);
                        })
                    })
          
            }else{
                    var voucherSeries =  doc[0].StartingTransactionTypeNo ;
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                          console.log(doc.TransactionPrefix+doc.TransactionNo);
                          // res.json(doc.TransactionPrefix+doc.TransactionNo);
                           receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)

                        })

                 }
          
      })
  }//insertNewTransactionInvoice
   function insertUpdateTransactionInvoice() {
      console.log("insertUpdateTransactionInvoice");

      if (voucherSeriesType == "StartingTransactionClassNo" ) {
              
                    //var voucherSeries =  doc[0].StartingTransactionClassNo ;
          
               db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true },function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log(" if multi "+classType);
                     //  res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
      }else{
              db.transactionInvoice.update({"TransactionType":Transaction},  { $inc: {"TransactionNo": 1 }},function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log("else one "+classType);
                      // res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
           }
     
      
   }//insertUpdateTransactionInvoice
//});
}//inVoiceCall

 function receiptAndPaymentCallTrHeaders(vocuherNumber,voucherType,voucherClass,suffix) {
                           
   db.trHeaders.insert({voucherId:voucherId,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(currentdate),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:refId,
                amount: Decimal128.fromString(amountNet),numberOfDetails:voucherRowNumber,userId:salesPerson,narration:'',remarks:''},function (err,res) {
               // changeNumberType(voucherId)
               })
 }//receiptAndPaymentCall


});//trCollectionCreation
//}
//checkcall()

 
app.get('/reportResult/:data',  function (req, res) {
    console.log("receiveonedate receiveonedate receiveonedatereportonedate")
    var  printary = [];
      var lengthitemNamesort = null;
      var printfinalary = [];
      var result = [];
      var result1 = [];

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
    var remainingItems1 = [];

     var orderSort1 = reportdata[5];
      var orderSort2 = reportdata[6];
      var orderSort3 = reportdata[7];
      var orderSort4 = reportdata[8];
        var stockPoint = reportdata[9];
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

    console.log(" reportdate reportonedate reportonedate reportdate  "+reportdate)
 // function document() {
  db.transactionDetail.aggregate([
                 //{$match:{'refid': {$exists: true, $ne: null }, date: { $gt:(fromdate), $lt: (reportdate) }}},
               {$match:{ "stockPoint" : stockPoint,stockInward:"yes", date: { $gt:(fromdate), $lt: (reportdate) }}},
               
                 
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
                 result =result;
                 console.log("remainingItems "+remainingItems.length);
                   // body...
                   db.transactionDetail.aggregate([
                    //{$match:{"Transaction": { $ne: NaN }, "barcodeNumber": { $ne: NaN }, "orderStatus":"completed" , date: { $gt:(fromdate), $lt: (reportdate) }}},
                      {$match:{ "stockPoint" : stockPoint,orderStatus: { $exists: true },stockInward:"no", date: { $gt:(fromdate), $lt: (reportdate) }}},
              
                 
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
                    console.log("result12 "+result1.length);
                     console.log(result1)
                     remainingItems1 =result1;
                     result1 = result1;
                  if (result1.length == 0 && remainingItems.length == 0) {
                      // console.log(m+""+z+" 00000  final send");
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
              var checkCall0 = 0;
              function zIteration(z) {
                if (z < 0 && checkCall0 == 0) {
                  addNoRepeatItems()
                }
                if (z >= 0) {
                   mIteration(result1.length-1)
                       function mIteration(m) {
                        //console.log(" zIteration "+ z+" result1.length "+result1.length+" m12mIteration "+m);
                              if (result1.length == 0 ) {
                                  addNoRepeatItems()
                              }else{// if (result1.length == 0
                                      if (m >= 0) {
                                       // console.log(" mIteration "+ m+" zIteration "+ z);
                                        //console.log(result);
                                          //console.log("")
                                        // console.log(result1[m]._id.purity);
                                            if (result1[m]._id.saleCategory == result[z]._id.saleCategory &&result1[m]._id.purity == result[z]._id.purity && result1[m]._id.itemName == result[z]._id.itemName  && result1[m]._id.Group == result[z]._id.Group   ) {
                                                     var obj = {};
                                                     obj["item"] = result1[m]._id.itemName;
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
                                                     remainingItems1 = remainingItems1.filter((item) => item !== result1[m]);
                                                     
                                                     //console.log(remainingItems)
                                                     console.log("remainingItems "+remainingItems.length+" remainingItems1 "+remainingItems1.length);
                                                     // console.log(report1);
                                                    // console.log(remainingItems1)
                                                      // delete remainingItems[r]
                                            }    

                                            

                                             // if (m== 0 && z == 0) {
                                              if (m == 0 && z == 0) {
                                               // console.log(m+" addNoRepeatItems "+z)
                                              
                                                addNoRepeatItems();
                                                checkCall0 = 1;
                                                //setTimeout(addNoRepeatItems(), 1000);
                                              }//if m==0 
                                                if (m == 0) {
                                                  // console.log(" m12 == 0  ") 
                                                    z--;
                                                    zIteration(z);
                                              }//if (m == 0)
                                        m--;
                                        mIteration(m);
                                        
                                      }// if (m >= 0)
                                  }//else close
                          
                        }//mIteration()
                       

                } //if (z >= 0) {
                
              }//zIteration()
              zIteration(result.length-1)
                  
   function addNoRepeatItems() {
          console.log(" enter into function addNoRepeatItems");
          var checkCall = 0;
          function zIteration1(z) {
             if (z < 0 && checkCall == 0 ) {
                  addNoRepeatItemsStockNo()
                  console.log("zz<0 "+z)
             }
                if (z >= 0) {
                   console.log("zz12>0 "+z)
                //   var avoidNegative = 0 ;
                //   if ((remainingItems.length - 1) == 1) {
                //         avoidNegative = 0
                //   }else{
                //         avoidNegative = 0
                //   }

                   mIteration1(remainingItems.length - 1)
                       function mIteration1(m) {
                        //console.log(" zIteration "+ z+" result1.length "+result1.length+" m12mIteration "+m);
                              if ( remainingItems.length == 0) {
                                  addNoRepeatItemsStockNo()
                              }else{// if (result1.length == 0
                                      if (m >= 0) {
                                      //  console.log(" mIteration "+ m+" zIteration "+ z);
                                        //console.log(result);
                                          //console.log("")
                                        // console.log(result1[m]._id.purity);
                        if (remainingItems[m]._id.saleCategory == result[z]._id.saleCategory && remainingItems[m]._id.purity == result[z]._id.purity && remainingItems[m]._id.itemName == result[z]._id.itemName  && remainingItems[m]._id.Group == result[z]._id.Group   ) {
                                var obj = {};
                                   obj["item"] = remainingItems[m]._id.itemName;
                                 
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
                                   
                                  
                            } //if closer  if (remainingItems[m]._id.purity


                         

                                            

                                             // if (m== 0 && z == 0) {
                                               if (m == 0 && z == 0) {
                                               // console.log(m+" addNoRepeatItemsStockNo "+z)
                                                checkCall = 1;
                                                addNoRepeatItemsStockNo()
                                              }//if m==0 
                                                if (m == 0) {
                                                   //console.log(" m12  == 0  ") 
                                                    z--;
                                                    zIteration1(z);
                                              }//if (m == 0)
                                        m--;
                                        mIteration1(m);
                                        
                                      }// if (m >= 0)
                                  }//else close
                          
                        }//mIteration()
                       

                } //if (z >= 0) {
                
              }//zIteration()
              zIteration1(result.length-1)

    }//addNoRepeatItems

    function addNoRepeatItemsStockNo() {
        console.log(" enter into function addNoRepeatItemsStockNo "+remainingItems1.length);
           var checkcall1 = 0;
          function zIteration2(z) {
               if (z < 0 && checkcall1 == 0 ) {
                  finalCallDisplay(0,0)
                }
                if (z >= 0) {
                  console.log(" z addNoRepeatItemsStockNo "+z);
             
                   mIteration2(remainingItems1.length - 1)
                       function mIteration2(m) {
                             if ( remainingItems1.length == 0) {
                                 // addNoRepeatItemsStockNo();
                                  //console.log(" ==0  zIteration "+ z+" result1.length "+result1.length+" remainingItems1.length"+m);
                        
                                 finalCallDisplay(m,z);

                              }else{// if (result1.length == 0
                                      if (m >= 0) {
                                       // console.log(" mIteration "+ m+" zIteration "+ z);
                                        //console.log(result);
                                          //console.log("")
                                         //console.log(result1[z]);
                                           //console.log(remainingItems1[m]._id.purity);
                        if (remainingItems1[m]._id.saleCategory == result1[z]._id.saleCategory && remainingItems1[m]._id.purity == result1[z]._id.purity && remainingItems1[m]._id.itemName == result1[z]._id.itemName  && remainingItems1[m]._id.Group == result1[z]._id.Group   ) {
                                var obj = {};
                                   obj["item"] = remainingItems1[m]._id.itemName;
                                 
                                   // obj["rcvQty"] =  remainingItems[m].rccQty;
                                   // obj["rcvPcs"] = remainingItems[m].rccPcs;
                                   // obj["totQty"] = remainingItems[m].rccQty;
                                   // obj["totPcs"] = remainingItems[m].rccPcs;
                                   obj["rcvQty"] = 0;
                                   obj["rcvPcs"] = 0;
                                   obj["totQty"] = 0;
                                   obj["totPcs"] = 0;
                                   obj["issQty"] = remainingItems1[m].issQty;
                                   obj["issPcs"] = remainingItems1[m].issPcs;
                                   obj["ciQty"] = -(remainingItems1[m].issQty); 
                                   obj["ciPcs"] = -(remainingItems1[m].issPcs);
                                   obj["group"] = remainingItems1[m]._id.Group;
                                   obj["purity"] = remainingItems1[m]._id.purity;
                                   obj["salesCtg"] = remainingItems1[m]._id.saleCategory;
                                   report1.push(obj);
                                   
                                  
                            } //if closer  if (remainingItems[m]._id.purity


                         

                                              

                                             // if (m== 0 && z == 0) {
                                              if (m == 0 && z == 0) {
                                                console.log(m+"  finalCallDisplay "+z)
                                              finalCallDisplay(m,z); 
                                              checkcall1 = 1;
                                               // addNoRepeatItemsStockNo()
                                              }//if m==0 

                                              if (m == 0) {
                                                 //  console.log(" m12  == 0  ") 
                                                    z--;
                                                    zIteration2(z);
                                              }//if (m == 0)
                                        m--;
                                        mIteration2(m);
                                        
                                      }// if (m >= 0)
                                  }//else close
                          
                        }//mIteration()
                       

                } //if (z >= 0) {
                
              }//zIteration()
              zIteration2(result1.length-1)
     // 

      
    }//addNoRepeatItemsStockNo(m,z)
    function finalCallDisplay(m,z) {
        console.log(" finalCallDisplay " + m +" m "+z+" z")
       //if (m==0 && z == 0) {
                                              //  console.log(m+""+z+" final send")
                                                 // res.json(report1);
                                                  db.trail.insert(report1,function(err,doc){
                      
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

                      
                        //   }//if m==0 
      
    }//finalCallDisplay
                  // function sendResponse() {
                  //   // body...
                  //    const timeoutSendResponse = setTimeout(() => {
                  //    // res.json(report1);
                  //     sendResponseInsert() 
     
                  //   }, 100);// timeoutSendResponse
                  // }//sendResponse
                // function sendResponseInsert() {  
                    // for(var k = 0;k< report1.length;k++){
                        
                    //      //  if( printary.indexOf(report1[k].group) == -1) {
                    //      //         // alert("entered to remove duplicates ")
                    //      //       var obj3 = {};
                    //      //        obj3["group"] = report1[k].group;
                            
                                 
                                   
                    //      //         printary.push(report1[k].group);
                    //      //          printfinalary.push(obj3)
                    //      //         // console.log(printary)
                    //      //          //  alert(arrcon)
                    //      // }
                    //       // obj["salesCtg"] = report1[k].salesCtg;
                    //  if( printary.indexOf(report1[k].salesCtg) == -1) {
                    //              // alert("entered to remove duplicates ")
                    //            var obj3 = {};
                    //             obj3["salesCtg"] = report1[k].salesCtg;
                            
                                 
                                   
                    //              printary.push(report1[k].salesCtg);
                    //               printfinalary.push(obj3)
                    //              // console.log(printary)
                    //               //  alert(arrcon)
                    //      }
                    //      if( printary.indexOf(report1[k].purity) == -1) {
                    //      // alert("entered to remove duplicates ")
                    //        var obj3 = {};
                           
                    //         obj3["purity"] = report1[k].purity;
                    //         printary.push(report1[k].purity);
                    //          printfinalary.push(obj3)
                    //          var obj = {};
                    //                obj["item"] = report1[k].item;
                    //                obj["opQty"] = report1[k].itemopQty;
                    //                obj["opPcs"] = report1[k].itemopPcs;
                    //                obj["rcvQty"] = report1[k].rcvQty;
                    //                obj["rcvPcs"] = report1[k].rcvPcs;
                    //                obj["totQty"] = report1[k].totQty;
                    //                obj["totPcs"] = report1[k].totPcs;
                    //                obj["issQty"] = report1[k].issQty ;
                    //                obj["issPcs"] = report1[k].issPcs;
                    //                obj["ciQty"] = report1[k].ciQty;
                    //                obj["ciPcs"] = report1[k].ciPcs;
                    //               //  obj["salesCtg"] = report1[k].salesCtg;
                    
                    //                printfinalary.push(obj)
                    //       // console.log(printary)
                    //        console.log(printfinalary)
                    //       // $scope.reportonedate1 =printfinalary;
                    //         console.log(" x4 = yield ");
                    //        //  alert(arrcon)
                    //      }else{
                    //                var obj = {};
                    //                obj["item"] = report1[k].item;
                    //                obj["opQty"] = report1[k].opQty;
                    //                obj["opPcs"] = report1[k].opPcs;
                    //                obj["rcvQty"] = report1[k].rcvQty;
                    //                obj["rcvPcs"] = report1[k].rcvPcs;
                    //                obj["totQty"] = report1[k].totQty;
                    //                obj["totPcs"] = report1[k].totPcs;
                    //                obj["issQty"] = report1[k].issQty ;
                    //                obj["issPcs"] = report1[k].issPcs;
                    //                obj["ciQty"] = report1[k].ciQty;
                    //                obj["ciPcs"] = report1[k].ciPcs;
                    //               // obj["salesCtg"] = report1[k].salesCtg;
                    
                    //                printfinalary.push(obj)
                    //                    console.log(printfinalary)
                    //                //  $scope.reportonedate1 =printfinalary;
                    //                  // console.log(" x4 = yield ");

                    //           }
                    //         if ( k == report1.length-1) { 
                    //           sendResponseCallFinal()
                    //         }//k == report1.length-1
                    //    }//for loop
                       //   function sendResponseCallFinal() {
                       //   const timeoutSendData = setTimeout(() => {
                       //      res.json(printfinalary);
                       //    // sendResponseInsert() 
     
                       //   }, 100);
                       // }
                   //  }//responseInsert

                 } );
                 });


  }) //reportResult
//groupWiseControllers
app.get('/groupWiseHeaders',function(req,res){
   db.inventoryGroupMaster.find({}).sort({"sortOrder" :1},function(err,doc)
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
//    db.inventoryGroupMaster_copy.find({}).sort({"sortOrder" :1},function(err,doc)
//     {
//         res.json(doc);
//         //console.log(doc);
//     })
 
// })

// printCompositeItems in pdf
app.get('/printCompositeItems',function(req,res){
    var compositeRef = req.query.compositeRef;
    var compositenum = req.query.compositenum;
   
    console.log("i received a get request from user");
   
    db.transactionDetail.findOne({"compositeRef":Number(req.query.compositeRef),"compositenum":Number(req.query.compositenum)},function(err,doc1){
       // console.log(doc1.compositenum);
        res.json(doc1);
    })
})

//for getting bill data for pdf.html
app.get('/getbilldata:num',function(req,res){
  var billno=req.params.num;
  console.log( " cjdsfhjdgfhj "+billno)
  db.receipts.find({"BillNo":billno},function(err,doc){
    console.log(doc);
    res.json(doc);
  });
});

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
 // db.transactionDetail.aggregate([])
    db.transactionDetail.aggregate([
      {$match:
      {date: { $gt:(req.query.fromdate), $lt: (req.query.todate) },
       "Transaction" : req.query.Transaction,
      //refid: { $exists: true },
     // "TransactionClass" : "Sale"
  
      },
},
{ "$lookup": { 
        "from": "inventoryGroupMaster", 
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
           db.inventoryGroupMaster.find({}).sort({"sortOrder" :1},function(err,result){
        //    db.inventoryGroupMaster.find({}).sort({"sortOrder" :1},function(err,result){
          
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
require('./public/inventoryDbs/defaultCollections')(app);
app.listen(8000); 
console.log("server running on port 8000");
//var MongoClient = require('mongodb').MongoClient;


// db.tags2.insertOne({ x: NumberDecimal('0.1') })
//db.tags2.insert({a:Decimal128.fromString("636.45")})
// var X=new NumberDecimal("100");
// db.tags2.insert({a: X})

exports = module.exports = app;
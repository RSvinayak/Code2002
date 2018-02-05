 
    module.exports = function (app) {

    var fs = require('fs');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var ObjectID = require('mongodb').ObjectID;
    var mongojs=require('mongojs');
    var db=mongojs('inventory202',['user','tags','transaction','saleinvoice','mode','transactiondetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barcodesumm','stockpointmaster','configurations','inventorygroupmaster','salescategorymaster','itemtype','taxrate',
  'items','tax','taxation','inventoryGroupAccMaster','inventorygroupvaluenotationdaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails','trail','staff']);

    /* -------------------------------------------------------------------------
                            Initialization - Start
       ------------------------------------------------------------------------- */
    var readFile = function (filePathWithName) {
        var fileData = fs.readFileSync(filePathWithName, "utf8");
        return fileData;
    }

    var readDropDownFile = function () {
        var filepath = "./public/inventoryDbs/dropDownValues.json"
        var data = readFile(filepath);
        if (data != null) {
            defaultDropDown = JSON.parse(data);
            //console.log(defaultDropDown);
            insertDropDownValues(defaultDropDown);
        } else {
            console.log("Error while reading file from : " + filepath);
        }
    }

    var insertDropDownValues = function (defaultDropDown) {
         
          db.pct.find(function (err, pctValues) {
                if (pctValues.length == 0) {
                    var pctInsert = defaultDropDown.dropDown[0];
                    console.log(pctInsert.maingroup.length);
                    for (var pctIndex = 0; pctIndex < pctInsert.maingroup.length; pctIndex++) {
                            var pctObj = { "name": pctInsert.maingroup[pctIndex].name, "type": pctInsert.maingroup[pctIndex].type }
                            db.pct.insert(pctObj, function (err, mc) { });
                    }           

                    console.log(" iam pct null");
                }

          })
          db.itemtype.find(function (err, itemtypeValues) {
                if (itemtypeValues.length == 0) {
                    var itemtypeInsert = defaultDropDown.dropDown[1];
                    //console.log(itemtypeInsert.maingroup.length);
                    for (var itemtypeIndex = 0; itemtypeIndex < itemtypeInsert.maingroup.length; itemtypeIndex++) {
                            var itemtypeObj = { "ItemTypeId": itemtypeInsert.maingroup[itemtypeIndex].ItemTypeId, "TypeName": itemtypeInsert.maingroup[itemtypeIndex].TypeName }
                            db.itemtype.insert(itemtypeObj, function (err, mc) { });
                    }           
                }
          })
           db.bank.find(function (err, bankValues) {
                if (bankValues.length == 0) {
                    var bankInsert = defaultDropDown.dropDown[2];
                    //console.log(itemtypeInsert.maingroup.length);
                    for (var bankIndex = 0; bankIndex < bankInsert.maingroup.length; bankIndex++) {
                            var bankObj = { "name": bankInsert.maingroup[bankIndex].name }
                            db.bank.insert(bankObj, function (err, mc) { });
                    }           
                }
          })
           db.mode.find(function (err, modeValues) {
                if (modeValues.length == 0) {
                    var modeInsert = defaultDropDown.dropDown[3];
                    //console.log(itemtypeInsert.maingroup.length);
                    for (var modeIndex = 0; modeIndex < modeInsert.maingroup.length; modeIndex++) {
                            var modeObj = { "name": modeInsert.maingroup[modeIndex].name }
                            db.mode.insert(modeObj, function (err, mc) { });
                    }           
                }
          })
           db.labcal.find(function (err, labcalValues) {
                if (labcalValues.length == 0) {
                    var labcalInsert = defaultDropDown.dropDown[4];
                    //console.log(itemtypeInsert.maingroup.length);
                    for (var labcalIndex = 0; labcalIndex < labcalInsert.maingroup.length; labcalIndex++) {
                            var labcalObj = { "name": labcalInsert.maingroup[labcalIndex].name }
                            db.labcal.insert(labcalObj, function (err, mc) { });
                    }           
                }
          })
          db.uom.find(function (err, uomValues) {
                if (uomValues.length == 0) {
                    var uomInsert = defaultDropDown.dropDown[5];
                    //console.log(itemtypeInsert.maingroup.length);
                    for (var uomIndex = 0; uomIndex < uomInsert.maingroup.length; uomIndex++) {
                            var uomObj = { "name": uomInsert.maingroup[uomIndex].name }
                            db.uom.insert(uomObj, function (err, mc) { });
                    }           
                }
          })
          db.staff.find(function (err, staffValues) {
                if (staffValues.length == 0) {
                    var staffInsert = defaultDropDown.dropDown[6];
                    
                    for (var staffIndex = 0; staffIndex < staffInsert.maingroup.length; staffIndex++) {
                            var staffObj = { "name": staffInsert.maingroup[staffIndex].name,"password": staffInsert.maingroup[staffIndex].password ,"desgination": staffInsert.maingroup[staffIndex].desgination  }
                            db.staff.insert(staffObj, function (err, mc) { });
                    }           
                }
          })
          db.salescategorymaster.find(function (err, salescategorymasterValues) {
                if (salescategorymasterValues.length == 0) {
                    var salescategorymasterInsert = defaultDropDown.dropDown[7];
                    
                    for (var salescategorymasterIndex = 0; salescategorymasterIndex < salescategorymasterInsert.maingroup.length; salescategorymasterIndex++) {
                            var salescategorymasterObj = { "SaleCategoryNo": salescategorymasterInsert.maingroup[salescategorymasterIndex].SaleCategoryNo,"SaleCategoryType": salescategorymasterInsert.maingroup[salescategorymasterIndex].SaleCategoryType,"SortedOrderNo": salescategorymasterInsert.maingroup[salescategorymasterIndex].SortedOrderNo }
                            db.salescategorymaster.insert(salescategorymasterObj, function (err, mc) { });
                    }           
                }
          })
          db.stockpointmaster.find(function (err, stockpointmasterValues) {
                if (stockpointmasterValues.length == 0) {
                    var stockpointmasterInsert = defaultDropDown.dropDown[8];
                    
                    for (var stockpointmasterIndex = 0; stockpointmasterIndex < stockpointmasterInsert.maingroup.length; stockpointmasterIndex++) {
                            var stockpointmasterObj = { "stockpointid": stockpointmasterInsert.maingroup[stockpointmasterIndex].stockpointid,"stockpointname": stockpointmasterInsert.maingroup[stockpointmasterIndex].stockpointname }
                            db.stockpointmaster.insert(stockpointmasterObj, function (err, mc) { });
                    }           
                }
          })
          db.transactionSeriesInvoice.find(function (err, transactionSeriesInvoiceValues) {
                if (transactionSeriesInvoiceValues.length == 0) {
                    var transactionSeriesInvoiceInsert = defaultDropDown.dropDown[9];
                    
                    for (var transactionSeriesInvoiceIndex = 0; transactionSeriesInvoiceIndex < transactionSeriesInvoiceInsert.maingroup.length; transactionSeriesInvoiceIndex++) {
                            var transactionSeriesInvoiceObj = { "TransactionSeriesId": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].TransactionSeriesId,
                                                                "TransactionClass": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].TransactionClass,
                                                                 "TransactionType": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].TransactionType,
                                                                "POSID": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].POSID,
                                                                "TransactionPrefix": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].TransactionPrefix,
                                                                "StartingTransactionClassNo": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].StartingTransactionClassNo,
                                                                "StartingTransactionTypeNo": transactionSeriesInvoiceInsert.maingroup[transactionSeriesInvoiceIndex].StartingTransactionTypeNo
                                                            
                                                                 }
                            db.transactionSeriesInvoice.insert(transactionSeriesInvoiceObj, function (err, mc) { });
                    }           
                }
          })
          db.inventorygroupvaluenotation.find(function (err, inventorygroupvaluenotationValues) {
                if (inventorygroupvaluenotationValues.length == 0) {
                    var inventorygroupvaluenotationInsert = defaultDropDown.dropDown[10];
                    
                    for (var inventorygroupvaluenotationIndex = 0; inventorygroupvaluenotationIndex < inventorygroupvaluenotationInsert.maingroup.length; inventorygroupvaluenotationIndex++) {
                            var inventorygroupvaluenotationObj = { "NotationID": inventorygroupvaluenotationInsert.maingroup[inventorygroupvaluenotationIndex].NotationID,
                                                                    "InvGroupID": inventorygroupvaluenotationInsert.maingroup[inventorygroupvaluenotationIndex].InvGroupID,
                                                                    "ValueNotation": inventorygroupvaluenotationInsert.maingroup[inventorygroupvaluenotationIndex].ValueNotation,
                                                                    "ConversionPercentage": inventorygroupvaluenotationInsert.maingroup[inventorygroupvaluenotationIndex].ConversionPercentage,
                                                                    "Rate": inventorygroupvaluenotationInsert.maingroup[inventorygroupvaluenotationIndex].Rate 
                                                                
                                                                }
                            db.inventorygroupvaluenotation.insert(inventorygroupvaluenotationObj, function (err, mc) { });
                    }           
                }
          })
          db.inventorygroupmaster.find(function (err, inventorygroupmasterValues) {
                if (inventorygroupmasterValues.length == 0) {
                    var inventorygroupmasterInsert = defaultDropDown.dropDown[11];
                    
                    for (var inventorygroupmasterIndex = 0; inventorygroupmasterIndex < inventorygroupmasterInsert.maingroup.length; inventorygroupmasterIndex++) {
                            var inventorygroupmasterObj = { "InvGroupID": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].InvGroupID,
                                                                    "InvGroupName": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].InvGroupName,
                                                                    "Alias": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].Alias,
                                                                    "sortOrder": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].sortOrder,
                                                                    "PurchaseAcc" :[
                                                                                    {
                                                                                         "AccId": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].PurchaseAcc[0].AccId,
                                                                                         "AccNo" : inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].PurchaseAcc[0].AccNo
                                                                  
                                                                                     }
                                                                                    ],
                                                                     "SalesAcc" :[
                                                                                    {
                                                                                         "AccId": inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].SalesAcc[0].AccId,
                                                                                         "AccNo" : inventorygroupmasterInsert.maingroup[inventorygroupmasterIndex].SalesAcc[0].AccNo
                                                                  
                                                                                     }
                                                                                    ]               
                                                                   
                                                                }
                            db.inventorygroupmaster.insert(inventorygroupmasterObj, function (err, mc) { });
                    }           
                }
          })
          db.inventorygroupvaluenotationdaily.find(function (err, inventorygroupvaluenotationdailyValues) {
                if (inventorygroupvaluenotationdailyValues.length == 0) {
                    var inventorygroupvaluenotationdailyInsert = defaultDropDown.dropDown[12];
                    
                    for (var inventorygroupvaluenotationdailyIndex = 0; inventorygroupvaluenotationdailyIndex < inventorygroupvaluenotationdailyInsert.maingroup.length; inventorygroupvaluenotationdailyIndex++) {
                            var inventorygroupvaluenotationdailyObj = { "NotationID": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].NotationID,
                                                                    "InvGroupID": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].InvGroupID,
                                                                    "ValueNotation": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].ValueNotation,
                                                                    "ConversionPercentage": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].ConversionPercentage,
                                                                    "Rate": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].Rate, 
                                                                    "InvGroupName": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].InvGroupName,
                                                                    "date": inventorygroupvaluenotationdailyInsert.maingroup[inventorygroupvaluenotationdailyIndex].date
                                                                
                                                                }
                            db.inventorygroupvaluenotationdaily.insert(inventorygroupvaluenotationdailyObj, function (err, mc) { });
                    }           
                }
          })
          db.ledgeraccounts.find({"accountIds" : "L001"},function (err, ledgeraccountsValues) {
                if (ledgeraccountsValues.length == 0) {
                    var ledgeraccountsInsert = defaultDropDown.dropDown[13];
                    
                    for (var ledgeraccountsIndex = 0; ledgeraccountsIndex < ledgeraccountsInsert.maingroup.length; ledgeraccountsIndex++) {
                            var ledgeraccountsObj = { 
                                                      "accountIds": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].accountIds,
                                                      "accountName": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].accountName,
                                                      "sortOrder": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].sortOrder,
                                                      "grpId": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].grpId,
                                                      "alias": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].alias, 
                                                      "remark": ledgeraccountsInsert.maingroup[ledgeraccountsIndex].remark
                                                        
                                                    }
                            db.ledgeraccounts.insert(ledgeraccountsObj, function (err, mc) { });
                    }           
                }
          })
        
    }
    var defaultCollections = function () {
            db.configurations.find(function (err, configurationsValues) {
                if (configurationsValues == 0) {
                    var configurationsObj = { 
                                                "UpperLimit" : 5.0,
                                                "LowerLimit" : 5.0,
                                                "Urd_Weight" : "Gross Wt",
                                                "LabourTax" : "No",
                                                "WeightTolerance" : 5,
                                                "DecimalPoints" : 3,
                                                "rupeesDecimalPoints" : 2,
                                                "LabourTaxValue" : 20,
                                                "printconfiguration" : "withoutheader",
                                                "printWastage" : "no",
                                                "printLabour" : "no",
                                                "invVoucher" : "Sale",
                                                "roundOffMethod" : "Lower",
                                                "roundOffValue" : 10.0,
                                                "itembarcodetolerence" : 5,
                                                "printChgWt" : "Wt",
                                                "inVoiceSeries" : "StartingTransactionClassNo" 
                                            }
                    db.configurations.insert(configurationsObj)

                }   
            })
            db.merchantDetails.find(function (err, merchantDetailsValues) {
                if (merchantDetailsValues == 0) {
                    var merchantDetailsObj = { 
                                                 "ShopName" : "M/s Sree Varalakshmi Jewellery Mart",
                                                "Address" : [ 
                                                    {
                                                        "Landmark" : ""
                                                    }, 
                                                    {
                                                        "Street" : "Anekere Street"
                                                    }, 
                                                    {
                                                        "Place" : "Mandya - 571 401"
                                                    }, 
                                                    {
                                                        "Phone" : "Ph:225142 GSTIN:"
                                                    }, 
                                                    {
                                                        "Mobile" : "29AAEFS174M1Z0"
                                                    }, 
                                                    {
                                                        "email" : ""
                                                    }
                                                ]
                                            }
                    db.merchantDetails.insert(merchantDetailsObj)

                }   
            })
            
    }

    readDropDownFile();
    defaultCollections();

};//module.exports ,
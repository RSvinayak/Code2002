 
    module.exports = function (app) {

    var fs = require('fs');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var ObjectID = require('mongodb').ObjectID;
    var mongojs=require('mongojs');
    var db=mongojs('inventory200',['user','tags','transaction','saleInvoice','mode','transactionDetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barCodeSummary','stockPointMaster','configurations','inventoryGroupMaster','salesCategoryMaster','itemType','taxrate',
  'items','tax','taxation','inventoryGroupValueNotation','inventoryGroupValueNotationDaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails','trail','staff','cardType']);

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
          db.itemType.find(function (err, itemTypeValues) {
                if (itemTypeValues.length == 0) {
                    var itemTypeInsert = defaultDropDown.dropDown[1];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var itemTypeIndex = 0; itemTypeIndex < itemTypeInsert.maingroup.length; itemTypeIndex++) {
                            var itemTypeObj = { "itemTypeId": itemTypeInsert.maingroup[itemTypeIndex].itemTypeId, "TypeName": itemTypeInsert.maingroup[itemTypeIndex].TypeName }
                            db.itemType.insert(itemTypeObj, function (err, mc) { });
                    }           
                }
          })
           db.bank.find(function (err, bankValues) {
                if (bankValues.length == 0) {
                    var bankInsert = defaultDropDown.dropDown[2];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var bankIndex = 0; bankIndex < bankInsert.maingroup.length; bankIndex++) {
                            var bankObj = { "name": bankInsert.maingroup[bankIndex].name }
                            db.bank.insert(bankObj, function (err, mc) { });
                    }           
                }
          })
           db.mode.find(function (err, modeValues) {
                if (modeValues.length == 0) {
                    var modeInsert = defaultDropDown.dropDown[3];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var modeIndex = 0; modeIndex < modeInsert.maingroup.length; modeIndex++) {
                            var modeObj = { "name": modeInsert.maingroup[modeIndex].name }
                            db.mode.insert(modeObj, function (err, mc) { });
                    }           
                }
          })
           db.labcal.find(function (err, labcalValues) {
                if (labcalValues.length == 0) {
                    var labcalInsert = defaultDropDown.dropDown[4];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var labcalIndex = 0; labcalIndex < labcalInsert.maingroup.length; labcalIndex++) {
                            var labcalObj = { "name": labcalInsert.maingroup[labcalIndex].name }
                            db.labcal.insert(labcalObj, function (err, mc) { });
                    }           
                }
          })
          db.uom.find(function (err, uomValues) {
                if (uomValues.length == 0) {
                    var uomInsert = defaultDropDown.dropDown[5];
                    //console.log(itemTypeInsert.maingroup.length);
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
          db.salesCategoryMaster.find(function (err, salesCategoryMasterValues) {
                if (salesCategoryMasterValues.length == 0) {
                    var salesCategoryMasterInsert = defaultDropDown.dropDown[7];
                    
                    for (var salesCategoryMasterIndex = 0; salesCategoryMasterIndex < salesCategoryMasterInsert.maingroup.length; salesCategoryMasterIndex++) {
                            var salesCategoryMasterObj = { "SaleCategoryNo": salesCategoryMasterInsert.maingroup[salesCategoryMasterIndex].SaleCategoryNo,"SaleCategoryType": salesCategoryMasterInsert.maingroup[salesCategoryMasterIndex].SaleCategoryType,"SortedOrderNo": salesCategoryMasterInsert.maingroup[salesCategoryMasterIndex].SortedOrderNo,"SaleCategoryType": salesCategoryMasterInsert.maingroup[salesCategoryMasterIndex].SaleCategoryType,"PrnFileName": salesCategoryMasterInsert.maingroup[salesCategoryMasterIndex].PrnFileName }
                            db.salesCategoryMaster.insert(salesCategoryMasterObj, function (err, mc) { });
                    }           
                }
          })
          db.stockPointMaster.find(function (err, stockPointMasterValues) {
                if (stockPointMasterValues.length == 0) {
                    var stockPointMasterInsert = defaultDropDown.dropDown[8];
                    
                    for (var stockPointMasterIndex = 0; stockPointMasterIndex < stockPointMasterInsert.maingroup.length; stockPointMasterIndex++) {
                            var stockPointMasterObj = { "stockpointid": stockPointMasterInsert.maingroup[stockPointMasterIndex].stockpointid,"stockpointname": stockPointMasterInsert.maingroup[stockPointMasterIndex].stockpointname }
                            db.stockPointMaster.insert(stockPointMasterObj, function (err, mc) { });
                    }           
                }
          })
          db.cardType.find(function (err, cardTypeValues) {
                if (cardTypeValues.length == 0) {
                    var cardTypeInsert = defaultDropDown.dropDown[14];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var cardTypeIndex = 0; cardTypeIndex < cardTypeInsert.maingroup.length; cardTypeIndex++) {
                            var cardTypeObj = { "name": cardTypeInsert.maingroup[cardTypeIndex].name }
                            db.cardType.insert(cardTypeObj, function (err, mc) { });
                    }           
                }
          })
           db.items.find(function (err, itemsValues) {
                if (itemsValues.length == 0) {
                    var itemsInsert = defaultDropDown.dropDown[15];
                    //console.log(itemTypeInsert.maingroup.length);
                    for (var itemsIndex = 0; itemsIndex < itemsInsert.maingroup.length; itemsIndex++) {
                            var itemsObj = { "Name": itemsInsert.maingroup[itemsIndex].Name,
                                              "Hsc": itemsInsert.maingroup[itemsIndex].Hsc,
                                              "Desc": itemsInsert.maingroup[itemsIndex].Desc,
                                              "InvGroupName": itemsInsert.maingroup[itemsIndex].InvGroupName,
                                              "ItemType": itemsInsert.maingroup[itemsIndex].ItemType,
                                              "SaleCategory": itemsInsert.maingroup[itemsIndex].SaleCategory,
                                              "comboItem": itemsInsert.maingroup[itemsIndex].comboItem,


                                           }
                           
                                                
                            db.items.insert(itemsObj, function (err, mc) { });
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
          db.inventoryGroupValueNotation.find(function (err, inventoryGroupValueNotationValues) {
                if (inventoryGroupValueNotationValues.length == 0) {
                    var inventoryGroupValueNotationInsert = defaultDropDown.dropDown[10];
                    
                    for (var inventoryGroupValueNotationIndex = 0; inventoryGroupValueNotationIndex < inventoryGroupValueNotationInsert.maingroup.length; inventoryGroupValueNotationIndex++) {
                            var inventoryGroupValueNotationObj = { "NotationID": inventoryGroupValueNotationInsert.maingroup[inventoryGroupValueNotationIndex].NotationID,
                                                                    "InvGroupID": inventoryGroupValueNotationInsert.maingroup[inventoryGroupValueNotationIndex].InvGroupID,
                                                                    "ValueNotation": inventoryGroupValueNotationInsert.maingroup[inventoryGroupValueNotationIndex].ValueNotation,
                                                                    "ConversionPercentage": inventoryGroupValueNotationInsert.maingroup[inventoryGroupValueNotationIndex].ConversionPercentage,
                                                                    "Rate": inventoryGroupValueNotationInsert.maingroup[inventoryGroupValueNotationIndex].Rate 
                                                                
                                                                }
                            db.inventoryGroupValueNotation.insert(inventoryGroupValueNotationObj, function (err, mc) { });
                    }           
                }
          })
          db.inventoryGroupMaster.find(function (err, inventoryGroupMasterValues) {
                if (inventoryGroupMasterValues.length == 0) {
                    var inventoryGroupMasterInsert = defaultDropDown.dropDown[11];
                    
                    for (var inventoryGroupMasterIndex = 0; inventoryGroupMasterIndex < inventoryGroupMasterInsert.maingroup.length; inventoryGroupMasterIndex++) {
                            var inventoryGroupMasterObj = { "InvGroupID": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].InvGroupID,
                                                                    "InvGroupName": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].InvGroupName,
                                                                    "Alias": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].Alias,
                                                                    "sortOrder": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].sortOrder,
                                                                    "PurchaseAcc" :[
                                                                                    {
                                                                                         "AccId": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].PurchaseAcc[0].AccId,
                                                                                         "AccNo" : inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].PurchaseAcc[0].AccNo
                                                                  
                                                                                     }
                                                                                    ],
                                                                     "SalesAcc" :[
                                                                                    {
                                                                                         "AccId": inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].SalesAcc[0].AccId,
                                                                                         "AccNo" : inventoryGroupMasterInsert.maingroup[inventoryGroupMasterIndex].SalesAcc[0].AccNo
                                                                  
                                                                                     }
                                                                                    ]               
                                                                   
                                                                }
                            db.inventoryGroupMaster.insert(inventoryGroupMasterObj, function (err, mc) { });
                    }           
                }
          })
          db.inventoryGroupValueNotationDaily.find(function (err, inventoryGroupValueNotationDailyValues) {
                if (inventoryGroupValueNotationDailyValues.length == 0) {
                    var inventoryGroupValueNotationDailyInsert = defaultDropDown.dropDown[12];
                    
                    for (var inventoryGroupValueNotationDailyIndex = 0; inventoryGroupValueNotationDailyIndex < inventoryGroupValueNotationDailyInsert.maingroup.length; inventoryGroupValueNotationDailyIndex++) {
                            var inventoryGroupValueNotationDailyObj = { "NotationID": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].NotationID,
                                                                    "InvGroupID": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].InvGroupID,
                                                                    "ValueNotation": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].ValueNotation,
                                                                    "ConversionPercentage": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].ConversionPercentage,
                                                                    "Rate": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].Rate, 
                                                                    "InvGroupName": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].InvGroupName,
                                                                    "date": inventoryGroupValueNotationDailyInsert.maingroup[inventoryGroupValueNotationDailyIndex].date
                                                                
                                                                }
                            db.inventoryGroupValueNotationDaily.insert(inventoryGroupValueNotationDailyObj, function (err, mc) { });
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
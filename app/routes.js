module.exports = function (app) {

	var fs = require('fs');
	var mkdirp = require('mkdirp');
	var path = require('path');
	var ObjectID = require('mongodb').ObjectID

	// server routes ===========================================================
	var DropDownValues = require('./models/DropDownValues.js');
	var Subscriber = require('./models/Subscriber.js');
	var GroupDetails = require('./models/GroupDetails.js');
	var GroupAuction = require('./models/GroupAuction.js');
	var SubscriberTicketMapping = require('./models/SubscriberTicketMapping.js');
	var MainClass = require('./models/MainClass.js');
	var MainGroup = require('./models/MainGroup.js');
	var SubGroup = require('./models/SubGroup.js');
	var UserGroup = require('./models/UserGroup.js');
	var LedgerAccount = require('./models/LedgerAccount.js');
	var TransactionHeader = require('./models/TransactionHeader.js');
	var TransactionDetails = require('./models/TransactionDetails.js');
	var ReceiptAdvanceDetails = require('./models/ReceiptAdvanceDetails.js');
	var SubscriberInstallmentDetails = require('./models/SubscriberInstallmentDetails.js');

	// constants ===============================================================
	var __appConfiguration = null;
	var __dirPathSubscriberImages = null;
	var __defaultAccounts = null;

	var DEBIT = 1;
	var CREDIT = 0;
	var LEDGER_COMMISSION_COLLECTED = "Commission Collected";
	var LEDGER_LOSS_OF_DISCOUNT = "Loss of Discount";
	var LEDGER_DIVIDEND_EARNED = "Dividend Earned";
	var LEDGER_FOREMAN_TICKET_ACCOUNT = "Foreman Tkt Account";
	var LEDGER_FOREMAN_INVESTMENT_ACCOUNT = "Foreman Investment Account";
	var LEDGER_FOREMAN_DIVIDEND_REINVESTED = "Foreman Dividend Reinvested";

	/* -------------------------------------------------------------------------
							Initialization - Start
	   ------------------------------------------------------------------------- */
	var readFile = function (filePathWithName) {
		var fileData = fs.readFileSync(filePathWithName, "utf8");
		return fileData;
	}

	var readValueFromApplicationConfig = function (key) {
		return __appConfiguration[key];
	}

	var readServerConfigFile = function () {
		var filepath = "./config/server_config.json"
		var data = readFile(filepath);
		if (data != null) {
			__appConfiguration = JSON.parse(data);
		} else {
			console.log("Error while reading file from : " + filepath);
		}
	}

	var readAccountsFile = function () {
		var filepath = "./config/accounts.json"
		var data = readFile(filepath);
		if (data != null) {
			__defaultAccounts = JSON.parse(data);
			insertDefaultAccountValues(__defaultAccounts);
		} else {
			console.log("Error while reading file from : " + filepath);
		}
	}

	var insertDefaultAccountValues = function (__defaultAccounts) {
		MainClass.findOne(function (err, mainclass) {
			if (mainclass == null) {
				var mainclass = __defaultAccounts.mainclass;
				for (var mcIndex = 0; mcIndex < mainclass.length; mcIndex++) {
					var mcObj = { "MCID": mainclass[mcIndex].mcid, "MainClass": mainclass[mcIndex].value }
					MainClass.create(mcObj, function (err, mc) { });
					var maingroup = mainclass[mcIndex].maingroup;
					if (maingroup != null && maingroup.length > 0) {
						for (var mgIndex = 0; mgIndex < maingroup.length; mgIndex++) {
							var mgObj = {
								"MGID": maingroup[mgIndex].mgid, "MCID": maingroup[mgIndex].mcid,
								"MainGroup": maingroup[mgIndex].value, "HasOpBalance": maingroup[mgIndex].hasopbalance,
								"DefaultBalance": maingroup[mgIndex].defaultbalance
							};
							MainGroup.create(mgObj, function (err, mg) { });

							var subgroup = maingroup[mgIndex].subgroup;
							if (subgroup != null && subgroup.length > 0) {
								for (var subIndex = 0; subIndex < subgroup.length; subIndex++) {
									var subObj = {
										"SGID": subgroup[subIndex].sgid, "MGID": subgroup[subIndex].mgid,
										"SubGroup": subgroup[subIndex].value, "Fixed": subgroup[subIndex].fixed,
										"SortOrder": subgroup[subIndex].sortorder
									};
									SubGroup.create(subObj, function (err, sub) { });
								}
							}
						}
					}
				}
			}
		});
	}

	var readDropDownValuesFile = function () {
		var filepath = "./config/dropdown_values.json"
		var data = readFile(filepath);
		if (data != null) {
			__dropdownvalues = JSON.parse(data);
			insertDropDownValues(__dropdownvalues);
		} else {
			console.log("Error while reading file from : " + filepath);
		}
	}

	var insertDropDownValues = function (data) {
		if (data != null && data.length > 0) {
			for (var index = 0; index < data.length; index++) {
				var obj = {
					Index: data[index]["id"], Code: data[index]["value"], Type: data[index]["type"]
				}
				DropDownValues.findOne({
					"Index": obj.Index, "Code": obj.Code,
					"Type": obj.Type
				}, function (err, result) {
					if (result == null) {
						DropDownValues.create(obj, function (err, post) { });
					}
				});
			}
		}
	}

	var createStandardLedgerAccounts = function () {
		createLedgerAccount("Commission Collected");
		createLedgerAccount("Loss of Discount");
		createLedgerAccount("Dividend Earned");
		createLedgerAccount("Foreman Tkt Account");
		createLedgerAccount("Foreman Investment Account");
		createLedgerAccount("Foreman Dividend Reinvested");
		createLedgerAccount("Cash");
		createLedgerAccount("Pygmy Control");
	}
	var createLedgerAccount = function (accName) {
		var ledger = {
			accountName: accName, groupID: "SG1", alias: "", remarks: "", yearOpBalance: 0.00, opBalanceType: "Dr"
		}

		LedgerAccount.findOne({ 'accountName': accName }, function (err, ledgerdata) {
			if (ledgerdata == null) {
				LedgerAccount.create(ledger, function (err, post) { });
			}
		});
	}

	readServerConfigFile();
	readAccountsFile();
	//readDropDownValuesFile();
	createStandardLedgerAccounts();

	/* -------------------------------------------------------------------------
							Initialization - End
	   ------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
								Drop down list
	   ------------------------------------------------------------------------- */
	app.get('/api/dropdown/:identifier/:filtervalue', function (req, res) {
		var identifier = req.params.identifier;
		var filtervalue = req.params.filtervalue;
		switch (identifier) {
			case "au_groupname":
				GroupDetails.find({}, { "_id": 1, "groupName": 1 }, function (err, data) {
					if (err) { res.send(err); }
					res.json(data);
				});
				break;

			case "au_prizedsubscriber":
				if (filtervalue != null && filtervalue != "null" && typeof (filtervalue != "undefined")) {
					SubscriberTicketMapping.aggregate([
						{ $match: { "groupID": ObjectID(filtervalue), "hasBeenPrizedSubscriber": false } },
						{ $project: { "subscriber": 1, "subscriberID": 1, "ticketNo": 1 } },
						{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "values" } }
					]).exec(function (err, data) {
						if (err) { res.send(err); }
						res.json(data);
					})
				}
				break;

			case "rc_subscriber":
				if (filtervalue != null && filtervalue != "null" && typeof (filtervalue != "undefined")) {
					SubscriberTicketMapping.aggregate([
						{ $match: { "groupID": ObjectID(filtervalue) } },
						{ $project: { "subscriber": 1, "subscriberID": 1, "ticketNo": 1 } },
						{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "values" } }
					]).exec(function (err, data) {
						if (err) { res.send(err); }
						res.json(data);
					})
				}
				break;

			case "fps_title":
				break;

			default:
				Subscriber.find({}, { "_id": 1, "subscriber": 1 }, function (err, subscribers) {
					if (err) { res.send(err); }
					res.json(subscribers);
				});
				break;
		}

	});

	/* -------------------------------------------------------------------------
						API's to get application configs
	   ------------------------------------------------------------------------- */
	app.get('/api/appconfig', function (req, res) {
		var filepath = "./config/application_config.json"
		var data = readFile(filepath);
		if (data != null) {
			res.json(JSON.parse(data));
		} else {
			console.log("Error while reading file from : " + filepath);
		}
	});
	/* -------------------------------------------------------------------------
						API's to manage subscribers
	   ------------------------------------------------------------------------- */
	app.get('/api/subscriber', function (req, res) {
		Subscriber.find(function (err, subscribers) {
			if (err) {
				res.send(err);
			}
			res.json(subscribers);
		});
	});

	app.get('/api/subscriber_images/:user/:image', function (req, res) {
		var user = req.params.user;
		var image = req.params.image;
		if (user != null && typeof (user) != "undefined" && image != null && typeof (image) != "undefined") {
			res.sendfile('./subscriber_images/' + req.params.user + '/' + req.params.image);
		}
	});

	app.post('/api/subscriber', function (req, res, next) {
		var subscriber = req.body.subscriber;
		var image_data = req.body.data.image_data;
		var party_type = req.body.data["party_type"].id;
		req.body.data.image_data = [];

		var ledgerObj = null;
		switch (party_type) {
			case "1": // Cash party
				//do not create any ledger account
				ledgerObj = {};
				break;
			case "2": // Subscriber
				ledgerObj = {
					accountName: subscriber, groupID: "SG11", alias: "", remarks: "", yearOpBalance: 0.00, opBalanceType: DEBIT
				}
				break;
			case "3": // Customer
				ledgerObj = {
					accountName: subscriber, groupID: "SG1", alias: "", remarks: "", yearOpBalance: 0.00, opBalanceType: DEBIT
				}
				break;
			case "4": // Supplier
				ledgerObj = {
					accountName: subscriber, groupID: "SG6", alias: "", remarks: "", yearOpBalance: 0.00, opBalanceType: CREDIT
				}
				break;
		}
		if (party_type == "1") {
			req.body.ledgerID = null;
			req.body.kyc = null;
			req.body.active = true;
			Subscriber.findOne(function (err, result) {
				if (result == null) {
					req.body.isCompanySubscriber = true;
				} else {
					req.body.isCompanySubscriber = false;
				}
				Subscriber.create(req.body, function (err, post) {
					if (err) {
						next(err);
					}
					UpdateSubscriberImageDetails(req, res, image_data, post.id);
				});
			});
		} else {
			if (ledgerObj != null) {
				LedgerAccount.create(ledgerObj, function (err, result) {
					if (result != null) {
						// once the legder is created, update the subscriber table with reference
						req.body.ledgerID = ObjectID(result["_id"]);
						req.body.kyc = null;
						req.body.active = true;
						Subscriber.findOne(function (err, result) {
							if (result == null) {
								req.body.isCompanySubscriber = true;
							} else {
								req.body.isCompanySubscriber = false;
							}
							Subscriber.create(req.body, function (err, post) {
								if (err) {
									next(err);
								}
								UpdateSubscriberImageDetails(req, res, image_data, post.id);
							});
						});
					}
				});
			}
		}
	});

	app.put('/api/subscriber/:id', function (req, res, next) {
		var subscriberID = req.params.id;
		var image_data = req.body.data.image_data;
		req.body.data.image_data = [];

		if (image_data != null && image_data.length > 0) {
			UpdateSubscriberImageDetails(req, res, image_data, req.params.id)
		} else {
			Subscriber.findByIdAndUpdate(subscriberID, req.body, function (err, post) {
				if (err) {
					next(err);
				}

				Subscriber.find(function (err, post) {
					if (err) {
						next(err);
					}
					res.json(post);
				});
			});
		}

	});

	app.put('/api/subscriber/kyc/:id', function (req, res, next) {
		var partyID = req.params.id;
		Subscriber.findByIdAndUpdate(partyID, { $set: { kyc: req.body } }, function (err, post) {
			if (err) {
				next(err);
			}

			Subscriber.find(function (err, post) {
				if (err) {
					next(err);
				}
				res.json(post);
			});
		});
	});

	var decodeBase64Image = function (imgData) {
		var matches = imgData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
			response = {};
		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}
		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');
		return response;
	}

	var createOrUpdateImages = function (image_data, filePathToSave, subscriberFolder) {
		for (var index = 0; index < image_data.length; index++) {
			if (image_data[index].imgSrc != null && typeof (image_data[index].imgSrc != null) != "undefined") {
				var decodedImg = decodeBase64Image(image_data[index].imgSrc);
				var fileName = image_data[index].imgTitle + ".jpg";
				var fullFilePath = filePathToSave + "/" + fileName;
				var imageURL = subscriberFolder + "/" + fileName;
				var fileWriteSuccessful = true;
				try {
					fs.writeFileSync(fullFilePath, decodedImg.data);
				} catch (err) {
					console.log(err)
					fileWriteSuccessful = false;
				}
				if (fileWriteSuccessful) {
					image_data[index].imgURL = imageURL;
					image_data[index].imgSrc = null;
				} else {
					break;
				}
			}
		}

		return image_data;
	}

	var UpdateSubscriberImageDetails = function (req, res, image_data, subscriberID) {
		__dirPathSubscriberImages = readValueFromApplicationConfig("subscriber_image_path");
		if (image_data != null && image_data.length > 0) {
			var insertedID = subscriberID;
			var subscriberFolder = insertedID;
			var filePathToSave = __dirPathSubscriberImages + subscriberFolder;

			mkdirp(filePathToSave, function (err) {
				if (err) {
					console.log(err);
				} else {
					image_data = createOrUpdateImages(image_data, filePathToSave, subscriberFolder)
					req.body.data.image_data = image_data;

					// update the record with image data
					Subscriber.findByIdAndUpdate(insertedID, req.body, function (err, post) {
						if (err) {
							next(err);
						}
						//res.json(post);
					});
				}
			});
		}

		Subscriber.find(function (err, post) {
			if (err) {
				next(err);
			}
			res.json(post);
		});
	}


	/* -------------------------------------------------------------------------
						API's to manage group details
	   ------------------------------------------------------------------------- */
	app.get('/api/groupdetails', function (req, res) {
		GroupDetails.find(function (err, groupdetails) {
			if (err) {
				res.send(err);
			}
			res.json(groupdetails);
		});
	});

	app.post('/api/groupdetails', function (req, res, next) {
		// creating ledger for group
		var groupName = req.body["groupName"];

		var ledgerGroup = {
			accountName: "Chit Group A/C for " + groupName, groupID: "SG6", alias: "", remarks: "",
			yearOpBalance: 0.00, opBalanceType: CREDIT
		}

		LedgerAccount.create(ledgerGroup, function (err, resLedgerGroup) {
			if (err) {
				next(err);
			}
			req.body.groupLedgerID = ObjectID(resLedgerGroup["_id"]);

			// creating ledger for group dividend
			var ledgerdividend = {
				accountName: "Dividend A/C for " + groupName, groupID: "SG6", alias: "", remarks: "",
				yearOpBalance: 0.00, opBalanceType: CREDIT
			}
			LedgerAccount.create(ledgerdividend, function (err, resLedgerDividend) {
				if (err) {
					next(err);
				}
				req.body.dividendLedgerID = ObjectID(resLedgerDividend["_id"]);

				GroupDetails.create(req.body, function (err, post) {
					if (err) {
						next(err);
					}

					res.json(post);
				});
			});
		});
	});

	app.put('/api/groupdetails/:id', function (req, res, next) {
		GroupDetails.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
			if (err) {
				next(err);
			}
			res.json(post);
		});
	});

	app.get('/api/stm/:groupid', function (req, res) {
		var groupID = req.params.groupid;
		SubscriberTicketMapping.find({ 'groupID': ObjectID(groupID) }, function (err, stmDetails) {
			if (err) {
				res.send(err);
			}
			res.json(stmDetails);
		});
	});

	app.post('/api/stm/:group_id/:count', function (req, res, next) {
		var count = req.params.count;
		var group_id = req.params.group_id;

		var mapping_data = [];
		for (var index = 1; index <= count; index++) {
			var item = {
				ticketNo: index,
				groupID: ObjectID(group_id),
				subscriberID: null,
				subscriber: null,
				introducedBy: null,
				collector: null,
				nominee: null,
				nomineeAge: null,
				relationship: null,
				intimation: null,
				hasBeenPrizedSubscriber: false
			};
			mapping_data.push(item);
		}

		//var data = {group_id: group_id, data: mapping_data};

		SubscriberTicketMapping.create(mapping_data, function (err, post) {
			if (err) {
				next(err);
			}
			GroupDetails.find(function (err, groupdetails) {
				if (err) {
					res.send(err);
				}
				res.json(groupdetails);
			});
		});
	});

	app.put('/api/stm/:id', function (req, res, next) {

		req.body.groupID = ObjectID(req.body.groupID);
		req.body.subscriberID = ObjectID(req.body.subscriberID);

		SubscriberTicketMapping.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
			if (err) {
				next(err);
			}

			SubscriberTicketMapping.find({ 'groupID': ObjectID(req.body.groupID) }, function (err, stmDetails) {
				if (err) {
					next(err);
				}
				res.json(stmDetails);
			});
		});
	});

	/* -------------------------------------------------------------------------
						API's to manage auction details
	   ------------------------------------------------------------------------- */
	app.get('/api/auction/groups', function (req, res) {
		GroupDetails.find({ 'allAuctionComplete': false }, function (err, groupdetails) {
			if (err) {
				res.send(err);
			}
			res.json(groupdetails);
		});
	});

	app.get('/api/auction/groupauctions/:id', function (req, res) {
		var inp_groupid = req.params.id;
		GroupAuction.find({ 'groupID': ObjectID(inp_groupid) }, null, { sort: { 'auctionNo': 1 } }, function (err, data) {
			if (err) {
				res.send(err);
			}
			res.json(data);
		});
	});

	app.post('/api/auction', function (req, res) {

		var groupID = req.body["groupID"];
		var subscriberArray = new Array();
		var ledgeraccountsarray = new Array();

		//get group properties
		GroupDetails.findOne({ '_id': ObjectID(groupID) }, function (err, groupdata) {

			//get subscriber details for the group and Subscriber ledger account details
			SubscriberTicketMapping.aggregate([
				{ $match: { "groupID": ObjectID(groupID) } },
				{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "values" } },
				{ $unwind: { path: '$values' } },
				{
					$project: {
						"subscriber": 1, "subscriberID": 1, "ticketNo": 1,
						"hasBeenPrizedSubscriber": 1, "values.isCompanySubscriber": 1, "values.ledgerID": 1
					}
				}
			]).exec(function (err, subscriberdata) {
				if (subscriberdata != null && subscriberdata.length > 0) {
					for (var index = 0; index < subscriberdata.length; index++) {
						var subscriberObj = {
							Subscriber: subscriberdata[index]["subscriber"],
							SubscriberID: subscriberdata[index]["subscriberID"],
							TicketNo: subscriberdata[index]["ticketNo"],
							HasBeenPrizedSubscriber: subscriberdata[index]["hasBeenPrizedSubscriber"],
							IsCompanyTicket: subscriberdata[index].values["isCompanySubscriber"]
						}
						subscriberArray.push(subscriberObj);

						var ledgerObj = {
							LedgerAccountName: subscriberdata[index]["subscriber"],
							ReferenceID: subscriberdata[index]["subscriberID"],
							ReferenceType: 1, // 1 - means Subscriber ledger Accounts
							TicketNo: subscriberdata[index]["ticketNo"],
							LedgerID: subscriberdata[index].values["ledgerID"]
						}
						ledgeraccountsarray.push(ledgerObj);
					}

					//get group ledger details
					GroupDetails.aggregate([
						{ $match: { "_id": ObjectID(groupID) } },
						{ $lookup: { from: "ledgeraccounts", localField: "groupLedgerID", foreignField: "_id", as: "groupledger" } },
						{ $unwind: { path: '$groupledger' } },
						{ $project: { "groupledger.accountName": 1, "groupLedgerID": 1 } }
					]).exec(function (err, groupLedgerData) {
						if (groupLedgerData != null && groupLedgerData.length > 0) {
							var obj = {
								LedgerAccountName: groupLedgerData[groupLedgerData.length - 1]
									.groupledger.accountName,
								ReferenceID: ObjectID(groupID),
								ReferenceType: 2, //2 - means Group ledger Accounts,
								TicketNo: 0,
								LedgerID: groupLedgerData[groupLedgerData.length - 1].groupLedgerID
							}
							ledgeraccountsarray.push(obj);

							GroupDetails.aggregate([
								{ $match: { "_id": ObjectID(groupID) } },
								{ $lookup: { from: "ledgeraccounts", localField: "dividendLedgerID", foreignField: "_id", as: "groupdividendledger" } },
								{ $unwind: { path: '$groupdividendledger' } },
								{ $project: { "groupdividendledger.accountName": 1, "dividendLedgerID": 1 } }
							]).exec(function (err, groupDividendLedgerData) {
								if (groupDividendLedgerData != null && groupDividendLedgerData.length > 0) {
									var obj = {
										LedgerAccountName: groupDividendLedgerData[groupDividendLedgerData.length - 1]
											.groupdividendledger.accountName,
										ReferenceID: ObjectID(groupID),
										ReferenceType: 2, //2 - means Group Dividend ledger Accounts,
										TicketNo: 0,
										LedgerID: groupDividendLedgerData[groupDividendLedgerData.length - 1]
											.dividendLedgerID
									}
									ledgeraccountsarray.push(obj);

									LedgerAccount.find({
										"accountName": {
											$in:
											["Commission Collected", "Loss of Discount", "Dividend Earned", "Foreman Tkt Account",
												"Foreman Investment Account", "Foreman Dividend Reinvested", "Cash", "Pygmy Control"]
										}
									},
										{ "_id": 1, "accountName": 1 },
										function (err, commonLedgerData) {
											if (commonLedgerData != null && commonLedgerData.length > 0) {
												for (var index = 0; index < commonLedgerData.length; index++) {
													var obj = {
														LedgerAccountName: commonLedgerData[index].accountName,
														ReferenceID: null,
														ReferenceType: 0,
														TicketNo: 0,
														LedgerID: commonLedgerData[index]._id
													}
													ledgeraccountsarray.push(obj);
												}
												postJournalEntries(req.body, groupdata, subscriberArray, ledgeraccountsarray);
											}
										});
								}
							});
						}
					});
				}
			});
		});

		var requestObj = req.body;
		requestObj.prizeWinner = ObjectID(requestObj.data.prized_subscriber.id);
		GroupAuction.create(requestObj, function (err, data) {
			if (err) {
				res.send(err);
			}
			res.json(data);
		});
	});

	var postJournalEntries = function (auctiondata, groupdata, subscribersarray, ledgeraccountsarray) {
		var decodedValues = {
			prizeAmount: parseFloat(auctiondata.data["prize_amount"]),
			prizedSubscriberID: auctiondata.data["prized_subscriber"].id,
			dividendAmount: auctiondata.data["dividend_amount"],
			companyComm: auctiondata.data["company_comm"],
			subscribercount: auctiondata.data["no_of_subscribers"],
			chitValue: auctiondata.data["chit_value"],
			groupDividendDistributionType: parseInt(groupdata.data["configuration"]["dd_dividend_distribution"].id),
			auctionNo: auctiondata.auctionNo,
			groupID: groupdata._id.toString(),
			groupName: groupdata.groupName
		}

		TransactionHeader.findOne({}, { VoucherNo: 1, _id: 0 })
			.sort({ "VoucherNo": -1 }).limit(1).lean().exec(function (err, dataVoucherNo) {
				var maxVoucherNo = 0;
				if (dataVoucherNo != null) {
					maxVoucherNo = dataVoucherNo.VoucherNo;
				}
				decodedValues.maxVoucherNo = maxVoucherNo;


				/**
				 * 1 - CAOA: Current Auction On Auction, 	2 - CAOR: Current Auction On Receipt
				 * 3 - NAOA: Next Auction On Auction, 		4 - NAOR: Next Auction On Receipt
				 */
				if (decodedValues.groupDividendDistributionType == 1) {
					postJournalEntriesForCAOA(auctiondata, groupdata, subscribersarray, ledgeraccountsarray, decodedValues);
				} else if (decodedValues.groupDividendDistributionType == 2) {
					postJournalEntriesForCAOR(auctiondata, groupdata, subscribersarray, ledgeraccountsarray, decodedValues);
				} else if (decodedValues.groupDividendDistributionType == 3) {
					postJournalEntriesForNAOA(auctiondata, groupdata, subscribersarray, ledgeraccountsarray, decodedValues);
				} else if (decodedValues.groupDividendDistributionType == 4) {
					postJournalEntriesForNAOR(auctiondata, groupdata, subscribersarray, ledgeraccountsarray, decodedValues);
				}
			});
	}

	/**
	 * 1. No need to check if the current auction is the first, last or inbetween as the dividend is distributed
	 * immediately.
	 * 2. Check if the prize winning subscriber is the Company ticket or not.
	 */
	var postJournalEntriesForCAOA = function (auctiondata, groupdata, subscribersarray,
		ledgeraccountsarray, decodedValues) {
		var maxVoucherNo = decodedValues.maxVoucherNo;
		var remarks = decodedValues.groupName + " | " + decodedValues.auctionNo;

		var prizeWinnerLedger = getLedgerAccount(1, decodedValues.prizedSubscriberID, null, ledgeraccountsarray);
		var groupLedger = getLedgerAccount(2, null, null, ledgeraccountsarray);
		var groupDividendLedger = getLedgerAccount(3, null, null, ledgeraccountsarray);
		var commissionCollectedLedger = getLedgerAccount(0, null, LEDGER_COMMISSION_COLLECTED, ledgeraccountsarray);
		var foremanTktAccountLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_TICKET_ACCOUNT, ledgeraccountsarray);
		var foremanInvestmentAccountLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_INVESTMENT_ACCOUNT, ledgeraccountsarray);
		var foremanDividendReinvestedLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_DIVIDEND_REINVESTED, ledgeraccountsarray);
		var lossOfDiscountLedger = getLedgerAccount(0, null, LEDGER_LOSS_OF_DISCOUNT, ledgeraccountsarray);
		var dividendEarnedLedger = getLedgerAccount(0, null, LEDGER_DIVIDEND_EARNED, ledgeraccountsarray);

		var isCompanyTicketPreset = checkCompanyTicket(subscribersarray);
		var isPrizeWinnerCompanyTicket = checkIfSubscriberIsCompanyTicket(subscribersarray, decodedValues.prizedSubscriberID);

		//Auction installment reinvested
		if (isCompanyTicketPreset) {
			maxVoucherNo += 1;
			postAuctionInstallmentReinvestedDetails(maxVoucherNo, decodedValues.chitValue, decodedValues.subscribercount,
				foremanInvestmentAccountLedger.LedgerID, foremanTktAccountLedger.LedgerID, "Auction installment reinvested",
				remarks);
		}

		//Auction prize amount credit
		if (prizeWinnerLedger != null && groupLedger != null) {
			maxVoucherNo += 1;
			if (isPrizeWinnerCompanyTicket) {
				postAuctionPrizeWinnerDetails(maxVoucherNo, decodedValues.prizeAmount, groupLedger.LedgerID,
					foremanTktAccountLedger.LedgerID, "Auction prize amount credit",
					remarks);
			} else {
				postAuctionPrizeWinnerDetails(maxVoucherNo, decodedValues.prizeAmount, groupLedger.LedgerID,
					prizeWinnerLedger.LedgerID, "Auction prize amount credit",
					remarks);
			}
		}

		//Loss of Discount
		if (isPrizeWinnerCompanyTicket && groupLedger != null && lossOfDiscountLedger != null) {
			maxVoucherNo += 1;
			postLossOfDiscountDetails(maxVoucherNo, decodedValues.companyComm, groupLedger.LedgerID,
				lossOfDiscountLedger.LedgerID, "Loss of Discount",
				remarks);
		}

		//Auction dividend amount allocation
		if (groupDividendLedger != null && groupLedger != null && !isPrizeWinnerCompanyTicket) {
			maxVoucherNo += 1;
			postAuctionDividendAmountDetails(maxVoucherNo, decodedValues.dividendAmount, groupLedger.LedgerID,
				groupDividendLedger.LedgerID, "Auction dividend amount allocation",
				remarks);
		}

		//Auction company commission
		if (commissionCollectedLedger != null && groupLedger != null && !isPrizeWinnerCompanyTicket) {
			maxVoucherNo += 1;
			postCompanyCommissionDetails(maxVoucherNo, decodedValues.companyComm, groupLedger.LedgerID,
				commissionCollectedLedger.LedgerID, "Auction company commision",
				remarks);
		}

		//Auction installment
		if (groupLedger != null) {
			maxVoucherNo += 1;
			postAuctionInstallmentDetails(maxVoucherNo, decodedValues.chitValue, decodedValues.subscribercount,
				ledgeraccountsarray, subscribersarray, groupLedger.LedgerID, "Auction installment",
				remarks, decodedValues);
		}

		//Dividend distributed
		if (groupDividendLedger != null && !isPrizeWinnerCompanyTicket) {
			maxVoucherNo += 1;
			postDividendDistributionDetails(maxVoucherNo, decodedValues.dividendAmount, decodedValues.subscribercount,
				ledgeraccountsarray, subscribersarray, groupDividendLedger.LedgerID, "Dividend distributed",
				remarks, isCompanyTicketPreset, isPrizeWinnerCompanyTicket);
		}

		//Auction dividend reinvested
		if (isCompanyTicketPreset && !isPrizeWinnerCompanyTicket) {
			maxVoucherNo += 1;
			postDividendReinvestmentDetails(maxVoucherNo, decodedValues.dividendAmount, decodedValues.subscribercount,
				foremanDividendReinvestedLedger.LedgerID, dividendEarnedLedger.LedgerID, "Auction dividend reinvested",
				remarks);
		}
	}

	var postJournalEntriesForCAOR = function (auctiondata, groupdata, subscribersarray,
		ledgeraccountsarray, decodedValues) {

	}

	/**
	 * 1. need to check if the current auction is the first, last or inbetween as the dividend is not distributed
	 * immediately.
	 * 2. Check if the prize winning subscriber is the Company ticket or not.
	 */
	var postJournalEntriesForNAOA = function (auctiondata, groupdata, subscribersarray,
		ledgeraccountsarray, decodedValues) {

		var maxVoucherNo = decodedValues.maxVoucherNo;
		var remarks = decodedValues.groupName + " | " + decodedValues.auctionNo;

		var prizeWinnerLedger = getLedgerAccount(1, decodedValues.prizedSubscriberID, null, ledgeraccountsarray);
		var groupLedger = getLedgerAccount(2, null, null, ledgeraccountsarray);
		var groupDividendLedger = getLedgerAccount(3, null, null, ledgeraccountsarray);
		var commissionCollectedLedger = getLedgerAccount(0, null, LEDGER_COMMISSION_COLLECTED, ledgeraccountsarray);
		var foremanTktAccountLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_TICKET_ACCOUNT, ledgeraccountsarray);
		var foremanInvestmentAccountLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_INVESTMENT_ACCOUNT, ledgeraccountsarray);
		var foremanDividendReinvestedLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_DIVIDEND_REINVESTED, ledgeraccountsarray);
		var lossOfDiscountLedger = getLedgerAccount(0, null, LEDGER_LOSS_OF_DISCOUNT, ledgeraccountsarray);
		var dividendEarnedLedger = getLedgerAccount(0, null, LEDGER_DIVIDEND_EARNED, ledgeraccountsarray);

		var isCompanyTicketPreset = checkCompanyTicket(subscribersarray);
		var isPrizeWinnerCompanyTicket = checkIfSubscriberIsCompanyTicket(subscribersarray, decodedValues.prizedSubscriberID);

		var isFirstAuctionInGroup = (decodedValues.auctionNo == 1) ? true : false;
		var isLastAuctionInGroup = (decodedValues.auctionNo == decodedValues.subscribercount) ? true : false;

		//Dividend distributed - previous auction
		GroupAuction.findOne({ "GroupID": decodedValues.groupID, "AuctionNo": decodedValues.auctionNo - 1 },
			function (err, data) {
				if (data != null) {
					var dividendAmt = (data.data["dividend_amount"] != null && data.data["dividend_amount"] != ""
						&& typeof (data.data["dividend_amount"]) != "undefined") ? data.data["dividend_amount"] : 0;
					if (groupDividendLedger != null && dividendAmt > 0) {
						maxVoucherNo += 1;
						postDividendDistributionDetails(maxVoucherNo, dividendAmt, decodedValues.subscribercount,
							ledgeraccountsarray, subscribersarray, groupDividendLedger.LedgerID, "Dividend distributed",
							remarks, isCompanyTicketPreset, isPrizeWinnerCompanyTicket);

						//Auction dividend reinvested
						if (isCompanyTicketPreset) {
							maxVoucherNo += 1;
							postDividendReinvestmentDetails(maxVoucherNo, dividendAmt, decodedValues.subscribercount,
								foremanDividendReinvestedLedger.LedgerID, dividendEarnedLedger.LedgerID, "Auction dividend reinvested",
								remarks);
						}
					}
				}
			});

		//Auction installment reinvested
		if (isCompanyTicketPreset) {
			maxVoucherNo += 1;
			postAuctionInstallmentReinvestedDetails(maxVoucherNo, decodedValues.chitValue, decodedValues.subscribercount,
				foremanInvestmentAccountLedger.LedgerID, foremanTktAccountLedger.LedgerID, "Auction installment reinvested",
				remarks);
		}

		//Auction prize amount credit
		if (prizeWinnerLedger != null && groupLedger != null) {
			maxVoucherNo += 1;
			if (isPrizeWinnerCompanyTicket) {
				postAuctionPrizeWinnerDetails(maxVoucherNo, decodedValues.prizeAmount, groupLedger.LedgerID,
					foremanTktAccountLedger.LedgerID, "Auction prize amount credit",
					remarks);
			} else {
				postAuctionPrizeWinnerDetails(maxVoucherNo, decodedValues.prizeAmount, groupLedger.LedgerID,
					prizeWinnerLedger.LedgerID, "Auction prize amount credit",
					remarks);
			}
		}

		//Loss of Discount
		if (isPrizeWinnerCompanyTicket && groupLedger != null && lossOfDiscountLedger != null) {
			maxVoucherNo += 1;
			postLossOfDiscountDetails(maxVoucherNo, decodedValues.companyComm, groupLedger.LedgerID,
				lossOfDiscountLedger.LedgerID, "Loss of Discount",
				remarks);
		}

		//Auction company commission
		if (commissionCollectedLedger != null && groupLedger != null && !isPrizeWinnerCompanyTicket) {
			maxVoucherNo += 1;
			postCompanyCommissionDetails(maxVoucherNo, decodedValues.companyComm, groupLedger.LedgerID,
				commissionCollectedLedger.LedgerID, "Auction company commision",
				remarks);
		}

		//Auction installment
		if (groupLedger != null) {
			maxVoucherNo += 1;
			postAuctionInstallmentDetails(maxVoucherNo, decodedValues.chitValue, decodedValues.subscribercount,
				ledgeraccountsarray, subscribersarray, groupLedger.LedgerID, "Auction installment",
				remarks, decodedValues);
		}

		if (groupDividendLedger != null) {
			// if(!isCompanyTicketPreset){
			maxVoucherNo += 1;
			if (groupDividendLedger != null && groupLedger != null && parseFloat(decodedValues.dividendAmount) > 0) {
				postAuctionDividendAmountDetails(maxVoucherNo, decodedValues.dividendAmount, groupLedger.LedgerID,
					groupDividendLedger.LedgerID, "Auction dividend amount allocation",
					remarks);
			}

			if (isLastAuctionInGroup) {
				//Dividend distributed
				if (groupDividendLedger != null && parseFloat(decodedValues.dividendAmount) > 0) {
					maxVoucherNo += 1;
					postDividendDistributionDetails(maxVoucherNo, decodedValues.dividendAmount, decodedValues.subscribercount,
						ledgeraccountsarray, subscribersarray, groupDividendLedger.LedgerID, "Dividend distributed",
						remarks, isCompanyTicketPreset, isPrizeWinnerCompanyTicket);

					//Auction dividend reinvested
					if (isCompanyTicketPreset) {
						maxVoucherNo += 1;
						postDividendReinvestmentDetails(maxVoucherNo, decodedValues.dividendAmount, decodedValues.subscribercount,
							foremanDividendReinvestedLedger.LedgerID, dividendEarnedLedger.LedgerID, "Auction dividend reinvested",
							remarks);
					}
				}
			}
		}
	}

	var postJournalEntriesForNAOR = function (auctiondata, groupdata, subscribersarray,
		ledgeraccountsarray, decodedValues) {

	}

	var postAuctionPrizeWinnerDetails = function (voucherNo, prizeAmt, groupLedgerID,
		prizeWinnerLedgerID, narration, remarks) {
		//Header
		var thPrizeWinner = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: prizeAmt, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thPrizeWinner, function (err, data) { });

		//Details
		var tdPrizeWinnerGroup = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupLedgerID, Amount: prizeAmt,
			Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdPrizeWinnerGroup, function (err, data) { });

		var tdPrizeWinnerSubscriber = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: prizeWinnerLedgerID, Amount: prizeAmt,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdPrizeWinnerSubscriber, function (err, data) { });
	}

	var postAuctionDividendAmountDetails = function (voucherNo, dividendAmt, groupLedgerID,
		groupDividendLedgerID, narration, remarks) {
		//Header
		var thAuctionDividend = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: dividendAmt, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thAuctionDividend, function (err, data) { });

		//Details
		var tdDividendGroup = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupLedgerID, Amount: dividendAmt,
			Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdDividendGroup, function (err, data) { });

		var tdDividendAccountGroup = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupDividendLedgerID, Amount: dividendAmt,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdDividendAccountGroup, function (err, data) { });
	}

	var postCompanyCommissionDetails = function (voucherNo, commissionAmt, groupLedgerID,
		commissionCollectedLedgerID, narration, remarks) {
		//Header
		var thCompanyCommission = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: commissionAmt, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thCompanyCommission, function (err, data) { });

		//Details
		var tdCompanyCommissionGroup = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupLedgerID, Amount: commissionAmt,
			Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdCompanyCommissionGroup, function (err, data) { });

		var tdCommissionCollectedAccount = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: commissionCollectedLedgerID, Amount: commissionAmt,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdCommissionCollectedAccount, function (err, data) { });
	}

	var postAuctionInstallmentDetails = function (voucherNo, chitvalue, subscribercount, ledgeraccountsarray,
		subscribersarray, groupLedgerID, narration, remarks, decodedValues) {

		var auctionInstallment = parseFloat(chitvalue / subscribercount).toFixed(2);
		var auctionDividendAmount = parseFloat(decodedValues.dividendAmount).toFixed(2);
		var foremanTktAccountLedger = getLedgerAccount(0, null, LEDGER_FOREMAN_TICKET_ACCOUNT, ledgeraccountsarray);

		//Header
		var thAuctionInstallment = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: chitvalue, UserId: "", NoOfItems: subscribercount + 1
		}
		TransactionHeader.create(thAuctionInstallment, function (err, data) { });

		//Details
		var list = getLedgerAccountOfSubscribers(ledgeraccountsarray);
		if (list != null && list.length > 0) {
			for (var index = 0; index < list.length; index++) {
				var isCompanyTicket = checkIfSubscriberIsCompanyTicket(subscribersarray, list[index].ReferenceID);
				var ledgerID = isCompanyTicket ? foremanTktAccountLedger.LedgerID : list[index].LedgerID;

				var tdSubscriberInstallment = {
					VoucherType: "Journal", VoucherDate: new Date(), Prefix: "",
					VoucherNo: voucherNo, Suffix: "", RefNo: voucherNo, AccountId: ledgerID,
					Amount: auctionInstallment, Narration: narration, Remarks: remarks, TransType: DEBIT
				}
				TransactionDetails.create(tdSubscriberInstallment, function (err, data) { });

				if (!isCompanyTicket) {
					saveSubscriberInstallmentDues(decodedValues.groupID, list[index].ReferenceID,
						decodedValues.auctionNo, auctionInstallment, auctionDividendAmount);
				}
			}
		}

		var tdGroupInstallment = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupLedgerID, Amount: chitvalue,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdGroupInstallment, function (err, data) { });
	}

	var saveSubscriberInstallmentDues = function (groupID, subscriberID, auctionNo,
		auctionInstallmentAmount, auctionDividendAmount) {

		SubscriberTicketMapping.findOne({
			"groupID": ObjectID(groupID),
			"subscriberID": ObjectID(subscriberID)
		},
			function (err, stmData) {
				if (stmData != null) {
					var obj = {
						groupID: ObjectID(groupID),
						subscriberID: ObjectID(subscriberID),
						ticketNo: stmData["ticketNo"],
						auctionNo: auctionNo,
						auctionInstallmentAmount: auctionInstallmentAmount,
						auctionDividendAmount: auctionDividendAmount,
						installmentAmountDue: (auctionInstallmentAmount - auctionDividendAmount),
						dueDate: new Date()
					}

					SubscriberInstallmentDetails.create(obj, function (err, data) {

					});
				}
			});

	}

	var postDividendDistributionDetails = function (voucherNo, dividendAmt, subscribercount, ledgeraccountsarray,
		subscribersarray, groupDividendLedgerID, narration, remarks) {

		var dividendDistributionAmount = parseFloat(dividendAmt / subscribercount).toFixed(2);
		var dividendEarnedLedger = getLedgerAccount(0, null, LEDGER_DIVIDEND_EARNED, ledgeraccountsarray);

		//Header
		var thDividendDistributionAmt = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: dividendAmt, UserId: "", NoOfItems: subscribercount + 1
		}
		TransactionHeader.create(thDividendDistributionAmt, function (err, data) { });

		//Details
		var tdDividendAmt = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupDividendLedgerID, Amount: dividendAmt,
			Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdDividendAmt, function (err, data) { });

		var list = getLedgerAccountOfSubscribers(ledgeraccountsarray);
		if (list != null && list.length > 0) {
			for (var index = 0; index < list.length; index++) {
				var ledgerID = checkIfSubscriberIsCompanyTicket(subscribersarray, list[index].ReferenceID) ?
					dividendEarnedLedger.LedgerID : list[index].LedgerID;

				var tdSubscriberDividend = {
					VoucherType: "Journal", VoucherDate: new Date(), Prefix: "",
					VoucherNo: voucherNo, Suffix: "", RefNo: voucherNo, AccountId: ledgerID,
					Amount: dividendDistributionAmount, Narration: narration, Remarks: remarks, TransType: CREDIT
				}
				TransactionDetails.create(tdSubscriberDividend, function (err, data) { });
			}
		}
	}

	var postAuctionInstallmentReinvestedDetails = function (voucherNo, chitvalue, subscribercount,
		foremanInvestmentAccountLedgerID, foremanTktAccountLedgerID, narration, remarks) {
		var auctionInstallment = parseFloat(chitvalue / subscribercount).toFixed(2);

		//Header
		var thAuctionInstallmentRevestment = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: auctionInstallment, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thAuctionInstallmentRevestment, function (err, data) { });

		//Details
		var tdForemanInvestmentAcc = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "",
			VoucherNo: voucherNo, Suffix: "", RefNo: voucherNo, AccountId: foremanInvestmentAccountLedgerID,
			Amount: auctionInstallment, Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdForemanInvestmentAcc, function (err, data) { });

		var tdForemanTktAcc = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: foremanTktAccountLedgerID, Amount: auctionInstallment,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdForemanTktAcc, function (err, data) { });
	}

	var postLossOfDiscountDetails = function (voucherNo, discount, groupLedgerID,
		lossOfDiscountLedgerID, narration, remarks) {
		//Header
		var thLossOfDiscount = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: discount, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thLossOfDiscount, function (err, data) { });

		//Details
		var tdLossOfDiscountGroup = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: groupLedgerID, Amount: discount,
			Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdLossOfDiscountGroup, function (err, data) { });

		var tdLossOfDiscount = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: lossOfDiscountLedgerID, Amount: discount,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdLossOfDiscount, function (err, data) { });
	}

	var postDividendReinvestmentDetails = function (voucherNo, dividendAmt, subscribercount,
		foremanDividendReinvestedLedgerID, dividendEarnedLedgerID, narration, remarks) {
		var dividend = parseFloat(dividendAmt / subscribercount).toFixed(2);

		//Header
		var thDividendReinvestment = {
			VoucherType: "Journal", Date: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, Amount: dividend, UserId: "", NoOfItems: 2
		}
		TransactionHeader.create(thDividendReinvestment, function (err, data) { });

		//Details
		var tdDividendEarned = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "",
			VoucherNo: voucherNo, Suffix: "", RefNo: voucherNo, AccountId: dividendEarnedLedgerID,
			Amount: dividend, Narration: narration, Remarks: remarks, TransType: DEBIT
		}
		TransactionDetails.create(tdDividendEarned, function (err, data) { });

		var tdForemanDividendReinvested = {
			VoucherType: "Journal", VoucherDate: new Date(), Prefix: "", VoucherNo: voucherNo,
			Suffix: "", RefNo: voucherNo, AccountId: foremanDividendReinvestedLedgerID, Amount: dividend,
			Narration: narration, Remarks: remarks, TransType: CREDIT
		}
		TransactionDetails.create(tdForemanDividendReinvested, function (err, data) { });
	}

	var getLedgerAccount = function (refType, refID, accName, list) {
		var ledgerObj = null;
		for (var index = 0; index < list.length; index++) {
			if (refType == 1) {
				if (list[index].ReferenceType == refType && list[index].ReferenceID == refID) {
					ledgerObj = list[index];
					break;
				}
			} else if (refType == 2 || refType == 3) {
				if (list[index].ReferenceType == refType) {
					ledgerObj = list[index];
					break;
				}
			} else {
				if (list[index].LedgerAccountName == accName) {
					ledgerObj = list[index];
					break;
				}
			}
		}
		return ledgerObj;
	}

	var getLedgerAccountOfSubscribers = function (list) {
		var array = new Array();

		for (var index = 0; index < list.length; index++) {
			if (list[index].ReferenceType == 1) {
				array.push(list[index]);
			}
		}
		return array;
	}

	var checkCompanyTicket = function (list) {
		var flag = false;
		for (var index = 0; index < list.length; index++) {
			if (list[index].IsCompanyTicket == "1") {
				flag = true;
				break;
			}
		}
		return flag;
	}

	var checkIfSubscriberIsCompanyTicket = function (list, subscriberid) {
		var flag = false;
		for (var index = 0; index < list.length; index++) {
			if (list[index].SubscriberID == subscriberid) {
				flag = list[index].IsCompanyTicket == "1" ? true : false;
				break;
			}
		}
		return flag;
	}

	/* -------------------------------------------------------------------------
						API's to read transaction details
	   ------------------------------------------------------------------------- */
	app.get('/api/transactions', function (req, res) {
		TransactionDetails.aggregate([
			{ $sort: { "VoucherNo": 1, "TransType": 1 } },
			{ $lookup: { from: "ledgeraccounts", localField: "AccountId", foreignField: "_id", as: "ledger" } }
		]).exec(function (err, data) {
			if (err) { res.send(err); }
			res.json(data);
		});
	});

	/* -------------------------------------------------------------------------
						API's to manage payment details
	   ------------------------------------------------------------------------- */
	app.get('/api/payment', function (req, res) {
		SubscriberInstallmentDetails.aggregate([
			{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "v1" } },
			{ $unwind: { path: '$v1' } },
			{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "v2" } },
			{ $unwind: { path: '$v2' } },
			{
				$project: {
					_id: 1, groupID: 1, subscriberID: 1, ticketNo: 1, auctionNo: 1,
					auctionInstallmentAmount: 1, auctionDividendAmount: 1, installmentAmountDue: 1,
					dueDate: 1, groupName: "$v1.groupName", subscriber: "$v2.subscriber"
				}
			}
		]).exec(function (err, data) {
			if (err) { res.send(err); }
			res.json(data);
		});
	});

	app.get('/api/paymentinstallment/:groupID/:subscriberID', function (req, res) {
		var groupID = req.params.groupID;
		var subscriberID = req.params.subscriberID;

		ReceiptAdvanceDetails.aggregate([
			{ $match: { "groupID": ObjectID(groupID), "subscriberID": ObjectID(subscriberID) } },
			{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "v1" } },
			{ $unwind: { path: '$v1' } },
			{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "v2" } },
			{ $unwind: { path: '$v2' } },
			{
				$project: {
					_id: 1, ticketNo: 1, amount: 1, date: 1,
					groupName: "$v1.groupName", groupID: "$v1._id",
					subscriber: "$v2.subscriber", subscriberID: "$v2._id"
				}
			}
		]).exec(function (err, data) {
			if (err) {
				res.send(err);
			}
			res.json(data);
		});
	});

	/* -------------------------------------------------------------------------
						API's to manage receipt details
	   ------------------------------------------------------------------------- */
	app.get('/api/receipt', function (req, res) {
		ReceiptAdvanceDetails.aggregate([
			{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "v1" } },
			{ $unwind: { path: '$v1' } },
			{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "v2" } },
			{ $unwind: { path: '$v2' } },
			{
				$project: {
					_id: 1, ticketNo: 1, amount: 1, date: 1,
					groupName: "$v1.groupName", groupID: "$v1._id",
					subscriber: "$v2.subscriber", subscriberID: "$v2._id"
				}
			}
		]).exec(function (err, data) {
			if (err) {
				res.send(err);
			}
			res.json(data);
		});
	});

	app.post('/api/receipt', function (req, res) {
		SubscriberTicketMapping.findOne({
			"groupID": ObjectID(req.body["groupID"]),
			"subscriberID": ObjectID(req.body["subscriberID"])
		},
			function (err, stmData) {
				if (stmData != null) {
					var obj = {
						groupID: ObjectID(req.body["groupID"]),
						subscriberID: ObjectID(req.body["subscriberID"]),
						ticketNo: stmData["ticketNo"],
						amount: req.body["amount"],
						date: new Date()
					}

					postReceiptPygmyControlDetails(req.body["amount"], "", "");

					ReceiptAdvanceDetails.create(obj, function (err, data) {
						if (err) {
							res.send(err);
						}

						ReceiptAdvanceDetails.aggregate([
							{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "v1" } },
							{ $unwind: { path: '$v1' } },
							{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "v2" } },
							{ $unwind: { path: '$v2' } },
							{
								$project: {
									_id: 1, ticketNo: 1, amount: 1, date: 1,
									groupName: "$v1.groupName", groupID: "$v1._id",
									subscriber: "$v2.subscriber", subscriberID: "$v2._id"
								}
							}
						]).exec(function (err, data) {
							if (err) {
								res.send(err);
							}
							res.json(data);
						});
					});
				}
			});
	});

	var postReceiptPygmyControlDetails = function (amount, narration, remarks) {

		LedgerAccount.find({
			"accountName": {
				$in: ["Cash", "Pygmy Control"]
			}
		},
			{ "_id": 1, "accountName": 1 },
			function (err, commonLedgerData) {
				if (commonLedgerData != null && commonLedgerData.length > 0) {
					var cashLedgerID = null;
					var pygmyControlLedgerID = null;
					var maxVoucherNo = 0;

					for (var index = 0; index < commonLedgerData.length; index++) {
						if (commonLedgerData[index].accountName == "Cash") {
							cashLedgerID = ObjectID(commonLedgerData[index]._id);
						} else {
							pygmyControlLedgerID = ObjectID(commonLedgerData[index]._id)
						}
					}

					TransactionHeader.findOne({}, { VoucherNo: 1, _id: 0 })
						.sort({ "VoucherNo": -1 }).limit(1).lean().exec(function (err, dataVoucherNo) {
							if (dataVoucherNo != null) {
								maxVoucherNo = dataVoucherNo.VoucherNo + 1;
							}

							//Header
							var thPygmyControl = {
								VoucherType: "Receipt", Date: new Date(), Prefix: "", VoucherNo: maxVoucherNo,
								Suffix: "", RefNo: maxVoucherNo, Amount: amount, UserId: "", NoOfItems: 2
							}
							TransactionHeader.create(thPygmyControl, function (err, data) { });

							//Details
							var tdCash = {
								VoucherType: "Receipt", VoucherDate: new Date(), Prefix: "",
								VoucherNo: maxVoucherNo, Suffix: "", RefNo: maxVoucherNo, AccountId: cashLedgerID,
								Amount: amount, Narration: narration, Remarks: remarks, TransType: DEBIT
							}
							TransactionDetails.create(tdCash, function (err, data) { });

							var tdPygmyControl = {
								VoucherType: "Receipt", VoucherDate: new Date(), Prefix: "",
								VoucherNo: maxVoucherNo, Suffix: "", RefNo: maxVoucherNo, AccountId: pygmyControlLedgerID,
								Amount: amount, Narration: narration, Remarks: remarks, TransType: CREDIT
							}
							TransactionDetails.create(tdPygmyControl, function (err, data) { });

						});
				}
			});


	}

	app.put('/api/receipt/:id', function (req, res) {
		SubscriberTicketMapping.findOne({
			"groupID": ObjectID(req.body["groupID"]),
			"subscriberID": ObjectID(req.body["subscriberID"])
		},
			function (err, stmData) {
				if (stmData != null) {
					var obj = {
						groupID: ObjectID(req.body["groupID"]),
						subscriberID: ObjectID(req.body["subscriberID"]),
						ticketNo: stmData["ticketNo"],
						amount: req.body["amount"],
						date: new Date()
					}

					ReceiptAdvanceDetails.findByIdAndUpdate(req.params.id, obj, function (err, data) {
						if (err) {
							res.send(err);
						}

						ReceiptAdvanceDetails.aggregate([
							{ $lookup: { from: "groupdetails", localField: "groupID", foreignField: "_id", as: "v1" } },
							{ $unwind: { path: '$v1' } },
							{ $lookup: { from: "subscribers", localField: "subscriberID", foreignField: "_id", as: "v2" } },
							{ $unwind: { path: '$v2' } },
							{
								$project: {
									_id: 1, ticketNo: 1, amount: 1, date: 1,
									groupName: "$v1.groupName", groupID: "$v1._id",
									subscriber: "$v2.subscriber", subscriberID: "$v2._id"
								}
							}
						]).exec(function (err, data) {
							if (err) {
								res.send(err);
							}
							res.json(data);
						});
					});
				}
			});
	});

	/* -------------------------------------------------------------------------
						API's to manage account details
	   ------------------------------------------------------------------------- */
	/* MAIN CLASS */
	app.get('/api/acc_mgmt/mc', function (req, res) {
		MainClass.find({}, null, { sort: { 'MCID': 1 } }, function (err, mcDetails) {
			if (err) {
				res.send(err);
			}
			res.json(mcDetails);
		});
	});

	/* MAIN GROUP */
	app.get('/api/acc_mgmt/mg/:mcid', function (req, res) {
		MainGroup.find({ 'MCID': parseInt(req.params.mcid) }, null, { sort: { 'MGID': 1 } }, function (err, mgDetails) {
			if (err) {
				res.send(err);
			}
			res.json(mgDetails);
		});
	});

	/* SUB GROUP */
	app.get('/api/acc_mgmt/sg/:mgid', function (req, res) {
		SubGroup.find({ 'MGID': req.params.mgid }, null, { sort: { 'SortOrder': 1 } }, function (err, groupdetails) {
			if (err) {
				res.send(err);
			}
			res.json(groupdetails);
		});
	});

	app.post('/api/acc_mgmt/sg', function (req, res, next) {
		SubGroup.find({}, { SGID: 1, _id: 0 }).lean().exec(function (err, sgIDs) {
			var array = new Array();
			if (sgIDs != null && sgIDs.length > 0) {
				for (var index = 0; index < sgIDs.length; index++) {
					var num = sgIDs[index].SGID.replace("SG", "");
					array.push(parseInt(num));
				}
				req.body.SGID = "SG" + (Math.max.apply(null, array) + 1)
			} else {
				req.body.SGID = "SG1"
			}
			SubGroup.create(req.body, function (err, subgroup) {
				if (err) {
					res.send(err);
				}
				res.json(subgroup);
			});
		});
	});

	app.put('/api/acc_mgmt/sg/:id', function (req, res, next) {
		SubGroup.findByIdAndUpdate(req.params.id, req.body, function (err, subgroup) {
			if (err) {
				res.send(err);
			}
			res.json(subgroup);
		});
	});

	/* USER GROUP */
	app.get('/api/acc_mgmt/ug/:sgid', function (req, res) {
		UserGroup.find({ 'SGID': req.params.sgid }, null, { sort: { 'SortOrder': 1 } }, function (err, usergroup) {
			if (err) {
				res.send(err);
			}
			res.json(usergroup);
		});
	});

	app.post('/api/acc_mgmt/ug', function (req, res, next) {
		UserGroup.find({}, { UGID: 1, _id: 0 }).lean().exec(function (err, ugIDs) {
			var array = new Array();
			if (ugIDs != null && ugIDs.length > 0) {
				for (var index = 0; index < ugIDs.length; index++) {
					var num = ugIDs[index].UGID.replace("UG", "");
					array.push(parseInt(num));
				}
				req.body.UGID = "UG" + (Math.max.apply(null, array) + 1)
			} else {
				req.body.UGID = "UG1"
			}
			UserGroup.create(req.body, function (err, usergroup) {
				if (err) {
					res.send(err);
				}
				res.json(usergroup);
			});
		});
	});

	app.put('/api/acc_mgmt/ug/:id', function (req, res, next) {
		UserGroup.findByIdAndUpdate(req.params.id, req.body, function (err, usergroup) {
			if (err) {
				res.send(err);
			}
			res.json(usergroup);
		});
	});


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/cf/*', function (req, res) {
		res.sendfile('./public/index.html');
	});

};
// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberInstallmentDetailsSchema = new mongoose.Schema({
  groupID: mongoose.Schema.Types.ObjectId,
  subscriberID: mongoose.Schema.Types.ObjectId,
  ticketNo: Number,
  auctionNo: Number,
  auctionInstallmentAmount: Number,
  auctionDividendAmount: Number,
  installmentAmountDue: Number,
  dueDate: Date
});

module.exports = mongoose.model('SubscriberInstallmentDetails', SubscriberInstallmentDetailsSchema);

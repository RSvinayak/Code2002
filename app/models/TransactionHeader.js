// grab the mongoose module
var mongoose = require('mongoose');

var TransactionHeaderSchema = new mongoose.Schema({
  VoucherType: String,
  Date: Date,
  Prefix: String,
  VoucherNo: Number,
  Suffix: String,
  RefNo: String,
  Amount: Number,
  UserId: String,
  NoOfItems: Number
});

module.exports = mongoose.model('TransactionHeader', TransactionHeaderSchema);
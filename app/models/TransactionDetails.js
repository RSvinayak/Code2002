// grab the mongoose module
var mongoose = require('mongoose');

var TransactionDetailsSchema = new mongoose.Schema({
  VoucherType: String,
  VoucherDate: Date,
  Prefix: String,
  VoucherNo: Number,
  Suffix: String,
  RefNo: String,
  AccountId: mongoose.Schema.Types.ObjectId,
  Amount: Number,
  Narration: String,
  Remarks: String,
  TransType: Boolean
});

module.exports = mongoose.model('TransactionDetails', TransactionDetailsSchema);

/**
 * TransType used
 * 1: Debit
 * 0: Credit
 */
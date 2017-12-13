// grab the mongoose module
var mongoose = require('mongoose');

var LedgerAccountSchema = new mongoose.Schema({
  accountName: String,
  groupID: String,
  yearOpBalance: Number,
  opBalanceType: Boolean,
  alias: String,
  remarks: String  
});

module.exports = mongoose.model('LedgerAccount', LedgerAccountSchema);

/**
 * ReferenceID used:
 * 1: Subscriber Accounts
 * 2: Group Accounts
 * 3: Group Dividend Accounts
 * -------------- COMMON ACCOUNTS FOR ALL GROUPS --------------
 * 0: Commission Collected
 * 0: Loss of Discount
 * 0: Dividend Earned
 * 0: Foreman Tkt Account
 * 0: Foreman Investment Account
 * 0: Foreman Dividend Reinvested
 */ 
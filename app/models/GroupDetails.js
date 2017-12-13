// grab the mongoose module
var mongoose = require('mongoose');

var GroupDetailsSchema = new mongoose.Schema({
    groupName: String,
    subscriberCount: Number,
    allAuctionComplete: Boolean,
    groupLedgerID: mongoose.Schema.Types.ObjectId,
    dividendLedgerID: mongoose.Schema.Types.ObjectId,
    data: Object
});

module.exports = mongoose.model('GroupDetails', GroupDetailsSchema);

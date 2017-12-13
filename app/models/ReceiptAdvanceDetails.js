// grab the mongoose module
var mongoose = require('mongoose');

var ReceiptAdvanceDetailsSchema = new mongoose.Schema({
    groupID: mongoose.Schema.Types.ObjectId,
    subscriberID: mongoose.Schema.Types.ObjectId,
    ticketNo: Number,
    amount: Number,
    date: Date
});

module.exports = mongoose.model('ReceiptAdvanceDetails', ReceiptAdvanceDetailsSchema);

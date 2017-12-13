var mongoose = require('mongoose');

var GroupAuctionSchema = new mongoose.Schema({
    groupID: mongoose.Schema.Types.ObjectId,
    auctionNo: Number,
    prizeWinner: mongoose.Schema.Types.ObjectId,
    data: Object
});

module.exports = mongoose.model('GroupAuction', GroupAuctionSchema);
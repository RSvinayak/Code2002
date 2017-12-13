// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberTicketMappingSchema = new mongoose.Schema({
    ticketNo: Number,
    groupID: mongoose.Schema.Types.ObjectId,
    subscriberID: mongoose.Schema.Types.ObjectId,
    subscriber: String,
    relationship: String,
    nominee: String,
    nomineeAge: Number,
    collector: String,
    introducedBy: String,
    intimation: String,
    hasBeenPrizedSubscriber: Boolean
});

module.exports = mongoose.model('SubscriberTicketMapping', SubscriberTicketMappingSchema);

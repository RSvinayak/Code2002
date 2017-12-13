// grab the mongoose module
var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  subscriber: String,
  data: Object,
  isCompanySubscriber: Boolean,
  ledgerID: mongoose.Schema.Types.ObjectId,
  active: Boolean,
  kyc: Object,
});

module.exports = mongoose.model('Subscribers', SubscriberSchema);

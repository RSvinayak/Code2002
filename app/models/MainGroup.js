// grab the mongoose module
var mongoose = require('mongoose');

var MainGroupSchema = new mongoose.Schema({
  MGID: String,
  MCID: Number,
  MainGroup: String,
  HasOpBalance: Boolean,
  DefaultBalance: String

});

module.exports = mongoose.model('MainGroup', MainGroupSchema);
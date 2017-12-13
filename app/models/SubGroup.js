// grab the mongoose module
var mongoose = require('mongoose');

var SubGroupSchema = new mongoose.Schema({
  SGID: String,
  MGID: String,
  SubGroup: String,
  Fixed: Boolean,
  SortOrder: Number
});

module.exports = mongoose.model('SubGroup', SubGroupSchema);
// grab the mongoose module
var mongoose = require('mongoose');

var UserGroupSchema = new mongoose.Schema({
  UGID: String,
  SGID: String,
  UserGroup: String,
  SortOrder: Number
});

module.exports = mongoose.model('UserGroup', UserGroupSchema);
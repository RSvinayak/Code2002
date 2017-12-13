// grab the mongoose module
var mongoose = require('mongoose');

var MainClassSchema = new mongoose.Schema({
  MCID: Number,
  MainClass: String
});

module.exports = mongoose.model('MainClass', MainClassSchema);

var mongoose = require('mongoose');

var DropDownValuesSchema = new mongoose.Schema({
    Index: String,
    Code: String,
    Type: String
});

module.exports = mongoose.model('DropDownValues', DropDownValuesSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ID = new Schema({
    
    username: String,
    code: String,
    
});

ID.plugin(passportLocalMongoose);

module.exports = mongoose.model('ids', ID);
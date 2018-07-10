var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var CODE = new Schema({
    
    name: String,
    code: String,
    
});

CODE.plugin(passportLocalMongoose);

module.exports = mongoose.model('code', CODE);
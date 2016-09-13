var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//Schema Setup
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
mongoose.Promise = require('bluebird');

// var url = process.env.DATABASEURL || "mongodb://localhost/yelpCamp";
// mongoose.connect(url);

var dbHost = 'mongodb://database/yelpCamp';
mongoose.connect(dbHost);

// =============================================================
User.remove({})
  .then(function() {
    return Comment.remove({})
  })
  .then(function() {
    return Campground.remove({})
  })
  .catch(function(err) {
    console.log(err);
  });



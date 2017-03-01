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
var data = [
  {
    name: "ANGEL ISLAND",
    image: "https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg",
    description: "In the middle of San Francisco Bay sits Angel Island State Park, offering spectacular views of the San Francisco skyline, the Marin Headlands and Mount Tamalpais. "
  },
  {
    name: "SAN ONOFRE STATE BEACH",
    image: "https://farm6.staticflickr.com/5297/13955106892_6cb892a8ed.jpg",
    description: "Be sure to visit the new Moro Campground at Crystal Cove, this coastal campground is the first built by California State Parks in over 20 years, and offers stunning coastal views, great access to the beach, miles of hiking trails and much more - all right in the middle of Orange County! "
  },
  {
    name: "CRYSTAL COVE",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Crystal Cove State Park's rolling surf, wide sandy beaches, tide pools, gently sloping hills and deeply wooded canyons and ridges provide a delightful contrast to its urban surroundings. Located off Pacific Coast Highway between Corona Del Mar and Laguna beach, Crystal Cove is one of Orange County's largest remaining examples of open space and natural seashores. "
  }
];

// =============================================================

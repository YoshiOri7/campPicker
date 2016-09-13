//FILE CONFIG
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User =require("./models/user");
var Campground =require("./models/campground");
var Comment = require("./models/comment");
var seeDB   = require("./seeds");

//ROUTES CONFIG
var commentRoutes   = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//APP CONFIG
//mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.connect("mongodb://yoshi:rusty@ds029496.mlab.com:29496/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seeDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Rusty is the cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use app.use to call funciton on every route to pass through user info
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// **************************************
//Listen (starting a server)
// **************************************
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});

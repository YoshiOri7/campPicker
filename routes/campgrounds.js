var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

// **************************************
// CAMPGORUND ROUTE
// **************************************
// INDEX - show all campgrounds 
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({},function(err, allCampground){
        if(err){ 
            console.log(err); 
        }
        else{ 
            res.render("campgrounds/index", {campgrounds: allCampground, currentUser: req.user});
        }
    });
});

// CREATE - add a campground to DB 
router.post("/", middleware.isLoggedIn, function(req,res){
   //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image:image, description: desc, author: author};
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){ 
            console.log(err); 
        }
        else{ 
             //redirect back to campgrounds page
            req.flash("success","Successfully added campground");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create a campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs") 
});

//SHOW - show info about the selected campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){ 
            console.log(err); 
        }
        else{ 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit',{campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err)
            res.redirect("/camgorunds");
        } 
        else{
            res.redirect('/campgrounds/'+req.params.id); 
        }
    });     
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } 
        else{
            req.flash("success","Successfully deleted campground");
            res.redirect("/campgrounds"); 
        }
    });
});


module.exports = router;
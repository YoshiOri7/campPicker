var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "walnut creek", 
        image: "https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I"
    },
    {
        name: "salmon creek", 
        image: "https://farm6.staticflickr.com/5694/21041875770_ffea6404d0.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I"
    },
    {
        name: "vallye creek", 
        image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. I"
    }
];

function seeDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log("removed campgrounds");
    
            //Add a campground
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a campground")
                        //create a commennt
                        Comment.create(
                            {
                                text: "This place is great",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment");
                                }
                            });
                    }
                });   
            });
        }
    });
}

module.exports = seeDB;

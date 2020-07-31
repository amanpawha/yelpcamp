var mongoose = require("mongoose");
var Campground =  require("./models/campground");
var Comment = require("./models/comment");
var data=[
    {name: "clouds rest",
     image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
     description: "blah blah blah"    
    },
    {name: "Kasol",
     image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
     description: "blah blah blah"    
    },
    {name: "Kheerganga",
     image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
     description: "blah blah blah"    
    },
    
]
function seedDB(){
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds");
});

//add a few campgrounds
data.forEach(function(seed){
    Campground.create(seed,function(err, campground){
        if(err){
           console.log(err); 
        }
        else{
            console.log("added a campground");
            // create a comment
            Comment.create(
                {
                    text: "this place is great, but i wish there was internet ",
                    author: "homer"

                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else{
                 campground.comments.push(comment);
                 campground.save();
                 console.log("created new comment");
                    }
                });
    
        }
    });
});
}
module.exports =  seedDB;
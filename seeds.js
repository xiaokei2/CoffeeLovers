var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
{
    name: "cute kids are playing",
    image:"https://images.pexels.com/photos/164854/pexels-photo-164854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
    description: " look at them, they are so adorable at "
}    
]
function seedDB(){
    Campground.remove({}, function(err){
    /*        if(err){
                console.log(err);
            }else{
                console.log("remove all files !");
            }
    });
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("added a campground");
            
            //create a comment
            Comment.create(
            {
                text: "This place is great, but without internet",
                author: "Homer"
            },function(err, createdComment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(createdComment);
                    campground.save();
                    console.log("Created new Comment");
                }          
            });
          }
        });
        */
    });
       
}

module.exports = seedDB;
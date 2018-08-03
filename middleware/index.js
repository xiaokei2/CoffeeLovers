var Campground = require("../models/campground"),
    Comment    = require("../models/comment");
    
var middlewareObj ={};

middlewareObj.checkCampgroundOwnerShip = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err){
               res.redirect("back");
           } else{
                    //Does user own the campground ?
                    // campCamground.author is mongoose object
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        res.redirect("back");
                    }
            }
        });
    }else{
        res.redirect("back");
        }
} 


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}
middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err){
               res.redirect("back");
           } else{
                    //Does user own the campground ?
                    // campCamground.author is mongoose object
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        res.redirect("back");
                    }
                   
                    
            }
        });
    }else{
        res.redirect("back");
    }
}
module.exports = middlewareObj;
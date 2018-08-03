var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var mongoose = require("mongoose");
var middleware = require("../middleware");

//==============
//COMMENT ROUTES
//==============


router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});
//SHOW -shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground:foundCampground})
        }
    });
    
});

router.post("/",middleware.isLoggedIn, function(req, res){
    //
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    console.log(mongoose.Types.ObjectId.isValid(req.user._id));

    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
   
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");    
        } 
    });
    //redirect back to campgrounds page

    
})
//=====================
//EDIT CAMPGROUND ROUTE
//=====================
router.get("/:id/edit", middleware.checkCampgroundOwnerShip,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground:foundCampground});
    });
    
});

router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      }  else{
          res.redirect("/campgrounds/" + req.params.id);
      }
    });
})
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});
//=======================
//UPDATE CAMPGROUND ROUTE
//=======================

module.exports = router;
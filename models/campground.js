// Schema setup
var mongoose = require("mongoose");
var campgroundsSchema = new mongoose.Schema({
    price: String,
    name:String,
    image:String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
        ]
    
});

module.exports= mongoose.model("Campground", campgroundsSchema);
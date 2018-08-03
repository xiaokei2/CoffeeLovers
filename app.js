var express = require("express"), app = express(), bodyParser = require("body-parser"), mongoos = require("mongoose"), Comment = require("./models/comment")
var flash = require("connect-flash");
mongoos.connect("mongodb://localhost/yelp_camp_8");
var LocalStategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    passport = require("passport");

var Campground = require("./models/campground"), seedDB = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Jesus",
    resave:false,
    saveUnintialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.failureFlash = req.flash("failureFlash");
    next();
})

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started !");
});
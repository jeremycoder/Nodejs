var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    flash             = require("connect-flash"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    methodOverride    = require("method-override"),
    Campground        = require("./models/campground"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    seedDB            = require("./seeds")
    
//Requiring routes
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")
    
   
    
//Create and connect to database
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(process.env.DATABASEURL);

//Urlencoding for body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Populate database with some campgrounds and comments
//seedDB(); //Seed the database (disabled for now)

//Connect-Flash for flash messages
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
  secret: "HalleluYah! Praise Yahweh!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Make these variables available everywhere
//This is middleware
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//View engine will be ejs
app.set("view engine", "ejs");

//Use custom stylesheet
app.use(express.static(__dirname + "/public"));

//Using method override
app.use(methodOverride("_method"));



/* Prefixes for routes
The "/" in the index routes isn't necessary
It's just to keep up with the formality of
the other routes */
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp is serving...");
});
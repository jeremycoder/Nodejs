var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

//Connect to database
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');

//BodyParser needed to get data from post request
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret:            "HalleluYah! May Yahweh be blessed forever!",
    resave:            false,
    saveUninitialized: false
}));

//Have express use passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================
//ROUTES
//=================
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){
    res.render("secret");
});

//Auth Routes
//=================

//Show signup form
app.get("/register", function(req, res){
    res.render("register");
});

//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
          console.log(err);
          return res.render('register');
       }
       //Log user in using local strategy (can use others like "Twitter" or "Facebook")
       passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
       })
    });
});

//Login Routes
//=====================

//Show login form
app.get("/login", function(req, res){
    res.render("login");
});

/*
//Login logic
//middleware (Passport authenticates between begin and end of route)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});
*/

//Redo Login Logic Jeremy's own code. 
//This code is just like the one above except this takes you to an "Unauthorized"
//page when login fails. The other one keeps you on the "/login" page. The
//"Unauthorized" page is default in Passport
//middleware (Passport authenticates between begin and end of route)
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/secret');
  });


//Logging out
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//Check if user is logged in
function isLoggedIn(req, res, next){
    //If user is logged in go to next stage
    if(req.isAuthenticated()){
        return next();
    }
    //If user is not logged in, go to log in form
    res.redirect("/login");
}



//=======================
//SERVER
//=======================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started..."); 
});
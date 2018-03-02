var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//Home/Landing page
router.get("/", function(req, res){
    res.render("landing");
});

//Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//Handle sign up logic
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", user.username + ", welcome to YelpCamp!");
      res.redirect("/campgrounds"); 
    });
  });
});

//Show login form
router.get("/login", function(req, res){
    res.render("login");
});

//Handle login logic
//Note: The code below is arranged like this: app.post("login, middleware, callback")
//The callback function doesn't do anything in this particular code
router.post("/login", passport.authenticate("local", 
  { 
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
  }), function(req, res){
  
});

//Logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out.")
  res.redirect("/campgrounds");
});

module.exports = router;

//all middleware code

var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
          console.log(err);
          req.flash("error", "Campground not found.");
          res.redirect("back");
        } else {
          //Does user own the campground?
          if(foundCampground.author.id.equals(req.user._id)){
           next();
          } else {
            req.flash("error", "Not authorized.");
            res.redirect("back");
          }
        }
      });
    } else {
      //If user is not logged in, show error and 
      //send user to previous page (back)
      req.flash("error", "Login required.")
      res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next){
    if (req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          console.log(err);
          res.redirect("back");
        } else {
          //Does user own the comment?
          if(foundComment.author.id.equals(req.user._id)){
           next();
          } else {
             req.flash("error", "Not authorized.")
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "Login required.")
      res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Login required.");
  //flash message is displayed in following code, "login", in this case
  //So, it must be handled there as well.
  //If user is not logged in, send user to login page
  res.redirect("/login");
}

module.exports = middlewareObj;


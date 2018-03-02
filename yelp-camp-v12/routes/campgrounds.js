var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    
    //Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
      if (err) {
        console.log(err);
      } else {
        console.log(allCampgrounds);
        res.render("campgrounds/index", {campgrounds:allCampgrounds});
      }
    });
});

//CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //Extract name and image from body
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //Refuse empty name or image
    if (name.length === 0 || image.length === 0 || description.length === 0) {
      req.flash("error", "All information is required.")
      res.redirect("back");
    } else {
      var newCampground = {name: name, image: image, price: price, description: description, author: author};
      //Create a new campground and save to DB
      Campground.create(newCampground, 
      
        function(err, newlyCreated){
          if (err) {
            console.log(err);
          } else {
            console.log("New Campground Created: ");
            console.log(newlyCreated);
            //Redirect back to campgrounds page
            res.redirect("/campgrounds");
          } //else
      }); //function(err, newlyCreated) 
    } //else
}); //app.post

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //Find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      //foundCampground has value in req.params.id
      if (err) {
        console.log(err);
      } else {
          console.log(foundCampground);
          //Render show template with that campground
          res.render("campgrounds/show", {campground: foundCampground});
      }
    });
});

//EDIT - edits the campground entry
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
     res.render("campgrounds/edit", {campground: foundCampground});
  });
});


//UPDATE - update campground entry
router.put("/:id/", middleware.checkCampgroundOwnership, function(req, res){
  //find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
    
  });
  //redirect to that campgrounds show page
});

//DESTROY - delete campground entry
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  //find and delete correct campground
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/campgrounds/" + req.params.id)
    } else {
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;
var mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment");
    
var data = [
    {
        name: "Wooded Nest",
        image: "http://farm4.staticflickr.com/3518/3712806839_2c04aff27a_z.jpg",
        description: "For God so loved the world that he gave his one and only Son, that" + 
        " whoever believes in him shall not perish but have eternal life. For I know the" + 
        "plans I have for you,” declares the LORD, “plans to prosper you and not to harm you," + 
        " plans to give you hope and a future."
    },
    
    {
        name: "Silent Lake",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Suttle_Lake%2C_Blue_Bay_Campground%2C_USFS.jpg",
        description: "For God so loved the world that he gave his one and only Son, that" + 
        " whoever believes in him shall not perish but have eternal life. For I know the" + 
        "plans I have for you,” declares the LORD, “plans to prosper you and not to harm you," + 
        " plans to give you hope and a future."
    },
    
    {
        name: "Snowy Ridge",
        image: "http://farm7.staticflickr.com/6188/6096829808_5dcd264f7d_z.jpg",
        description: "For God so loved the world that he gave his one and only Son, that" + 
        " whoever believes in him shall not perish but have eternal life. For I know the" + 
        "plans I have for you,” declares the LORD, “plans to prosper you and not to harm you," + 
        " plans to give you hope and a future."
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err){
      if(err) {
        console.log(err);
      } else {
        console.log("Removed Campgrounds");
      }
    
      //Add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err) {
                console.log(err);
            } else {
                console.log("Added a campground");
                //Create comment
                Comment.create(
                    {
                        text: "This place is great, but I wish there was internet.",
                        author: "Homer"
                    }, function(err, comment){
                        if (err) {
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                       });
            }
        });
      });
    });
    
    //Add a few comments
}

module.exports = seedDB;


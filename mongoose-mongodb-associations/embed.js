var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema] //Has to be the schema
});
var User = mongoose.model("User", userSchema);

var newUser = new User({
     email: "hermione@stevenson.edu",
     name: "Hermione Granger"
});

// newUser.posts.push({
//     title: "How to brew fine tea",
//     content: "For more info, go to tea class"
// });

// newUser.save(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
          title: "Brewing Chamomile tea",
          content:"Start with near boiling water."
        });
        
      //Add to database
      user.save(function(err, user){
          if (err) {
              console.log(err);
          } else {
              console.log(user);
          }
      });
    }
});
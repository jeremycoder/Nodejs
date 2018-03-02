var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");


mongoose.connect("mongodb://localhost/blog_demo_2");





// Post.create({
//     title: "How to Cook Macaroni Alfredo",
//     content: "Oh, yeah, so delicious!"
// },  function(err, post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

//Find user
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

//Find all posts for that user

//Find user
//Jeremy's own code
// User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Yep, this is: " + foundUser.name + " " + foundUser.email);
        
//         //Find all posts for that user
//         foundUser.posts.forEach(function(post){
//         Post.findOne({_id: post}, function(err, foundPost){
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log("Title: " + foundPost.title);
//                 console.log("Content: " + foundPost.content);
//             }
//         });
        
//         });
//     }
// });


// User.create({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// });


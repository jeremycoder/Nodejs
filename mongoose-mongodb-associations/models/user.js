var mongoose = require("mongoose");

//USER - email, name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   //Reference and not embed
   posts: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post"
       }
   ]
});

//This is what we export (like return statement in a function)
module.exports = mongoose.model("User", userSchema);
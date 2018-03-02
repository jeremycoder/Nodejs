var mongoose = require("mongoose");

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
//This is what we export (like return statement in a function)
module.exports = mongoose.model("Post", postSchema);
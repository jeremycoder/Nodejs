//Get express
var express = require("express");
//Initialize express object called app
var app = express();
//Will be using ejs files
app.set("view engine", "ejs");
//Use body-parser to get data from html body
var bodyParser = require("body-parser");

//Have body-parser parse only urlencoded bodies (this is needed)
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Chomba", "Mwangala", "Sepiso", "Prez", "Fred"];

//Get home page
app.get("/", function (req, res){
    res.render("home");
});

//Get friends page
app.get("/friends", function (req, res){
    res.render("friends", {friends: friends});
});

//Post to friends page
app.post('/addfriend', function (req, res) {
  //Get friend name from body
  var newFriend = req.body.newfriend;
  //Add friend name to array
  friends.push(newFriend);
  //Redirect to friends page
  res.redirect("/friends");
});

//Start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening..."); 
});


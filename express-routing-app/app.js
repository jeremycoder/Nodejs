//Demonstrates routes using Express
var express = require("express");
var app = express();

//Route responses
var welcome = "Hi there, welcome to my assignment!";
var notFound = "Sorry, a page not found...What are you doing with your life?";


//Routes
app.get("/", function(req, res){
    res.send(welcome);
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        dog : "Woof woof",
        cow : "Moo",
        pig : "Oink",
        donkey : "Heehaw Heehaw",
        turkey : "Gobble Gobble"
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says " + "'" +sound+"'");
});

//Repeat parameter based on another parameter
app.get("/repeat/:msg/:num", function(req, res){
    var msg = req.params.msg;
    var num = Number(req.params.num);
    var text = " ";
    for (var i = 0; i < num; i++) {
        text += msg + " ";
    }
    res.send(text);
});





app.get("*", function(req, res){
   res.send(notFound); 
});

//Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Routing App Server Started!");
});
var express = require("express");
var app = express();


//Routes
// "/" => "Hi there! Request and response"
app.get("/", function(req, res) {
    res.send("<h1>Hi Jeremy! Congratulations bro! Yeah!!!!!</h1>")
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    res.send('<img src="http://www.desicomments.com/wp-content/uploads/2017/05/Goodbye-Funny-Pic.jpeg" />')
});
// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    res.send('<img src="https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header" />')
});

//Reddit-inspired parameters
app.get("/r/:subReddit", function(req, res) {
    var subReddit = req.params.subReddit;
    res.send("<h1>Welcome to the " + subReddit.toUpperCase() + " page!</h1>");
});

//Another Reddit-inspired parameters
app.get("/r/:subReddit/comments/:id/:title/", function(req, res) {
    res.send("Another Reddit example!");
});

//Catch-all
// "*"
app.get("*", function(req, res) {
    res.send("You are a star!");
});



//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});
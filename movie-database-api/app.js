var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

//Use body-parser to get data from html body
var bodyParser = require("body-parser");

//Have body-parser parse only urlencoded bodies (this is needed)
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("search");
});

app.post("/results", function(req, res){
    //Get title from body
    var title = req.body.title;
    request('http://www.omdbapi.com/?s=' + title + '&apikey=thewdb', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Data comes back as a string, parse to JSON
        var data = JSON.parse(body);
        res.render("results", {data: data});
    }
    });
});

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});
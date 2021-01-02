const express = require("express");
const mongoose = require("mongoose");
var uri = 'mongodb+srv://aquarium:prova@cluster0.8kkts.mongodb.net/test?retryWrites=true&w=majority';
const employees = require("./model");
const Router = require('./routes/routes');


const app = express();


const port = 4000;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.set('view engine', 'ejs');


app.use(express.urlencoded());
app.use(express.json());
app.use("/api", Router);

// index page
app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    var user = "Claudio";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline,
        user: user
    });
});
// about page
app.get('/about', function(req, res) {
    var user = "Claudio";
    res.render('pages/about',{
        user:user
    });
});


app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});





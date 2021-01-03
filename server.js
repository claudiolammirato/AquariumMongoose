const express = require("express");
const mongoose = require("mongoose");
var uri = 'mongodb+srv://aquarium:prova@cluster0.8kkts.mongodb.net/aquariumdb?retryWrites=true&w=majority';
const Users = require("./models/user_model");
const Params = require("./models/params_model");

const Router = require('./routes/routes');


const app = express();


const port = process.env.PORT || 4000;

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
              user: user,
      })
});

// about page
app.get('/about', function(req, res) {
    var user = "Claudio";
    res.render('pages/about',{
        user:user
    });
});

// Users page
app.get('/users', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
];
var tagline = "No programming concept is complete without a cute animal mascot.";

var user = "Claudio";
  
  Users.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
        res.render('pages/users', {
          mascots: mascots,
          tagline: tagline,
          user: user,
          result: result,
          error: req.query.error,
          itemdeleted: req.query.deleted,
          itemnodeleted: req.query.nodeleted,
          iteminserted: req.query.message,
          itemnoinserted: req.query.messageerror
        })
      }
  })
  })


// Parameters page
app.get('/parameters', function(req, res) {
  var user = "Claudio";
  Params.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
        res.render('pages/parameters', {
          user: user,
          result: result,
          error: req.query.error,
          itemdeleted: req.query.deleted,
          itemnodeleted: req.query.nodeleted,
          iteminserted: req.query.message,
          itemnoinserted: req.query.messageerror
        })
      }
    })
    })


app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

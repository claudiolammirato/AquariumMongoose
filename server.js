const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const ejs = require('ejs');
const axios = require('axios')
const User = require('./models/user_model');
const bcrypt = require('bcryptjs');


const app = express();

var server      = require('http').createServer(app);
var io          = require('socket.io')(server);

var uri = process.env.DB_MONGO;
const Users = require("./models/user_model");
const Params = require("./models/params_model");

const Router = require('./routes/routes');
const AuthRoute = require('./routes/auth');
const authenticate = require('./middleware/authenticate');




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
app.use("/auth", AuthRoute);

app.use(cors({
  credentials: true,
  origin: 'http://localhost:4000/auth/login',
}));
app.use(cookieParser());



// index page
app.get('/', authenticate, function(req, res) {
  
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
              user: req.cookies.user.user,
              message: req.query.message
      })
});

// about page
app.get('/about', authenticate, function(req, res) {
    var user = "Claudio";
    res.render('pages/about',{
      user: req.cookies.user.user
    });
});

// Login page
app.get('/login', function(req, res) {
  if(req.cookies.user !== undefined){
    res.render('pages/login',{
        user: req.cookies.user.user ,
        message: req.query.message
    });
  }else{
    res.render('pages/login',{
    user: "Any user Logged In!",
    message: req.query.message
  });}
});

// Register page
app.get('/register', function(req, res) {
  if(req.cookies.user !== undefined){
    res.render('pages/register',{
        user: req.cookies.user.user ,
        message: req.query.message
    });
  }else{
    res.render('pages/register',{
    user: "Any user Logged In!",
    message: req.query.message
  });}
});

//Logout page
app.get('/logout', authenticate, (req, res) => {
  cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/');
});

// Users page
app.get('/users', authenticate, function(req, res) {
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
          user: req.cookies.user.user,
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
app.get('/parameters', authenticate, function(req, res) {
  //console.log(req.cookies.user._id)

  Params.find({user: mongoose.Types.ObjectId(req.cookies.user._id)}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
        res.render('pages/parameters', {
          user: req.cookies.user.user,
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


// SOCKET-IO - cambiare user va fatta autenticazione
io.on('connection', socket => {
  console.log('connect');
  socket.on('insertparams', function(user2) {
    
      
    var username = user2.user;
    var password = user2.password;
    //console.log(username);
    var user1;

    User.findOne({$or: [{email:username},{user:username}]})
    .then(user => {
        
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    console.log(err)
                    
                }
                if(result){
                    axios.post('http://localhost:4000/api/insertparameters', {
                    date: user2.date,
                    ph: user2.ph,
                    ammonia: user2.ammonia,
                    nitrite: user2.nitrite,
                    nitrate: user2.nitrate,
                    temperature: user2.temperature,
                    water_change: user2.water_change,
                    user: user
                    })
                    .then(function (response) {
                      //console.log(response);
                      console.log('done')
                    })
                    .catch(function (error) {
                      console.log(error);
                    })

                      
                }else{
                    const message = 'Wrong password!!!';
                    console.log('Wrong Password')
                }
            })
                }else{
                    const message = 'User not found!';
                    console.log('user not found')
            
        }
    })
          
    })  
  });




server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

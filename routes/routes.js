const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


const Users = require("../models/user_model");
const Params = require("../models/params_model");

//USERS
  router.route("/insertuser").post(function(req, res) {
    const user = req.body.user;
    const  email = req.body.email;
    const password = req.body.password;
    if (user == '' || email == '' || password == '' ) {
      const messageerror = "Fill in all the data!"
      res.redirect('/?messageerror='+messageerror);
    }else{
      console.log(user);

    Users.create([{user: user, email: email, password: password}], function(err, result) {
      if (err) {
        res.send(err);
      } else {
          const message = "Item Inserted!"
          res.redirect('/?message='+message);
      }
      });
    }
});

router.route("/fetchuser").get(function(req, res) {
    Users.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.route("/deleteuser").post(function(req, res) {
    //console.log(req.body.id)
    Users.findByIdAndDelete(req.body.id, function (err) {
      const itemdeleted = "Item "+req.body.id+" is deleted!";
      const itemnodeleted = "Insert ID!";
      //console.log(req.body.id);
      if(req.body.id === ''){ 
        //console.log('Item not exist');
        res.redirect('/?nodeleted='+itemnodeleted);
      }else{
      //console.log("Successful deletion");
      res.redirect('/?deleted='+itemdeleted);
      }
    });
  });

  router.route("/updateuser").post(function(req, res) {
    Users.updateOne({ _id: req.body.id_update }, { user: req.body.user_update, email:req.body.email_update, password: req.body.password_update }, function(
      err,
      result
    ) {
      if (err) {
        const error = "INSERT ID to Update"
        res.redirect('/?error='+error);
      } else {
          res.redirect('/');
      }
    });
  });

//PARAMETERS
router.route("/insertparameters").post(function(req, res) {
  
  //console.log(req.cookies.user.user)
  
  const date = req.body.date;
  const  ph = req.body.ph;
  const ammonia = req.body.ammonia;
  const nitrite = req.body.nitrite;
  const nitrate = req.body.nitrate;
  const temperature = req.body.temperature;
  const water_change = req.body.water_change;
  const user = (req.cookies.user!== undefined) ? req.cookies.user : req.body.user;
  //console.log(user.email)
  
  if (date == '') {
    const messageerror = "Fill in the Date!"
    res.redirect('/?messageerror='+messageerror);
  }else{
    //console.log(date);

  Params.create([{date: date, ph: ph, ammonia: ammonia, nitrite: nitrite, nitrate: nitrate, temperature: temperature, water_change: water_change, user: user }], function(err, result) {
    if (err) {
      res.send(err);
      console.log(err)
    } else {
        const message = "Water Parameters Inserted!"
        console.log(message)
        res.redirect('/?message='+message);
    }
    });
  }
});

router.route("/fetchparameters").get(function(req, res) {
  Params.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/deleteparameters").post(function(req, res) {
  //console.log(req.body.id)
  Params.findByIdAndDelete(req.body.id, function (err) {
    const itemdeleted = "Item "+req.body.id+" is deleted!";
    const itemnodeleted = "Insert ID!";
    //console.log(req.body.id);
    if(req.body.id === ''){ 
      //console.log('Item not exist');
      res.redirect('/?nodeleted='+itemnodeleted);
    }else{
    //console.log("Successful deletion");
    res.redirect('/?deleted='+itemdeleted);
    }
  });
});

router.route("/updateparameters").post(function(req, res) {
  Params.updateOne({ _id: req.body.id_update }, { date: req.body.date_update, ph:req.body.ph_update, ammonia: req.body.ammonia_update, nitrite: req.body.nitrite_update, nitrate: req.body.nitrate_update, temperature:req.body.temperature_update, water_change: req.body.water_change_update }, function(
    err,
    result
  ) {
    if (err) {
      const error = "INSERT ID to Update"
      res.redirect('/parameters?error='+error);
    } else {
        res.redirect('/parameters');
    }
  });
});

//const user = await User.findById(id).populate('posts');
//const userByPost = await Post.findById(id).populate('user');


  module.exports = router;
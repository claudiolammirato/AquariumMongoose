const express = require('express');
const router = express.Router();
const employees = require('../model');


  router.route("/insertdata").post(function(req, res) {
    const name = req.body.name;
    const  age = req.body.age;
    const location = req.body.location;
    if (name == '' || age == '' || location == '' ) {
      const messageerror = "Fill in all the data!"
      res.redirect('/?messageerror='+messageerror);
    }else{
      console.log(name);

    employees.insertMany([{name: name, age: age, location: location}], function(err, result) {
      if (err) {
        res.send(err);
      } else {
          const message = "Item Inserted!"
          res.redirect('/?message='+message);
      }
      });
    }
});

router.route("/fetchdata").get(function(req, res) {
    employees.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.route("/deletedata").post(function(req, res) {
    console.log(req.body.id)
    employees.findByIdAndDelete(req.body.id, function (err) {
      const itemdeleted = "Item "+req.body.id+" is deleted!";
      const itemnodeleted = "Insert ID!";
      console.log(req.body.id);
      if(req.body.id === ''){ 
        console.log('Item not exist');
        res.redirect('/?nodeleted='+itemnodeleted);
      }else{
      console.log("Successful deletion");
      res.redirect('/?deleted='+itemdeleted);
      }
    });
  });

  router.route("/updatedata").post(function(req, res) {
    employees.updateOne({ _id: req.body.id_update }, { name: req.body.name_update, age:req.body.age_update, location: req.body.location_update }, function(
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


  module.exports = router;
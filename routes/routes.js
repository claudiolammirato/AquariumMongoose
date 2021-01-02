const express = require('express');
const router = express.Router();
const employees = require('../model');


var data = [
    {
      name: "John",
      age: 21,
      location: "New York"
    },
    {
      name: "Smith",
      age: 27,
      location: "Texas"
    },
    {
      name: "Lisa",
      age: 23,
      location: "Chicago"
    }
  ];

  router.route("/insertdata").post(function(req, res) {
    employees.insertMany(data, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
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
    
    employees.findByIdAndDelete(req.body.id, function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
  });

  router.route("/update").put(function(req, res) {
    employees.updateOne({ _id: req.body.id }, { name: "Claudio" }, function(
      err,
      result
    ) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  });


  module.exports = router;
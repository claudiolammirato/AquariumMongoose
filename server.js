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

app.use(express.urlencoded());
app.use(express.json());
app.use("/", Router);




app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});





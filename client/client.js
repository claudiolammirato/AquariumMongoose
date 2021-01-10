const express = require('express');
const request = require('request')

const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;


app.use(express.urlencoded());
app.use(express.json());

app.use(cors());
app.use(cookieParser());

// Login page
app.get('/login', function(req, res) {
  const options = {
    url: 'http://localhost:4000/auth/login',
    json: true,
    body: {
        username: 'Marta',
        password: '1234'
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(res.headers);
});
 res.send(req.headers)
});

// About page
app.get('/about', function(req, res) {
  console.log('stacco')
  console.log(req.headers)
  request
  .get('http://localhost:4000/about')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    console.log(key1)
  })
  .pipe(res.send('about'))
  request.cookie('key1=value1')
  console.log(key1)
});


app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});


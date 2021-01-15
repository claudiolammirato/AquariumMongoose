

// Client
var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:4000');

var user = 'Marta';
var password = '1234'

setInterval(function() {
    socket2.emit('insertparams', {user: user, password: password});
}, 30000);



// Client
var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:4000');

var msg2 = "hello";

setInterval(function() {
    socket2.emit('insertparams', msg2);
}, 2000);

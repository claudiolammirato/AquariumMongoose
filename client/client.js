

// Client
const io2 = require('socket.io-client');
const socket2 = io2.connect('http://localhost:4000');

const user = 'Marta';
const password = '1234';
const date = '2021-01-06T00:00:00.000+00:00';
const ph = '12';
const ammonia = '2';
const nitrite = '10';
const nitrate = '50';
const temperature = '30';
const water_change = '2021-01-06T00:00:00.000+00:00';

setInterval(function() {
    socket2.emit('insertparams', {user: user, password: password, date: date, ph: ph, ammonia: ammonia, nitrite: nitrite, nitrate: nitrate, temperature: temperature, water_change: water_change });
}, 30000);

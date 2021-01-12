const socket = io();

socket.on('connect', () => {
  $events.appendChild(newItem('connect'));
});

let counter = 0;
setInterval(() => {
  ++counter;
  socket.emit('hey', { counter }); // the object will be serialized for you
}, 1000);
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('main/index');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('chat alert', 'A user has connected');

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    io.emit('chat alert', 'A user has disconnected');
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Listening on *:3000');
});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('main/index');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  })
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//database connection and schema/model definition
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/socket_chat');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected');
});

var chatSchema = mongoose.Schema({
  name: String,
  message: String,
  dateSent: { type: Date, default: Date.now }
});
var Chat = mongoose.model('Chat', chatSchema);

// homepage for chat
app.get('/', function(req, res) {
  Chat.find().limit(20).sort({'dateSent': -1}).then(function(recentChats) {
    res.render('main/index', {chats: recentChats,
                              moment: moment});
  });
});

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('chat alert', 'A user has connected');

  socket.on('chat message', function(msg) {
    msg = validator.escape(msg);
    var chatMsg = new Chat({message: msg});
    chatMsg.save(function(err, chatMsg) {
      if (err) return console.error(err);
      io.emit('chat message', msg);
      return console.log('message: ' + chatMsg.message);
    })
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    io.emit('chat alert', 'A user has disconnected');
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Listening on *:3000');
});

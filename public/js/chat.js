$(function() {
  var socket = io();
  $('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });
  socket.on('chat alert', function(msg) {
    var boldedAlert = $('<strong>').text(msg);
    $('#messages').append($('<li>').append(boldedAlert));
  });
});
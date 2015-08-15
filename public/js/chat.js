$(function() {
  var socket = io();
  $('form').submit(function() {
    if ($('#m').val())
      socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg) {
    $('#messages').prepend($('<li class="collection-item">').text(moment().format("h:mmA") + " - " + msg));
  });
  socket.on('chat alert', function(msg) {
    var boldedAlert = $('<strong>').text(moment().format("h:mmA") + " - " + msg);
    $('#messages').prepend($('<li class="collection-item deep-orange lighten-4">').append(boldedAlert));
  });
});
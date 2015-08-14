var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('main/index');
});

app.listen(3000);
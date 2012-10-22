var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var AVG_INTERVAL = 1000;

var Feedback = function () {
  this.clients = {};
  this.clientCount = 0;
  this.total = 0;
};

var port = process.env.PORT || 8000;
server.listen(port);

app.use(express.static(__dirname + '/static/'));

var rooms = {};

var data = {};

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

app.get('/f/:name', function(req, res) {
  var name = req.params.name;
  if (!rooms[name]) {
    console.log("creating room: " + name);
    data[name] = new Feedback();
    rooms[name] = io.of('/c/' + name)
      .on('connection', function (socket) {
        socket.on('value', function(value) {
          if (!data[name].clients[socket.id]) {
            data[name].clients[socket.id] = true;
            data[name].clientCount += 1;
            data[name].total += value;
          }
        });
      });

    setInterval(function () {
      var avg = data[name].total / data[name].clientCount;
      rooms[name].emit("average", avg);
      console.log(name + ": " + data[name].clientCount);
      data[name] = new Feedback();
    }, AVG_INTERVAL);
  }
  res.sendfile(__dirname + '/static/feedback.html');
});



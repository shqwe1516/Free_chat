var express = require('express');
var app = require('express')();
var mysql = require('mysql');
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});





io.sockets.on('connection', function(socket) {
  socket.on('newuser', function(name) {
    console.log(name + ' login');
    socket.name = name;
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속'});
  });


  socket.on('message', function(data) {
    data.name = socket.name;
    console.log(data);
    socket.broadcast.emit('update', data);
  })


  socket.on('disconnect', function() {
    console.log(socket.name + 'logout');
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나감'});
  });

});

server.listen(80, function() {
  console.log(' server running to 80!');
});

'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 7777;

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));
io.on('connection', function(socket){
	console.log('socket connected...');
	socket.on('join', function(data) {
		console.log(data);
	});
	socket.on('messages', function(data) {
		socket.emit('thread', data);
		socket.broadcast.emit('thread', data);
	});
});

server.listen(port, function() {
	console.log('Server listening on port ' + port);
});
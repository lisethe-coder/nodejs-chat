'use strict';

// Initializing socket, connecting to server
var socket = io('http://localhost:7777/');
socket.on('connect', function(data){
	socket.emit('join', 'Hello server from client'); // Join is the channel
});

// Listener for 'thread' event, which updates messages 
socket.on('thread', function(data) {
	console.log(data);
	$('#thread').append('<li>' + data + '</li>');
});	

// Sends message to server, resets & prevents defaults form actions
$('form').submit(function() {
	var message = $('#message').val();
	socket.emit('messages', message);
	this.reset();
	return false;
});
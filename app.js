var express = require('express'),
	app = express(),
	server = require ('http').createServer(app),
	io = require('socket.io').listen(server),
	port = process.env.PORT || 5000;
	
app.use(express.static(__dirname + "/"))

server.listen(port);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//reveive server side

//first thing that happens when a client connects to a socket.io application
//turn on connection event, uses socket that user uses
io.sockets.on('connection', function(socket){
	//look for the name of the event you emit on client side and get the data:
	socket.on('send message', function(data){
		//emit a new event on socket, and send the data from the function above. sends to all the users
		io.sockets.emit('new message', data);
	});
});
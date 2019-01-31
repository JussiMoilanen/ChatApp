const express = require('express');
const app = express();
const port = 3000;

// set ejs template
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

// routes to index.js file
app.get('/', (req, res) => {
  res.render('index');
});



server = app.listen(port);
// socket.io instantioation
const io = require('socket.io')(server);

//socket io listens on every connection
io.on('connection', (socket) => {
    console.log("New user connected to the chat");
    // default name
    socket.username = "Anonymous";

    // listen user changes username
    socket.on('changeUsername', (data) => {
      socket.username = data.username;
      console.log(data.username);
    });

    // Listen New user input messages
    socket.on('newMessage', (data) => {
        // broadcast new message
        io.sockets.emit('newMessage', {message: data.message, username : socket.username});
    });

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
});

console.log(`App is listening on port ${port}`);

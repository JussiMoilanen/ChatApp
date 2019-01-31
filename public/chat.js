$(function(){
   	//establish connection
	let socket = io.connect('http://localhost:3000')

	//buttons and inputs
	let message = $("#message")
	let username = $("#username")
	let sendMessage = $("#sendMessage")
	let send_username = $("#send_username")
	let chatroom = $("#chatroom")
	let feedback = $("#feedback")

	//send message
	sendMessage.click(function(){
		socket.emit('newMessage', {message : message.val()})
	})

	//Listen on newMessage
	socket.on("newMessage", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Send a username
	send_username.click(function(){
		socket.emit('changeUsername', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});

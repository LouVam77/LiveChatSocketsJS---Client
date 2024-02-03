const io = ('https://livechat-3v7l.onrender.com');
const socket = io

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const messageDisplay = document.getElementById('message-display');

const username = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', username)

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`,'You'); 
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'Other')
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-connect', username => {
    appendMessage(`${username} connected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-disconnect', name => {
    appendMessage(`${name} disconnected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

<<<<<<< HEAD
function appendMessage(message, source) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    if (source === 'You') {
        messageElement.classList.add('sent-message');
    } else {
        messageElement.classList.add('received-message');
    }
    messageContainer.appendChild(messageElement);
}
=======
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageDisplay.appendChild(messageElement);
}

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`); 
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});
>>>>>>> b9aa9fe457bdda4ba4cd2e5faa91fb3ace665237

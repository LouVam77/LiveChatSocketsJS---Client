const socket = io('https://livechat-3v7l.onrender.com', {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
    credentials: true
  }
});

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

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
    appendMessage(`${data.name}: ${data.message}`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-connect', username => {
    appendMessage(`${username} connected`, 'Other')
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-disconnect', name => {
    appendMessage(`${name} disconnected`, 'Other')
    messageContainer.scrollTop = messageContainer.scrollHeight
})

function appendMessage(message, source) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    if (source === 'You') {
        messageElement.classList.add('sent-message');
    } else {
        messageElement.classList.add('received-message');
    }
    
    while (messageContainer.childNodes.length == 3) {
        messageContainer.removeChild(messageContainer.childNodes[-1]);
    }

    messageContainer.prepend(messageElement);
}

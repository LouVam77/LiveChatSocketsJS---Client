const io = ('https://livechat-3v7l.onrender.com');
const socket = io
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const Name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-connect', name => {
    appendMessage(`${name} connected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-disconnect', name => {
    appendMessage(`${name} disconnected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    const newMessage = document.createElement('li');
    newMessage.innerText = message
    messageContainer.appendChild(newMessage);
    messageInput.value = ''     
})

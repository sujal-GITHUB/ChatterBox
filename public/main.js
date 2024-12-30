const socket = io()

const totalClients = document.getElementById('total-clients')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-inp')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const feedbackContainer = document.getElementById('feedback')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (messageInput.value.trim()) {
        sendMessage()
        messageInput.value = '' // Clear input after sending
    }
})

socket.on('total-clients', (data) => {
    totalClients.innerText = `Total Clients: ${data}`
})

const messageTone = new Audio('/tune.mp3')

socket.on('message', (data) => {
    messageTone.play()
    addMessageToUI(data)
})

function sendMessage() {
    if(messageInput.value.trim() === '') return
    
    const data = {
        name: nameInput.value.trim() || 'Anonymous',
        message: messageInput.value.trim(),
        dateTime: new Date()
    }
    
    console.log('Sending message:', data)
    socket.emit('message', data)
    
    addMessageToUI({
        ...data,
        fromSelf: true
    })
}

function addMessageToUI(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = data.fromSelf ? 
        'message-right' : 
        'message-left';
    
    const formattedDate = new Date(data.dateTime).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'long'
    });
    
    messageDiv.innerHTML = `
        <p class="message">
            ${data.message}
            <span>
                ${data.name} : ${formattedDate}
            </span>
        </p>
    `;
    
    messageContainer.appendChild(messageDiv);
    scrollToBottom();
}

let typingTimeout = null

function handleTypingEvent() {
    if (typingTimeout) clearTimeout(typingTimeout)
    
    socket.emit('feedback', {
        feedback: `${nameInput.value.trim() || 'Anonymous'} is typing a message...`
    })
    
    typingTimeout = setTimeout(() => {
        socket.emit('feedback', { feedback: '' })
    }, 1000)
}

messageInput.addEventListener('input', handleTypingEvent)

messageInput.addEventListener('blur', () => {
    if (typingTimeout) clearTimeout(typingTimeout)
    socket.emit('feedback', { feedback: '' })
})

socket.on('feedback', (data) => {
    feedbackContainer.textContent = data.feedback
})

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight
}

// Optional: Save username when changed
nameInput.addEventListener('change', () => {
    if (!nameInput.value.trim()) {
        nameInput.value = 'Anonymous'
    }
})
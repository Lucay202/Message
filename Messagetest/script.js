let username = '';
let targetUser  = '';
const chatRooms = {};

document.getElementById('loginBtn').addEventListener('click', () => {
    username = document.getElementById('username').value.trim();
    targetUser  = document.getElementById('targetUser ').value.trim();

    if (username && targetUser ) {
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.chat').style.display = 'block';
        document.getElementById('chatWith').innerText = targetUser ;
        loadMessages();
    } else {
        alert('Please enter both usernames.');
    }
});

document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

function sendMessage(message) {
    const chatRoomKey = getChatRoomKey(username, targetUser );
    if (!chatRooms[chatRoomKey]) {
        chatRooms[chatRoomKey] = [];
    }
    chatRooms[chatRoomKey].push({ sender: username, message });
    displayMessages(chatRoomKey);
}

function loadMessages() {
    const chatRoomKey = getChatRoomKey(username, targetUser );
    displayMessages(chatRoomKey);
}

function displayMessages(chatRoomKey) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    if (chatRooms[chatRoomKey]) {
        chatRooms[chatRoomKey].forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<span>${msg.sender}:</span> ${msg.message}`;
const socket = io();

let NAME;
let textarea = document.querySelector('.Message_input');
let messageArea = document.querySelector('.container');

do {
 NAME = prompt('Enter your name: ');
} while (!NAME);

appendSystemMessage(`Welcome to the chat, ${NAME}!`);

function appendSystemMessage(message) {
 let systemDiv = document.createElement('div');
 systemDiv.classList.add('system-message');

 let systemMarkup = `
     <h6>${message}</h6>
 `;

 systemDiv.innerHTML = systemMarkup;
 messageArea.appendChild(systemDiv);
 scrollTOBottom();
}

textarea.addEventListener('keyup', (e) => {
 if (e.key === 'Enter') {
     sendMessage(e.target.value);
 }
});

function sendMessage(message) {


 let msg = {
     user: NAME,
     message: message.trim(),
 };

 appendMessage(msg, 'outgoing');
 textarea.value = '';
 scrollTOBottom();

 // sending to server
 socket.emit('message', msg);
}

function appendMessage(msg, type) {
 let mainDiv = document.createElement('div');
 let className = type;
 mainDiv.classList.add(className, 'message');

 let markup = `
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`;

 mainDiv.innerHTML = markup;
 messageArea.appendChild(mainDiv);
 scrollTOBottom();
}

// receiving message
socket.on('message', (msg) => {
 appendMessage(msg, 'incoming');
});

function scrollTOBottom() {
 messageArea.scrollTop = messageArea.scrollHeight;
}






const socket = io.connect('https://christian0015.github.io/socket1/');

const username = document.getElementById('myUsername');
socket.emit('user-connected', username);

const userList = document.getElementById('users');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const aside = document.getElementById('aside');
const logoAPP = document.getElementById('logoApp');

// *******************************************************
const Conversation = document.getElementById('Conversation');
const amovibleAreatextOff = document.getElementById('amovibleAreatextOff');
// ********************************************************

const inputestination = document.getElementById('destinationName');
const messageForm = document.getElementById('messageForm');
const amovibleAreatext = document.getElementById('amovibleAreatext');
// *********************************************************
sendButton.style.display = 'none';
messageInput.style.display = 'none';
inputestination.style.display = 'none';
logoAPP.style.display = 'block';

function amovibleAreatextFunction() {
    Conversation.classList.remove('no');
    amovibleAreatext.classList.add('no');
    amovibleAreatextOff.classList.remove('no');
}
amovibleAreatext.addEventListener('click', amovibleAreatextFunction);
// ************************************************************
function amovibleAreatextFunctionOff() {
    Conversation.classList.add('no');
    amovibleAreatext.classList.remove('no');
    amovibleAreatextOff.classList.add('no');
}
amovibleAreatextOff.addEventListener('click', amovibleAreatextFunctionOff);
// ************************************************************

function connectionValided() {
    event.preventDefault();
    aside.style.display = 'none';
    sendButton.style.display ='block';
    messageInput.style.display ='block';
    inputestination.style.display = 'block';
    logoAPP.style.display = 'none';
    messageForm.classList.remove('no');
    Conversation.classList.add('no');
    amovibleAreatext.classList.remove('no');
}
document.getElementById('userForm').addEventListener('submit', connectionValided);


    document.getElementById('messageForm').addEventListener('submit', () => {  
    event.preventDefault();
    });


    // document.getElementById('user-form').addEventListener('submit', () => { 
    // aside.style.display ='none';
// });

socket.on('update-user-list', (usernames) => {
    userList.innerHTML = '';
    usernames.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

sendButton.addEventListener('click', () => {
    const to = document.getElementById('destinationName');
    const message = messageInput.value;
    socket.emit('send-message', { to, message });
    messageInput.value = '';
});

socket.on('message', (data) => {
    const message = document.createElement('li');
    message.textContent = `${data.from}: ${data.message}`;
    messages.appendChild(message);
});

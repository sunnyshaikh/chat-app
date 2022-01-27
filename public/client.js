const socket = io()

let user;

do {
  user = prompt("Enter username");
} while (!user);

socket.emit('new-user-joined', user);

// selector
const form = document.getElementById('form');
const messageContainer = document.querySelector('.message__container');

form.addEventListener('submit', e => {
  e.preventDefault();
  let inputMessage = document.getElementById('input__message');
  if (inputMessage.value.trim() === '')
    return;
  let msg = {
    user,
    inputMessage: inputMessage.value.trim()
  }
  appendMessage(msg, 'outgoing');
  inputMessage.value = '';
  scrollToBottom()

  // send message to server
  socket.emit('message', msg);
})

// append message function
function appendMessage(msg, type) {
  const div = document.createElement('div');
  div.classList.add('message', type);

  const template = `
    <p>${msg.inputMessage}</p>
    <h4><em>-${msg.user}</em></h4>
  `;

  div.innerHTML = template;
  messageContainer.appendChild(div);

}

socket.on('message', msg => {
  appendMessage(msg, 'incoming')
  scrollToBottom();
})

socket.on('user-joined', user => {
  const p = document.createElement('p');
  p.innerText = user + ' joined';
  p.classList.add('new-user');
  messageContainer.appendChild(p);
})

function scrollToBottom() {
  messageContainer.scrollTop = messageContainer.scrollHeight
}
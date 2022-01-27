const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log('Server started'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
  socket.on('message', msg => {
    socket.broadcast.emit('message', msg);
  })

  socket.on('new-user-joined', user => {
    socket.broadcast.emit('user-joined', user);
  })
})
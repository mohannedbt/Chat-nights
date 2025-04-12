const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let user=0;
let room={};
function generateRoomID(){
  alphabet="azertyuqisdgfhkcbnvkq2541680";
  let id="";
  for(i=0;i<9;i++){
     id+=alphabet[Math.floor(Math.random()*(alphabet.length))]
  }
  console.log(id);
  return id;
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});
app.get('/submit', (req, res) => {
  const name = req.query.name;
  console.log('Received name:', name); // Add this line to log the name
  if (!name) {
    return res.send("Please provide a valid name.");
  }
  res.redirect(`/menu.html?name=${encodeURIComponent(name)}`);
});
app.get('/join', (req, res) => {
  const name = req.query.name || "Anonymous";
  const joinroomid=req.query.roomcode || "none";
  res.redirect(`/chat.html?name=${encodeURIComponent(name)}&&roomid=${encodeURIComponent(joinroomid)}`);
});

io.on('connection', (socket) => {
  user++;
  let current="anonymous";
  socket.on('name el personne',(name)=>{
    current=name;
    io.emit('connecta',current+" has connected");

  })
  socket.on('message men 3andi', (message) => {
    io.emit('message men 3andi', message);
  });
  socket.on('created room', () => {
    let roomID;
    do {
        roomID = generateRoomID(); // Generate ID
    } while (room[roomID]); // Make sure it's unique

    room[roomID] = { id: roomID, users: [socket.id] };  
    socket.emit('room id', 'your room has the following id:'+roomID);  
  });
  
  socket.on('disconnect', () => {
    user --;
    io.emit("message men 3andi", current+" has disconnected number of users staying is :"+user);
  });
});
server.listen(3000, '0.0.0.0',() => {
  console.log('listening on *:3000');
});
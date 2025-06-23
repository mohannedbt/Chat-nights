const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let user = 0;
let room = {};

function generateRoomID() {
  const alphabet = "azertyuqisdgfhkcbnvkq2541680";
  let id = "";
  for (let i = 0; i < 9; i++) {
    id += alphabet[Math.floor(Math.random() * (alphabet.length))];
  }
  console.log('[ROOM ID GENERATED]', id);
  return id;
}
app.use('/sounds', express.static(__dirname + '/sounds'));


// Serve pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/submit', (req, res) => {
  const name = req.query.name;
  console.log('[NAME SUBMIT]', 'Received name:', name);
  if (!name) {
    return res.send("Please provide a valid name.");
  }
  res.redirect(`/menu.html?name=${encodeURIComponent(name)}`);
});

app.get('/menu.html', (req, res) => {
  console.log('[ROUTE]', 'Serving menu.html');
  res.sendFile(__dirname + '/menu.html');
});

app.get('/chat.html', (req, res) => {
  console.log('[ROUTE]', 'Serving chat.html');
  res.sendFile(__dirname + '/chat.html');
});

app.get('/join', (req, res) => {
  const name = req.query.name || "Anonymous";
  const joinroomid = req.query.roomCode || "none";
  console.log('[JOIN REQUEST]', `Name: ${name} | Room Code: ${joinroomid}`);
  res.redirect(`/chat.html?name=${encodeURIComponent(name)}&roomid=${encodeURIComponent(joinroomid)}`);
});

// WebSocket logic
io.on('connection', (socket) => {
  user++;
  let current = "anonymous"; // Default name
  let socketRoomID = null;

  console.log('[SOCKET CONNECTED]', `Socket ID: ${socket.id} | Total users: ${user}`);

  socket.on('name el personne', (name) => {
    current = name;
    console.log('[USER SET NAME]', `Socket: ${socket.id} | Name set to: ${current}`);

    if (socketRoomID) {
      console.log('[USER RECONNECTED TO ROOM]', `${current} in room ${socketRoomID}`);
      io.to(socketRoomID).emit('connecta', `${current} has connected`);
    }
  });

  socket.on('message men 3andi', (message) => {
    console.log('[MESSAGE]', `From: ${current} | Room: ${socketRoomID} | Message: ${message}`);
    if (socketRoomID) {
      io.to(socketRoomID).emit('message men 3andi', message);
    }
  });

  socket.on('created room', (callback) => {
    let newRoomID;
    do {
      newRoomID = generateRoomID();
    } while (room[newRoomID]);

    room[newRoomID] = { id: newRoomID, users: [socket.id] };
    socket.join(newRoomID);
    socketRoomID = newRoomID;

    console.log('[ROOM CREATED]', `Room ID: ${newRoomID} | Created by: ${current}`);

    callback(newRoomID);
  });

  socket.on('join room', (joinRoomID) => {
    console.log('[JOIN ROOM]', `${current} is attempting to join room: ${joinRoomID}`);

    if (current === "anonymous") {
      console.log('[ERROR]', 'Anonymous user cannot join room.');
      io.to(socket.id).emit("error", "Please set your name before joining the room.");
      return;
    }

    if (!room[joinRoomID]) {
      console.log('[ROOM NOT FOUND]', `Creating new room: ${joinRoomID}`);
      room[joinRoomID] = { id: joinRoomID, users: [] };
    }

    socket.join(joinRoomID);
    socketRoomID = joinRoomID;
    room[joinRoomID].users.push(socket.id);

    console.log('[USER JOINED ROOM]', `${current} joined room ${joinRoomID}`);
   socket.emit("room info","votre room code est "+joinRoomID);
    io.to(socketRoomID).emit('message men 3andi', `${current} has joined the room.`);
  });

  socket.on('disconnect', () => {
    user--;
    console.log('[DISCONNECT]', `${current} disconnected | Socket: ${socket.id} | Remaining users: ${user}`);

    if (socketRoomID) {
      io.to(socketRoomID).emit("message men 3andi", `${current} has disconnected. Number of users staying is: ${user}`);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER STARTED] Listening on http://0.0.0.0:${PORT}`);
});


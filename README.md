# 🌙 Chat Nights

**Chat Nights** is a simple and fun local chat app that helps you connect with friends on the same network. It uses **Socket.IO** to enable real-time communication between users in different chat rooms.

---

## 🚀 Features

- Real-time chat using **Socket.IO**
- Create or join chat rooms easily
- Simple UI with login, room menu, and chat page
- Works locally on your network
- Lightweight and easy to set up

---

## 📁 Project Structure

| File         | Description                                   |
| ------------ | --------------------------------------------- |
| `login.html` | The first page to load – enter your info      |
| `menu.html`  | Join an existing room or create a new one     |
| `chat.html`  | The main chat interface                       |
| `index.js`   | Server-side logic using Node.js and Socket.IO |

---

## ✅ Requirements

Before you get started, make sure you have:

- [Node.js installed](https://nodejs.org/)
- [npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Socket.IO installed (see setup)

---

## 🔧 Setup Instructions

1. Clone or download the project.
2. Install Socket.IO via npm:
   ```bash
   npm install socket.io
   ```
3. If you're not using localhost, update your Socket.IO client connection in the HTML files like this:
   ```javascript
   const socket = io("http://<YOUR_LOCAL_IP>:<PORT>");
   ```
   Replace `<YOUR_LOCAL_IP>` and `<PORT>` with your machine's IP and the port used in `index.js`.

4. Start the server:
   ```bash
   node index.js
   ```

5. Open your browser and navigate to:
   ```
   http://<YOUR_LOCAL_IP>:<PORT>/login.html
   ```

6. Enter your name and room info. You can either:
   - Join an existing room (enter a room ID)
   - Create a new room (a unique room ID will be generated and shared in the chat)

---

## 📝 Notes

- **Chats are not saved** — refreshing will clear messages.
- **New users will not see old messages**.
- This app is meant for **local use only** (e.g., LAN chat, friend group).

---

## 💬 Enjoy chatting with Chat Nights!

Made with ☕, 💻, and 🌙
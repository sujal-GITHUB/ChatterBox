const express = require('express');
const app = express();
const path = require('path');
const http = require('http'); // Import http for Socket.IO integration
const PORT = process.env.PORT || 5000;  // Ensure the port is being used correctly

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
// Your main HTML file will be served from the "public" directory

// Start the server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

// Initialize Socket.IO
const io = require('socket.io')(server);
let socketsConnected = new Set()

// Handle WebSocket connections
io.on('connection', onConnection);

function onConnection(socket) {
    console.log('A user connected:', socket.id);
    socketsConnected.add(socket.id);

    // Emit the total number of connected clients
    io.emit('total-clients', socketsConnected.size);

    // Handle message event
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);  // Broadcast message to other clients
    });

    // Handle feedback event
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);  // Broadcast feedback to other clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        socketsConnected.delete(socket.id);
        io.emit('total-clients', socketsConnected.size);  // Update client count
    });
}

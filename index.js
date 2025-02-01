const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Frontend serve කරන්න

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data); // Other users show typing message
    });

    socket.on("message", (msg) => {
        io.emit("message", msg); // Send message to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

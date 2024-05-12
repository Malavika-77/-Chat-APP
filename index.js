var express = require("express");
var app = express();
var { Server } = require("socket.io");
var http = require("http");
var path = require("path");

var server = http.createServer(app);
var io = new Server(server);
var port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    // Send the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    socket.on("send name", (username) => {
        io.emit("send name", username); // Corrected to io.emit()
    });
    socket.on("send message", (message) => {
        io.emit("send message", message); // Corrected to io.emit()
    });
});

server.listen(port, () => { 
    console.log(`Server listening on http://localhost:${port}`); 
});

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("register-user", function(data) {
    users.push(data);
  });

  socket.on("pick-color", function(data) {
    console.log(data.from, "sent", data.color, "to", data.to);

    io.emit("show-color", {
      from: data.from,
      to: data.to,
      color: data.color
    });
  });

  socket.on("orientation", function(data) {
    console.log("received orientation", data);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
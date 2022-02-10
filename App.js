const express = require("express");
const mongoose = require("mongoose");
const app = express();

const http = require("http").Server(app);

 // //the socket.io module

const io = require("socket.io");

const port = 3000;
const socket = io(http);


//To listen to messages
socket.on("connection", (socket) => {
  console.log("user connected");
});

socket.on("chat message", function (msg) {
  console.log("message: " + msg);
  
  //broadcast message to everyone in port:3000 except yourself.
  socket.broadcast.emit("received", { message: msg });
});

//connect db
const Chat = require("./models/ChatSchema");
const connect = require("./dbconnection");



//setup event listener
socket.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
    
    //broadcast message to everyone in port:3000 except yourself.
    socket.broadcast.emit("received", { message: msg });

    //save chat to the database
    connect.then((db) => {
      console.log("connected correctly to the server");

      let chatMessage = new Chat({ message: msg, sender: "Anonymous" });
      chatMessage.save();
    });
  });
});

const  bodyParser  = require("body-parser");
const  chatRouter  = require("./Route/chatRoute");
const loginRouter = require("./Route/loginRoute")

//bodyparser middleware
app.use(bodyParser.json());


//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter)


app.use(express.static(__dirname + "/public"));

//wire up the server to listen to our port 3000
http.listen(port, () => {
  console.log("connected to port: " + port);
});

import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
const app=express();
const server=http.createServer(app);

const io=new Server(server, {
    cors:{
        origin:"https://messagemedeploy.onrender.com",
        methods:["GET","POST"],
    },
});
// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
  };

const users={};

//used to listen events on the server side
io.on("connection",(socket)=>{
    console.log("User Connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("Hello ", users);
      }
    //   used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));

   

    //used to listen client side events emitted by the server side (server & client)
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
});
export {app,io,server};

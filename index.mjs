import express from 'express';
import http from 'http';
import * as socketio from 'socket.io';
import model from './Config/MongoDB.js';
const port = 8080;

const app = express();

const httpServer1 = http.createServer(app);

const server = new socketio.Server(httpServer1,{
    cors:{
        origin: '*',
    }
})

let timeChange;
const data = [
    {name:1, x:Math.random()*10, y:Math.random()*10},
    {name:2, x:Math.random()*10, y:Math.random()*10},
    {name:3, x:Math.random()*10, y:Math.random()*10},
    {name:4, x:Math.random()*10, y:Math.random()*10},
    {name:5, x:Math.random()*10, y:Math.random()*10},
    {name:6, x:Math.random()*10, y:Math.random()*10},
    {name:7, x:Math.random()*10, y:Math.random()*10},
]
server.on('connection',(socket)=>{
    // console.log("connected");
    if(timeChange) clearInterval(timeChange);
    if(data.length>5){
        data.reverse().pop();
        data.reverse()
    }
    data.push({name:data[data.length-1].name+1, x:Math.random()*10, y:Math.random()*10})
    setInterval(()=>{
        socket.emit("message",data);
                // const data1 = new model(data);
                // data1.save()
    },5000)
})

httpServer1.listen(port);

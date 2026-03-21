import app from './app.js'
import connectDB from './config/db.js';
import http from 'http';
import {Server} from 'socket.io';


const port=5000


const server=http.createServer(app);

// create socket.io server
const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173"
  }
})

// socket io connection
io.on("connection",(socket)=>{
      console.log("Socket id",socket.id);
      
      // join session
      socket.on("joinSession",({sessionId,userName})=>{
           socket.join(sessionId);
           console.log(`${userName} joined ${sessionId}`);
           

          //  notify others
          socket.to(sessionId).emit("message",{
            user:"System",
            text:`${userName} has joined chat`,
          })

          // listen for messages from user
          socket.on("sendMessage",({sessionId,user,text})=>{
                  // send message to everyone in room
                  io.to(sessionId).emit("message",{user,text});
          })

          // on disconnect
            socket.on("disconnect", () => console.log("User disconnected:", socket.id));
      })
})







const ServerListen=async()=>{
     try{
            await connectDB();
            server.listen(port,()=>{
            console.log("Server Running on the port",port);
            })
     }catch(e){
            console.log("Server Failed",e.message);
     }
}

ServerListen()


// listen to the port


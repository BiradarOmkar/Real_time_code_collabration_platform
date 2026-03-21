import express from 'express'
import cors from 'cors'
import Authroute from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import cookieParser from 'cookie-parser'

// import { log } from 'console'
// import { text } from 'stream/consumers'
const app=express()



app.use((req,res,next)=>{
  console.log("Request:", req.method, req.url);
  next();
});

app.use((req,res,next)=>{
  console.log("Incoming:", req.method, req.url);
  next();
});

// middleware
app.use(cors({
    methods:["GET","POST","OPTIONS","PUT","DELETE"],
    origin:["http://localhost:5173"],
    credentials:true
}))



// Handle preflight requests
// app.options('/*', cors());

app.use(express.json())
app.use(cookieParser())
// get method
app.get("/",(req,res)=>{
    res.send("hello World")
})
app.use("/api/auth",Authroute)
app.use("/api",UserRoutes);

export default app;
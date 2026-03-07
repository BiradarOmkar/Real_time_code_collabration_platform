import app from './app.js'
import connectDB from './config/db.js';



const port=5000

const Server=async()=>{
     try{
            await connectDB();
            app.listen(port,()=>{
            console.log("Server Running on the port",port);
            })
     }catch(e){
            console.log("Server Failed",e.message);
     }
}

Server()


// listen to the port


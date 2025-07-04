import express from "express"
import "dotenv/config"
import  cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/UserRoutes.js";
import messageRouter from "./Routes/MessageRoutes.js";
import {Server} from "socket.io"

//Create Express app and http
const app = express();
const server =  http.createServer(app)


//Inatialize socket.io server
export const io = new Server(server,{
    cors:{origin: "*"}
})
//store online users
export const userSocketMap = {};    //userId:socketId
//socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);
    if(userId)
        userSocketMap[userId] = socket.id


    //Emit onile users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // console.log(userSocketMap)
    // console.log(userId)
    // console.log(getOnlineUsers)

    socket.on("disconnect",()=>{
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


//Middleware Setup

app.use(express.json({limit:"4mb"}))   //so that we can upload images of 4 mb
app.use(cors());
app.use("/api/status",(req,res)=>res.send("server a dis live"))
app.use("/api/auth",userRouter);
app.use("/api/messages", messageRouter)

//connect Database
await connectDB()
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>
    console.log("Server is running on PORT: "+ PORT))
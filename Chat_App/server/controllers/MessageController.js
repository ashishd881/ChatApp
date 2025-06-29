// import { Promise } from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap} from "../server.js"

//get users except the logged in user
export const getUsersForSideBar =async (req,res)=>{
    try {
        const userId = req.user._id;  //ye middlewarw se aa raha hai
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        //count the messages not seen
        const unseenMessages = {}
        // An async function always returns a Promise, even if you don’t return anything explicitly.
        const promises = filteredUsers.map(async(user)=>{
            // Each Promise resolves after the await Message.find(...) finishes
            const messages = await Message.find({senderId: user._id,
                                                recieverId:userId, 
                                                seen:false
                                            })
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);  //wait until all promises are resolved
        res.json({success:true, users:filteredUsers,unseenMessages})
    } catch (error) {
        console.log(error.message)
        res.json({success:true, message:error.message})

    }
}

//Get all messages for selected user
export const getMessages = async(req,res)=>{
    try {
        //we will get the selected users id from params
        const {id:selectedUserId}  = req.params;
        //below is logged in users id
        const myId = req.user._id;    //middleware ke token se aaya hai ye

        const messages= await Message.find({
            $or: [
                {senderId:myId, recieverId:selectedUserId},
                {senderId:selectedUserId, recieverId:myId}
            ]
        })
        await Message.updateMany({senderId: selectedUserId, recieverId:myId},
            {seen:true})
        
        res.json({success: true,messages})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}

//api to mark message as seen using message id
export const markMessageAsSeen = async(req,res)=>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success: true})
    } catch (error) {
        console.log(error.message)
        res.json({success:true, message:error.message})
    }
}


//send Message to selected user

export const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id;   //we will get this from middle ware

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = await Message.create({    //we want to  show this message to the user in realtime so for this we use socket.io
            senderId,
            recieverId,
            text,
            image : imageUrl
        }) 


        //Emit the new message to the reciever;s socket
        const recieverSocketId = userSocketMap[recieverId];
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }
        res.json({success: true ,newMessage});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
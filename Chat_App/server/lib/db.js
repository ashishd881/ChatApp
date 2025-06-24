import mongoose from "mongoose";
//we can create the collection name and databse name from here as well and we can also insert the data from here without using creaate method postman
// const db = client.db("chat-app");              // database name
// const collection = db.collection("messages");  // collection name


export const connectDB = async()=>{
    try {
        mongoose.connection.on("Connected",()=>console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        console.log(error)
    }
}
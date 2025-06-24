import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"

export const signup = async(req,res)=>  {
    const {fullName, email, password, bio} = req.body
    try{
        if(!fullName || !email || !password ||!bio){
            return res.json({success:false, message:"Missing Details:"})
        }
        const user = await User.findOne({email})
        if(user)
            return res.json({success:false,message:"Account Already created"})
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
       
        const newUser = await User.create({
            fullName, email, password: hashedPassword,bio
        })
        
        const token = generateToken(newUser._id)
        res.json({success: true, UserData: newUser,token, message:"Account Created successfully"})
    }catch(error){
        console.log(error.message)
        console.log("3  error aa gayi")
        res.json({success:false,message:error.message})
    }
}


export const login = async(req,res)=>{
    try{
        const {email, password} = req.body
        const userData = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password,userData.password)
        if(!isPasswordCorrect){
            return res.json({success: true,user:userData,token,message:"Invalid credentials"})
        }
        const token = generateToken(userData._id)
        res.json({success: true, user:  userData ,token, message:"Loged in  successfully"})
    
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }

    
}

    export const checkAuth=(req,res,)=>{
        res.json({success:true,user:req.user})
        console.log(req.user)
    }

export const updateProfile = async(req,res)=>{
    try{
        
        const {bio, fullName} = req.body //req.body is necessary because we need to update the data id we use req.user we will get the previous data 
        const {profilePic} = req.files;
        console.log(req.user)     
        console.log(profilePic) 
        console.log(bio)
        console.log(fullName) 
        const userId = req.user._id;  //rew.user middle ware se milega
        let updatedUser;

        if(!profilePic){
           updatedUser = await User.findByIdAndUpdate(userId,{bio,fullName},{new:true})
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url,bio, fullName},{new:true})
        }
        res.json({success:true, user:updatedUser})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import toast from "react-hot-toast"
import { io } from "socket.io-client";
import axios from "axios"
import { useNavigate } from "react-router-dom";



const backendUrl = import.meta.env.VITE_BACKEND_URL;
//we will add backendUrl as the base Url in axios
axios.defaults.baseURL = backendUrl


 const AuthContext = createContext();

 const AuthProvider = ({children})=>{

    const [token,setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    //check if the user is authenciated and if so, set the user data and connect the socket
    const checkAuth = async()=>{
        try {
            const {data}  = await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user)
                console.log(data.user)
                console.log(authUser)
                connectSocket(data.user)
            }
        } catch (error) {
            console.log("errror checkauth")
            toast.error(error.message)
        }
    }

    //Login function to handle user authentication and socket connection
    const Login = async(state, credentials)=>{
        try {
            const {data} = await axios.post(`/api/auth/${state}`,credentials);
            if(data.success){
                setAuthUser(data.user);
                // console.log(data.user)
                // console.log(authUser)
                connectSocket(data.user);  //yaha error ho sakti hai
                axios.defaults.headers.common["token"] = data.token
                setToken(data.token)
                localStorage.setItem("token", data.token)
                toast.success(data.message)
                // navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //Logout Function to handle user logout and socket disconnection
    const logout = async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successgully")
        socket.disconnect();
    }

    // update profile function to handle user profile updates
    const updateProfile = async(body)=>{
        try {
            const {data} = await axios.put("/api/auth/update-profile",body)
            if(data.success)
            {
                setAuthUser(data.user);
                toast.success("profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //connect socket to handle socekt connection and onilne users updates
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return ;
        const newSocket = io(backendUrl,{
            query:{
                userId: userData._id,
            }
        })
        newSocket.connect();
        setSocket(newSocket)
        // console.log(newSocket)
        // console.log(socket)
        // console.log(newSocket.id)
        newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUsers(userIds);
        })
        // console.log(onlineUsers)
    }

    useEffect(()=>{
        if(token)
            axios.defaults.headers.common["token"] = token;
        checkAuth()
      
    },[token])                      //⬅️ empty dependency array = run only once on mount

    const value = {
        //any state variable air function created here can be accessed throught the context in any component
        axios,
        authUser,
        onlineUsers,
        socket,
        Login,
        logout,
        updateProfile,
        setAuthUser
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext };
export default AuthProvider;
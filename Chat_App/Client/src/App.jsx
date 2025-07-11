import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function App() {
  const {authUser}  = useContext(AuthContext)
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">   
    {/* we have changed the above url because it will not work once deployed if it was imported from from assests it would have worked using the import statement above */}
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/Login"/>}/>
        <Route path='/Login' element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path='/profilePage' element={authUser ? <ProfilePage/> : <Navigate to="/Login"/>}/>
        {console.log(authUser)}
      </Routes>
    </div>
  )
} 

export default App

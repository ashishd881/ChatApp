import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profilePage' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App

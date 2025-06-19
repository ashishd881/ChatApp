import React, { useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import SideBar from '../components/SideBar'

function HomePage() {
    const [selectedUser, setSelectedUser] = useState(false)
  return (
    //h-full works on the basis of paent element
    <div className='h-screen w-screen sm:px-[15%] sm:py-[5%]' >
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%]  relative grid
        ${selectedUser ?  'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 
          'md:grid-cols-2' }`}>
        <SideBar selectedUser={selectedUser} setselectedUser={setSelectedUser}/>
        <ChatContainer selectedUser={selectedUser} setselectedUser={setSelectedUser}/>
        <RightSidebar selectedUser={selectedUser} setselectedUser={setSelectedUser}/>
      </div>

    </div>
  )
}

export default HomePage

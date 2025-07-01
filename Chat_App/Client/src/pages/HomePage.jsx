import React, { useContext, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import SideBar from '../components/SideBar'
import { ChatContext } from '../../context/ChatContext'

function HomePage() {
    const {selectedUser} = useContext(ChatContext)
  return (
    //h-full works on the basis of paent element
    <div className='h-screen w-screen sm:px-[15%] sm:py-[5%]' >
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%]  relative grid
        ${selectedUser ?  'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 
          'md:grid-cols-2' }`}>
        <SideBar/>
        <ChatContainer/>
        <RightSidebar/>
      </div>

    </div>
  )
}

export default HomePage

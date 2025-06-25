import React, { useContext } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function SideBar({selectedUser, setselectedUser}) {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div className={` bg-[#8185B2]/10   h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
        <div className='pb-5'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="logo" className='max-w-40 px-3 py-2 ' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} alt='logo' className='max-h-5 cursor-pointer mx-2'/>
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-amber-700  border-gray-700 text-gray-100 hidden group-hover:block'>
                        <p onClick={()=>navigate('/profilePage')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500'/>
                        <p onClick={()=>logout()} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 '>
                <img src={assets.search_icon} alt="search" className='w-3 '/>
                <input type='text' className='bg-transparent border-none outline-none text white  placeholder:[#c8c8c8] flex-1 ' placeholder='search User...'/>
            </div>
        </div>
        <div className='flex flex-col'>
            {userDummyData.map((value,index)=>(
            <div onClick={()=>{setselectedUser(value)}} key={index} className='flex cursor-pointer  rounded-full justify-items-start items-center relative'>
                <img src={ value?.profilePic || assets.avatar_icon} className='w-9 rounded-full mr-4 mb-4 mt-2 ml-4'/>
                <div className='flex flex-col '>
                    <p> {value.fullName}</p>
                    {
                        index < 3
                        ?<span className='text-green-400 text-xs'>Online</span>
                        :<span className='text-neutral-400 text-xs'>Offline</span>
                    }   
                </div>
                {
                    index>2 && <p className=' absolute text-s top-4 right-4 h-5 w-5 flex justify-center items-center rounded-full border-1 bg-green-400 text-black'>{index}</p>
                }
            </div>

            ))}
        </div>
    </div>
  )
}

export default SideBar

import React, { useState } from 'react'
import assets from '../assets/assets'

function LoginPage() {
  const [currState, setCurrState] = useState("sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const onSubmitHandler =(event)=>{
    event.preventDefault();
    if(currState === 'sign up' && !isDataSubmitted)
    {
      setIsDataSubmitted(true)
      return;
    }
  }

  return(
          <div className='min-h-screen bg-color bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
                {/* left  */}
              <img src={assets.logo_big} className='w-[min(30vw,250px)]'/>
              {/* right  */}
            <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
              <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
                {isDataSubmitted && <img onClick={()=>(setIsDataSubmitted(false))} src={assets.arrow_icon} alt="" className='w-5  cursor-pointer' />}
              </h2>
              {currState === "sign up" && !isDataSubmitted &&
                (<input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" placeholder="Full Name" required
                 className='p-2 border  border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500' />
                )}
              {
                !isDataSubmitted && (
                  <>  
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' required
                    className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500'/>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Password' required
                    className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2  focus:ring-indigo-500'/>
                  </>
              )}
              {
                currState === "sign up"  && isDataSubmitted && (
                  <textarea onChange={(e)=>setBio(e.target.value)} value={bio} name='' id="" rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...'  ></textarea>
                )
              }
                <button  className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
                  {currState ==="sign up" ? "Create Account": "Login Now"}
                </button>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <input type="checkbox"/>
                  <p>Agree to the Terms of use & Privacy Policy</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    {currState === "sign up"?(<p className='text-sm text-gray-600'>Already Have an account? 
                        <span onClick={()=>{setCurrState("Login")}} className='font-medium text-violet-700 cursor-pointer'>Login</span></p>):
                        <p className='text-sm text-gray-600 '>Create an Account 
                        <span onClick={()=>(setCurrState("sign up"))} className='font-medium text-violet-700 cursor-pointer'>Click here</span></p>
                    }
                </div>    
              </form>  
          </div>
        )
}
export default LoginPage

import React, { useState } from 'react'

function ForgotPassword  () {
  const [step,setStep]=useState(1);
  const [inputClicked,setInputClicked]=useState({
    email:false,
    otp:false,
    newPassword:false,
    confirmNewPassword:false

  })
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const [otp,setOtp]=useState("")
  const [newPassword,setNewPassword]=useState("")
    const [confirmnewPassword,setConfirmNewPassword]=useState("")
  return (
   <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 
    flex flex-col justify-center items-center'>
      {step==1 &&

      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white 
        rounded-2xl flex justify-center items-center 
        overflow-hidden border-2 border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>

             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px]  border-2 border-black' 
                    onClick={()=>setInputClicked({...inputClicked,email:true})}>
                        <label htmlFor='email' className={`text-gray-700 absolute
                         left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-5px]":""}`}>Enter Your Email</label>
                            <input type="email" id='email' className='w-[100%] h-[100%]
                             rounded-2xl px-[20px] outline-none border-0' required
                             onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    
                    </div>
      <button className='w-[70%] px-[20px] py-[10px] bg-black text-white 
                    font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
                     disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:
                        "Send OTP"}</button>

      </div>}

      {step==2 && 
       <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white 
        rounded-2xl flex justify-center items-center 
        overflow-hidden border-2 border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>

             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px]  border-2 border-black' 
                    onClick={()=>setInputClicked({...inputClicked,otp:true})}>
                        <label htmlFor='otp' className={`text-gray-700 absolute
                         left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp?"top-[-5px]":""}`}>Enter OTP</label>
                            <input type="text" id='otp' className='w-[100%] h-[100%]
                             rounded-2xl px-[20px] outline-none border-0' required
                             onChange={(e)=>setOtp(e.target.value)} value={otp}/>
                    
                    </div>
      <button className='w-[70%] px-[20px] py-[10px] bg-black text-white 
                    font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
                     disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:
                        "Submit"}</button>

      </div>}

      {step==3 && 
       <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white 
        rounded-2xl flex justify-center items-center 
        overflow-hidden border-2 border-[#1a1f23]'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>

             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px]  border-2 border-black' 
                    onClick={()=>setInputClicked({...inputClicked,newPassword:true})}>
                        <label htmlFor='newPassword' className={`text-gray-700 absolute
                         left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword?"top-[-5px]":""}`}>Enter New Password</label>
                            <input type="text" id='newPassword' className='w-[100%] h-[100%]
                             rounded-2xl px-[20px] outline-none border-0' required
                             onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
                    
                    </div>
               <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px]  border-2 border-black' 
                    onClick={()=>setInputClicked({...inputClicked,confirmNewPassword:true})}>
                        <label htmlFor='newPassword' className={`text-gray-700 absolute
                         left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword?"top-[-5px]":""}`}>Confirm New Password</label>
                            <input type="text" id='confirmNewPassword' className='w-[100%] h-[100%]
                             rounded-2xl px-[20px] outline-none border-0' required
                             onChange={(e)=>setConfirmNewPassword(e.target.value)} value={confirmnewPassword}/>
                    
                    </div>
      <button className='w-[70%] px-[20px] py-[10px] bg-black text-white 
                    font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]'
                     disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:
                        "Reset Password"}</button>

      </div>}
        
    </div>
  )
}

export default ForgotPassword
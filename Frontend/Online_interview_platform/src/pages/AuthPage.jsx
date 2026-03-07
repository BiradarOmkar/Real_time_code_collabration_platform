import React from 'react'
import LeftAuth from '../components/LeftAuth'
import RightAuth from '../components/RightAuth'

function AuthPage() {
  return (
   <div className='min-h-screen flex'>
       {/* left */}
         <div className='hidden md:flex w-1/2 bg-linear-to-br from-[#0F172A] to-[#1E3A8A] text-white p-12 flex-col justify-between'>
               <LeftAuth/>
         </div>
        {/* right */}
        <div className='w-full md:w-1/2 bg-white flex items-center justify-center p-8'>
               <RightAuth/>
        </div>
    </div>
  )
}

export default AuthPage

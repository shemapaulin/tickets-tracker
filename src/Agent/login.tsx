import Login from '@/components/agentlogin'
import bg from "@/assets/bg.jpg"
import React from 'react'

const login = () => {
  return (
    <div className="flex justify-start items-start h-screen w-screen">
    <img src={bg} alt="Home Image" className="h-[100%] w-[50%] object-cover rounded-r-[70px]"/>
    <div className=" flex flex-col justify-center items-center w-[50%]">
    <Login />
 </div>
 </div>
  )
}

export default login

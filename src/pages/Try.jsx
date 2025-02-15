import React from 'react'
import { server } from '../server'
import axios from 'axios'

const Try = () => {
  
const sendRequest = async () => {
axios.post(`${server}/user/send_grid`, {
    email: "eruditejones@gmail.com",
     message: "Hello, this is a test email"
  }).then((res) => {
    alert(res.data.message)
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  
}

  return (
   <>
    <div  className='text-blue text-[100px]'>
      I am just seeing if it works 
    </div>
    <button className='bg-primary_color text-white p-2 rounded-md' onClick={()=> {sendRequest()}}> Send Email </button>
   </>
  )
}

export default Try

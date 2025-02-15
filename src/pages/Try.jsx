import React from 'react'
import { server } from '../server'
import axios from 'axios'

const Try = () => {
  
const sendRequest = async () => {
axios.post(`${server}/user/create-user`, {
  name: "John Doe",
    email: "eruditejones@gmail.com",
    phoneNumber: "07060706060",
     password: "password",
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

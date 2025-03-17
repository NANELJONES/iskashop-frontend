import React from 'react'
import { server } from '../server'
import axios from 'axios'
import FullDeliveries from '../components/Admin/FullDeliveries'
import Taxes from '../components/Admin/Financials/Taxes'


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

console.log(server)

  return (
   <>
  
    <div  className='text-blue '>
<Taxes></Taxes>
    </div>
    
   </>
  )
}

export default Try

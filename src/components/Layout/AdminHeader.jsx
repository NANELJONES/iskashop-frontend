import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    const {user} = useSelector((state) => state.user);
   

  return (
         <div className="w-full bg-primary_color shadow p-[3em]  flex flex-col items-start ">
     <h5 className='text-text_color'>Welcome</h5>
     <h2 className='text-text_color'>{`${user.name} (${user.role})`}</h2>
     

    </div>
  )
}

export default AdminHeader
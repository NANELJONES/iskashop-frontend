import React from 'react'
import FullDeliveries from '../components/Admin/FullDeliveries'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminDeliveries = () => {
  return (
    <div>
        <AdminHeader></AdminHeader>
<div className="w-full flex">
      <div className="flex items-start  w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <FullDeliveries></FullDeliveries>
      </div>
    </div>
       
      
      
    </div>
  )
}

export default AdminDeliveries

import React from 'react'
import FullDeliveries from '../components/Admin/FullDeliveries'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminDeliveries = () => {
  return (
    <div>
      
<div className="w-full flex">
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
      <div className='w-full'>
      <AdminHeader></AdminHeader>
      <FullDeliveries></FullDeliveries>
     
      </div>
      </div>
    </div>
       
      
      
    </div>
  )
}

export default AdminDeliveries

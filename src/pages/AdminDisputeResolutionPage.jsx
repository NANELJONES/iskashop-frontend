import React from 'react'
import AdminDisputeResolutions from '../components/Admin/AdminDisputeResolutions'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminDisputeResolutionPage = () => {
  return (
    <div>       
     
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
        <div className='w-full'>
        <AdminHeader></AdminHeader>
        <AdminDisputeResolutions />
        </div>
        </div>
     
    </div>
  )
}

export default AdminDisputeResolutionPage


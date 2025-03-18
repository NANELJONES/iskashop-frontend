import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllUsers from "../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
 
  
      <div className="admin_container_div w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
      <div className='w-full'>
      <AdminHeader />
      <AllUsers />
     
      </div>
      </div>
   
  </div>
  )
}

export default AdminDashboardUsers
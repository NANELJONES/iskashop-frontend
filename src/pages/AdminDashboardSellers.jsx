import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
   
    <div className="">
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
      <div className='w-full'>
      <AdminHeader />
      <AllSellers />

      </div>
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSellers
import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllProducts from "../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div>


      <div className="w-full admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
     <div className='w-full'>
     <AdminHeader />
     <AllProducts />
     </div>
      </div>
  
  </div>
  )
}

export default AdminDashboardProducts
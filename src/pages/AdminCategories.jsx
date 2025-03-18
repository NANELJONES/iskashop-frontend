import React from 'react'
import AllCategories from '../components/Admin/AllCategories'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminCategories = () => {
  return (
    <div>


      <div className="admin_container_div w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
       <div className='w-full'>
       <AdminHeader></AdminHeader>
       <AllCategories></AllCategories>
       </div>
      </div>

       
      
    </div>
  )
}

export default AdminCategories

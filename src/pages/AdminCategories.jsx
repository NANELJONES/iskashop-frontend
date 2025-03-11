import React from 'react'
import AllCategories from '../components/Admin/AllCategories'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
const AdminCategories = () => {
  return (
    <div>
<AdminHeader></AdminHeader>
<div className="w-full flex">
      <div className="flex items-start  w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={6} />
        </div>
        <AllCategories></AllCategories>
      </div>
    </div>
       
      
    </div>
  )
}

export default AdminCategories

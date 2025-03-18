import React from 'react'
import AdminBanners from '../components/Admin/AdminBanners'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'

const AdminBannersPage = () => {
  return (
    <div>
     
     
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={10} />
        </div>
        <div className='w-full'>
        <AdminHeader></AdminHeader>
        <AdminBanners />    
        </div>
    </div>

   
   
    </div>
  )
}

export default AdminBannersPage

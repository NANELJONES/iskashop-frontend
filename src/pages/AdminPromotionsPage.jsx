import React from 'react'
import AdminPromotions from '../components/Admin/AdminPromotions'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'


const AdminPromotionsPage = () => {
  return (
        <div>
      
      

      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={8} />
        </div>
        <div className='w-full'>
        <AdminHeader></AdminHeader>
        <AdminPromotions />
        </div>
    </div>



    </div>
  )
}

export default AdminPromotionsPage


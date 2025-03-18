import React from 'react'
import AdminInsights from '../components/Admin/AdminInsights'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'


const AdminInsightsPage = () => {
    return (
    <div>
        
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={9} />
        </div>
        <div className='w-full'>
        <AdminHeader></AdminHeader>
        <AdminInsights />
        </div>
        </div>
      
        </div>
  )
}

export default AdminInsightsPage

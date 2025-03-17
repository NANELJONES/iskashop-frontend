import React from 'react'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import Taxes from '../components/Admin/Financials/Taxes'
import AdminHeader from '../components/Layout/AdminHeader'
import LayoutContainer from '../components/Admin/Layout/LayoutContainer'
const AdminFinancials = () => {
  return (
    <div className='w-full'>
    

    <LayoutContainer>
      <div className="admin_container_div">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={11} />
        </div>

        <div className='w-full'>
        <AdminHeader></AdminHeader>
        <Taxes></Taxes>
        </div>
      
      </div>
      </LayoutContainer>

      
      
    </div>
  )
}

export default AdminFinancials

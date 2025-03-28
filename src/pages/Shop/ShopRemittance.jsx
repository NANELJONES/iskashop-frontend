import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import Remittance from '../../components/Shop/Remittance'

const ShopRemittance = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
      
          <DashboardSideBar active={8} />
     
        <div className="w-full">
          <DashboardHeader />
          <Remittance />
        </div>
      </div>
    </div>
  )
}

export default ShopRemittance

import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import Remittance from '../../components/Shop/Remittance'

const ShopRemittance = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={12} />
        </div>
        <div className="w-full">
          <DashboardHeader />
          <Remittance />
        </div>
      </div>
    </div>
  )
}

export default ShopRemittance

import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import VendorPromotions from '../../components/Shop/VendorPromotions'

const ShopPromotions = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full">
          <DashboardHeader />
          <VendorPromotions />
        </div>
      </div>
    </div>
  )
}

export default ShopPromotions

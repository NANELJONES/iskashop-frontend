import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllCoupons from "../../components/Shop/AllCoupons";

const ShopAllCoupouns = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
       
          <DashboardSideBar active={9} />
        
        <div className="w-full">
          <DashboardHeader />
          <AllCoupons />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupouns
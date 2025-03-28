import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <div className="admin_container_div p-4 flex w-full">
       
          <DashboardSideBar active={2} />
    
        <div className="w-full">
          <DashboardHeader />

          <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrders
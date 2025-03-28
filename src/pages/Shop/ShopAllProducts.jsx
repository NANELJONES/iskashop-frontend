import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
      
          <DashboardSideBar active={3} />
      
        <div className="w-full">
          <DashboardHeader />
          <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts
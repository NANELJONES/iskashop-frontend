import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
      <div className="admin_container_div flex w-full">
       
          <DashboardSideBar active={4} />
     
        <div className="w-full">
          <DashboardHeader />
          <CreateProduct />
        </div>
      </div>
    </div>
  )
}

export default ShopCreateProduct
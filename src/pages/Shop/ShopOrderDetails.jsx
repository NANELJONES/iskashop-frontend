import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Shop/OrderDetails";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
const ShopOrderDetails = () => {
  return (
    <div>
         <DashboardHeader />
         <br />
        <div className='flex w-full items-start justify-start'>
          <DashboardSideBar  active={2}/>
          <OrderDetails />
        </div>
          <Footer />
    </div>
  )
}

export default ShopOrderDetails
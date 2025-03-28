import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";
import ProfileSidebar from '../components/Profile/ProfileSidebar';

const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <div className='flex mt-[3em] max-w-[1300px] mx-auto'>
          <UserOrderDetails />
        </div>
        {/* <Footer /> */}
    </div>
  )
}

export default OrderDetailsPage
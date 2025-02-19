import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
  <>
     <Header />
    <div className='container w-full min-h-screen  p-4'>
    
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
     
    </div>
    <Footer />
  </>
  )
}

export default PaymentPage
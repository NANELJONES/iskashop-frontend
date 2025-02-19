import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
  return (
 <>
        <Header />
        <br />
        <br />
        <div className='container p-4'>
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
       
    </div>
    <Footer />
    </>
  )
}

export default CheckoutPage
import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import Filter from "../components/Filter/Filter";
import Payment from "../components/Payment/Payment";


const HomePage = () => {
  return (
    <div className='items-center flex flex-col mt-10 '>
      <Header activeHeading={1} />
       {/*    <Hero /> */}
   
       <h3 className='text-center'>Page Still Under Development</h3>
        {/* <Events /> */}

        <div className='flex mt-10'>
          {/* <Filter /> */}
                  <div>
                  {/* <Sponsored /> */}
                  <BestDeals />
              {/* <FeaturedProduct /> */}
            
              </div>
        </div>
 
        {/* <Footer /> */}
    </div>
  )
}

export default HomePage
import React from 'react'
import Product from '../components/Products/Product'
import { useParams } from 'react-router-dom'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader'
const SingleProductPage = () => {
  const {id} = useParams();
  console.log(id);
  return (

  
    <div>
<DashboardHeader/>

    <Product id={id} />
      
    </div>
  )
}

export default SingleProductPage

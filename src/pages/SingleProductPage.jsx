import React from 'react'
import Product from '../components/Products/Product'
import { useParams } from 'react-router-dom'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../components/Shop/Layout/DashboardSideBar'

const SingleProductPage = () => {
  const {id} = useParams();

  return (

  
    <div>
      <DashboardHeader/>

<br/>

<div className='flex gap-[1em]'>
  <DashboardSideBar active={3}/>
  
  {id && <Product id={id} />}
</div>

      
    </div>
  )
}

export default SingleProductPage

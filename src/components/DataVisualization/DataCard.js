import React from 'react'
import { Link } from 'react-router-dom'
const DataCard = ({heading, value, icon, link}) => {
  return (
    <div className='card p-[1em] bg-white max-w-[300px] shadow rounded '>
      <div className='flex items-center'>
        {icon}
        <p className='leading-5 !font-[400]'>{heading}</p>
      </div>
      <h3 className='pt-2 font-[500]'>{value}</h3>
   {link && <Link to={link} className='pt-4 text-xs pl-2 text-[#077f9c]'>View All</Link>}
    </div>
  )
}

export default DataCard

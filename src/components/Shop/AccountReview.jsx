import React from 'react'



const AccountReview = ({message, img_path}) => {
    const default_img = '/account_review.svg'
  return (
    <div className='flex mt-[3em] flex-col items-center justify-center h-full'>
      <img src={img_path || default_img} alt="logo" className='w-full max-w-[500px]' />
      <h5 className='text-center  md:w-2/3 text-[16px] font-Poppins'>{`Your Account is being reviewed. After review you will be notified via email. where you can have full access to the ${message || "this pages"}'s features`}</h5>
    </div>
  )
}

export default AccountReview

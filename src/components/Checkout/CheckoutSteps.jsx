import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({active}) => {
    console.log(active);
  return (
    <div className='w-full flex justify-start'>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
               <div className={`${styles.noramlFlex}`}>
                <div className={``}>
                       <span className={`${active === 1 ? 'font-bold' : 'font-normal'} text-primary_color`}>Address</span>
                </div>
                <div className={`${
                    active > 1 ? "w-[30px] 800px:w-[70px]  h-[2px] !bg-primary_color"
                    : "w-[30px] 800px:w-[70px] h-[2px] !bg-primary_color"
                }`} />
               </div>

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active === 2  ? `font-bold` : `font-normal`} text-primary_color`}>
                    <span className={`${active === 2 ? 'font-bold' : 'font-normal'}`}>
                        Delivery & Payment
                    </span>
                </div>
               </div>

               <div className={`${styles.noramlFlex}`}>
               <div className={`${
                    active > 3 ? "w-[30px] 800px:w-[70px] h-[2px] !bg-primary_color"
                    : "w-[30px] 800px:w-[70px] h-[2px] !bg-primary_color"
                }`} />
                <div className={`${active === 3 ? `font-bold` : `font-normal `} text-primary_color`}>
                    <span className={`${active > 1 ? 'font-bold' : 'font-normal '}text-primary_color`}>
                        Success
                    </span>
                </div>
               </div>
        </div>
    </div>
  )
}

export default CheckoutSteps
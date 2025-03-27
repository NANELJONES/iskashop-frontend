import React from 'react'
import { motion } from 'framer-motion'

const AnimateDown = ({children, delay = 0.2}) => {
    return (
  <>
  <motion.div 
  initial ={{opacity:0, y:20}}
  whileInView={{opacity:1, y:0}}
  transition={{duration:1, delay: delay}}
  
  className='w-full '
   
   >
      {children}
  </motion.div>
  </>
    
  )
  }
  

export default AnimateDown

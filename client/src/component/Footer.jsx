import React from 'react'
import { BsRobot } from "react-icons/bs";
import { motion } from 'framer-motion'

function Footer() {
  return (
    <div className='bg-gradient-to-br from-[#faf8f5] to-[#f5f1ed] flex justify-center px-4 pb-16 pt-20'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative w-full max-w-6xl'
      >
        {/* Decorative gradient background */}
        <div className='absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50 via-transparent to-purple-50 blur-3xl opacity-40' />
        
        <div className='rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm px-8 py-12 md:px-16 md:py-14 shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-12'>
            {/* Left Section - Logo & Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='flex flex-col items-start min-w-fit'
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className='mb-4 inline-flex p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl'
              >
                <BsRobot size={24} className='text-blue-600' />
              </motion.div>
              <h1 className='mb-1 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                InterviewIQ.AI
              </h1>
              <p className='text-sm text-gray-500 font-medium'>&copy; 2026 InterviewIQ.AI</p>
              <p className='text-xs text-gray-400 mt-1'>All rights reserved</p>
            </motion.div>

            {/* Right Section - Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex-1'
            >
              <p className='text-sm leading-7 text-gray-600 font-light'>
                <span className='font-semibold text-gray-700'>Developed by Sandeep K G</span>
                <br />
                <span className='bg-gradient-to-r from-blue-600 to-purple-600 
                bg-clip-text text-transparent font-semibold'>InterviewIQ.AI</span> 
                leverages advanced AI technology to provide users with a comprehensive
                 and interactive interview preparation experience.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Footer
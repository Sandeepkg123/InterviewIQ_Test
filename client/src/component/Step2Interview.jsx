import React from 'react'
import maleVedio from '../assets/vedio/male-ai.mp4'
import femaleVedio from '../assets/vedio/female-ai.mp4'
import Timer from './Timer';
import { motion } from "motion/react";
import {FaMicrophone , FaMicrophoneSlash} from 'react-icons/fa'

function Step2Interview({interviewData,onFinish}) {
  
  const {interviewId,questions,userName} = interviewData;

 
  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white
    to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl
       shadow-2xl border border-gray-200 flex flex-col 
       lg:flex-row overflow-hidden'>


        {/* video section */ }
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center 
         p-6 space-y-6 border-gray-200 border-r'>
         <div className='w-full max-w-md rounded-2xl overflow-hidden'>
            <video
            src={femaleVedio}
            muted
            playsInline
            preload='auto'
            className='w-full h-auto object-cover'
            />
          </div>

          {/*subtitle */}


          {/*timer area */}

          <div className='w-full max-w-md bg-white border border-gray-200
           rounded-2xl p-6 space-y-5'>
            <div className='w-full flex items-center justify-between'>
              <span className='text-gray-500 text-sm'>
                Interview status
              </span>
              <span className='font-semibold text-emerald-600 text-sm'>
                AI Speaking
              </span>
            </div>
            <div className="h-px bg-gray-200"></div>

            <div className="flex justify-center">
              <Timer timeLeft="30" totalTime="60"/>
            </div>

            <div className="h-px bg-gray-200"></div>
            
            <div className='grid grid-cols-2 gap-6 text-center'>
              <div >
                <span className='text-2xl font-bold text-emerald-600'>1</span>
                <span className='text-xs text-gray-400'>Current Question</span>
              </div>

              <div>
                <span className='text-2xl font-bold text-emerald-600'>5</span>
                <span className='text-xs text-gray-400'>Total Questions</span>
              </div>

            </div>
          </div>
        
        </div> 

        {/* Text section */ }
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-600">
            AI Smart Interview
          </h2>

          <div className="flex flex-col flex-1 gap-3">
            <div className="bg-gray-100 rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                Question 1 of 5
              </p>

              <div className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                 First Question
              </div>
            </div>

            <textarea
              placeholder="Type your answer here..."
              className="flex-1 bg-white p-4 sm:p-6 rounded-2xl 
              resize-none outline-none border border-gray-300 focus:ring-2 
              focus:ring-emerald-500 transition text-sm sm:text-base text-gray-800"
              ></textarea>

            <div className="flex items-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 sm:h-14 flex items-center justify-center
                rounded-full bg-black text-white shadow-lg 
              "
              >
                <FaMicrophone size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:opacity-90 transition
                font-semibold text-sm sm:text-base'
              >
                Submit Answer
              </motion.button>
            </div>
          </div>
        </div>
        
      </div>

    </div>
    
  )

}

export default Step2Interview
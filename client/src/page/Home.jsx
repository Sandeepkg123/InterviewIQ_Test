import React from 'react'
import Navbar from '../component/Navbar'
import { motion } from "motion/react"  // ✅ Correct - using named import
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText } from 'react-icons/bs'
import { HiSparkles } from "react-icons/hi2";
import { MdTimer } from "react-icons/md";
import {setUserDate} from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthModel from '../component/AuthModel';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Footer from '../component/Footer';



import hrImg from '../assets/HR.png'
import techImg from '../assets/tech.png'
import ConfidenceImg from '../assets/Confi.png'
import creditImg from '../assets/credit.png'
import evalImg from '../assets/ai-ans.png'
import resumeImg from '../assets/resume.png'
import pdfImg from '../assets/pdf (1).png'
import analyticsImg from '../assets/history.png'


function Home() {
  const {userDate} = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  

  
  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar />
      <div className='flex-1 '>
          <div className='max-w-6xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <div className='bg-gray-100 text-gray-600 text-sm px-4 py-2
                rounded-full flex items-center gap-2'>
              <HiSparkles size={16} className='bg-green-50 text-green-600' />
                AI Powered Smart Interview Platform
              </div>
            </div>
            <div className='text-center mb-28'>
              <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.00 }}
              className='text-4xl md:text-6xl font-semibold
                leading-tight max-w-4xl mx-auto'>
                  Practice Interview with
                  <span className='relative inline-block'>
                    <span className='bg-green-100 text-green-600 px-5 py-1
                    rounded-full'>
                      AI Intelligence
                    </span>
                  </span>
              
                
              </motion.h1>
              <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.00 }}
              className='text-md md:text-xl text-gray-500 max-w-2xl mx-auto text-lg mt-6'>
              Role-base mock interview with smart follow-up question, 
                  real-time feedback and detailed performance analysis.
              </motion.p>

              <div>
                <motion.button
                onClick={() => {
                  if(!userDate){
                    setShowAuth(true)
                    return;
                  }
                  navigate('/interview')
                }}
                whileHover={{opacity:0.9,scale:1.03}}
                  whileTap={{opacity:1,scale:0.98}}
                  className='bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition-shoadow mt-10'
                >
                  Start Interview
                </motion.button>

                <motion.button
                onClick={() => {
                  if(!userDate){
                    setShowAuth(true)
                    return;
                  }
                  navigate('/history')
                }}
                whileHover={{opacity:0.9,scale:1.03}}
                  whileTap={{opacity:1,scale:0.98}}
                  className='border border-gray-800 px-4 py-3 rounded-full hover:bg-gray-200
                  transition-shadow mt-14 ml-2'>
                  View History
                </motion.button>

              </div> 
            </div>
            <div className='flex flex-row justify-center items-center flex-wrap
            gap-10 mb-25'>
              {
                [
              {
                icon: <BsRobot size={32} className='text-green-600' />,
                step: '01',
                title: 'Role & Experience Selection',
                desc: 'Get personalized interview questions based on your role and experience.'
              },
              {
                icon: <BsMic size={32} className='text-green-600' />,
                step: '02',
                title: 'Smart voice Interview',
                desc: 'Dynamic follow-up questions based on your answers, simulating a real interview experience.'
              },
              {
                icon: <MdTimer size={32} className='text-green-600' />,
                step: '03',
                title: 'Time Based Performance Analysis',
                desc: 'Real-time feedback and performance analysis to help you improve with detailed insights after each interview.'
              }
            ].map((item, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{opacity:1,y:0}}
              transition={{ duration: 0.6+index*0.2 }}
              whileHover={{rotate:0, scale:1.05}}
              className={`bg-white rounded-3xl border-2 border-green-100 relative pt-12 p-8 w-80
                  max-w-sm cursor-pointer transition duration-300 shadow-md
              ${index === 0 ? 'rotate-[-4deg]' : ''}
              ${index === 1 ? 'rotate-[4deg] z-10 md:-md-6 shadow-xl' : ''}
              ${index === 2 ? 'shadow-lg rotate-[-4deg]' : 'rotate-[-4deg]'}`}>

                <div className='absolute -top-6 left-1/2 transform -translate-x-1/2
                bg-white border-2 border-green-600 text-green-600 w-12 h-12 rounded-2xl flex 
                items-center justify-center shadow-lg'>
                  {item.icon}
                </div>
                
                <div className='mt-8'>
                  <div className='text-green-600 text-2xl font-bold mb-2'>{item.step}</div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-3'>{item.title}</h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          
            </div>
            <div className='text-center py-10'>
              <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-3xl md:text-4xl font-semibold text-gray-800 '>
                Advance AI {" "}
                <span className='text-green-600'>
                  Capabilities
                </span>
              
              </motion.h2>
            </div>

            <div className='grid md:grid-cols-2 gap-10 mb-20'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} className='text-green-600' />,
                    title: 'AI Answer Evaluation',
                    desc: 'Score communication ,technical accuracy and confidence '
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} className='text-green-600' />,
                    title: 'Resume Based Interview',
                    desc: 'Project-specific questions based on uploaded resume '
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} className='text-green-600' />,
                    title: 'Downloadable PDF Report',
                    desc: 'Get a detailed PDF report of your performance with practice rounds and comprehensive metrics.'
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} className='text-green-600' />,
                    title: 'History and Analytics',
                    desc: 'Track your progress over time with interview history and performance analytics to identify strengths and areas for improvement.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 , delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, y: 6 }}
                    className='bg-white rounded-3xl border border-gray-200 
                    overflow-hidden shadow-md hover:shadow-lg transition duration-300'
                  >
                    <div className='flex flex-col md:flex-row items-center
                    gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} 
                        className='w-full h-auto object-contain max-h-64' />
                      </div>
                      
                      <div className='w-full md:w-1/2'>
                        <div className='bg-green-100 text-green-600 w-10 h-10 
                        rounded-full flex items-center justify-center mb-4'>
                          {item.icon}
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>{item.title}</h3>
                        <p className='text-gray-600 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>
                  </motion.div>
                ))
              }
            </div>
           
            <div className='text-center py-10'>
              <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-3xl md:text-4xl font-semibold text-gray-800 '>
                Multiple Interview {" "}
                <span className='text-green-600'>
                  Modes
                </span>
              
              </motion.h2>
            </div>

            <div className='grid md:grid-cols-2 gap-10 mb-20'>
              {
                [
                  {
                    image: hrImg,
                    title: 'HR Interview Mode',
                    desc: 'Behavioral and commution based evaluation '
                  },
                  {
                    image: techImg,                   
                    title: 'Technical Interview Mode',
                    desc: 'Deep technical evaluation with coding and system design questions.'
                  },
                  {
                    image: ConfidenceImg,                 
                    title: 'Confidence Detection',
                    desc: 'Basic tone and voice analysis insights'
                  },
                  {
                    image: creditImg,
                    title: 'Credit System',
                    desc: 'Unclock premium interview sessions'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 , delay: index * 0.15 }}
                    whileHover={{ scale: 1.05, y: -6 }}
                    className='bg-white rounded-3xl border border-gray-200 
                    overflow-hidden shadow-md hover:shadow-lg transition-all'
                  >
                    <div className='flex items-end justify-between gap-6 p-6'>
                      <div>
                        <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                        <p className='text-gray-600'>{item.desc}</p>
                      </div>
                      <div>
                        <img src={item.image} alt={item.title} className='w-24 h-24 object-cover' />
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>            
            

          </div>
      </div>
      <Footer />
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)} />}
    </div>
  )
}

export default Home
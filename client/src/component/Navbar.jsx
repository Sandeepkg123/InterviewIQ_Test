import React from 'react'
import {useSelector} from 'react-redux'
import {motion } from "motion/react"
import { BsRobot } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ServerUrl} from '../App';
import {setUserDate} from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import AuthModel from './AuthModel';


function Navbar() {
    const {userDate} = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false)

     const handleLogout = async () => {
        try {
            await axios.get(`${ServerUrl}/api/auth/logout`, {}, { withCredentials: true });
            dispatch(setUserDate(null));
            setShowUserPopup(false);
            setShowCreditPopup(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

  return (

    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
        <motion.div 
        initial={{ opacity:0,y:-40}}
        animate={{ opacity:1,y:0}}
        transition={{ duration: 0.5 }}      
        className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm 
        border border-gray-200 px-8 py-4 flex justify-between items-center
        relative '>
            <div className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-black text-white p-2 rounded -1g'>
                    <BsRobot size={18} />
                </div>
                <h1 className='font-semibold hidden md:block
                text-1g'>
                    InterviewIQ.AI
                </h1>
            </div>

            <div className='flex items-center gap-8 relative' >
                <div className='relative'>
                    <button onClick={()=>{
                         if (!userDate){
                            setShowAuth(true)
                            return;
                         }
                        setShowCreditPopup((!showCreditPopup))
                        setShowUserPopup(false)
                    }
                    } 
                    className='flex items-center gap-2 bg-gray-100 
                    px-4 py-2 rounded-full text-md hover:bg-gray-200 
                    transition'>
                        <BsCoin />
                        {userDate?.credits || 0}

                    </button>
                    {showCreditPopup && (
                       <div className='absolute right-[-50px] mt-3 w-64 bg-white border border-gray-200
                        rounded shadow-lg p-4 text-sm z-50'>
                            <p className='text-sm text-gray-600 mb-4'>
                                Need more credits? Upgrade to continue interviews?</p>
                                <button onClick={()=>navigate("/pricing")} className='w-full bg-black text-white py-2 
                                rounded-lg text-sm'>
                                   Buy  more credits
                                </button>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button onClick={()=>{
                         if (!userDate){
                            setShowAuth(true)
                            return;
                         }
                        setShowUserPopup((!showUserPopup))
                        setShowCreditPopup(false)}                    
                    } 
                    className='w-9 h-9 bg-black text-white rounded-full
                    flex items-center justify-center font-semibold' >
                    {userDate ? userDate.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={18} />}

                        

                    </button>
                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl p-4 shadow-lg z-50'>
                            <p className='text-md text-blue-500 font-medium mb-1'>
                                {userDate ? userDate.name : 'Guest'}
                            </p>
                            <p className='text-sm text-gray-600 mb-4'>
                                {userDate ? userDate.email : 'N/A'}
                            </p>
                            <button onClick={()=>navigate("/interview-history")} 
                            className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>
                                Interview History
                            </button>
                            <button onClick={handleLogout} className='w-full text-left text-sm py-2 
                            flex items-center gap-2 text-red-500 hover:bg-red-50 rounded cursor-pointer transition'>
                            <HiOutlineLogout  size={16}/>
                            Log Out
                            </button>
                        </div>
                    )}
                </div>

            </div>


        </motion.div>
        {showAuth && <AuthModel onClose={()=>setShowAuth(false)} />}
    </div>
  )
}

export default Navbar
import React from 'react'
import { BsRobot } from "react-icons/bs";
import { RiSparkling2Line } from "react-icons/ri";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import { signInWithPopup} from "firebase/auth";
import { auth, provider} from '../utils/firebase';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserDate } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Auth({ismodel=false, onClose}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleGoogleAuth = async() => {
    try {
      const response=await signInWithPopup(auth, provider);
      let User=response.user;
      let name=User.displayName;
      let email=User.email;
      console.log(User);
      const result=await axios.post(ServerUrl+"/api/auth/google",{name,email},{withCredentials:true});
      console.log(result);
      dispatch(setUserDate(result.data.user));
      navigate('/');
    } catch (error) {
      console.error("Error signing in with firebase", error.response.data.message);
      dispatch(setUserDate(null));
    }
  };

  return (
    <div className={`w-full ${ismodel ? "min-h-screen flex items-center justify-center" : "bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}> 
      <motion.div 
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.05 }}
      className={`w-full ${ismodel ? "max-w-md p-8 rounded-3xl relative" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
        {ismodel && (
          <button onClick={onClose} className='absolute top-4 right-4 text-black bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-lg transition-colors'>
            <FaTimes />
          </button>
        )}
        <div  className='flex items-center justify-center gap-3 mb-6' >
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={20} />
          </div>
          <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
        </div>
        <h1 className='text-2xl md:text-3xl font-semibold text-center
        leading-snug mb-4'>
          continue with
          <span className='bg-green-100 text-green-500 px-3 py-1
          rounded-full inline-flex items-center justify-center gap-2 ml-2'> 
          <RiSparkling2Line size={10} />
          AI Smart Interview
          </span>
        </h1>

        <p className='text-sm md:text-base text-center text-gray-500 leading-relaxed mb-8'>
          Sign in to start AI-powered mock interviews, 
          track your progress, and unlock detailed performance insights

        </p>
        <motion.button onClick={handleGoogleAuth}
        whileHover={{opacity:0.9,scale:1.03}}
        whileTap={{opacity:1,scale:0.9}}
        className='w-full flex items-center justify-center
        gap-3 py-3 px-8 bg-black text-white rounded-full shadow-md hover:shadow-lg transition-shadow'>
          <FcGoogle size={20} />
          Continue with google
        </motion.button>
      </motion.div>

    </div>
  )
}

export default Auth
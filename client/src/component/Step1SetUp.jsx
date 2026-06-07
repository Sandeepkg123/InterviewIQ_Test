import React, { use } from 'react'
import {motion} from 'motion/react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ServerUrl } from '../App'
import { setUserDate } from '../redux/userSlice'
import {
 FaUserTie ,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
}from 'react-icons/fa'

function Step1SetUp({onStart}) {

  const {userDate} =useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [mode, setMode] = useState("Technical")


  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState('');
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    setAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    
    try {
      const result = await axios.post('http://localhost:3000/api/interview/resume', formData, {
        withCredentials: true
      });
      console.log(result.data);
      setRole(result.data.role||"");
      setExperience(result.data.experience ||"");
        setProjects(result.data.projects || []);
        setSkills(result.data.skills || []);
        setResumeText(result.data.text || "");
        setAnalysisDone(true);
        setAnalyzing(false);
     
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setAnalyzing(false);
    } 
  };


  const handleStart = async() => {
    setLoading(true);
    try {
      const result = await axios.post(`${ServerUrl}/api/interview/generate-questions`, {
        role,
        experience,
        mode,
        resumeText,
        projects,
        skills
      }, {
        withCredentials: true
      });
      if(userDate){
        dispatch(setUserDate({...userDate, 
          credits:result.data.creditsLeft}));
      }
      setLoading(false);
      onStart(result.data);


      
    } catch (error) {
      console.error('Error generating questions:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className='min-h-screen flex items-center justify-center
       bg-gradient-to-br from-gray-100 to-gray-200 px-4'
    >
      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl 
          grid md:grid-cols-2 overflow-hidden'>

          <motion.div
            initial={{x: -200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1.5}}
            className='relative bg-gradient-to-br
            from-green-50 to-gray-100 p-10 flex flex-col 
            justify-center'>
              <h2 className='text-3xl font-bold mb-6 text-gray-800 '>
                Welcome to InterviewIQ
              </h2>
              <p className='text-gray-600 mb-10'>Your AI-powered interview assistant. 
                Get ready to acess your interviews with personalized feedback 
                and insights.
              </p>

              <div className='space-y-4'>
                {
                  [
                   {
                    icon: <FaUserTie size={14} className='text-green-500' />,
                    text:"choose your role & experience level"
                   },
                   {
                    icon: <FaMicrophoneAlt size={14} className='text-green-500' />,
                    text:"smart voice Interview "
                   },
                   {
                    icon: <FaChartLine size={14} className='text-green-500' />,
                    text:"performance Analysis"
                   }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{y: 20, opacity: 0}}
                      animate={{y: 0, opacity: 1}}
                      transition={{duration: 0.5, delay: index * 0.2}}
                      whileHover={{scale:1.03}}
                      className='flex items-center space-x-4 bg-white p-4
                       rounded-xl shadow-sm cursor-pointer'
                    >
                      {item.icon}
                      <span className='text-gray-700'>{item.text}                        
                      </span>

                    </motion.div>
                  ))
                }
              </div>
            

          </motion.div >

          <motion.div
            initial={{x: 200, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1.5}}
            className='p-8 bg-white flex flex-col justify-center'
          >
            <h2 className='text-3xl font-bold text-green-800 mb-8'>
              Interview SetUp
            </h2>

            <div className='space-y-6 flex-1'>
              <div className='relative'>
                <FaUserTie className='absolute top-4 left-4 text-green-500'>
                </FaUserTie>
                <input 
                  type="text"
                  placeholder='Enter your role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 border border-gray-300
                  rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition hover:border-green-400'
                />
              </div>

              <div
                 className='relative'>
                <FaBriefcase className='absolute top-4 left-4 text-green-500'>
                </FaBriefcase>
                <input 
                  type="text"
                  placeholder='Experience (e.g. 3 years)'
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 border border-gray-300
                  rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition hover:border-green-400'
                />

              </div>

              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className='w-full pl-4 pr-4 py-3 border border-gray-300
                rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition hover:border-green-400 bg-white cursor-pointer'
              >
                <option value="Technical">Technical Interview</option>
                <option value="HR">HR Interview</option>
                
              </select>

              {!analysisDone && (
                <motion.div 
                whileHover={{scale:1.02}}
                onClick={() => document.getElementById('resume-upload').click()}
                className='border-2 border-dashed border-green-500 rounded-xl p-4
                 text-center  text-gray-600'>
                  <FaFileUpload size={24} className='mx-auto mb-2 text-green-500' />
                 <input
                    type="file"
                    accept="application/pdf"
                    id="resume-upload"
                    className='hidden'
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <p className='text-gray-600 font-medium'>
                      {resumeFile ? resumeFile.name : "Upload your resume (PDF)(optional)"}
                    </p>   
                
                { resumeFile && (
                  <motion.button
                    onClick={(e) => {e.stopPropagation();
                       handleUploadResume()}}
                    whileHover={{scale:1.05}}
                    className='mt-4 bg-gray-900 text-white px-6 py-2
                    rounded-lg hover:bg-gray-800 transition font-medium'>
                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </motion.button> )}
                  
                  
               
                </motion.div>
              )}
              {
                analysisDone && (
                 
                  <motion.div
                  initial={{opacity: 0 ,y:20}}
                  animate={{opacity: 1, y:0}}
                  transition={{duration: 0.5}}
                  className='bg-green-50 p-5 rounded-xl border border-green-200 space-y-4'
                >
                  <h3 className='text-lg font-semibold text-green-700 mb-2'>
                    Resume Analysis Complete!
                  </h3>
                 {
                    projects.length > 0 && (
                      <div>
                       <p className='font-medium text-green-600'>Projects:</p>
                       <div>
                        <ul className='list-disc list-inside text-gray-600
                        space-y-1'>
                          {projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                       </div>
                        
                      </div>
                    )
                  }

                  {
                    skills.length > 0 && (
                      <div>
                        <p className='font-medium text-green-600'>Skills:</p>
                       <div className='flex flex-wrap gap-2'>
                        {skills.map((skill, index) => (
                          <span key={index} className='bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm'>
                            {skill}
                          </span>
                        ))}

                       </div>
                      </div>
                    )
                  }

                  </motion.div>
                    




              )}

            <motion.button
            onClick={handleStart}
              disabled={!role || !experience}
              whileHover={{scale:1.03}}
              whileTap={{scale:0.95}}
              className='w-full mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600
              text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'
             
            >
             {loading ? "Starting..." : "Start Interview"}
            </motion.button>

          

            </div>


          </motion.div>
      </div>

    </motion.div>
  )
}

export default Step1SetUp
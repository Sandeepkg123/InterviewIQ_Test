import React from "react";
import { useState, useRef, useEffect } from "react";
import maleVedio from '../assets/vedio/male-ai.mp4'
import femaleVedio from '../assets/vedio/female-ai.mp4'
import Timer from './Timer';
import { motion } from "motion/react";
import {FaMicrophone , FaMicrophoneSlash} from 'react-icons/fa'
import axios from "axios";
import { ServerURL } from "../App";



function Step2Interview({interviewData,onFinish}) {
  
  const {interviewId,questions,userName} = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice , setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
     if(!voices.length) return;

     //try know femal voice first
      const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes("zira") || 
      voice.name.toLowerCase().includes("samantha") ||
       voice.name.toLowerCase().includes("female"));

      if(femaleVoice){
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      //Try know male voice
      const maleVoice = voices.find(voice => voice.name.toLowerCase().includes("david") ||
        voice.name.toLowerCase().includes("mark") ||
        voice.name.toLowerCase().includes("male"));

      if(maleVoice){
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // fallback :first voice(assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  },[]);

  const videoSource = voiceGender === "male" ? maleVedio : femaleVedio;


    
/* --------------------SPEAK FUNCTION-------------------- */
const speakText = (text) => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis || !selectedVoice) {
      resolve();
      return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Add natural pauses
    const humanText = text
      .replace(/,/g, ", ...")
      .replace(/\./g, ". ...");

    const utterance = new SpeechSynthesisUtterance(humanText);

    utterance.voice = selectedVoice;

    // Human-like pacing and tone
    utterance.volume = 1;
    utterance.rate = 0.92;
    utterance.pitch = 1.2;

    utterance.onstart = () => {
      setIsAIPlaying(true);
      stopMic();
      setSubtitle(text);
      videoRef.current?.play();
    };

    utterance.onend = () => {
      setIsAIPlaying(false);
      setSubtitle("");

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      resolve();
    };

    if(isMicOn){
      startMic();
    }


    utterance.onerror = (error) => {
      console.error("Speech synthesis error:", error);

      setIsAIPlaying(false);
      setSubtitle("");

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};

useEffect(() => {
  if(!selectedVoice) {
    return;
  }
  const runIntro = async () => {
    if (isIntroPhase) {
      await speakText(`Welcome ${userName}! Let's start your interview preparation.
      I will ask you a series of questions. You can answer by typing or using the microphone.
      After you answer, I'll provide feedback and tips to help you improve. Let's get started!`);
      setIsIntroPhase(false);
    }else if(currentQuestion){
      await new Promise(resolve => setTimeout(resolve, 1000));

      if(currentIndex === questions.length-1){
        await speakText("Alright, that was the last question! Great job on completing the interview. Remember to review your answers and the feedback provided. Best of luck with your real interview, you've got this!");
      }
      await speakText(currentQuestion.question);
      if(isMicOn){
        startMic();
      }
    }
  };
  runIntro();

}, [selectedVoice,isIntroPhase,currentIndex]);


useEffect(() => {
  if(isIntroPhase || !currentQuestion) return;
  if(isSubmitting) return;
  const timer = setTimeout(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearTimeout(timer);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearTimeout(timer);
}, [ isIntroPhase, currentIndex , isSubmitting]);


useEffect(() => {
  if(!("webkitSpeechRecognition" in window)){
    return;
  }
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setAnswer((prev) => prev + " " + transcript);
  };

  recognition.current = recognition;
}, []);

const startMic = () => {
  if (recognitionRef.current && !isAiPlaying) {
    try {
      recognitionRef.current.start();
      setIsMicOn(true);
    } catch (error) {
      console.error("Error starting microphone:", error);
    }
  }
};  
};

const stopMic = () => {
  if (recognitionRef.current) {
    recognitionRef.current.stop();
   
  }
};

const  toggleMic = () => {
  if (isMicOn) {
    stopMic();
  } else {
    startMic();
  }
  setIsMicOn(!isMicOn);
};


const submitAnswer = async () => {
  if(isSubmitting) return;
  stopMic();
  setIsSubmitting(true);

  try {
    const result = await axios.post(ServerURL + "/api/interview/submit-answer", {
      interviewId,
      questionIndex: currentIndex,
      answer,
      timeTaken: currentQuestion.timeLimit - timeLeft},
      {withCredentials: true}
      );

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
  }catch (error) {
    console.error(error);
    setIsSubmitting(false);
  }



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
            src={videoSource}
            Key={videoSource}
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload='auto'
            className='w-full h-auto object-cover'
            />
          </div>

          {/*subtitle */}
         {
          subtitle && (<div className='w-full max-w-md bg-gray-50 rounded-2xl border border-gray-200
           p-4 shadow-sm'>
            
            <p className='text-gray-700 text-sm sm:text-base font-medium
            text-center leading-relaxed'>{subtitle}</p> 
          </div>)
         }
           
           


          {/*timer area */}

          <div className='w-full max-w-md bg-white border border-gray-200
           rounded-2xl p-6 space-y-5'>
            <div className='w-full flex items-center justify-between'>
              <span className='text-gray-500 text-sm'>
                Interview status
              </span>
              <span className='font-semibold text-emerald-600 text-sm'>
                {isAIPlaying ? "AI is speaking..." : "Your turn to answer"}
              </span>
            </div>
            <div className="h-px bg-gray-200"></div>

            <div className="flex justify-center">
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} />
            </div>

            <div className="h-px bg-gray-200"></div>
            
            <div className='grid grid-cols-2 gap-6 text-center'>
              <div >
                <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
                <span className='text-xs text-gray-400'>Current Question</span>
              </div>

              <div>
                <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
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

          {!isIntroPhase && (
            <div className="flex flex-col flex-1 gap-3">
              <div className="bg-gray-100 rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  Question {currentIndex + 1} of {questions.length}
                </p>

              <div className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                 {currentQuestion?.question}
              </div>
            </div>
            }

            <textarea
              placeholder="Type your answer here..."
              onchange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="flex-1 bg-white p-4 sm:p-6 rounded-2xl 
              resize-none outline-none border border-gray-300 focus:ring-2 
              focus:ring-emerald-500 transition text-sm sm:text-base text-gray-800"
              ></textarea>

            {!feedback ? (
              <div className="flex items-center gap-4 mt-6">
                <motion.button
                  onClick={toggleMic}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 sm:h-14 flex items-center justify-center
                rounded-full bg-black text-white shadow-lg 
              "
              >
                <FaMicrophone size={20} />
              </motion.button>

              <motion.button
              onClick={submitAnswer}
              disabled={isSubmitting}
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:opacity-90 transition
                font-semibold text-sm sm:text-base disabled:bg-gray-500'
              >
               {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>):(
              motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              
            )}
          </div>
        </div>
        
      </div>

    </div>
    
  )

}

export default Step2Interview
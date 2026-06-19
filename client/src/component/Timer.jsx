import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100;
  return (
    <div className='w-20 h-20'>
      <CircularProgressbar
       value={percentage} 
      text={`${timeLeft}s`}
         styles={ ({
          pathColor: '#10B981',
          textColor: '#10B981',
          trailColor: '#E5E7EB'
        })}
      />
    </div>
  )
}

export default Timer
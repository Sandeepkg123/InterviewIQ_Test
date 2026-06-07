import React from 'react'

function Step2Interview({interviewData,onFinish}) {
  return (
   <div>
    {
      interviewData.questions?.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
        </div>
      ))
    }
   </div>
  )
}

export default Step2Interview
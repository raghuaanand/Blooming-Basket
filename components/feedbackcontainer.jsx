import React from 'react'

import axios from 'axios'
import { url } from '@/lib/url'
import FeedbackCarousel from './feedbackCarousel'
import { Feedback } from '@/Models/FeedBackModel'
import connectingDB from '@/database/database'

const FeedBackContainer = async() => {
  const feedback = await getData() 
  console.log(feedback)

  return (
    <div className=''>
      <div className='text-xl font-bold m-9' >
        What customers say about <br></br> GREENMIND?
      </div>
     <div className='w-[90vw] h-[300px] m-auto text-black mb-20' >
        <div className='w-[90vw] m-auto  h-[500px] ' > 
        {
        feedback && 
          <FeedbackCarousel data={feedback}/>
        }
        </div>
      </div>
    </div>
  )
}

export default FeedBackContainer

async  function getData(){
  await connectingDB()
  const feedback = await Feedback.find()
  console.log(feedback)
  return feedback
}
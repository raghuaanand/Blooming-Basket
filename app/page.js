import React, { Fragment, Suspense } from 'react'
import Section1 from '@/components/section1'
import Section2 from '@/components/section2'
import Section3 from '@/components/section3'
import Section4 from '@/components/section4'
import FeedBackContainer from '@/components/feedbackcontainer'
const home = () => {
  
  return (
         <>
          <Suspense fallback={<p>Loading Feed...</p>} >
            <Section1/>
          </Suspense>
          <Suspense fallback={<p>Loading Feed...</p>} >
            <Section2/>
          </Suspense>
          <Suspense fallback={<p>Loading Feed...</p>} >
            <Section3/>
          </Suspense>
          <Suspense fallback={<p>Loading Feed...</p>} >     
            <FeedBackContainer/>
          </Suspense>
          <Suspense fallback={<p>Loading Feed...</p>} >
            <Section4/>
          </Suspense>
          </>
    
  )
}

export default home







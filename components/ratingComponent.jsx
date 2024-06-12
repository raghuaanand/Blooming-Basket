'use client'
import React from 'react'
import ReactStars from 'react-rating-star-with-type'

const RatingComponent = ({rating}) => {
  return (
    <ReactStars 
    value={rating ?? 0}  
    isEdit={true}  
    activeColor={'#FED900'}
    size={17}
    />
  )
}

export default RatingComponent
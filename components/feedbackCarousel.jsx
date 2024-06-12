'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const feedbackCarousel = ({data}) => {
  console.log(data)
  return (
        <Carousel>
            <CarouselContent className='ml-2' >
            {data.map((feedback)=>(
            <CarouselItem key={feedback._id} className=" bg-[#C1DCDC] ml-4 min-h-[300px]  p-3  border border-black border-opacity-40 marker:  md:basis-1/2 lg:basis-1/3">
                <div className='flex flex-col justify-between  min-h-[300px]' >
                <div>
                {feedback.feedback}
                </div>
                <div>
                {feedback.name}
                </div>
                </div>
                </CarouselItem>
            ))}           
            
            </CarouselContent>
            <CarouselPrevious />
                    <CarouselNext />
  </Carousel>
  )
}

export default feedbackCarousel
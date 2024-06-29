"use client"
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Section1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselItems = [
    {
      content: (
        <div className='flex items-center justify-center space-x-40 bg-yellow-300 w-full h-[400px] rounded-lg'>
          <div className='flex-col space-y-10 text-blue-900'>
            <h2 className='font-bold text-5xl'>Experience the <br />Sweetness from Home</h2>
            <div className='flex space-x-10 text-2xl font-bold'>
              <p>23+ <br /> Mangoes varities</p>
              <p>1000+ <br />frequent customers</p>
            </div>
          </div>
          <img src='/mango-header.png' className='w-[30%]' alt='mango image' />
        </div>
      )
    },
    { 
        content: (
        <div className='flex items-center justify-center space-x-40 bg-green-300 w-full h-[400px]'>
          <div className='flex-col space-y-10 text-blue-900'>
            <h2 className='font-bold text-5xl'>Straight from <br /> Farm to your Plate</h2>
            <div className='flex space-x-10 text-2xl font-bold'>
              <p>23+ <br /> Mangoes varities</p>
              <p>1000+ <br />frequent customers</p>
            </div>
          </div>
          <img src='/mango-header2.png' className='w-[40%]' alt='mango image' />
        </div>
      )
    },
    { 
        content: (
            <div className='flex items-center justify-center space-x-40 bg-yellow-300 w-full h-[400px]'>
              <div className='flex-col space-y-10 text-blue-900'>
                <h2 className='font-bold text-5xl'>Experience the <br />Sweetness from Home</h2>
                <div className='flex space-x-10 text-2xl font-bold'>
                  <p>23+ <br /> Mangoes varities</p>
                  <p>1000+ <br />frequent customers</p>
                </div>
              </div>
              <img src='/mango-header.png' className='w-[30%]' alt='mango image' />
            </div>
          )
    }
  ];

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      }, 8000); // Adjust the time interval as needed
    }
    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, carouselItems.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <div className="w-[85%] mx-auto pb-10 mt-4">
      <Carousel>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
              {item.content}
            </CarouselItem>
          ))}
        </CarouselContent>
      <CarouselPrevious onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
        <CarouselNext onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
      </Carousel>
      <div className="flex justify-center mt-4">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => {
              setAutoPlay(false);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Section1;

import React, { Fragment } from 'react'

const Section3 = () => {
  return (
    <Fragment>
        <div className='  py-4  flex flex-col '>
            <div>
                <div className='text-2xl font-bold text-center m-3 ' > <h3>About us</h3> </div>
                <div className='text-slate-600 text-md text-center m-3 ' > Order now and appreciate the beauty of nature </div>
            </div>
            <div className='flex justify-center flex-wrap mt-6 '  >
                <div className='m-auto text-center w-[350px] ' >
                    <div className='m-auto flex justify-center ' > <img className='h-[70px] w-[70px] '  src={'/plantimg.png'} ></img> </div>
                    <div className='font-bold text-lg mt-2 ' > Large Assortment </div>
                    <div className='text-slate-600 text-sm mt-2 px-4 text-center' > We offer many different types of products with fewer variations in each category  </div>
                </div>
                <div className='m-auto text-center w-[350px]' >
                    <div className='m-auto flex justify-center ' ><img className='h-[70px] w-[70px] ' src={'/box1.png'} ></img></div>
                    <div className='font-bold text-lg mt-2 ' > Fast and Free Shipping  </div>
                    <div className='text-slate-600 text-sm mt-2 px-4 text-center' > 4-day or less delivery time, free shipping and an expedited delivery option. </div>
                </div>
                <div className='m-auto text-center w-[350px]' >
                    <div className='m-auto flex justify-center ' ><img className='h-[70px] w-[70px] ' src={'/call.png'} ></img></div>
                    <div className='font-bold text-lg mt-2 ' > 24/7 Support </div>
                    <div className='text-slate-600 text-sm mt-2 px-4 text-center' >  answers to any business related inquiry 24/7 and in real-time </div> 
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Section3
import React from 'react'

const Section4 = () => {
  return (
    <div className='min-h-[350px] text-black bg-[#C1DCDC] flex  flex-col sm:flex-row justify-between md:flex-row ' >
        <div className='flex flex-col gap-4 m-4 ml-8 justify-start md:text-left text-center md:justify-normal ' >
            <div className='font-[Quella] font-bold text-lg mt-8' >GREENMIND</div>
            <div className='text-sm'>We help you find <br></br> your dream plant</div>
            <div className='flex gap-4  md:justify-normal justify-center text-left  ' > 
                <div><img className='w-[30px]' src="/gg_facebook.png" alt="" /></div>
                <div><img className='w-[30px]' src="/ri_instagram-fill.png" alt="" /></div>
                <div><img className='w-[30px]' src="/Group13.png" alt="" /></div>
            </div>
            <div className='md:mt-16 text-sm' > 2023 all Right Reserved Term of use GreenMind </div>
        </div>
        <div className='flex  justify-center gap-14 m-8 ' >
            <div className='flex flex-col gap-5 mt-6  ' > 
                <div> <b>Information</b> </div>
                <div>About</div>
                <div>Product</div>
                <div>Blog</div>
            </div>
            <div className='flex flex-col gap-5 mt-6' >
                <div> <b> Company</b></div>
                <div>Community</div>
                <div>Career</div>
                <div>Our Story</div>
            </div>
            <div className='flex flex-col gap-5 mt-6' >
                <div> <b> Contact</b></div>
                <div>Getting Started</div>
                <div>Pricing</div>
                <div>Resources</div>
            </div>
        </div>
    </div>
  )
}

export default Section4
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='text-2xl text-center m-2 mt-8' > Your Order has been placed! </div>
        <div className='text-xl  text-center m-2'> Thank you for your purchase </div>
        <div className='flex gap-2 justify-center mt-8 ' >
            <div >
                <button className='bg-primary p-2 rounded-md' > <Link href={'/products'}>
                Explore More
                </Link> </button>
            </div>
            <div>
                <Link href={'/orders'} >
                <button className='bg-primary p-2 rounded-md' > View My Orders</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default page
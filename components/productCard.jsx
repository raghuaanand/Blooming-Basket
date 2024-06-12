'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactStars from 'react-rating-star-with-type'

const ProductCard = ({ img, name, price, plant }) => {
    const navigate = useRouter()
    const [rating, setRating] = useState(plant.rating)
    console.log(plant._id)
    const onClickHandler = () => {
        navigate.push(`/plant/${plant._id}`)
    }
    return (
        <div className=' border border-slate-600 border-opacity-40 rounded-md w-[330px] m-2  p-2 cursor-pointer ' onClick={onClickHandler} >
            <div>
                <img className='lg:w-[279px] h-[330px] m-auto '
                    src={img}
                >
                </img>
            </div>
            <div className='font-bold p-3 pt-4 ' >
                {name}
            </div>
            <div className='flex flex-col h-auto pl-3 pb-2 ' >
                <ReactStars
                    value={rating}
                    isEdit={true}
                    activeColor={'#FED900'}
                    size={17}
                />
            </div>
            <div className='text-muted-foreground pl-3 '  >
                ₹{price}
            </div>
        </div>
    )
}

export default ProductCard
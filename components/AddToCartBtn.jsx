'use client'
import { Minus, Plus } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { CartItem } from './atoms/userAuth'
import { toast, useToast } from './ui/use-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ReactStars from 'react-rating-star-with-type'
import jwt from 'jsonwebtoken'  

const addToCartBtn = ({data,productID}) => {
    const  {toast}= useToast()
    const navigate = useRouter()
    const [counter, setcounter] = useState(1)
    const [ cartInfo , setCartInfo ] = useRecoilState(CartItem)
    const cartItems = {
        id:data._id,
        name:data.name,
        img:data.Img,
        price:data.price,
        qty:counter
        
    }
    let existingCartItems

    if (typeof window !== 'undefined') {
         existingCartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
        
    }
    const cartItemHandler = ()=>{
        if(existingCartItems.length===0){
            toast({ 
                className:"bg-primary text-black ",
                description:"Added to Cart"
            })
            existingCartItems.push(cartItems)
            localStorage.setItem("cartItem",JSON.stringify(existingCartItems))
            setCartInfo(existingCartItems)
        } else {
            const cartCheck = existingCartItems.filter((item)=>item.id!==cartItems.id)
            cartCheck.push(cartItems)
            localStorage.setItem("cartItem",JSON.stringify(cartCheck))
            toast({
                className:"bg-primary text-black  ",
                description:"Added to Cart"
            })
            setCartInfo(cartCheck)
        }   
    }

    
    const [name, setname] = useState('user')
    const [comment ,setComment] = useState('')
    const [rating, setratings] = useState(0)
    const productReviews = {
        name,
        comment,
        rating,
        user:'658c428f342fcc4638cf8915'
    }
    const handleRating = (rate) => {
        setratings(rate)
      }
    const reviewHandler= async()=>{
        if(name===null){
            return toast({
                description:"Please log in to add reviews",
                variant:"custom"
            })
        }
        if(comment.length>256){
            return toast({
                description:"Word Limit exceeded, please write review in less than 256 characters",
                varirant:"destructive"
            })
        }

        const { data:data3} = await axios.post('/api/addReview',{
            id:productID ,reviews:productReviews
        })
        data3.success ===true? 
        (toast({
            description:"Review Added Successfully",
            variant:"custom"
        }),
       window.location.href=`/plant/${productID}`) : 
       (
        toast({
            description:"Failed to Add Review",
            variant:"destructive"
        })
       )
    }
    
        useEffect(()=>{
        const encryptedData = localStorage.getItem('userProfileStatus') 
        if(encryptedData===null || encryptedData===undefined){
            return setname(null)
        }
        const decoded =  jwt.decode(encryptedData,process.env.SECRET_KEY)
        const userID = decoded.user.name
        setname(userID)
        },[cartItemHandler,reviewHandler,name])



  return (
    <Fragment>
    <div className='flex flex-col gap-12 ' style={{userSelect:"none"}}   >
    <div className='flex' >
        <div className='cursor-pointer' onClick={()=>{if(counter>1){setcounter(counter - 1)}}} >
            <Minus/>
        </div>
        <div className='px-5 font-bold disabled: ' >
            {counter}
        </div>
        {/* add condition to compare stock w counter */}
        <div className='cursor-pointer' onClick={()=>{setcounter(counter + 1)}} >
        <Plus/>
        </div>
    </div>
    <div  className='text-md h-[10px] flex  gap-4' >
        <div>
        <button className='bg-primary py-2 px-4 rounded-sm '  onClick={cartItemHandler}  > Add to Cart </button>
        </div>
         <div>
        <Dialog>
            <DialogTrigger>
            <button className='bg-primary py-2 px-4 rounded-sm '  >
                    Add a review
            </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add a Review</DialogTitle>
                {/* limit chars to 311 */}
                <DialogDescription>
                     <div className='flex-col m-auto' >
                        <div>
                          <Rating SVGclassName={'inline-block'} size={20} allowFraction={true} initialValue={rating}  onClick={handleRating} />
                        </div>
                        <div><textarea className='h-[140px] mt-2 w-[100%] p-2' onChange={(e)=>setComment(e.target.value)} placeholder='Add a Review' name="review" style={{resize: "none"}}id="" cols="10" rows="10">
                        </textarea></div>
                        <div>
                        <button className='bg-primary py-2 px-4 rounded-sm text-black ' onClick={reviewHandler}  > Submit Review </button>
                        </div>
                     </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
      
    </div>
     </div>
    </div>
          <div className=' min-w-[300px] p-3 pt-12  border-slate-600 border-opacity-50 border mt-12 flex justify-center ' >
              {
                  data.reviews.length === 0 ?
                      (<div className='flex justify-center items-center mb-4' >
                          <b>  No Reviews Yet</b>
                      </div>) :
            <Carousel className='w-[100%] min-h-[30vh] ' >
                <CarouselContent className='h-[100%]' >
                     {data.reviews.map((rev) => (
                <CarouselItem className='h-[100%] ' >
                        <div className='text-center mb-4 '  >
                            <div><b>{rev.name}</b></div>
                            <div>
                            <ReactStars 
                                value={rev.rating ?? 0}  
                                isEdit={true}  
                                activeColor={'#FED900'}
                                size={17}
                                />
                            </div>
                        </div>
                        <div className='text-center mb-4'>{rev.comment}
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
              }

          </div>
      </Fragment>

  )
}

export default addToCartBtn
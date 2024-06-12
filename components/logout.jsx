"use client"
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ToggleMode, UserEmail, UserProfile, userAuth } from './atoms/userAuth'
import { getCookie } from 'cookies-next'
import { CarTaxiFront, Menu, Moon, ShoppingCart, Sun, SunMedium, SunMoon, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import jwt from 'jsonwebtoken'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios, { Axios } from 'axios'
import { useRouter } from 'next/navigation'
import { CartItem } from './atoms/userAuth'
import { ScrollArea } from './ui/scroll-area'
import { loadStripe } from '@stripe/stripe-js'
import { paymentSetup } from '@/components/payment/stripe'
import { url } from '@/lib/url'


const logout = () => {
  const navigate = useRouter()
  const {toast} = useToast()
  const [ userEmail, setUserEmail ] = useRecoilState(UserProfile)
  const [ userLogin, setuserLogin ] = useRecoilState(userAuth)
  const [ loading, setLoading ] = useState(true)
  const [toggle, setToggle] = useRecoilState(ToggleMode) 
  const [ cartInfo , setCartInfo ] = useRecoilState(CartItem)
  
  const proceedToOrder = async(e) => {
    navigate.push('/shippingDetails')
    sessionStorage?.setItem('OrdersubTotal',totalCartAmount)
    sessionStorage?.setItem('OrderTotal',grosstotalAmount)
    sessionStorage?.setItem('OrderTax',tax)
    sessionStorage?.setItem('DeliveryCharge',deliveryCharges)
  }
  

  const SignOutHandler = async()=>{
       try {
        const { data } = await axios.delete(` /api/logout`) 
        if(data.success){
          setuserLogin(false)
          toast({
            description: "Successfully signed out!",
            variant:"custom"
          })
          navigate.push('/')
        }
       } catch (error) {
        error && console.log(error)
        setuserLogin(true)
         toast({
          variant: "destructive",
          description: `${error.response?.data?.message || "An error occurred during logout."}`,
        })
       }
     }
  
    const token = getCookie('token')
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    let CART_ITEMS
    let totalCartAmount
    let grosstotalAmount
    let tax
    let deliveryCharges 
    
    if (typeof window !== 'undefined') {
      CART_ITEMS = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : null   
       totalCartAmount = CART_ITEMS?.reduce((counter,item)=>
       counter + item.price * item.qty,0
      )
      // console.log(totalCartAmount,"total")
    }
    tax = totalCartAmount*10/100
    if(totalCartAmount < 999 ){
      deliveryCharges = 199
    } else {
      deliveryCharges= 0
    }
    {totalCartAmount < 999 ? grosstotalAmount = totalCartAmount + deliveryCharges  + tax :grosstotalAmount = totalCartAmount + tax}
     const removeItemHandler = (id)=>{
      const filteredArray =  CART_ITEMS.filter((item)=>item.id !== id)
      localStorage.setItem('cartItem',JSON.stringify(filteredArray))
      setCartInfo(filteredArray)
    }
     
   if( CART_ITEMS?.length === 0 ){
    sessionStorage.clear()
   } 
   const user = useRecoilValue(UserProfile)
    const decode = jwt.decode(user,process.env.SECRET_KEY)


    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    useEffect(()=>{
      if(token){
        setLoading(false)
        setuserLogin(true)
        const userEmailset = localStorage.getItem('userProfileStatus')
        setUserEmail(userEmailset)
      }else {
        setLoading(false)
        setuserLogin(false)
        localStorage.removeItem('userProfileStatus')
        setUserEmail('')
      }
      setMounted(true)
    },[userAuth ,toggle,theme , userLogin,token,CartItem ])

    if(!mounted){
      return null
    }
  return (
    <Fragment>
      <div className='sm:flex gap-7 p-3 md:mr-5 '>
            <div className='sm:flex sm:gap-7 pt-4  hidden ' >
               <div>
               <Sheet>      
                <SheetTrigger><ShoppingCart strokeWidth={1}  /></SheetTrigger>
                    <SheetContent className='w-[500px] sm:max-w-none ' >
               <ScrollArea className="h-[85vh]  rounded-md  p-4 border border-solid border-[rgba(0, 0, 0, 0.5)]">
                  <SheetHeader>
                    <SheetTitle className='flex text-center justify-center gap-3'><ShoppingCart size={25} />CART</SheetTitle>
                    <SheetDescription >
                      {
                        CART_ITEMS?.map((item)=>(
                         <div className='flex gap-2 my-4 border-4 justify-evenly ' key={item._id} >
                           <div className='w-[60px] h-[65px] '> <img className='w-[60px] h-[65px] ' src={item.img[0].url} /> </div>
                           <div className='pt-5' > {item.name} </div>
                           <div className='pt-5' >  ₹{item.price} </div> 
                           <div className='pt-5' > X </div> 
                           <div className='pt-5' > {item.qty} </div>
                           <div className='pt-5' > = </div>
                           <div className='pt-5' >  ₹{item.qty * item.price} </div>
                           <div className='pt-5 cursor-pointer ' onClick={()=>removeItemHandler(item.id)} >  <Trash2 size={24} color="#f22121" strokeWidth={1.25} /> </div>
                         </div>
                        ))
                      }

                        <div className='flex w-[100%] font-bold '  >
                        {
                          CART_ITEMS?.length === 0 || !CART_ITEMS ?
                          (
                            <div className='text-2xl mt-5 ml-16  ' >
                              Your Cart Is Empty!
                            </div>
                          ) : (
                          <div className=' w-[100%]' >
                              <div> Total Products : {CART_ITEMS?.length} </div> 
                            <div className='flex justify-between gap-5 '  >
                            <div>SUBTOTAL </div>
                              <div className='text-black' >  <b>₹{totalCartAmount}</b>  </div>
                            </div>
                            <div>
                                  <div className='flex justify-between gap-5 ' >
                                    <div>
                                      Shipping Charges
                                    </div>
                                    <div className='text-black' >
                                      {deliveryCharges}
                                    </div>
                                  </div>                              
                             </div>
                             <div className='flex justify-between gap-5 '  >
                            <div>Tax </div>
                              <div className='text-black' >  <b>₹{tax}</b>  </div>
                            </div>
                             <div className='flex justify-between gap-5 '  >
                            <div>SUBTOTAL </div>
                              <div className='text-black' >  <b>₹{grosstotalAmount}</b>  </div>
                            </div>
                          </div>
                          )
                        }
                        </div>
                        {
                          CART_ITEMS?.length === 0  ?
                          null : 
                          (
                        <div className='flex justify-center mt-6 ' >
                          {/* <Link href={'/shippingDetails'}>  */}
                          <button className='bg-primary px-8 py-4 text-black' onClick={proceedToOrder} > PROCEED TO CHECKOUT</button>
                          {/* </Link>  */}
                        </div>)
                        }
                    </SheetDescription>
                  </SheetHeader>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
              </div>
              <div>
              {
                theme==='light' ? 
                <Sun onClick={()=>{
                  setTheme("dark")
                  setToggle((prev)=>!prev)
                }
              } size={24} color="#000000" strokeWidth={1.5} absoluteStrokeWidth cursor={'pointer'} /> 
                :
                <Moon onClick={()=>{
                  setTheme("light")
                  setToggle((prev)=>!prev)
              }} size={24} color="#ffffff" strokeWidth={1.5} absoluteStrokeWidth cursor={'pointer'} /> 
             
             }
              </div>
           </div>
            <div className='sm:hidden flex gap-2 justify-center p-3 ' >            
              <div>
            {
              theme==='light' ? 
                <Sun onClick={()=>{
                  setTheme("dark")
                  setToggle((prev)=>!prev)
                }
              } size={24} color="#000000" strokeWidth={1.5} absoluteStrokeWidth cursor={'pointer'} /> 
                :
                <Moon onClick={()=>{
                  setTheme("light")
                  setToggle((prev)=>!prev)
              }} size={24} color="#ffffff" strokeWidth={1.5} absoluteStrokeWidth cursor={'pointer'} /> 
            }
            </div>
            {/* PHONE MENU STARTS FROM HERE */}
            <Sheet>
                <SheetTrigger> <Menu strokeWidth={1.75} /></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle> <img src='/GREENMIND.png'className='md:min-w-[132px] md:min-h-[27px] sm:min-w-[100px] sm:min-h-[23px]  min-w-[90px] min-h-[18px] m-auto ' ></img> </SheetTitle>
                    <SheetDescription  >
                      <div className='flex flex-col m-auto gap-8 items-center justify-center mt-7' >
                     <div> <Link href='/' >Home</Link></div>
                     <div> <Link href='/products' >Products</Link></div>
                     <div> <Link href='/contacts' >Contact</Link></div>
                     <div> 
                          <div>
                          <Sheet>     
                <SheetTrigger><ShoppingCart strokeWidth={1}  /></SheetTrigger>
                    <SheetContent className='w-[100vw] sm:max-w-none ' >
               <ScrollArea className="h-[85vh]  rounded-md  p-4 border border-solid border-[rgba(0, 0, 0, 0.5)]">
                  <SheetHeader>
                    <SheetTitle className='flex text-center justify-center gap-3'><ShoppingCart size={25} />CART</SheetTitle>
                    <SheetDescription >
                      {
                        CART_ITEMS?.map((item)=>(
                         <div className='flex gap-2 my-4 border-4 justify-evenly ' key={item._id} >
                           <div className='w-[60px] h-[65px] '> <img className='w-[60px] h-[65px] ' src={item.img[0].url} /> </div>
                           <div className='pt-5' > {item.name} </div>
                           <div className='pt-5' >  ₹{item.price} </div> 
                           <div className='pt-5' > X </div> 
                           <div className='pt-5' > {item.qty} </div>
                           <div className='pt-5' > = </div>
                           <div className='pt-5' >  ₹{item.qty * item.price} </div>
                           <div className='pt-5 cursor-pointer ' onClick={()=>removeItemHandler(item.id)} >  <Trash2 size={24} color="#f22121" strokeWidth={1.25} /> </div>
                         </div>
                        ))
                      }

                        <div className='flex w-[100%] font-bold '  >
                        {
                          CART_ITEMS?.length === 0  ?
                          (
                            <div className='text-2xl mt-5 ml-16  ' >
                              Your Cart Is Empty!
                            </div>
                          ) : (
                          <div className=' w-[100%]' >
                              <div> Total Products : {CART_ITEMS?.length} </div> 
                            <div className='flex justify-between gap-5 '  >
                            <div>SUBTOTAL </div>
                              <div className='text-black' >  <b>₹{totalCartAmount}</b>  </div>
                            </div>
                            <div>
                                  <div className='flex justify-between gap-5 ' >
                                    <div>
                                      Shipping Charges
                                    </div>
                                    <div className='text-black' >
                                      {deliveryCharges}
                                    </div>
                                  </div>                              
                             </div>
                             <div className='flex justify-between gap-5 '  >
                            <div>Tax </div>
                              <div className='text-black' >  <b>₹{tax}</b>  </div>
                            </div>
                             <div className='flex justify-between gap-5 '  >
                            <div>SUBTOTAL </div>
                              <div className='text-black' >  <b>₹{grosstotalAmount}</b>  </div>
                            </div>
                          </div>
                          )
                        }
                        </div>
                        {
                          CART_ITEMS?.length === 0  ?
                          null : 
                          (
                        <div className='flex justify-center mt-6 ' >
                          {/* <Link href={'/shippingDetails'}>  */}
                          <button className='bg-primary px-8 py-4 text-black' onClick={proceedToOrder} > PROCEED TO CHECKOUT</button>
                          {/* </Link>  */}
                        </div>)
                        }
                    </SheetDescription>
                  </SheetHeader>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
                          </div>
                      </div>
                     <Suspense fallback="...loading" >
                     {decode?.user?.admin=="true" ?
                       <>
                       <Link href={'/dashboard'} > Dashboard </Link> <DropdownMenuSeparator /> 
                      </>
                      :
                      null
                      }
                     </Suspense>
                      {
                      userLogin ? 
                      <div className='flex flex-col gap-14 items-center justify-center' >
                       <div> <Link href='/profile' >Profile</Link></div>                        
                       <div>
                        <Link href='#' onClick={SignOutHandler} >Sign out</Link>
                      </div>                        
                        </div>
                      : (
                        <div >
                        <Link href='/userAuth' > Log In</Link>                 
                          </div>
                      )
                      }
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
            </Sheet>
            </div>
          {
            loading ? null
           : (
          
             <div className='sm:flex  hidden' >
           {
            userLogin ? 
             ( <DropdownMenu >
              <DropdownMenuTrigger>
                 <Avatar className='w-[25px] h-[25px] mt-2 '>
                <AvatarImage  src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href='/profile' className='cursor-pointer' > <DropdownMenuItem className='cursor-pointer' > Profile</DropdownMenuItem></Link>
                    <DropdownMenuSeparator />
                    
                    {decode?.user?.admin=="true" ?
                    <>
                     <Link href={'/dashboard'} > <DropdownMenuItem className='cursor-pointer' > Dashboard</DropdownMenuItem></Link> <DropdownMenuSeparator /> 
                    </>
                    : null  }
                    <Link href='/orders' ><DropdownMenuItem className='cursor-pointer' > Orders</DropdownMenuItem></Link>
                    <DropdownMenuSeparator />
                    <Link href='#' className='cursor-pointer' onClick={SignOutHandler} ><DropdownMenuItem className='cursor-pointer' >Sign Out</DropdownMenuItem></Link>
                </DropdownMenuContent>
            </DropdownMenu>
            )
             : (
               <div>
               <Link href='/userAuth' > <Avatar  className='w-[25px] h-[25px] mt-4 ' >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback> {null} </AvatarFallback>
              </Avatar>
              </Link> 
               
                </div>
             )
            }
            </div>        
            )
          }
        </div> 
    </Fragment>
       )
      }

export default logout
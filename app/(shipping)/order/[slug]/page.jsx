import React, { Fragment } from 'react'
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { url } from '@/lib/url'
import { Item } from '@radix-ui/react-radio-group'
import Link from 'next/link'
import connectingDB from '@/database/database'
import { Order } from '@/Models/OrderModels'


const OrderDetails = async({params}) => { 
    const userOrders = await getData(params.slug)
    console.log(userOrders.createdAt.toString())
  return (
    <div className='flex flex-col sm:flex-row gap-2' >
            <div className='m-4 w-[20%] ' >
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Your Order Details</h4>
                <p className="text-sm text-muted-foreground">
                    Manage your orders
                </p>
            </div>
            <Separator className="my-4" />
            <div className='text-sm' > <Link href={'/orders'}>Back</Link> </div>
             <Separator orientation="vertical" />
            </div>
            <div className=' w-[80%]' >
             <div className='' >
                <div className='' >
                <Card 
                className=" border-none"
                >
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                            <CardDescription>Manage and Track your Order</CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                       {
                        userOrders?.OrderItems.map((prod)=>(
                    <Fragment  >
                    <div className='flex flex-col lg:flex-row justify-evenly m-2 min-w-[150px] sm:min-w-[400px] lg:min-w-[681px] border-slate-600 border-[0.5px] w-[100%] rounded-md '>
                        <div className=' p-2 m-2 inline-block' >             
                            <div className="grid w-full items-center gap-4">                     
                                <Fragment >
                                <div>
                                <div className="flex flex-col space-y-1.5 min-w-[200px]">
                                    <Label htmlFor="name" className='text-md'>{prod.name} </Label>
                                    <Label htmlFor="name">{prod.TotalAmount}</Label>
                                    <Label htmlFor="name"> Quantity : {prod.quantity} </Label>
                                    <div> <img className='w-[200px] ml-5' src={prod.image} alt="" /> </div>
                                </div>
                            </div>
                            </Fragment>
                            
                            <div>
                                Total Amount : {userOrders?.TotalAmount}
                            </div>
                        </div>
                        <Separator className="my-4" />     
                        </div>
                          <Separator orientation="vertical" />
                                <div className='' >
                                    <Card className="max-w-[500px] border-none">
                                            <CardHeader>
                                                <CardTitle>Shipping Info</CardTitle>
                                                <CardDescription>Check your shipping Info</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                        <form>

                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <div >
                                            <Label htmlFor="name"> <b>Address :</b> { userOrders?.shippingDetails.address }</Label> <br></br>
                                            <Label htmlFor="name"><b> City:</b>{ userOrders?.shippingDetails.city }</Label> <br></br>
                                            <Label htmlFor="name"> <b>Pincode : </b> { userOrders?.shippingDetails.pincode }</Label> <br></br>
                                            <Label htmlFor="name"><b> Phone Number :</b> { userOrders?.shippingDetails.phoneno }</Label>
                                            <br></br>
                                            <br></br>

                                        </div>
                                <Label  htmlFor="name"><b> Order Date :</b> {userOrders.createdAt.toLocaleString()}</Label>
                                    </div>
                                        </div>
                                        </form>
                                    </CardContent>
                                    </Card>
                                </div>     
                        </div>
                    </Fragment>                              
                        ))
                    }
                </CardContent>
                </Card>
             </div>
            </div>
             </div>
             </div>
  )
}

export default OrderDetails

async function getData(params){
    await connectingDB() 
    const userOrders = await Order.findById(params);

    return userOrders
}
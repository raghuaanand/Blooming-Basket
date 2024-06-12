import Link from 'next/link'
import React, { Fragment } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
const Sidebar = () => {
  return (
  <Fragment>
      <div className='w-[20%] hidden sm:block border-[50%] border-slate-600 h-[100vh]' >
        <div  className='font-bold m-2 px-[1.7]' > <Link href={'/dashboard'} >Dashboard</Link> </div>
        <hr></hr>
        <div className='px-2' >
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger> Products</AccordionTrigger>
                <AccordionContent>
                <Link href={'/adminProducts'} >All Products</Link>
                </AccordionContent>
                <AccordionContent>
                <Link href={'/createProduct'} >Create Product</Link>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        <div className='px-2' >
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger> User</AccordionTrigger>
                <AccordionContent>
                <Link href={'/adminUsers'} >All Users</Link>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        <div className='px-2'  >
        <Accordion type="single" collapsible className='my-2'>
            <AccordionItem value="item-1">
            <AccordionTrigger> Orders</AccordionTrigger>
            <AccordionContent>
                <Link href={'/adminOrders'} >Orders</Link>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </div>
        </div>
    </Fragment>
  )
}

export default Sidebar
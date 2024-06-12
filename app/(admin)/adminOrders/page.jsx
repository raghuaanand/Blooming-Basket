'use client'
import axios from "axios";
import { columns } from "./column";
import { url } from "@/lib/url";
const { DataTable } = require("./data-table");
import jwt from 'jsonwebtoken'
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Loader2, LoaderIcon } from "lucide-react";
import Loading from "@/app/loading";
import Sidebar from "@/components/Sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRecoilValue } from "recoil";
import { UserProfile } from "@/components/atoms/userAuth";

export default function DemoPage() {
  const [data, setData] = useState()
  const [encodedID, setencodedID] = useState('')

  const encoded = useRecoilValue(UserProfile)
  const user = jwt.decode(encoded,process.env.SECRET_KEY)
  
  if(user?.user?.admin === "false"){
    window.location.href = '/'
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEncodedID = localStorage.getItem('userProfileStatus');
      setencodedID(storedEncodedID);
    }
    const ID = jwt.decode(encodedID, process.env.SECRET_KEY)
    if(encodedID !== ''){
      fetchData(ID)
    }
    if(user?.user?.admin === "false"){
      window.location.href = '/'
    }
  
  }, [encodedID]);

  // console.log(encodedID)
  const fetchData = async (ID)=>{
    const { data } = await axios.get(` /api/getAllOrders`)
    const structuredData = data.data.map((order)=>(
      {
        id:order._id,
        Items:order.OrderItems.length,
        UserID:order.user,
        Order_date: new Date(order.createdAt).toLocaleDateString(),
        TotalAmount:order.TotalAmount
      }
    ))
    setData(structuredData)
  }


  return (
    
      !data ? 
      <Loading/>
       :  
      <Fragment>
      <div className='flex flex-col sm:flex-row' >
       <div className='sm:hidden  ' >
              <Sheet >
                <SheetTrigger >
                <Menu /> 
                </SheetTrigger>
                <SheetContent side={'left'}>  
                <SheetHeader>

                <SheetDescription>
                        <div className='w-[100%]  border-[50%] border-slate-600 h-[100vh]' >
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
                  </SheetDescription>     
                </SheetHeader>
                    <SheetClose >
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetContent>
              </Sheet>
           </div>
            <Sidebar />
             <div className='w-[100%] mt-10 border border-black h-[100vh] ' >
               <DataTable columns={columns} data={data ?? "No Orders Found"} />
              </div>
        </div> 
    </Fragment>

        );
};

'use client'
import axios from "axios";
import { columns } from "./column";
import { url } from "@/lib/url";
const { DataTable } = require("./data-table");
import jwt from 'jsonwebtoken'
import { useEffect } from "react";
import { useState } from "react";
import { Loader2, LoaderIcon } from "lucide-react";
import Loading from "@/app/loading";

export default function DemoPage() {
  const [data, setData] = useState()
  const [encodedID, setencodedID] = useState('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEncodedID = localStorage.getItem('userProfileStatus');
      setencodedID(storedEncodedID);
    }
    const ID = jwt.decode(encodedID, process.env.SECRET_KEY)
    if(encodedID !== ''){
      fetchData(ID)
    }
    console.log(ID)
  }, [encodedID]);

  // console.log(encodedID)
  const fetchData = async (ID)=>{
    const { data } = await axios.post(` /api/getOrder`,{
      ID:ID?.user?._id
    })
    const structuredData = data.userOrders.map((order)=>(
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
    <div className="container mx-auto py-10">
      {
        data ? 
        <DataTable columns={columns} data={data ?? "loading..." } />     
        :
        <div>
          <Loading/>
        </div>
      }

    </div>
  );
};

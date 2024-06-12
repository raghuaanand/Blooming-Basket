 'use client'

import { ArrowUpRightSquare } from "lucide-react";
import Link from "next/link";

 export  const columns = [
            {
        accessorKey:"id",
        header:'id'
            },
            {
        accessorKey:"name",
        header:'name'
            },
            {
        accessorKey:"stock",
        header:'stock'
            },
            {
        accessorKey:"rating",
        header:'rating'
            },
            {
        accessorKey:"category",
        header:'category'
            },
        {
          accessorKey: "price",
          header: () => <div className="text-right">price</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("Inr", {
              style: "currency",
              currency: "Inr",
            }).format(amount);
      
            return <div className="text-right font-medium">{formatted}</div>;
          },
        },
        {
          accessorKey:"Manage",
          header:'Manage',
          cell:({row})=>{
              const productID = row.getValue("id");
              return <div> <Link href={`/adminProduct/${productID}`}> <ArrowUpRightSquare /> </Link> </div>
              }
         },   
         
      ];

  
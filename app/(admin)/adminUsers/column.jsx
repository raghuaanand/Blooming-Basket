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
        accessorKey:"email",
        header:'email'
            },
            {
        accessorKey:"admin",
        header:'admin'
            },         
            {
        accessorKey:"Manage",
        header:'Manage',
        cell:({row})=>{
            const userID = row.getValue("id");
            return <div> <Link href={`/adminUser/${userID}`}> <ArrowUpRightSquare /> </Link> </div>
        }
            },         
      ];

  
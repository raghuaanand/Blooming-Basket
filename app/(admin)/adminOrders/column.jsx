 'use client'
import Link from "next/link";
 export  const columns = [
            {
        accessorKey:"id",
        header:'Order Id',
        cell:({row})=>{
          const UserID = row.getValue("UserID");
          return <div className="" > <Link href={`/adminOrder/${UserID}`}> {UserID} </Link> </div>
           }
            },
            {
        accessorKey:"Items",
        header:'Items'
            },
            { 
        accessorKey:"UserID",
        header:'UserID',
        cell:({row})=>{
          const UserID = row.getValue("UserID"); 
          const orderID = row.getValue("id"); 
          return <div className="" > <Link href={`/adminOrder/${UserID}`}> {UserID} </Link> </div>
           }
            },
            { 
        accessorKey:"Order_date",
        header:'Order date'
            },
        {
          accessorKey: "TotalAmount",
          header: () => <div className="text-right">TotalAmount</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TotalAmount"));
            const formatted = new Intl.NumberFormat("Inr", {
              style: "currency",
              currency: "Inr",
            }).format(amount);
      
            return <div className="text-right font-medium">{formatted}</div>;
          },
        },
      ];

  
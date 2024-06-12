import React from 'react'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

const notfound = () => {
  return (
    <SeparatorDemo />
  )
}

export function SeparatorDemo() {
    return (
        <div className='flex items-center justify-center h-screen  ' >
      <div className=' text-center relative text-primary '>
            <div className="space-y-1  "> 
            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground ">
                Page Not Found
            </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm ">
            <div>404</div>
            <Separator orientation="vertical" /> 
            <div>Error</div>
            <Separator orientation="vertical" /> 
            <div className=' underline ' > <Link href={'/'} > Back to Home </Link> </div>
            </div>
        </div>
    </div>
    )
  }

export default notfound
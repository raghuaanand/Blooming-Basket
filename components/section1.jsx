import React, { Fragment }  from 'react'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const section1 = () => {
  return (
            <Fragment> 
            <div className='w-[85vw] min-h-[512px] bg-cyan m-auto rounded-3xl flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row  gap-0 justify-around ' >
        <div  >
        <div className=' m-auto my-5 md:w-auto  md:p-6  md:ml-10 mt-4 w-[300px]' >
                    <h1 className='scroll-m-20 sm:text-4xl  text-3xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-black  ' >
                        Buy your <br/> Dream Plants
                    </h1>
                </div>
                <div className='flex text-black gap-4 md:m-3  md:ml-12 w-[300px] m-auto my-5  md:w-auto ' >
                    <div className='ml-2' >
                        <div>
                            <h1 className='scroll-m-20 sm:text-2xl  font-extrabold tracking-tight lg:text-3xl' >
                                50 +
                            </h1>
                        </div>
                        <div>
                        <h2 className='scroll-m-20 sm:text-xl font-extrabold tracking-tight lg:text-2xl' >
                                Plant Species
                            </h2>
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            <h1 className='scroll-m-20 sm:text-2xl font-extrabold tracking-tight lg:text-3xl' >
                                100 +
                            </h1>
                            </div>
                        <div>
                            <h2 className='scroll-m-20 sm:text-xl font-extrabold tracking-tight lg:text-2xl' >
                            Customers
                            </h2>
                        </div>
                    </div>
                </div>
                <div className='w-[70vw]  md:w-[30vw] flex gap-0  mt-12 md:ml-12 ml-8  '>
                    <div className='w-[100%]  p-[0.15rem] '>
                    <Input className='p-[0.25rem]' readOnly={true} ></Input>
                    </div>
                    <span className='bg-primary w-[15%] pt-2.5 rounded-lg p-1 ' >
                    <Search size={21} className='m-auto glex  items-center'  color='#000000' ></Search>
                    </span>
                </div>
        </div>
        <div className=' w-[280px] sm:min-w-[470px] sm:min-h-[400px] md:max-w-[600px] md:max-h-[600px] 
            lg:min-h-[420px]  lg:min-w-[500px] xl:min-w-[580px]  xl:min-h-[470px] sm-auto' >
            <img 
            className='  w-[280px] sm:min-w-[470px] sm:min-h-[400px] md:max-w-[600px] md:max-h-[600px] 
            lg:min-h-[420px]   lg:min-w-[500px] xl:min-w-[580px]  xl:min-h-[470px] items-center  flex
            md:mt-0
            '
            src='/pot-img.png'        
            />
            
        </div>
            </div>
        </Fragment>
  )
}

export default section1
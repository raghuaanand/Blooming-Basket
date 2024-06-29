import React, { Fragment } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import connectingDB from '@/database/database'
import productModels from '@/Models/productModels'
import { unstable_noStore as noStore } from 'next/cache'

async function fetchRandomPlants() {
  await connectingDB()
  const product = await productModels.aggregate([
    { $sample: { size: 5 } }
  ])
  return product
}


const Section2 = async () => {
  const data = await fetchRandomPlants()
  noStore()
  return (
    <Fragment>
      <div className='w-[85%]  m-auto mb-5 flex-col  md:flex md:flex-row'  >

      
        <div className='lg:w-[40%] flex flex-col w-[300px] m-auto md:m-0 p-8 pr-0 gap-8 ' >
          <div>
            <TypographyH3 />
          </div>
          <div className='' >
            <p className='text-muted-foreground w-[250px] ' >
              Eat mangoes and let the good vibes flow.
            </p>
          </div>
          <div className='flex bg-yellow-300 rounded-lg w-[130px] p-3 gap-1 justify-between ' >
            <div className='text-blue-800 font-semibold' >
              <Link href={'/products'} > See More</Link>
            </div>
            <div>
              <Link href={'/products'} ><MoveRight strokeWidth={1} color='#000000' /></Link>
            </div>
          </div>
        </div>


        <div className='
                md:w-[100vw]
                mt-4
                p-2
                max-w-[600px] 
                min-w-[200px]
                ' >
          {
            data.length === 0 ?
              <div className='m-auto text-center flex justify-center items-center ' >No Product Found</div>
              :
              <Carousel className='w-[100%] m-auto  ' >
                <CarouselContent  >
                  {
                    data?.map((item) => (
                      <Link className='basis-1/3 w-[380px] mx-4' key={item._id} href={`/plant/${item._id}`}>
                        <CarouselItem className=' border-2 rounded-md flex flex-col items-center' >
                          <img src={item.Img[0].url} className='min-w-[250px]  h-[257px]  rounded-md' alt="" />
                          <div className=' font-bold p-4 pb-2' >{item.name}</div>
                          <div className=' text-muted-foreground p-4 pt-0 text-blue-400 font-semibold'> Rs. {item.price}</div>
                        </CarouselItem>
                      </Link>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Section2

export function TypographyH3() {
  return (
    <h2 className="scroll-m-20 text-2xl md:text-2xl lg:text-3xl tracking-tight font-bold">
      Our Best <br></br> Selling Mangoes
    </h2>
  )
}
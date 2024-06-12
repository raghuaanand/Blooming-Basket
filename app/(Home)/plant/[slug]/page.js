import React, { Fragment, Suspense } from 'react'
import dynamic from 'next/dynamic'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import productModels from '@/Models/productModels'
import connectingDB from '@/database/database'

const AddToCartBtn = dynamic(()=>import("@/components/AddToCartBtn"),{
  ssr:false
})
const RatingComponent = dynamic(()=> import('@/components/ratingComponent'),{
  ssr:false
})
 
async function FetchingPlantInfo(props){
    await connectingDB()
    const plantID =  props.params.slug
    try {
      const product = await productModels.findById(plantID).lean()
      return product
    } catch (error) {
      return console.error('Error fetching plant details:', error);
    }
 }

const page = async(props) => {
    const product = await FetchingPlantInfo(props)
  return (
    <Fragment>
      <div className='flex flex-row w-screen m-auto  justify-center gap-16 flex-wrap  ' >
          <div className='h-[530px] lg:w-[420px] min-w-[300px] min-h-[290px] p-3 border border-opacity-30 border-black  '  >
            <Carousel className='h-[500px] w-[350px]   px-2 lg:w-[400px] min-w-[300px] min-h-[280px]  m-auto ' >
              <CarouselContent>
              {
              product?.Img.map((product)=>(
                <CarouselItem  key={product._id} >
                    <img className='lg:h-[370px] lg:w-[370px] min-h-[220px] min-w-[260px] max-h-[400px] max-w-[400px] m-auto' src={product.url} ></img>           
                </CarouselItem>
                      ))
                      }
                    </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                </Carousel>       
          </div>
          <div className='min-w-[300px] max-w-[500px] border border-opacity-30 border-black m-3 p-2 mb-8' >
            <div className='lg:m-12  min-w-[300px] flex flex-col gap-3 mt-20 m-auto justify-center  ' >
              <div className='lg:text-2xl md:text-xl text-lg ' > {product?.name}  </div>
              <div className=' text-muted-foreground'>{product?.desc}   
                </div>
                <div >
                <RatingComponent rating={product?.rating} />
                  </div>
              <div  className='text-xl' > ₹{product?.price}</div>
              <div>
              <AddToCartBtn data={product} productID={props.params.slug} />
              </div>
            </div>
          </div>
      </div>
    </Fragment>
  )
}

export default page
import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
const Filter = dynamic(()=>import('../../../components/filter'))
import ProductList from '@/components/productList'


 const app = async(props ) => {
  console.log(props.searchParams, "mei hu")
  return (
    <Fragment>
       <div className='w-[95vw] flex flex-col md:flex-row ml-2 '  >
       <div 
          style={{border:"solid rgba(0, 0, 0, 0.250) 1px"}}
          className='md:w-[20%]  w-[90%] m-auto sm:m-2 '
          >
          <Filter props={props.searchParams.page} category={props.searchParams.category} />
       </div>
        <div 
        className='w-[80%] m-auto '          
        >
        <ProductList params={props.searchParams.page} Category={props.searchParams.category} Price={props.searchParams.price} />      
         </div>
      </div>
    </Fragment>
  )
}
export default app

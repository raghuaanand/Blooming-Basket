import React, { Fragment} from 'react'
import ProductCard from './productCard'
import PaginationComponent from './PaginationComponent'
import axios from 'axios';
import { url } from '@/lib/url';
import connectingDB from '@/database/database';
import productModels from '@/Models/productModels';
 
async function getData(params,Category,Price) {
      await connectingDB()
      const defaultPage = params
      const category = Category
      console.log(Category,"jab marzi phet liye")
      const price = Price
      let gtAmt = 0
      let ltAmt = 0
      if(price==='999'){
          gtAmt=0
          ltAmt=999
      }
      if(price==='999-1499'){
          ltAmt=1499
          gtAmt = 999
      }
      if(Price==='1499-above'){
          gtAmt = null
          ltAmt=1499
      }
      let skip = 0
      if(defaultPage > 1 ) {
          skip = (defaultPage-1)*6
      }   
      let products;
      {
          category
              ?
              price ? 
              products = await productModels.find({ category: Category ,  price: { $lt: ltAmt , $gt:gtAmt } }).limit(6).skip(skip).lean()
              :
              products = await productModels.find({ category: Category }).limit(6).skip(skip).lean()
              :
              price ? 
              products = await productModels.find({price: { $lt: ltAmt , $gt:gtAmt } }).limit(6).skip(skip).lean()
              :
              products = await productModels.find().limit(6).skip(skip).lean()
      }
      const productLength = await productModels.countDocuments().lean()
      return { products , productLength }
 } 
 
 const ProductList = async({params,Category,Price}) => {
   const {products , productLength} = await getData(params,Category,Price); 

  return (
   <Fragment>
    <div className='flex flex-wrap w-[100%] m-auto justify-evenly  gap-0' >
      {
        products.length === 0 ?
        <div className='text-2xl grid justify-center items-center h-[500px] w-[100%] font-bold ' >
        No Products Found
        </div>
        :       
              products.map((plant)=>(
                <ProductCard key={plant._id}  img={plant?.Img[0]?.url} name={plant.name} price={plant.price} plant={plant} />       
              )
          )       
        }
     </div>
        <PaginationComponent currentPageNo={params} productList={productLength} category={Category} price={Price}  />
   </Fragment>
  )
}


export default ProductList


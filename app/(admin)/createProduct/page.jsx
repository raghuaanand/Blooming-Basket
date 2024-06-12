'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { url } from '@/lib/url'
import jwt from 'jsonwebtoken'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import Sidebar from '@/components/Sidebar'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRecoilValue } from 'recoil'
import { UserProfile } from '@/components/atoms/userAuth'

const Page = () => {
  const encoded = useRecoilValue(UserProfile)
  const user = jwt.decode(encoded,process.env.SECRET_KEY)
  if(user?.user?.admin === "false"){
    window.location.href = '/'
  }
  const {toast} = useToast()
  const navigate = useRouter()
  const [ImageArray, setImageArray] = useState([])
  const [ProductName, setProductName] = useState('')
  const [productDesc, setproductDesc] = useState('')
  const [productPrice, setproductPrice] = useState('')
  const [Category, setCategory] = useState('')
  const [Stock, setStock] = useState('')
  const [ LLoading,setLoading] = useState(false)
  let Image = []
  const handleUpload= (e)=>{
      const file =[...e.target.files] 
      if(file.length === 0 ){
        Image = []
        setImageArray(Image)
        return 
      }
      //converting it into an array and spread operator will make a shallow copy of it
      file.forEach((file)=>{
        const transFormed = new FileReader()
        if(file){
          transFormed.readAsDataURL(file)
          transFormed.onloadend = ()=>{
            Image.push(transFormed.result)
            setImageArray(Image)
          }
        }
      })
    }
    const createProductHandler = async( e)=>{
    const encrypted = localStorage.getItem('userProfileStatus')
    const user = jwt.decode(encrypted, process.env.SECRET_KEY)
    const userID = user.user._id
      e.preventDefault()
      setLoading(true)
      if(
        ProductName!=='',
        productDesc!=='',
        productPrice!=='',
        ImageArray!=='',
        Category!=='',
        Stock!==''
        ){
          const { data } = await axios.post(` /api/createProduct`,{
            name:ProductName,
            desc:productDesc,
            price:productPrice,
            Img:ImageArray,
            category:Category,
            stock:Stock,
            user:userID
          })

          if(data && data.success === true){
            setLoading(false)
            toast({
              description:"Product Created Successfully",
              variant:"custom"
            })
            // navigate.push('/adminProducts')
          }
          setLoading(false)
        } else {
          setLoading(false)
          toast({
            description:"Fill all required Details",
            variant:"custom"
          })
          
        }
    }
    useEffect(()=>{

    },[Image])
  return (
    <Fragment>
      <div className=' flex w-screen flex-col sm:flex-row' >
      <div className='sm:hidden h-[100px] w-[100px] sm:h-[auto] ' >
          <Sheet>
              <SheetTrigger >
              <Menu /> 
              </SheetTrigger>
              <SheetContent side={'left'}>  
              <SheetHeader>

              <SheetDescription>
                      <div className='w-[100%]  border-[50%] border-slate-600 h-[100vh]' >
                <div  className='font-bold m-2 px-[1.7]' > <Link href={'/dashboard'} >Dashboard</Link> </div>
                <hr></hr>
                <div className='px-2' >
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger> Products</AccordionTrigger>
                        <AccordionContent>
                        <Link href={'/adminProducts'} >All Products</Link>
                        </AccordionContent>
                        <AccordionContent>
                        <Link href={'/createProduct'} >Create Product</Link>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    </div>
                <div className='px-2' >
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger> User</AccordionTrigger>
                        <AccordionContent>
                        <Link href={'/adminUsers'} >All Users</Link>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='px-2'  >
                <Accordion type="single" collapsible className='my-2'>
                    <AccordionItem value="item-1">
                    <AccordionTrigger> Orders</AccordionTrigger>
                    <AccordionContent>
                        <Link href={'/adminOrders'} >Orders</Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
                </div>        
                </SheetDescription>     
              </SheetHeader>
                  <SheetClose >
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
              </SheetContent>
            </Sheet>
              </div>
      <Sidebar/>
      {
      LLoading ? 
      <Loading /> 
      :
      <div className='w-[80%] m-auto' >
        <Card className="w-[350px] m-auto mt-4 border border-primary rounded-md">
          <CardHeader>
            <CardTitle>Create A Product</CardTitle>
            <CardDescription>GREENMIND</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Product Name</Label>
                    <Input required={true} onChange={(e)=>setProductName(e.target.value)} value={ProductName} type="text" placeholder={'Enter Product name'} ></Input>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Product Description</Label>
                    <Textarea onChange={(e)=>setproductDesc(e.target.value)}  value={productDesc} column={20} className='resize-none h-[250px]'  type="text" placeholder={'Enter Product Description'} ></Textarea>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Product Price</Label>
                    <Input required  onChange={(e)=>setproductPrice(e.target.value)} value={productPrice} type="Number" placeholder={'Enter Product Price'} ></Input>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Product Images</Label>
                    <Input required  type="file" multiple accept="image/" onChange={handleUpload} placeholder={'Enter Product Description'} ></Input>
                    <div className='flex' >{ ImageArray.length > 0 ? ImageArray.map((image)=> <div className='flex' ><img className='h-[40px] w-[40px]' src={image} alt="" /></div> ): <div className='text-muted-foreground text-sm' >Images Preview will be shown here</div> } </div>
                  </div>
                  {/* dropdown */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Select Category</Label>
                    <select className='text-black border border-black' onChange={(e)=>setCategory(e.target.value)} value={Category} > 
                      <option value="indoor">Indoor Plants</option>  
                      <option value="outdoor">Outdoor Plants</option>  
                      <option value="herbs">Herbs</option>  
                      <option value="rare">Rare Plants</option>  
                      <option value="gifts">Gifts</option>  
                      <option value="accessories">Plant Accessories</option>  
                  </select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Product Stock</Label>
                    <Input required value={Stock} onChange={(e)=>setStock(e.target.value)} type="Number" placeholder={'Enter Product Stock'} ></Input>
                  </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
          <Button onClick={createProductHandler}>Create Product </Button>
          </CardFooter>
        </Card>
    </div>}
      </div>
        
    </Fragment>
    
  )
}

export default Page


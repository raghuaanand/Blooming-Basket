'use client'
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { url } from '@/lib/url'
import { Item } from '@radix-ui/react-radio-group'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRecoilValue } from 'recoil'
import { UserProfile } from '@/components/atoms/userAuth'
import jwt from 'jsonwebtoken'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import Loading from "@/app/loading"

const AdminDetails =  ({ params }) => {
  const navigate = useRouter()
  const encoded = useRecoilValue(UserProfile)
  const user2 = jwt.decode(encoded, process.env.SECRET_KEY)
  if (user2?.user?.admin === "false") {
    window.location.href = '/'
  }


  const { toast } = useToast()
  const [ProductName, setProductName] = useState('')
  const [productDesc, setproductDesc] = useState('')
  const [ImageArray, setImageArray] = useState([])
  const [uploadCheck, setuploadCheck] = useState([])
  const [productPrice, setproductPrice] = useState('')
  const [Category, setCategory] = useState('')
  const [Stock, setStock] = useState('')
  const [loading, setLoading] = useState('')
  console.log(ImageArray)
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
  const productID = params.slug

  const updateChangeHandler = async( e)=>{
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
          if(uploadCheck !== ImageArray ){
          console.log("yaha se jari")
            const { data } = await axios.put(` /api/updateProduct`,{
            ID:productID,
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
            navigate.push('/adminProducts')
          }
        } else {            
          console.log("yaha se jari2")
          const { data } = await axios.put(` /api/updateProduct`,{
            ID:productID,
            name:ProductName,
            desc:productDesc,
            price:productPrice,
            category:Category,
            stock:Stock,
            user:userID
          })
          setLoading(false)
          if(data && data.success === true){
            toast({
              description:"Product Created Successfully",
              variant:"custom"
            })
            navigate.push('/adminProducts')
          }
        }       
        } else {
          setLoading(false)
          toast({
            description:"Fill all required Details",
            variant:"custom"
          })       
        }
    }
    const fetchProductDetails = async(productID)=>{
      const { data } = await axios.post(` /api/getProductInfo`,{
        productID
      })
      console.log(data)
      setProductName(data.product?.name)
      setproductDesc(data.product?.desc)
      setproductPrice(data.product?.price)
      setImageArray(data.product?.Img)
      setuploadCheck(data.product.Img)
      setCategory(data.product?.category)
      setStock(data.product?.stock)
    }

  useEffect(() => {
    fetchProductDetails(productID)

  }, [])

  return (
   loading ? 
    <Loading /> 
    :
    <div className='flex gap-2 flex-col sm:flex-row ' >
      <div className='sm:m-4 sm:w-[20%] p-2 w-[100%] m-auto ' >
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Product Details</h4>
          <p className="text-sm text-muted-foreground">
            Manage product details and stock
          </p>
        </div>
        <Separator className="my-4" />
        <div className='text-sm' > <Link href={'/adminUsers'}>Back</Link> </div>
        <Separator orientation="vertical" />
      </div>
      <div className=' w-[80%] m-auto' >
        <div className='' >
          <div className='' >
            <Card
              className=" border-none"
            >
              <CardHeader>
                <CardTitle>Manage Product Access</CardTitle>
                <CardDescription>Manage and Update your Stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Card className="min-w-[100px] max-w-[350px] m-auto ">
                    <CardHeader>
                      <CardTitle>Update Product</CardTitle>
                      <CardDescription>Manage your Stock | Update Product Info</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Product Name</Label>
                            <Input required={true} onChange={(e) => setProductName(e.target.value)} value={ProductName} type="text" placeholder={'Enter Product name'} ></Input>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Product Description</Label>
                            <Textarea onChange={(e) => setproductDesc(e.target.value)} value={productDesc} column={15} className='resize-none h-[250px]' type="text" placeholder={'Enter Product Description'} ></Textarea>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Product Price</Label>
                            <Input required onChange={(e) => setproductPrice(e.target.value)} value={productPrice} type="Number" placeholder={'Enter Product Price'} ></Input>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Product Images</Label>
                            <Input required type="file" multiple accept="image/" onChange={handleUpload} placeholder={'Enter Product Description'} ></Input>
                            <div className='flex' >{ImageArray.length > 0 ? ImageArray.map((image) => <div className='flex' key={image} ><img className='h-[40px] w-[40px]' src={image} alt="" /></div>) : <div className='text-muted-foreground text-sm' >Images Preview will be shown here</div>} </div>
                          </div>
                          {/* dropdown */}
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Select Category</Label>
                            <select className='text-black border border-black' onChange={(e) => setCategory(e.target.value)} value={Category} >
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
                            <Input required value={Stock} onChange={(e) => setStock(e.target.value)} type="Number" placeholder={'Enter Product Stock'} ></Input>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    <Link href={'/adminUsers'}> <Button className='bg-red-800 hover:bg-red-900 text-white '>Discard Changes </Button></Link>
                      <Button onClick={updateChangeHandler}>Create Product </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDetails

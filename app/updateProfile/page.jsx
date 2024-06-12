"use client"
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
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
import { useRecoilValue } from 'recoil'
import { UserProfile } from '@/components/atoms/userAuth'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { url } from '@/lib/url'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const Page = () => {
  const {toast} = useToast()
  const [UserInfo, setUserInfo] = useState('')
  const user = useRecoilValue(UserProfile)
  const decodedEmail = jwt.decode(user,process.env.SECRET_KEY) 
  const [Name, setName] = useState()
  const [Email, setEmail] = useState(UserInfo.email)
  const [Password, setPassword] = useState(null)
  const [Cpassword, setCpassword] = useState(null)
  const navigation = useRouter()

  const fetchRequest = async (userID) => {
    const { data } = await axios.post(` /api/UserDetails`, {
      userID
    })
    setUserInfo(data.user)

  }
    console.log(Name)

    const updateChangeHandler  = async()=>{
      if(!Password === null && Password !== Cpassword && !Cpassword===null){
       return  toast({
          description:"Password does not match",
          variant:"destructive"
        })
      } else {
          if(Password && Password !== Cpassword){
            return toast({
              description:"Password does not match",
              variant:"destructive"
            })
          }
          if(Name===UserInfo.name &&  Email===UserInfo.email){
            return
          }
        const { data } = await axios.put(` /api/updateProfile`, {
          userID:decodedEmail.user._id , name:Name, email:Email,password:Password
            })
                if(data.success===true){
                      toast({
                        description:"Profile Updated Successfullly",
                        variant:"custom"
                      })
                      navigation.push('/profile')
                } else {
                      toast({
                        description: "Something went wrong", 
                        variant:"custom"
                      })
                }
              }
        
      }

    useEffect(() => {
      if(decodedEmail.user._id){
        fetchRequest(decodedEmail.user._id)
      }

    }, [])
    useEffect(() => {
      // Update Name and Email states when UserInfo changes
      if (UserInfo) {
        setName(UserInfo.name);
        setEmail(UserInfo.email);
      }
    }, [UserInfo]); 
  return (
    <div>
    <Card className="w-[350px] m-auto ">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Manage your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">User Name</Label>
              <Input id="name" onChange={(e)=>setName(e.target.value)}  placeholder={UserInfo?.name}  value={Name} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">User Email</Label>
              <Input id="Email" onChange={(e)=>setEmail(e.target.value)} placeholder={UserInfo?.email} value={Email}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">User Password</Label>
              <Input type='password' onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Enter Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirm Password</Label>
              <Input type='password' onChange={(e)=>setCpassword(e.target.value)} id="cpassword" placeholder="Confirm Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <Link href={'/profile'}> <Button className='bg-red-800 hover:bg-red-900 text-white '>Discard Changes </Button></Link>
        <Button className='text-white' onClick={updateChangeHandler} >Update Changes</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
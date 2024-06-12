import dynamic from 'next/dynamic'
const ProfileData = dynamic(()=>import('@/components/profileData'),{
  ssr:false
})
const ProfileDataFirstName = dynamic(()=>import('@/components/profileDataFirstName'),{
  ssr:false
})
import React from 'react'
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

const Page = () => {
  return (
    <div>
    <Card className="w-[350px] m-auto mt-4 ">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">User Email</Label>
              <ProfileData /> 
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <ProfileDataFirstName /> 
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
       <Link href={'/updateProfile'}>  <Button >Update Profile </Button></Link>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
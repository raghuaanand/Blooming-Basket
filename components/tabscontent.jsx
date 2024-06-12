"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  
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
  import axios from "axios"
  import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { UserName, UserProfile, userAuth } from "./atoms/userAuth"
import { useToast } from "@/components/ui/use-toast"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { url } from "@/lib/url"
const jwt = require('jsonwebtoken');

  export  function TabsTable() {   
    const [ userLogin, setUserLogin ] = useRecoilState(userAuth)
    const [ userEmail, setUserEmail ] = useRecoilState(UserProfile)
    const { toast } = useToast() 
    const [loading, setloading] = useState(false)
    const navigate = useRouter()

    const loginapi = async ()=>{
      setloading(true)
      if(loading){
        <Loading />
      } else {
        try {
          const { data  } = await axios.post(`/api/signin`,
            {email:Email,password:Password}
            )
          if(data.success){
            setUserLogin(true)

            toast({ 
              description: "Successfully signed in!",
              variant:"custom"
            })            
            console.log(data.user)
            const encryptedEmail = jwt.sign({user: data.userExist},process.env.SECRET_KEY,{          //creating a token
             expiresIn:process.env.JWT_EXPIRE,
              });
             localStorage.setItem('userProfileStatus',encryptedEmail)
             const userEmailset = localStorage.getItem('userProfileStatus')
            setUserEmail(userEmailset)
            setloading(false)
            navigate.push('/')
          } 
        } catch (error) {
         error && console.log(error)
         setloading(false)
         toast({
          variant: "destructive",
          description: `${error?.response?.data?.message}`,
        })
        }}     
    
      }


    const signupapi = async ()=>{
      setloading(true)
        try {
          const { data  } = await axios.post(` /api/signup`, 
            {name:Name,email:Email,password:Password}
          )
          if(data.user.success){
            setUserLogin(true)
            toast({ 
              description: "Account created successfully!",
              variant:"custom"
            })
            navigate.push('/')
          }       
          if(data.success){
            const encryptedEmail  = jwt.sign({user: data.user},process.env.SECRET_KEY)
            localStorage.setItem('userProfileStatus',encryptedEmail)
            const userEmailset = localStorage.getItem('userProfileStatus')
            setUserEmail(userEmailset)
            setloading(false)
            navigate.push('/')
            toast({          
              description: "Account created successfully!",
              variant:"custom"
            })
          }
        } catch (error) {
          setloading(false)
         error && console.log(error)
         toast({
          variant: "destructive",
          description: `${error?.response?.data?.message}`,
        })   
      }  
      }
        
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    
      useEffect(()=>{
      },[userLogin])
  return (
    
      loading ?
       <Loading/> 
       :
    <Tabs defaultValue="account" className="w-[400px] p-4 border-solid border-primary rounded-md border-2  text-primary  ">
      <TabsList className="grid w-full grid-cols-2 " >
        <TabsTrigger value="account" >Sign In</TabsTrigger>
        <TabsTrigger value="password">Sign Up</TabsTrigger>  
      </TabsList>
      <TabsContent className='border-none ' value="account" >
      <form action={loginapi}>
        <Card className='bg-card' > 
          <CardHeader>
            <CardTitle>Sign In </CardTitle>  
          </CardHeader>
          <CardContent className="space-y-2 ">          
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="name"
               value={Email}
               required={true} placeholder='Enter email'
               onChange={(e)=>setEmail(e.target.value)}
               />
               
            </div>
            <div className="space-y-1">
              <Label htmlFor="username" >Password</Label>
              <Input id="username" 
              value={Password} type='password' required={true}
               placeholder='Enter password'
               onChange={(e)=>setPassword(e.target.value)}            
               
               />
            </div>
          </CardContent>
          <CardFooter>
          <Button             
              type={'submit'}
              variant="secondary" 
              className="text-white-foreground bg-primary hover:bg-green-400 "
              >
              Sign In</Button>
          </CardFooter>
        </Card>
      </form>
      </TabsContent>
      <TabsContent value="password">
        <Card  className='bg-card'  >
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name"
               value={Name}
               required={true} placeholder='Enter name'
               onChange={(e)=>setName(e.target.value)}
               />
               
            </div>
            <div className="space-y-1">
              <Label htmlFor="Enter email"> Email</Label>
              <Input id="current"
               required={true} type="email"
                placeholder='Enter email' 
               value={Email}
               onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Enter password" > Password</Label>
              <Input id="new" required={true} 
              type="password" placeholder='Enter password'
              value={Password}
              onChange={(e)=>setPassword(e.target.value)}            
              
              />
            </div>
          </CardContent>
          <CardFooter>
          <Button
              type={'submit'}
              onClick={signupapi}
              variant="secondary"
              className="text-white-foreground bg-primary hover:bg-green-400  "             
              >
              Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  
  )
}

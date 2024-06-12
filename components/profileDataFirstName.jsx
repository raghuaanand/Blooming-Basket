'use client'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { UserProfile} from './atoms/userAuth'
import jwt from 'jsonwebtoken' 
import { Input } from './ui/input'
import axios from 'axios'
import { url } from '@/lib/url'

const profileDataFirstName = () => {
    const user = useRecoilValue(UserProfile)
    const decodedEmail = jwt.decode(user,process.env.SECRET_KEY) 
    const [UserInfo, setUserInfo] = useState('')
  const fetchRequest = async (userID) => {
    const { data } = await axios.post(` /api/UserDetails`, {
      userID
    })
    setUserInfo(data.user)
  }

    useEffect(() => {
      if(decodedEmail.user._id){
        fetchRequest(decodedEmail.user._id)
      }
    }, [])
    
    return (
      <Input id="name" placeholder="User Name" readOnly={true} value={UserInfo.name} />
  )
}

export default profileDataFirstName
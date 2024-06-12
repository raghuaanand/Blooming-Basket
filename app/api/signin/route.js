import { cookies } from 'next/headers'
import { z } from 'zod'
import User from '@/Models/userModels';
import connectingDB from '@/database/database';
import crypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

const schema = z.object({
   email: z.string().email(),
   password : z.string().min(6)
})

export  async function POST(req) {
      try {
         await connectingDB()
         const { email, password } = await req.json();
         const userExist =  await User.findOne({email})
         if(!userExist){
            return Response.json({
               success:false,
               message:"User doesnt exist"
            },
            {
               status:400
            })
         }
         if(email==='' || password===''){
            return Response.json({
               success:false,
            },{
               status:400
            }
            )
         }
         const  data  = {
            email ,
            password
           }
         const user = schema.safeParse(data)
         if(!user.success){
            return Response.json({
               success:user.success,
               message:user.error.issues[0].message   
            }      
            ,{
               status:400
            })
         }
         const comparedPassword = await crypt.compare(password,userExist.password)
         if(!comparedPassword){
            return Response.json({
               success:'false',
               message:"User's password does not match" 
            }      
            ,{ 
               status:400
            })
         }
         const jwt_token = await new SignJWT({id:user.id})
            .setProtectedHeader({alg:'HS256'})
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('1w') 
            .sign(new TextEncoder().encode(process.env.SECRET_KEY))
            cookies().set('token', jwt_token ,{ secure:true })

         return Response.json(
            {
                success:true,
                message: 'Successfully signed in!',
                userExist
            }
            ,
            {status:200}
            )
      } catch (error) {
           throw Error(error)
      }
}



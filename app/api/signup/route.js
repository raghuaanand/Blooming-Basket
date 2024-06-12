import  userModel  from '../../../Models/userModels';
import connectingDB from '../../../database/database';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { z} from 'zod'
import { nanoid } from 'nanoid';

const jwt = require('jsonwebtoken')
export async function POST(request) {

  const schema = z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string().min(6)
  })

  await connectingDB();
  try {
    const {name, email, password } = await request.json();
    if (email==='' || password==='') {
      return  Response.json({
        success: false,
        message: 'Fill all required details',
      },
      {
        status: 400,
      });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return  Response.json({
        success: false,
        message: 'User Email already exists',
      },
      {
        status: 400,
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const data = {
     name, email,password
    }
    //checking if data is correct
    const userv2 = schema.safeParse(data)
    //will data is not correct , 400 status code is thrown
    if(!userv2.success){
     return Response.json({
        message:userv2.error.issues[0].message
     },
     {
      status:400
     }
     ) 
    }
    const user = await userModel.create({
      name,
      email, 
      password: HashedPassword,
    });
    console.log("code yaha tak sahi h?")
    const jwt_token = await new SignJWT({id:user.id})
    .setProtectedHeader({alg:'HS256'})
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1w') 
    .sign(new TextEncoder().encode(process.env.SECRET_KEY))
    cookies().set('token', jwt_token ,{ secure:true })
    console.log("code yaha tak sahi h2?")

    return Response.json({
      success: true,
      user,
    },
    {
      status: 200,
    });

  } catch (error) {
    return  Response.json({     
      success: false,
      message: error,
    },
    {
      status: 400,
    });
  }
} 

import userModels from "@/Models/userModels";
import zod from 'zod'
import bcrypt from 'bcrypt'

const userSchema = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(3)
})
const userSchema2 = zod.object({
    name:zod.string(),
    email:zod.string().email(),
})

export async function PUT(req){ 
    const  { userID, name, email, password } = await req.json()
    try {
        if(password===null || password === "" ){
            const validData = userSchema2.safeParse({name,email})
            if(!validData.success){
                return Response.json({
                    success:false,
                    message:"Invalid Data"
                },{
                    status:200
                })
            }
            const user = await userModels.findByIdAndUpdate(userID,{
                name,email
            } )
            if(!user){
                return Response.json({
                    success:false,
                    message:"Could not find user"
                },{
                    status:400
                })
            }
            return Response.json({
                success:true,
                user
            },{
                status:200
            })
    
        }
    
    
        //when password is also there
            if(password){
                const hashedPassword = await bcrypt.hash(password,10)
            const data = {
                name,email,password:hashedPassword
            }
            const validData2 = userSchema.safeParse(data)
            if(!validData2.success){
                return Response.json({
                    success:false,
                    message:"Invalid Data"
                },{
                    status:200
                })
            }
            const user = await userModels.findByIdAndUpdate(userID,{
                name,email,password:hashedPassword
            } )
            if(!user){
                return Response.json({
                    success:false,
                    message:"Could not find user"
                },{
                    status:400
                })
            }
            return Response.json({
                success:true,
                user
            },{
                status:200
            })
        }
        }     
     catch (error) {
        console.log(error)
        return Response.json({
            error:error
        })
    }
}
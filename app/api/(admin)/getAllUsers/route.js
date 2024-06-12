import userModels from "@/Models/userModels";
import connectingDB from "@/database/database";

export async function GET(){
    await connectingDB()
    const user = await userModels.find()
    if(!user){
       return  Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }
    return Response.json({
        succesS:true,
        user
    },
    {
        status:200
    })
}
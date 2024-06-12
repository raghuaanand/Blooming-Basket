import userModels from "@/Models/userModels";

export async function PUT(req){
    const {role , userID} = await req.json()
    const user = await userModels.findByIdAndUpdate(userID, {admin:role} )
    if(!user){
        return Response.json({
            success:false,
            message:"something went wrong"
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
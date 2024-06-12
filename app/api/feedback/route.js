import { Feedback } from "@/Models/FeedBackModel"
import connectingDB from "@/database/database"

export async function POST(req){
    await connectingDB()
    const { name , feedback } = await req.json()

    const FeedBack = await Feedback.create({
        name,
        feedback
    })
    if(!FeedBack){
        return Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }
    return Response.json({
        success:true,
        FeedBack
    },{
        status:200
    })
}
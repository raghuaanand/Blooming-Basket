import { Order } from "@/Models/OrderModels";
import connectingDB from "@/database/database";

export async function GET(){
    await connectingDB()
    const  data  = await Order.find()
    if(!data){
        return Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }
    return Response.json({
        success:true,
        data
    },{
        status:200
    })
}
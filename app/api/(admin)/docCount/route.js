import { Order } from "@/Models/OrderModels";
import productModels from "@/Models/productModels";
import userModels from "@/Models/userModels";
import connectingDB from "@/database/database";
 
export async function GET(){
    await connectingDB()
    const userCount = await userModels.countDocuments()
    if(!userCount){
        return Response.json({
            success:false,
            message:"Something went wrong" 
        },{
            status:400
        })
    }
    const ProductCount = await productModels.countDocuments()
    if(!ProductCount){
        return Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }
    const RevenueGenerator = await Order.find()
    if(!RevenueGenerator){
        return Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }

    return Response.json({
        success:true,
        userCount,
        ProductCount,
        RevenueGenerator
    },{
        status:200
    })
}
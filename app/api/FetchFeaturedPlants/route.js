import productModels from "@/Models/productModels";
import connectingDB from "@/database/database";

export async function GET(){
    try {
       await connectingDB()
    const product = await productModels.aggregate([
        {$sample:{size:5}}
    ])
    return Response.json({
        success:true,
        product
    },{
        status:200
    })
   } catch (error) {
    throw new Error("Could not fetch Product",error)
   }
}
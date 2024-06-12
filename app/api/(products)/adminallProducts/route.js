import productModels from "@/Models/productModels"
import connectingDB from "@/database/database"

export  async function GET(){
    await connectingDB() 
    const products = await productModels.find()
    return Response.json({
        success:true,
        products
    },
    {
        status:200
    }
    )

}
import productModels from "@/Models/productModels"

export async function POST(req){
    const { productID } = await req.json()
    const product = await productModels.findById(productID)
    if(!product){
        throw new Error('Could not find product')
    }
    return Response.json({
        success:true,
        product
   },{
    status:200
   })
}
import productModels from "@/Models/productModels"
import connectingDB from "@/database/database"

export  async function GET(request){ 
    await connectingDB()
    const defaultPage = request.nextUrl.searchParams.get('page')
    const category = request.nextUrl.searchParams.get('category')
    const price = request.nextUrl.searchParams.get('price')
    let gtAmt = 0
    let ltAmt = 0
    if(price==='999'){
        ltAmt=999
    }
    if(price==='999-1499'){
        ltAmt=1499
        gtAmt = 999
    }
    if(price==='1499-above'){
        gtAmt = null
        ltAmt=1499
    }
    console.log(typeof price )
    let skip = 0
    if(defaultPage > 1 ) {
        skip = (defaultPage-1)*6
    }   
    let products;
    {
        category
            ?
            price ? 
            products = await productModels.find({ category: category ,  price: { $lt: 999 } }).limit(6).skip(skip)
            :
            products = await productModels.find({ category: category }).limit(6).skip(skip)
            :
            price ? 
            products = await productModels.find({price: { $lt: ltAmt , $gt:gtAmt } }).limit(6).skip(skip)
            :
            products = await productModels.find().limit(6).skip(skip)
    }

    return Response.json({
        success:true,
        products
    },
    {
        status:200
    }
    )

}
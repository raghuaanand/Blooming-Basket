import productModels from "@/Models/productModels"
import connectingDB from "@/database/database";
import cloudinary from 'cloudinary'
export async function PUT(req){
    const { ID, name,desc,price,Img,category,stock,reviews,user,numofReviews} = await req.json()
     await connectingDB()
     if(Img){
     cloudinary.config({
        cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key:process.env.NEXT_PUBLIC_API_KEY,
        api_secret:process.env.NEXT_PUBLIC_SECRET_KEY
            })
        const UploadImage =  Img.map(async(img)=>(
            await cloudinary.uploader.upload(img,{
                upload_preset:"ml_default",
                folder:"plant_shop"
            })
            ))
            const ImagesArray = await Promise.all(UploadImage)
            const product = await productModels.findByIdAndUpdate(ID, {
                name,
                desc,
            price,
            Img:ImagesArray,
            category,
            stock,
        })       
        if(!product){
        return Response.json({
            success:false,
            message:"Something went wrong"
        },{
            status:400
        })
    }
    return Response.json({
        success:true
    },{
        status:200
    })
} else {
    const product = await productModels.findByIdAndUpdate(ID, {
        name,
        desc,
        price,
        category,
        stock,
    })       
    if(!product){
    return Response.json({
        success:false,
        message:"Something went wrong"
    },{
        status:400
    })
}
    return Response.json({
        success:true
    },{
        status:200
    })
    }
    

}
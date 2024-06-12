import productModels from "@/Models/productModels";
import connectingDB from "@/database/database";
import cloudinary from 'cloudinary'

export async function POST(req){
    const {  name,desc,price,Img,category,stock,user} = await req.json()
    await connectingDB()
    try {   
    cloudinary.config({
        cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key:process.env.NEXT_PUBLIC_API_KEY,
        api_secret:process.env.NEXT_PUBLIC_SECRET_KEY
    })

        try {

           const UploadImage =  Img.map(async(img)=>(
            await cloudinary.uploader.upload(img,{
                upload_preset:"ml_default",
                folder:"plant_shop"
            })
           ))
           const ImagesArray = await Promise.all(UploadImage)
            if(ImagesArray){
                const product = await productModels.create({
                    name,
                    desc,
                    price,
                    Img:ImagesArray,
                    category,
                    stock,
                    user
                })
                return Response.json({
                    success:true,
                    product
                },
                {
                    status:200
                })        
            }
        } catch (error) {
            console.log(error)
            return Response.json({
                success:false,
                message:"Something went wrong",error
            },{
                status:400
            })
        }

    } catch (error) {
     throw Error(error)
    }
}
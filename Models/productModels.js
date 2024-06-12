import mongoose from "mongoose";
import userModels from "./userModels";

const ProductSchema = new mongoose.Schema({ 
    name:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    Img:[{
        url:{type:String,required:true}
    }],
    rating:{type:Number, default:0},
    numofReviews:{type:Number,default:0},
    category:{type:String,required:true},
    stock:{type:String,required:true},
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            }, 
            name:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: userModels,
        required:true
    },
    created_at:{type:Date, default: Date.now()}
})

export default mongoose.models?.Product || mongoose.model("Product",ProductSchema)
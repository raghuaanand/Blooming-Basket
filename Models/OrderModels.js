import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    //Details of product which is to ordered
    OrderItems:[
    {  
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        productID:{
            type:mongoose.Schema.ObjectId,
            ref:"product",
            required:true
        },
    }
    ],
    // Deatails of Shipping and Address
    shippingDetails:{
        address:{type:String, required:true}, 
        city:{type:String, required:true},
        pincode:{type:Number, required:true},
        phoneno:{type:Number, required:true},
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
    itemPrice:{type:Number,default:0},
    taxPrice:{type:Number,default:0},
    shippingCharges:{type:Number,default:0},
    TotalAmount:{type:Number,default:0},
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

export const Order = mongoose.models?.order || mongoose.model("order",OrderSchema)
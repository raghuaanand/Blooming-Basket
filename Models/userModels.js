import mongoose from "mongoose";

 const UserSchema  = new mongoose.Schema({ 
    name:{type:String,required:true},
    email : { type: String, required:true , unique:true},
    password : { type: String, required:true},
    admin:{type:String,default:false},
    isCreatedAt : { type:Date, default:  Date.now()}
})


export default mongoose.models?.user || mongoose.model('user', UserSchema)

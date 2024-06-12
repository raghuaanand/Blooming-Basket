import mongoose, { model } from "mongoose";

const FeedBack  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

 export const Feedback = mongoose.models?.Feedback ||  mongoose.model("Feedback",FeedBack)


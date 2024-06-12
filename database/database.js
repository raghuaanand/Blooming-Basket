import mongoose from "mongoose";

  const connectingDB = async()=>{
    try {
        const { connection  } = await mongoose.connect(process.env.MONGO_URI,{
            dbName:'Plant-Shop'
        })
            console.log(`Database has been connected`, connection.host)
    } catch (error) {
        console.log(error)
    }

}

export default connectingDB
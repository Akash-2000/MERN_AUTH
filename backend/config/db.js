import mongoose from 'mongoose';


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoose connected : ${conn.connection.host}`);
    }catch (error){
        console.error("Error"+error)
        process.exit(1)
    }
}


export default connectDB
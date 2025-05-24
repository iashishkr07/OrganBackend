import mongoose from "mongoose";

const connectDB = ()=>{
    mongoose.connect(`${process.env.MONGO_URI}/Organ`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((error) => console.error('❌ MongoDB connection error:', error));
    
}


export default connectDB
import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1); // Stop the application on connection failure
  }
};



export default connectDB
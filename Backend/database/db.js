import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected Succesfully Bro Enjoy')
  } catch (error) {
    console.log('MongoDB Connection error', error)
    process.exit(1)
  }
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🟢 MongoDB reconnected");
  });
}
export default connectDB
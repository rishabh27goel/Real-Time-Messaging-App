import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const databaseInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    return databaseInstance;
  }
  catch(error) {
    console.error("Error while connecting to the database : ", error.message);
    throw error;
  }
}
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
    throw new Error("⚠️ Missing MONGODB_URI in .env file");
}

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;

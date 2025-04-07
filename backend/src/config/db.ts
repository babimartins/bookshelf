import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected!');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error after initial connect:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      console.info('MongoDB reconnected.');
    });

    mongoose.connection.on('close', () => {
      console.info('MongoDB connection closed.');
    });
  } catch (error) {
    console.error('MongoDB Initial Connection Error:', error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected.');
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
};

export default connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' MongoDB Connected');
  } catch (err) {
    console.error(' MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

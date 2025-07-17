import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  category: String,
  image: { type: String, required: true },
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);

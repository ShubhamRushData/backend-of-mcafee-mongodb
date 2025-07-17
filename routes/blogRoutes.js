import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { Blog } from '../models/Blog.js';

const upload = multer({ storage });
const router = express.Router();

// Create blog
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const imageUrl = req.file.path;

    const newBlog = new Blog({ title, content, category, imageUrl });
    await newBlog.save();

    res.status(201).json({ message: 'Blog created', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateFields = { title, content, category };
    if (imageUrl) updateFields.imageUrl = imageUrl;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json({ message: 'Updated', blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

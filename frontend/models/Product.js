import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: {
    type: String,
    required: true,
  },
  category: String,
  stock: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// যদি আগে থেকে মডেল তৈরি থাকে তবে সেটি ব্যবহার করবে, নয়তো নতুন তৈরি করবে
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;

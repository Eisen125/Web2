import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    views:{
      type:Number,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    brand:{
      type:String,
      required:true,
    },
    purchased:{
      type:Number,
      required:true,
    }

  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
export default Product;


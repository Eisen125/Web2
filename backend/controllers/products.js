
import { async } from '@firebase/util';
import Product from '../models/productModel.js'

export const Findproducts = async (req, res) => {
    const products = await Product.find();
    res.send(products);
  };

export const SaveProduct = async (req, res) => {
    console.log(req.body);
    req.body.forEach(async (element) => {
      const newproduct = new Product(element)
      const product = await newproduct.save()
      res.send(product)
    });
};

export const DeleteProduct=async (req,res)=>{
  try {
    await Product.findByIdAndDelete({_id:req.body._id});
  } catch (error) {
    res.status(400).send(err.message);
  }
}



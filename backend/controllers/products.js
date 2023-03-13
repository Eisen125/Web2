
import { async } from '@firebase/util';
import Product from '../models/productModel.js'

export const Findproducts = async (req, res) => {
    const products = await Product.find({});
    console.log("this is from find",products);
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

export const AddNewProduct= async (req,res)=>{
  const exit=await Product.findById(req.body.id);
  if(exit!=req.body){
    const newProduct=new Product(exit);
    const createdProduct= await newProduct.save();
    res.send(createdProduct)
  }
  else{
    res.send("product has alredy created");
  }
}



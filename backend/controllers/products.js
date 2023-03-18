import Product from '../models/productModel.js'

export const Findproducts = async (req, res) => {
  let { filter } = req.body;
  const products = await Product.find(filter);
  // console.log("this is from find",products);
  res.send(products);
};

export const UpdateProduct=async (req,res)=>{
  const productToUpdate=await Product.findOne(req.body.id);
  if(productToUpdate){
     const createdProduct= await productToUpdate.save();
     console.log(createdProduct);
     res.status(201).send("updated successfully");
  }
}

// export const SaveProduct = async (req, res) => {
//     req.body.forEach(async (element) => {
//       const newproduct = new Product(element)
//       const product = await newproduct.save()
//       res.send(product)
//     });
// };

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



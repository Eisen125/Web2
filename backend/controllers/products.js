import Product from '../models/productModel.js'

export const Findproducts = async (req, res) => {
  let { filter } = req.body;
  const products = await Product.find(filter);
  // console.log("this is from find",products);
  res.send(products);
};

export const UpdateProduct = async (req, res) => {
  let { id, quantity } = req.body;
  const productToUpdate = await Product.findOne({ "id": id });
  if (productToUpdate) {
    productToUpdate.purchased += quantity;
    const updatedProduct = await productToUpdate.save();
    console.log(updatedProduct);
    res.status(201).send({ message: "Updated Successfully" });
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}

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


export const searchProduct = async (req, res, next) => {
  const { search, category, brand, priceRange } = req.query;
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-');
    query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  try {
    const products = await Product.aggregate([
      { $match: query },
      { $group: { _id: '$category', products: { $push: '$$ROOT' } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(products);
  } catch (error) {
    next(error);
  }
};




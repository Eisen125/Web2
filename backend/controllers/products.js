import Product from '../models/productModel.js'

export const Findproducts = async (req, res) => {
  let { filter } = req.body;
  const products = await Product.find(filter);
  res.send(products);
};

export const UpdateProduct = async (req, res) => {
  let { id, quantity } = req.body;
  const productToUpdate = await Product.findOne({ "id": id });
  if (productToUpdate) {
    productToUpdate.purchased += quantity;
    const updatedProduct = await productToUpdate.save();
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
    res.send("product was alredy created");
  }
}


export const searchProduct = async (req, res) => {
  const { search } = req.body;
  const query = {};

  if (search != '') {
    query.name = { $regex: search, $options: 'i' };
  }

  try {
    const products = await Product.aggregate([
      { $match: query },
      { $group: { _id: { brand: '$brand', category: '$category' }, products: { $push: '$$ROOT' } } },
      { $sort: { '_id.category': 1, '_id.brand': 1 } },
    ]);
    /*brand: group._id.brand,
    category: group._id.category,
    products: group.products[0],*/
    const productList = products.map((group) => ({
      
      image: group.products[0].image,
      id: group.products[0].id,
      name: group.products[0].name,
      views: group.products[0].views,
      price: group.products[0].price,
      description: group.products[0].description,
      category: group.products[0].category,
      brand: group.products[0].brand
    }));

    res.json(productList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
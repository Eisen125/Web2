import { async } from '@firebase/util';
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js';
import User from "../models/usersModel.js"

export const getAllOrders=async (req,res)=>{
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
}

export const CreateNewOrder = async (req, res) => {
  
  let { userId, cartItem } = req.body;
  let orderItems = cartItem;
  
  const user= userId; // Get the user ID from the authenticated user
  const existingOrder = await Order.findOne({ user, cartItem });
  if (existingOrder) {
    existingOrder.orderItems.forEach(item => {
      cartItem = cartItem.find(cItem => cItem.product === item.product);
      if (cartItem) {
        item.quantity += 1;
      }
    });
    const updatedOrder = await existingOrder.save();
    res.status(201).json(updatedOrder);
  } else {
     let user=new User({fireBaseId:userId})
     const newOrderItem={
      product:new Product(
        {
        name:cartItem.name,
        id: cartItem.id,
        image: cartItem.image,
        price: cartItem.price,
        views: cartItem.views,
        description: cartItem.description,
        catagory: cartItem.category,
        brand: cartItem.brand})
      
    }
    console.log(newOrderItem);
    const newOrder = new Order({
      user: user,
      orderItems: [newOrderItem],
    });
    

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
};

export const DeleteOrder=async (req,res)=>{
let { userId, cartItem } = req.body;
  const order=await Order.findOne(userId,cartItem)
  if(order){
    await order.remove();
    res.send({message :"order deleted"})
  }
  else{
    res.status(404).send({ message: 'order Not Found' });
  }
}



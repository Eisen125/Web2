import { async } from '@firebase/util';
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js';
import User from "../models/usersModel.js"

export const getAllOrders=async (req,res)=>{
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
}

export const OrderSummery=async(req,res)=>{
    const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, dailyOrders, productCategories });
    
}

export const OrderDeliveryTime=async(req,res)=>{
    const order = await Order.findById(req.body.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
}
 
export const CreateNewOrder = async (req, res) => {
  
  const { userId, cartItem } = req.body;
  
  const user= userId; // Get the user ID from the authenticated user
  const existingOrder = await Order.findOne({ user, cartItem });
  if (existingOrder) {
    existingOrder.orderItems.forEach(item => {
      const cartItem = cartItem.find(cItem => cItem.product === item.product);
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
    const newOrder = new Order({
      user,
      newOrderItem,
    });
    

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
};

export const DeleteOrder=async (req,res)=>{
  const order=await Order.findById(req.body.id)
  if(order){
    await order.remove();
    res.send({message :"order deleted"})
  }
  else{
    res.status(404).send({ message: 'order Not Found' });
  }
}



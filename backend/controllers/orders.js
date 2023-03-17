import { async } from '@firebase/util';
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js';
import User from "../models/usersModel.js"

export const getAllOrders = async (req, res) => {
  let { userId } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  const orders = await Order.findOne({ user: user._id });
  res.send(orders);
}

export const CreateNewOrder = async (req, res) => {
  
  let { userId, cartItem } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  const existingOrder = await Order.findOne({ user: user._id });

  if (existingOrder) {
    let itemExists = false;
    existingOrder.orderItems.forEach(item => {
      if (item.id == cartItem.id) {
        item.quantity += 1;
        itemExists = true;
      }
    });

    if (!itemExists) {
      const productRef = await Product.findOne({ id: cartItem.id });
      const newOrderItem = {
        id: parseInt(cartItem.id),
        quantity: 1,
        product: productRef
      }
      existingOrder.orderItems.push(newOrderItem);
    }

    const updatedOrder = await existingOrder.save();
    res.status(201).json(updatedOrder);
  } else {
    const productRef = await Product.findOne({ id: cartItem.id });
    const newOrderItem = {
      id: cartItem.id,
      quantity: 1,
      product: productRef
    }
    const newOrder = new Order({
      user: user._id,
      orderItems: [newOrderItem],
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
};

export const DeleteOrder = async (req, res) => {
  let { userId, cartItem } = req.body;
  const order = await Order.findOne(userId, cartItem)
  if (order) {
    await order.remove();
    res.send({ message: "order deleted" })
  }
  else {
    res.status(404).send({ message: 'order Not Found' });
  }
}
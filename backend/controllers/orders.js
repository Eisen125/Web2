import Order from '../models/orderModel.js'
import Product from '../models/productModel.js';
import User from "../models/usersModel.js"

export const GetAllOrders = async (req, res) => {
  let { userId } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  if (user) {
    const orders = await Order.findOne({ user: user._id });
    orders ? res.status(201).json(orders) : res.status(404).send({ message: 'Order Not Found' });
  } else {
    res.status(404).send({ message: 'User Has No Orders' });
  }
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

// lower order quantity
export const ReduceQuantity = async (req, res) => {
  let { userId, cartItem } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  const order = await Order.findOne({ user: user._id });

  if (order) {
    order.orderItems.forEach(item => {
      if (item.id == cartItem.id && item.quantity !== 1) {
        item.quantity = Math.max(1, item.quantity - 1);
      }
    });

    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}

// delete all items ordered
export const DeleteOrder = async (req, res) => {
  let { userId } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  const order = await Order.findOne({ user: user._id });
  if (order !== null) {
    await order.remove();
    res.send({ message: "Order Deleted" })
  }
  else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}

// delete single item from order
export const DeleteOrderItem = async (req, res) => {
  let { userId, cartItem } = req.body;
  const user = await User.findOne({ fireBaseId: userId });
  const order = await Order.findOne({ user: user._id });

  if (order) {
    let removeItem = null;
    order.orderItems.forEach(item => {
      removeItem = (item.id == cartItem.id) ? item : null;
    });
    if (removeItem) {
      order.orderItems.remove(removeItem);
      const updatedOrder = await order.save();
      res.status(201).json(updatedOrder);
      res.send({ message: "Ordered Item Deleted" })
    } else {
      res.status(404).send({ message: 'Ordered Item Not Found' });
    } 
  }
  else {
    res.status(404).send({ message: 'Order Not Found' });
  }
}
import { Router } from "express";
import { GetAllOrders, DeleteOrder, CreateNewOrder, ReduceQuantity, DeleteOrderItem } from "../controllers/orders.js";
const router = Router();
router.delete('/deleteOrder',DeleteOrder);
router.post('/newOrder', CreateNewOrder);
router.post('/GetAllOrders', GetAllOrders);
router.post('/ReduceQuantity', ReduceQuantity);
router.post('/DeleteOrderItem', DeleteOrderItem);

export default router;
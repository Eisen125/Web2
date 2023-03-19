import { Router } from "express";
import { GetAllOrders, DeleteOrder, CreateNewOrder, ReduceQuantity, RemoveOrderItem } from "../controllers/orders.js";
const router = Router();
router.delete('/deleteOrder',DeleteOrder);
router.post('/newOrder', CreateNewOrder);
router.post('/GetAllOrders', GetAllOrders);
router.post('/ReduceQuantity', ReduceQuantity);
router.post('/RemoveOrderItem', RemoveOrderItem);

export default router;
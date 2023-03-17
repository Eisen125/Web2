import { Router } from "express";
import { GetAllOrders, DeleteOrder, CreateNewOrder } from "../controllers/orders.js";
const router = Router();
router.get('/',GetAllOrders);
router.delete('/deleteOrder',DeleteOrder);
router.post('/newOrder',CreateNewOrder);


export default router;
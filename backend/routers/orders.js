import { Router } from "express";
import {getAllOrders,DeleteOrder,CreateNewOrder} from "../controllers/orders.js";
const router = Router();
router.get('/',getAllOrders);
router.delete('/deleteOrder',DeleteOrder);
router.post('/newOrder',CreateNewOrder);


export default router;
import { Router } from "express";
import {getAllOrders,OrderSummery,CreateNewOrder} from "../controllers/orders.js";
const router = Router();
router.get('/',getAllOrders)
router.get('/summery',OrderSummery)
router.post('/newOrder',CreateNewOrder)


export default router;
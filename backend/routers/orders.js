import { Router } from "express";
import {getAllOrders,OrderSummery} from "../controllers/orders.js";
const router = Router();
router.get('/',getAllOrders)
router.get('/summery',OrderSummery)


export default router;
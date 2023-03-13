import { Router } from "express";
import { Findproducts ,SaveProduct,DeleteProduct} from "../controllers/products.js";

const router = Router();
router.get("/", Findproducts);
router.post("/save",SaveProduct);
router.delete('/deleteProduct',DeleteProduct);

export default router;
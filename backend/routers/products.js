import { Router } from "express";
import { Findproducts ,SaveProduct,DeleteProduct,AddNewProduct} from "../controllers/products.js";

const router = Router();
router.post("/", Findproducts);
router.post("/save",SaveProduct);
router.delete('/deleteProduct',DeleteProduct);
router.post('/AddnewProduct',AddNewProduct);

export default router;
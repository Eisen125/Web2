import { Router } from "express";
import { Findproducts,DeleteProduct,AddNewProduct,UpdateProduct} from "../controllers/products.js";

const router = Router();
router.post("/", Findproducts);
router.post('/deleteProduct',DeleteProduct);
router.post('/AddnewProduct',AddNewProduct);
router.post('/updateProduct',UpdateProduct);

export default router;
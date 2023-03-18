import { Router } from "express";
import { Findproducts ,SaveProduct,DeleteProduct,AddNewProduct} from "../controllers/products.js";

const router = Router();
router.post("/", Findproducts);
router.post("/save",SaveProduct);
router.post('/deleteProduct',DeleteProduct);
router.post('/AddnewProduct',AddNewProduct);
// router.post('/updateProduct',)

export default router;
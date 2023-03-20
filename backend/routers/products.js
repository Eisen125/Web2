import { Router } from "express";
import { Findproducts,DeleteProduct,AddNewProduct,UpdateProduct,searchProduct} from "../controllers/products.js";

const router = Router();
router.post("/", Findproducts);
router.post('/deleteProduct',DeleteProduct);
router.post('/AddnewProduct',AddNewProduct);
router.post('/updateProduct',UpdateProduct);
router.get('/',searchProduct)

export default router;
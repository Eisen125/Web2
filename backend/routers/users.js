import { newUser, existUser} from "../controllers/users.js";
import { Router } from "express";

const router=Router();
 router.post('/newUser',newUser);
 router.post('/existUser',existUser);
export default router;
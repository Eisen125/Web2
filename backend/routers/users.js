import { newUser, existUser} from "../controllers/users.js";
import { Router } from "express";

const router=Router();
 router.post('/newUser',newUser);
 router.post('/users/existUser',existUser);

 

export default router;
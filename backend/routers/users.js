import { newUser, existUser,DeleteUser} from "../controllers/users.js";
import { Router } from "express";

const router=Router();
 router.post('/newUser',newUser);
 router.post('/existUser',existUser);
 router.delete('/deleteuser',DeleteUser);
 
 
export default router;
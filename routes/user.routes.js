import express from 'express'
import {register , login ,logout , getUser} from "../controllers/user.controller.js"
import { isAutherized } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login); 
router.get('/logout',isAutherized,logout); 
router.get("/getuser", isAutherized, getUser);
export default router;
import express from 'express';
import { Register } from '../controllers/AuthController.js';
import { login } from '../controllers/AuthController.js';
import { logout } from '../controllers/AuthController.js';
const router=express.Router();


router.post("/register",Register)
router.post("/login",login)
router.post("/logout",logout)

export default router;
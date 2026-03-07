import express from "express";
import { login, logoutUser, signUp } from "../controllers/userController";

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.post("/logout", logoutUser);


export default router;
import express from "express";
import Auth from '../controllers/auth/auth'

const router = express.Router();

router.post("/login", Auth.login);


export default router;
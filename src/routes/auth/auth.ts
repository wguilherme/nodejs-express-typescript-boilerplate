import express from "express";
import Auth from '../../controllers/auth/auth'
import auth from '../../middleware/auth'

const router = express.Router();

router.post("/login", Auth.login);
router.post("/users/me/logout", auth, Auth.logout);
// router.post("/users/me/logoutall", auth, Auth.logoutAll);



export default router;
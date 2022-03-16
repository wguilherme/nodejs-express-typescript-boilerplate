import express from 'express'
import Auth from '../../controllers/auth'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/api/v1/user/login', Auth.login)
router.post('/api/v1/user/me/logout', auth, Auth.logout)
// router.post("/api/v1/users/me/logoutall", auth, Auth.logoutAll);

export default router

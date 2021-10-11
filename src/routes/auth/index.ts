import express from 'express'
import Auth from '../../controllers/auth'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/user/login', Auth.login)
router.post('/user/me/logout', auth, Auth.logout)
router.get('/user/me', auth, Auth.loggedUser)
// router.post("/users/me/logoutall", auth, Auth.logoutAll);

export default router

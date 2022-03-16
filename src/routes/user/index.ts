import express from 'express'
import User from '../../controllers/user'
import auth from '../../middleware/auth'

const router = express.Router()

router.get('/api/v1/user', User.index)
router.get('/api/v1/user/:id', User.show)
router.get('/api/v1/user/me/auth', auth, User.loggedUser)

router.post('/api/v1/user', User.create)
router.patch('/api/v1/user/:id', User.update)
router.delete('/api/v1/user/:id', User.deleteUser)

// dev only
router.delete('/deleteAllUsers', User.deleteAll)

export default router

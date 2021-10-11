import express from 'express'
import User from '../../controllers/user'

const router = express.Router()

router.get('/user', User.index)
router.get('/user/:id', User.show)
router.post('/user', User.create)
router.patch('/user/:id', User.update)
router.delete('/user/:id', User.deleteUser)

// dev only
router.delete('/deleteAllUsers', User.deleteAll)

export default router

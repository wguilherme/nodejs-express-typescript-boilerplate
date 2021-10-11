import express from 'express'
import General from '../../controllers/general'

const router = express.Router()

router.get('/', General.index)
router.get('/ping', General.ping)

export default router

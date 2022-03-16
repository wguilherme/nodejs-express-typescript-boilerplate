import express from 'express'
import General from '../../controllers/general'

const router = express.Router()

router.get('/api/v1/', General.index)

/**
 * @swagger
 * /ping:
 *  get:
 *    summary: Simple api test
 *    tags:
 *      - General
 *    responses:
 *      200:
 *        description: Returns a {message:"pong"}
 */
router.get('/api/v1/ping', General.ping)

// dev only routes
if (process.env.DEV === 'true') {
  router.post('/dev/reset/db/mongo', General.resetMongoDb)
}

export default router

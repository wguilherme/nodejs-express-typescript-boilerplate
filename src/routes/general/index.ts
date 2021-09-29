
import express from 'express'
const router = express.Router()
import General from "../../controllers/general"

// router.get("/", General.index)
router.get("/ping", General.ping);

export default router;
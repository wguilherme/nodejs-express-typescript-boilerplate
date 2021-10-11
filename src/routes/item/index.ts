import express from 'express'
import multer from 'multer'
import Item from '../../controllers/item'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()
router.get('/item', Item.index)
router.get('/item/:id', Item.show)
router.post('/item', Item.create)
router.patch('/item/:id', Item.update)
router.delete('/item/:id', Item.deleteItem)

// dev only
router.delete('/deleteAllItems', Item.deleteAll)

export default router

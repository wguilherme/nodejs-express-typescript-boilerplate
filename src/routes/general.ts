
import express from 'express'
const router = express.Router()


router.get("/", async (req, res)=> {
   try {

      res.send('hello - nodejs express typescript mongoose boilerplate')
   } catch (error) {
      res.status(500).send(error)
   }
});

router.get("/ping", async (req, res)=> {
   try {

      res.status(200).json({ message: "pong" })
   } catch (error) {
      res.status(500).send(error)
   }
});

export default router;
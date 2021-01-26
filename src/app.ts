import express from 'express'
import itemRouter from './routes/item'
import userRouter from './routes/user'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express()
app.use(cors());

app.use(express.json())

//routes
app.use(itemRouter)
app.use(userRouter)

//routes
export default app
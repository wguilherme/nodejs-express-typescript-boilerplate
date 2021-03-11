import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

//routes
import itemRouter from './routes/item'
import userRouter from './routes/user'
import generalRouter from './routes/general'

dotenv.config();

const app = express()
app.use(cors());

app.use(express.json())

//routes
app.use(itemRouter)
app.use(userRouter)
app.use(generalRouter)

//routes
export default app
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './router'

dotenv.config();

const app = express()
app.use(cors());

app.use(express.json())
app.use(routes)

//routes
export default app
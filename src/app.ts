import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import routes from './router'

// import { adminJs, adminJsRouter } from "./config/adminjs"

dotenv.config();

const app = express()

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json())

app.use(routes)

// setup adminjs connection
// app.use(adminJs?.options?.rootPath, adminJsRouter)

//routes
export default app
import express from 'express'

import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import dotenv from 'dotenv'
import routes from './router'

// import { adminJs, adminJsRouter } from "./config/adminjs"

dotenv.config()

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

const app = express()

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))

// applying into all requests
app.use(limiter)

app.use(routes)

// setup adminjs connection
// app.use(adminJs?.options?.rootPath, adminJsRouter)

// routes
export default app

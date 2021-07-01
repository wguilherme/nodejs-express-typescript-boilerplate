import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import routes from './router'

dotenv.config();

const app = express()

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json())

app.use(routes)

//routes
export default app
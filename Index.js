import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js'
import UserRoute from './routes/User.js'
import cookieParser from 'cookie-parser'
import adminRoute from './routes/adminRoute.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true              // allow cookies
}));

app.use('/api', UserRoute)
app.use('/admin', adminRoute)



app.listen(PORT, () => {
  connectDB()
  console.log(`Example app listening on port ${PORT}`)
})
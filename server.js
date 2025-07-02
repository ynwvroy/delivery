import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Route imports
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orderRoutes.js' // ✅ NEW: Order route

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes) // ✅ NEW: Order endpoint

// Database and server startup
const PORT = process.env.PORT || 5000
const DB_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery'

mongoose.connect(DB_URL)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err)
  })
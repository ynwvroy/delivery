import express from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// ✅ POST /api/orders — Place an order
router.post('/', async (req, res) => {
  try {
    const { name, phone, address, items } = req.body
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const order = new Order({ name, phone, address, items, total })
    await order.save()

    res.status(201).json({ message: 'Order placed successfully' })
  } catch (error) {
    console.error('Order error:', error)
    res.status(500).json({ message: 'Server error while placing order' })
  }
})

// ✅ GET /api/orders/history — Get logged-in user's orders
router.get('/history', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Missing token' })

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'User not found' })

    // 📝 Optionally, orders could store a user ID. For now, we match by phone number.
    const orders = await Order.find({ phone: user.phone }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    console.error('Fetch orders error:', err)
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})

export default router
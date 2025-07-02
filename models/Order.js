import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)
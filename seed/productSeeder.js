import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery'

const seedProducts = [
  {
    name: 'Bananas',
    description: 'Fresh ripe bananas',
    price: 1.99,
    image: 'https://example.com/images/bananas.jpg',
    stock: 100,
  },
  {
    name: 'Tomatoes',
    description: 'Juicy red tomatoes',
    price: 2.49,
    image: 'https://example.com/images/tomatoes.jpg',
    stock: 75,
  },
  {
    name: 'Milk',
    description: '1 liter of fresh whole milk',
    price: 1.29,
    image: 'https://example.com/images/milk.jpg',
    stock: 50,
  },
  {
    name: 'Bread',
    description: 'Whole grain loaf',
    price: 2.99,
    image: 'https://example.com/images/bread.jpg',
    stock: 30,
  },
]

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    await Product.deleteMany()
    await Product.insertMany(seedProducts)
    console.log('✅ Sample products seeded!')
    process.exit()
  } catch (err) {
    console.error('❌ Seed error:', err)
    process.exit(1)
  }
}

seedDB()
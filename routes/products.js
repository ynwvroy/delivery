import express from 'express'
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

import auth from '../middleware/auth.js'

const router = express.Router()

// Public route
router.get('/', getAllProducts)
router.get('/:id', getProductById)

// Protected routes (require JWT token)
router.post('/', auth, createProduct)
router.put('/:id', auth, updateProduct)
router.delete('/:id', auth, deleteProduct)

export default router
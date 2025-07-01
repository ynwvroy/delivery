import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL to an image
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
    },
    expiryDate: Date,
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
export default Product